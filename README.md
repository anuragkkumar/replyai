# ReplyAI 🤖✨

> **AI-powered reply generation for any chat platform. 6 modes. Screenshot OCR. Voice transcription. Enterprise security. No login required.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![License](https://img.shields.io/badge/License-All_Rights_Reserved-red?style=for-the-badge)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**ReplyAI** is a full-stack AI-powered reply generation platform that helps you craft perfect replies in seconds. Whether you're chatting with friends, responding to professional emails, or messaging on dating apps—ReplyAI has you covered with **6 distinct reply modes** and **enterprise-grade security**.

### Why ReplyAI?

- 🚀 **Instant Replies** - Generate contextually perfect responses in seconds
- 🎭 **6 Reply Modes** - Flirty, Funny, Professional, Roast, Savage, Custom
- 🔒 **Enterprise Security** - 5-layer bot protection without user login
- 📱 **Mobile First** - Fully responsive design (375px+)
- 🎨 **Modern UI** - Dark theme with beautiful animations
- 🆓 **No Sign Up** - Start using immediately, no account required

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI/Human Style Toggle** | Switch between perfect grammar (AI) or casual text-speak (Human: "u r gonna lol") |
| 📸 **Screenshot Upload** | Upload chat screenshots, AI extracts text automatically via OCR |
| 🎙️ **Voice Transcription** | Upload audio messages, get instant transcription via Whisper v3 |
| 🧠 **Conversation Memory** | AI remembers context across the entire conversation thread |
| 🎯 **6 Reply Modes** | Flirty, Funny, Professional, Roast, Savage, Custom tone |
| 🔄 **Reply Variations** | Get 3 different reply options per generation |
| 📋 **One-Click Copy** | Copy replies to clipboard instantly |
| 🔁 **Regenerate** | Don't like the reply? Regenerate with one click |

### Advanced Features

- **Chrome Extension (MV3)** - Use directly in WhatsApp, Instagram, Discord, Telegram
- **Conversation Context** - Add important context to guide AI responses
- **Custom Tone** - Define your own reply style (e.g., "pirate who loves coffee")
- **Rate Limiting Display** - Transparent requests counter (10/minute)
- **Mobile Hamburger Menu** - Collapsible navigation on mobile devices
- **Guest Profile** - No login required, instant access

### Security Features (No Login Required)

1. ✅ **IP Rate Limiting** - 10 requests/minute, 100/day per IP
2. ✅ **reCAPTCHA v3** - Invisible CAPTCHA with score validation
3. ✅ **Browser Fingerprinting** - Unique device identification
4. ✅ **Honeypot Fields** - Hidden bot traps
5. ✅ **Request Validation** - Input sanitization + 6-second cooldown

---

## 🎬 Demo

### Web Application
Run locally at `http://localhost:3000` after following the [Quick Start](#-quick-start).

### Reply Modes Examples

| Mode | Example Output |
|------|----------------|
| 🔥 **Flirty** | "hey gorgeous, i'd love to grab coffee sometime 😊" |
| 😂 **Funny** | "lmao bro that's hilarious! we gotta do that again 🤣" |
| 💼 **Professional** | "Thank you for reaching out. I'd be happy to discuss this further." |
| 🔥 **Roast** | "Oh wow, look who finally decided to text back after 3 business days!" |
| 💪 **Savage** | "I said what I said. Deal with it or don't, your choice." |
| ✏️ **Custom** | Define your own vibe! |

### Human vs AI Style Comparison

```
AI Style (Perfect Grammar):
"I would love to meet you for coffee tomorrow afternoon."

Human Style (Casual Text-Speak):
"yaar i wanna grab coffee tmrw... u free? lol"
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Component-based UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling framework
- **Shadcn/UI** - Accessible component library (Radix UI primitives)
- **Lucide React** - Beautiful icon system
- **Sonner** - Toast notification system
- **Webpack** - Module bundler
- **Yarn** - Fast, reliable package manager

### Backend
- **Python 3.11** - Modern Python runtime
- **FastAPI** - High-performance async web framework
- **Groq SDK** - AI API integration
  - **Llama-3.3-70b-versatile** - Text generation
  - **Llama-4-Scout** - Vision & OCR
  - **Whisper-large-v3** - Audio transcription
- **MongoDB** - Document database (Motor async driver)
- **SlowAPI** - Rate limiting middleware
- **Uvicorn** - Lightning-fast ASGI server
- **Pydantic** - Data validation with Python type hints

### Chrome Extension
- **Manifest V3** - Latest Chrome extension standard
- **Content Scripts** - Inject into WhatsApp, Instagram, Discord, Telegram
- **Background Service Worker** - Handle API communication
- **Popup Interface** - Extension UI with HTML/CSS/JS

### DevOps & Infrastructure
- **Kubernetes** - Container orchestration platform
- **Nginx** - High-performance reverse proxy
- **Docker** - Application containerization
- **Supervisor** - Process management
- **MongoDB** - Persistent data storage

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  React Web   │  │   Chrome     │  │   Mobile     │  │
│  │  Application │  │  Extension   │  │  (375px+)    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
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
│  (Port 8001)      │    API Calls    └───────────────────┘
└─────────┬─────────┘
          │
          ├───────────► MongoDB (Conversation storage)
          │
          └───────────► Groq API
                       ├─ Llama-3.3-70b (Text generation)
                       ├─ Llama-4-Scout (Vision/OCR)
                       └─ Whisper-v3 (Audio transcription)
```

### Data Flow

1. **User Input** → Frontend validation
2. **Security Check** → reCAPTCHA + Fingerprinting
3. **Backend Processing** → Rate limit + Input sanitization
4. **AI Generation** → Groq API call
5. **Response** → 3 reply variations
6. **User Action** → Copy, Regenerate, or Edit

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.11+ ([Download](https://python.org/))
- **Yarn** package manager (`npm install -g yarn`)
- **MongoDB** ([Install](https://www.mongodb.com/try/download/community))
- **Groq API Key** ([Get here](https://groq.com))
- **Google reCAPTCHA Keys** ([Get here](https://www.google.com/recaptcha/admin))

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/replyai.git
cd replyai
```

### 2️⃣ Backend Setup

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env with your API keys
nano .env
```

**Required `.env` variables:**

```env
GROQ_API_KEY=your_groq_api_key_here
RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
MONGO_URL=mongodb://localhost:27017/replyai
```

**Start backend server:**

```bash
python main.py
# Server runs on http://0.0.0.0:8001
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
yarn install

# Create environment file
cp .env.example .env

# Edit .env
nano .env
```

**Required `.env` variables:**

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Start frontend dev server:**

```bash
yarn start
# App runs on http://localhost:3000
```

### 4️⃣ Chrome Extension Setup (Optional)

1. Open **Chrome** → **Extensions** → Enable **Developer Mode**
2. Click **"Load unpacked"**
3. Select the `/extension` folder
4. Extension appears in Chrome toolbar
5. Click extension icon on WhatsApp Web, Instagram, Discord, or Telegram

---

## 🚀 Usage

### Web Application

1. Open `http://localhost:3000` in your browser
2. Click **"Try ReplyAI Free"** on the landing page
3. **Enter conversation** or upload screenshot/audio
4. **Select reply mode**: Flirty, Funny, Professional, Roast, Savage, or Custom
5. **Toggle style**: AI (perfect grammar) or Human (casual text-speak)
6. Click **"Generate Reply"**
7. Get **3 reply variations**—copy, regenerate, or customize!

### Chrome Extension

1. Navigate to WhatsApp Web, Instagram, Discord, or Telegram
2. Click the **ReplyAI extension icon**
3. Extension reads the current conversation
4. Generate replies without leaving the chat platform
5. One-click paste into chat input

---

## 📖 API Documentation

### Base URL

```
Development: http://localhost:8001/api
Production:  https://<your-domain>/api
```

### Endpoints

#### `POST /api/generate`

Generate AI-powered replies.

**Request:**

```json
{
  "messages": "Hey, want to grab coffee tomorrow?",
  "mode": "flirty",
  "style": "human",
  "custom_tone": null,
  "conversation_history": [],
  "context": null,
  "recaptcha_token": "...",
  "fingerprint": "...",
  "honeypot": ""
}
```

**Response:**

```json
{
  "replies": [
    "omg yes i'd love to!! when r u free? ☕😊",
    "yaar coffee sounds amazing... tmrw work for u?",
    "ngl i've been craving coffee all day lol... let's do it!"
  ],
  "mode": "flirty",
  "style": "human",
  "timestamp": "2026-05-27T10:30:00Z"
}
```

#### `POST /api/extract-text`

Extract text from chat screenshots (OCR).

**Request:** `multipart/form-data` with image file

**Response:**

```json
{
  "text": "Extracted conversation text from screenshot",
  "timestamp": "2026-05-27T10:30:00Z"
}
```

#### `POST /api/transcribe`

Transcribe audio files to text.

**Request:** `multipart/form-data` with audio file

**Response:**

```json
{
  "text": "Transcribed audio content",
  "timestamp": "2026-05-27T10:30:00Z"
}
```

#### `GET /health`

Health check endpoint.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2026-05-27T10:30:00Z"
}
```

---

## 🔒 Security

ReplyAI implements **5-layer anti-bot protection** without requiring user login:

### Security Layers

1. **IP Rate Limiting**
   - 10 requests per minute per IP
   - 100 requests per day per IP
   - In-memory dictionary with daily reset

2. **reCAPTCHA v3**
   - Invisible CAPTCHA (no user interaction)
   - Score-based validation (threshold: 0.5)
   - Server-side verification with Google API

3. **Browser Fingerprinting**
   - Canvas + WebGL + Audio context fingerprinting
   - User agent + screen resolution
   - Unique hash generated client-side

4. **Honeypot Fields**
   - Hidden input fields in forms
   - Bots auto-fill, humans leave empty
   - Request rejected if honeypot has value

5. **Request Validation**
   - Input sanitization (XSS prevention)
   - Length validation (max 2000 characters)
   - Type validation (Pydantic models)
   - 6-second cooldown between requests

### Privacy Policy

- ✅ **Zero Data Storage** - Conversations never stored or logged
- ✅ **No User Tracking** - No cookies, no analytics
- ✅ **API Keys Secure** - All secrets in environment variables
- ✅ **HTTPS Only** - Encrypted communication
- ✅ **Open Source** - Transparent codebase

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Run linting before commit

---

## 📄 License

**All Rights Reserved © 2026 ReplyAI**

This project is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit permission from the copyright holder.

---

## 👨‍💻 Developer

**Anurag Kumar**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anuragkumarse)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contact@anuragkumar.dev)

---

## 🌟 Acknowledgments

- **[Groq](https://groq.com)** - For blazing-fast Llama models
- **[Shadcn/UI](https://ui.shadcn.com/)** - For beautiful accessible components
- **[Tailwind CSS](https://tailwindcss.com/)** - For utility-first styling
- **[FastAPI](https://fastapi.tiangolo.com/)** - For modern Python web framework
- **[React](https://react.dev/)** - For component-based UI

---

## 📞 Support

- 📖 **Documentation**: See `ARCHITECTURE.md` and `PROJECT_SUMMARY.md`
- 🐛 **Issues**: [Open a GitHub issue](https://github.com/anuragkkumar/replyai/issues)
- 📧 **Email**: support@replyai.com

---

## 🗺️ Roadmap

### Phase 1: Core Enhancements (Q2 2026)
- [ ] User authentication (optional)
- [ ] Reply history
- [ ] More languages (Spanish, French, Hindi, Arabic)
- [ ] Keyboard shortcuts

### Phase 2: Platform Expansion (Q3 2026)
- [ ] Firefox & Safari extensions
- [ ] Mobile apps (iOS, Android)
- [ ] Email reply generation
- [ ] LinkedIn assistant

### Phase 3: Enterprise Features (Q4 2026)
- [ ] Team plans
- [ ] API access
- [ ] White-label solutions
- [ ] On-premise deployment

See `PROJECT_SUMMARY.md` for complete roadmap.

---

## 📊 Project Stats

![Lines of Code](https://img.shields.io/badge/Lines_of_Code-10K+-blue?style=flat-square)
![Files](https://img.shields.io/badge/Files-50+-green?style=flat-square)
![Contributors](https://img.shields.io/badge/Contributors-1-orange?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-red?style=flat-square)

---

<div align="center">

**Made with ❤️ by [Anurag Kumar](https://www.linkedin.com/in/anuragkumarse)**

⭐ **Star this repo if you find it useful!** ⭐

</div>
