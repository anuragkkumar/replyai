from fastapi import FastAPI, HTTPException, Request
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
from typing import Callable

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

# System prompts for each mode
MODE_PROMPTS = {
    "flirty": "You are a charming reply assistant. Reply in 1-2 witty flirty sentences only.",
    "funny": "You are a comedy reply assistant. Reply in 1-2 hilarious sentences only.",
    "professional": "You are a professional reply assistant. Reply in 1-2 formal sentences only.",
    "roast": "You are a roast comedian. Reply with a funny roast in 1-2 sentences only.",
    "savage": "You are a bold reply assistant. Reply with a fearless savage response in 1-2 sentences only.",
}

# Input sanitization
def sanitize_input(text: str) -> str:
    """Remove control characters and normalize whitespace"""
    text = re.sub(r'[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f-\x9f]', '', text)
    text = ' '.join(text.split())
    return text.strip()

# Request model
class GenerateRequest(BaseModel):
    messages: str = Field(..., min_length=1, max_length=2000)
    mode: ReplyMode
    custom_tone: str | None = Field(None, max_length=200)
    
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
    timestamp: str

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}

@app.post("/api/generate", response_model=GenerateResponse)
@limiter.limit("10/minute")
async def generate_reply(request: Request, data: GenerateRequest):
    """
    Generate AI reply based on conversation and mode
    Rate limited to 10 requests per minute per IP
    """
    try:
        # Sanitize input
        sanitized_messages = sanitize_input(data.messages)
        
        # Get system prompt based on mode
        if data.mode == ReplyMode.custom:
            sanitized_tone = sanitize_input(data.custom_tone)
            system_prompt = f"You are a reply assistant. {sanitized_tone} Reply in 1-2 sentences only."
        else:
            system_prompt = MODE_PROMPTS[data.mode.value]
        
        # Call Groq API
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Generate a reply to this conversation:\n\n{sanitized_messages}"}
            ],
            temperature=0.7,
            max_tokens=100,
        )
        
        reply_text = response.choices[0].message.content
        
        return GenerateResponse(
            reply=reply_text,
            mode=data.mode.value,
            timestamp=datetime.utcnow().isoformat()
        )
        
    except RateLimitExceeded:
        raise HTTPException(
            status_code=429, 
            detail="Too many requests, please wait a moment."
        )
    except Exception as e:
        # Log error (not user message)
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
