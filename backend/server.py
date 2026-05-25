from fastapi import FastAPI, HTTPException, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from starlette.responses import Response
from groq import Groq
from enum import Enum
import os
from dotenv import load_dotenv
import re
from datetime import datetime
from typing import Callable, List, Optional
import base64
import io

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="ReplyAI")

# Rate limiter - 10 requests per minute per IP
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

# CORS - Allow all origins for hackathon
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security headers middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next: Callable) -> Response:
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

# Initialize Groq client
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY environment variable is required")

groq_client = Groq(api_key=groq_api_key)

# Mode enum
class ReplyMode(str, Enum):
    flirty = "flirty"
    funny = "funny"
    professional = "professional"
    roast = "roast"
    savage = "savage"
    custom = "custom"

# Style enum
class ReplyStyle(str, Enum):
    ai = "ai"
    human = "human"

# System prompts for each mode
MODE_PROMPTS = {
    "flirty": "You are a charming reply assistant. Reply in 1-2 witty flirty sentences only.",
    "funny": "You are a comedy reply assistant. Reply in 1-2 hilarious sentences only.",
    "professional": "You are a professional reply assistant. Reply in 1-2 formal sentences only.",
    "roast": "You are a roast comedian. Reply with a funny roast in 1-2 sentences only.",
    "savage": "You are a bold reply assistant. Reply with a fearless savage response in 1-2 sentences only.",
}

# Style modifiers
STYLE_MODIFIERS = {
    "ai": "Use perfect grammar, proper punctuation, and clear professional language.",
    "human": """Write like a real person texting casually. Use 'u' instead of 'you', 'r' instead of 'are', 'gonna', 'wanna', 'tbh', 'ngl', 'lol', 'yaar', 'bro'. 
Skip capitals sometimes. Use '...' frequently. Add occasional small typos (like 'teh' instead of 'the'). 
Keep it short and punchy. Start with phrases like 'omg', 'okay so', 'ngl tho' sometimes. Make it feel authentic and casual."""
}

# Input sanitization
def sanitize_input(text: str) -> str:
    """Remove control characters and normalize whitespace"""
    text = re.sub(r'[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f-\x9f]', '', text)
    text = ' '.join(text.split())
    return text.strip()

# Request models
class GenerateRequest(BaseModel):
    messages: str = Field(..., min_length=1, max_length=20000)
    mode: ReplyMode
    style: ReplyStyle = ReplyStyle.ai
    custom_tone: Optional[str] = Field(None, max_length=200)
    conversation_history: Optional[List[str]] = Field(default=[], max_items=50)
    context: Optional[str] = Field(None, max_length=500)
    
    @validator('messages')
    def validate_messages(cls, v):
        if not v or not v.strip():
            raise ValueError("Messages cannot be empty")
        return v
    
    @validator('custom_tone', always=True)
    def validate_custom_tone(cls, v, values):
        if 'mode' in values and values['mode'] == ReplyMode.custom:
            if not v or not v.strip():
                raise ValueError("Custom tone is required when mode is 'custom'")
        return v

# Response model
class GenerateResponse(BaseModel):
    reply: str
    mode: str
    style: str
    timestamp: str

class ExtractTextResponse(BaseModel):
    text: str

class TranscribeResponse(BaseModel):
    text: str

