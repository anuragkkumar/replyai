# ReplyAI Architecture Documentation

## Project Overview

ReplyAI is a full-stack AI-powered reply generation platform that helps users create contextually appropriate replies for any chat conversation. The system uses Groq's LLama models for text generation, vision analysis, and audio transcription, with comprehensive security measures to prevent bot abuse.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  React Web   │  │   Chrome     │  │  Mobile Responsive   │  │
│  │  Application │  │  Extension   │  │  (375px+)            │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
└─────────┼──────────────────┼───────────────────────┼────────────┘
          │                  │                       │
          └──────────────────┴───────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Nginx Proxy   │
                    │  (Kubernetes)   │
                    └────────┬────────┘
                             │
          ┌──────────────────┴──────────────────┐
          │                                      │
┌─────────▼─────────┐                 ┌─────────▼─────────┐
│  FastAPI Backend  │                 │  React Frontend   │
│  (Python 3.11)    │◄────────────────┤  (Port 3000)      │
│  (Port 8001)      │                 └───────────────────┘
└─────────┬─────────┘
          │
          ├───────────► MongoDB (Conversation storage)
          │
          └───────────► Groq API
                       ├─ Llama-3.3-70b (Text generation)
                       ├─ Llama-4-Scout (Vision/OCR)
                       └─ Whisper-v3 (Audio transcription)
```

## Tech Stack

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + CSS Variables
- **UI Components**: Shadcn/UI (Radix UI primitives)
- **Icons**: Lucide React
- **HTTP Client**: Fetch API
- **Build Tool**: Yarn + Webpack
- **State Management**: React Hooks (useState, useEffect, useRef)

### Backend
- **Framework**: FastAPI (Python)
- **API Integration**: Groq Python SDK
- **Database**: MongoDB (Motor async driver)
- **Rate Limiting**: SlowAPI
- **Environment**: Python 3.11+
- **ASGI Server**: Uvicorn
- **CORS**: FastAPI CORS middleware

### Chrome Extension
- **Manifest Version**: V3
- **Content Scripts**: Inject into WhatsApp Web, Instagram, Discord, Telegram
- **Background Service Worker**: Handles API communication
- **Popup Interface**: HTML/CSS/JS

### Security & Anti-Bot
- **reCAPTCHA v3**: Invisible CAPTCHA with score-based validation
- **Browser Fingerprinting**: Canvas + WebGL + Audio context
- **Honeypot Fields**: Hidden form inputs
- **Rate Limiting**: 10 requests/minute per IP, 50/day per fingerprint
- **Request Validation**: Input sanitization + length checks
- **Request Cooldown**: 6-second minimum between requests

## API Endpoints

### Core Endpoints

#### `POST /api/generate`
Generates AI replies based on conversation context.

**Request Body:**
```json
{
  "messages": "string (max 2000 chars)",
  "mode": "flirty|funny|professional|roast|savage|custom",
  "style": "ai|human",
  "custom_tone": "string (optional)",
  "conversation_history": ["string array (optional)"],
  "context": "string (optional)",
  "recaptcha_token": "string",
  "fingerprint": "string",
  "honeypot": ""
}
```

**Response:**
```json
{
  "replies": ["string", "string", "string"],
  "mode": "string",
  "style": "string",
  "timestamp": "ISO 8601 datetime"
}
```

**Security Layers:**
1. Honeypot validation
2. Input sanitization & length check
3. IP rate limiting (10/min, 100/day)
4. Fingerprint rate limiting (50/day)
5. reCAPTCHA v3 validation (score > 0.5)

#### `POST /api/extract-text`
Extracts text from uploaded chat screenshots using vision AI.

**Request:** `multipart/form-data` with file
**Response:**
```json
{
  "text": "string",
  "timestamp": "ISO 8601 datetime"
}
```

#### `POST /api/transcribe`
Transcribes audio files to text using Whisper.

**Request:** `multipart/form-data` with file
**Response:**
```json
{
  "text": "string",
  "timestamp": "ISO 8601 datetime"
}
```

#### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "ISO 8601 datetime"
}
```

## Component Architecture

### Frontend Components

```
App.js
├── GeneratorNavbar (Global navigation with hamburger menu)
├── Routes
│   ├── LandingPage
│   │   ├── Hero
│   │   ├── Features
│   │   ├── Testimonials
│   │   └── ContactSection
│   ├── GeneratorPage
│   │   ├── ConversationInput
│   │   ├── ConversationMemory
│   │   ├── StyleToggle
│   │   ├── ModeSelector
│   │   ├── CustomToneInput
│   │   ├── GenerateButton
│   │   └── ReplyOutput
│   ├── BlogPage
│   ├── CareerPage
│   ├── HowItWorks
│   └── GetExtension
└── Footer
```

### Backend Structure

```
server.py (main.py symlink)
├── Pydantic Models
│   ├── GenerateRequest
│   ├── GenerateResponse
│   ├── ExtractTextResponse
│   └── TranscribeResponse
├── Anti-Bot Functions
│   ├── check_ip_rate_limit()
│   ├── check_fingerprint_limit()
│   ├── verify_recaptcha()
│   ├── validate_message()
│   └── sanitize_input()
├── API Routes
│   ├── /api/generate
│   ├── /api/extract-text
│   ├── /api/transcribe
│   └── /health
└── Constants
    ├── MODE_PROMPTS
    └── STYLE_MODIFIERS
```

## Data Flow

### Reply Generation Flow
1. User enters conversation text in frontend
2. Frontend generates browser fingerprint
3. reCAPTCHA v3 executes invisibly
4. Frontend sends POST to `/api/generate` with:
   - Conversation text
   - Mode selection
   - Style toggle (AI/Human)
   - reCAPTCHA token
   - Browser fingerprint
   - Empty honeypot field
5. Backend validates:
   - Honeypot is empty
   - Input length < 2000 chars
   - IP hasn't exceeded 10 req/min
   - Fingerprint hasn't exceeded 50 req/day
   - reCAPTCHA score > 0.5
6. Backend calls Groq API with context-aware prompt
7. Groq returns 3 reply variations
8. Backend returns replies to frontend
9. Frontend displays replies with copy/regenerate options

### Screenshot Upload Flow
1. User uploads image via paperclip icon
2. Frontend sends multipart POST to `/api/extract-text`
3. Backend validates file (image type, size)
4. Backend sends image to Groq Vision API (Llama-4-Scout)
5. Groq extracts text from screenshot
6. Backend returns extracted text
7. Frontend auto-fills conversation input

### Audio Transcription Flow
1. User uploads audio file
2. Frontend sends multipart POST to `/api/transcribe`
3. Backend validates file (audio type, size)
4. Backend sends audio to Groq Whisper API
5. Groq transcribes audio to text
6. Backend returns transcription
7. Frontend auto-fills conversation input

## Security Measures

### 5-Layer Anti-Bot Protection

1. **Rate Limiting**
   - 10 requests/minute per IP
   - 100 requests/day per IP
   - 50 requests/day per browser fingerprint
   - In-memory dictionaries with daily reset

2. **reCAPTCHA v3**
   - Invisible CAPTCHA (no user interaction)
   - Score-based validation (threshold: 0.5)
   - Server-side verification with Google API

3. **Browser Fingerprinting**
   - Canvas fingerprinting
   - WebGL fingerprinting
   - Audio context fingerprinting
   - User agent + screen resolution
   - Unique hash generated client-side

4. **Honeypot Field**
   - Hidden input field in forms
   - Bots auto-fill, humans leave empty
   - Request rejected if honeypot has value

5. **Request Validation**
   - Input sanitization (escape HTML/SQL)
   - Length validation (max 2000 chars)
   - Type validation (Pydantic models)
   - CSRF protection via CORS

### Environment Variables Security
- API keys stored in `/backend/.env`
- Never exposed to frontend
- `.env.example` template provided
- `.gitignore` excludes `.env` files

## How to Run Locally

### Prerequisites
- Python 3.11+
- Node.js 18+
- Yarn
- MongoDB
- Groq API key
- Google reCAPTCHA keys

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your API keys
python main.py
# Server runs on http://0.0.0.0:8001
```

### Frontend Setup
```bash
cd frontend
yarn install
yarn start
# App runs on http://localhost:3000
```

### Environment Variables

**Backend (.env):**
```
GROQ_API_KEY=your_groq_api_key
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
MONGO_URL=mongodb://localhost:27017/replyai
```

**Frontend (.env):**
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Chrome Extension Setup
1. Open Chrome -> Extensions -> Developer Mode
2. Click "Load unpacked"
3. Select `/extension` folder
4. Extension appears in toolbar
5. Works on WhatsApp Web, Instagram, Discord, Telegram

## Deployment Architecture (Production)

### Kubernetes Setup
- **Namespace**: replyai-secure
- **Ingress**: Nginx proxy routes:
  - `/api/*` → Backend service (port 8001)
  - `/*` → Frontend service (port 3000)
- **Services**:
  - Backend: ClusterIP on port 8001
  - Frontend: ClusterIP on port 3000
  - MongoDB: StatefulSet with persistent volume

### Environment
- **Backend**: Python FastAPI on Uvicorn
- **Frontend**: React app served via static file server
- **Database**: MongoDB replica set
- **SSL**: Automatic via cert-manager
- **Logs**: stdout/stderr captured by Kubernetes

## Performance Considerations

- Frontend: Code-split routes for faster initial load
- Backend: Async/await for non-blocking I/O
- Database: Indexed queries on timestamp + user_id
- Caching: In-memory rate limit dictionaries
- CDN: Static assets served from edge locations

## Future Improvements

See PROJECT_SUMMARY.md for roadmap.