@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint"""
    return {"status": "ok"}

@app.post("/api/extract-text", response_model=ExtractTextResponse)
@limiter.limit("10/minute")
async def extract_text_from_image(request: Request, file: UploadFile = File(...)):
    """Extract text from uploaded screenshot using Groq Llama 4 Scout vision"""
    
    # Validate file type
    allowed_types = {"image/png", "image/jpeg", "image/jpg", "image/webp"}
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported image type: {file.content_type}"
        )
    
    try:
        # Read file content
        content = await file.read()
        
        if len(content) == 0:
            raise HTTPException(status_code=400, detail="Uploaded image is empty")
        
        if len(content) > 4 * 1024 * 1024:  # 4MB limit for base64
            raise HTTPException(status_code=413, detail="Image too large. Maximum 4MB.")
        
        # Base64 encode
        b64_image = base64.b64encode(content).decode('utf-8')
        mime_type = file.content_type or "image/png"
        
        # Call Groq vision model
        completion = groq_client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Extract all readable text from this chat screenshot. Return only the text content as it appears, in chronological order. Do not add any commentary."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{mime_type};base64,{b64_image}"
                            }
                        }
                    ]
                }
            ],
            temperature=0,
        )
        
        extracted_text = completion.choices[0].message.content
        return ExtractTextResponse(text=extracted_text)
        
    except RateLimitExceeded:
        raise HTTPException(status_code=429, detail="Too many requests, please wait a moment.")
    except Exception as e:
        print(f"Error in extract_text: {type(e).__name__}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to extract text: {str(e)}")

@app.post("/api/transcribe", response_model=TranscribeResponse)
@limiter.limit("10/minute")
async def transcribe_audio(request: Request, file: UploadFile = File(...)):
    """Transcribe audio using Groq Whisper Large v3"""
    
    # Validate file type
    allowed_types = {"audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/ogg", "audio/opus"}
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported audio type: {file.content_type}"
        )
    
    try:
        # Read file content
        data = await file.read()
        
        if len(data) == 0:
            raise HTTPException(status_code=400, detail="Uploaded audio is empty")
        
        if len(data) > 25 * 1024 * 1024:  # 25MB limit
            raise HTTPException(status_code=413, detail="Audio too large. Maximum 25MB.")
        
        # Create file-like object
        audio_buffer = io.BytesIO(data)
        audio_buffer.name = file.filename or "audio"
        
        # Call Groq Whisper
        transcription = groq_client.audio.transcriptions.create(
            model="whisper-large-v3",
            file=audio_buffer,
            response_format="json",
        )
        
        return TranscribeResponse(text=transcription.text)
        
    except RateLimitExceeded:
        raise HTTPException(status_code=429, detail="Too many requests, please wait a moment.")
    except Exception as e:
        print(f"Error in transcribe: {type(e).__name__}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to transcribe audio: {str(e)}")

@app.post("/api/generate", response_model=GenerateResponse)
@limiter.limit("10/minute")
async def generate_reply(request: Request, data: GenerateRequest) -> GenerateResponse:
    """
    Generate AI reply based on conversation and mode
    Rate limited to 10 requests per minute per IP
    """
    try:
        # Sanitize input
        sanitized_messages = sanitize_input(data.messages)
        
        # Build system prompt
        if data.mode == ReplyMode.custom:
            sanitized_tone = sanitize_input(data.custom_tone)
            system_prompt = f"You are a reply assistant. {sanitized_tone} Reply in 1-2 sentences only."
        else:
            system_prompt = MODE_PROMPTS[data.mode.value]
        
        # Add style modifier
        system_prompt += f" {STYLE_MODIFIERS[data.style.value]}"
        
        # Add context if provided
        if data.context and data.context.strip():
            system_prompt += f" Important context to remember: {sanitize_input(data.context)}"
        
        # Build messages for API
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add conversation history if provided
        if data.conversation_history:
            for i, msg in enumerate(data.conversation_history[-10:]):  # Last 10 messages
                role = "assistant" if i % 2 == 0 else "user"
                messages.append({"role": role, "content": msg})
        
        # Add current message
        messages.append({"role": "user", "content": f"Generate a reply to this conversation:\n\n{sanitized_messages}"})
        
        # Call Groq API
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.7,
            max_tokens=150,
        )
        
        reply_text = response.choices[0].message.content
        
        return GenerateResponse(
            reply=reply_text,
            mode=data.mode.value,
            style=data.style.value,
            timestamp=datetime.utcnow().isoformat()
        )
        
    except RateLimitExceeded:
        raise HTTPException(
            status_code=429, 
            detail="Too many requests, please wait a moment."
        )
    except Exception as e:
        print(f"Error in generate_reply: {type(e).__name__}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to generate reply. Please try again."
        )

# Custom rate limit error handler
@app.exception_handler(RateLimitExceeded)
async def custom_rate_limit_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests, please wait a moment."}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
