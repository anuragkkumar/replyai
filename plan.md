# ReplyAI — plan.md

## 1) Objectives
- Prove the **core workflow** works end-to-end: sanitized input → rate-limited FastAPI → Groq (llama-3.3-70b-versatile) → safe response.
- Ship V1 web app (React) with 3 pages and a polished dark UI (purple accents).
- Ship Chrome Extension (MV3) that extracts last 6 messages on supported sites and generates replies via backend.
- Enforce security rules everywhere: server-side AI only, no message logging, env-only secrets, security headers, CORS, sanitization, friendly rate-limit errors.

## 2) Implementation Steps

### Phase 1 — Core POC (Isolation) ✅ COMPLETE
**Goal:** validate Groq integration + validation + sanitization + slowapi rate limit + friendly error.

**Status:** All tests passed. Core functionality validated.

**User stories (POC)**
1. As a developer, I can send a message+mode to an endpoint and get a valid reply JSON back.
2. As a developer, I get a clear validation error when message >2000 chars or mode is invalid.
3. As a developer, I see rate limiting block the 11th request/min with the exact friendly message.
4. As a developer, I can confirm no user message text is printed or logged server-side.
5. As a developer, I can confirm GROQ_API_KEY is only read from `.env`.

**Steps**
1. **Web search (best practices):** Groq Python SDK usage + FastAPI + slowapi patterns, and safe prompt construction.
2. Create minimal FastAPI app with:
   - `POST /api/generate` (Pydantic validation: mode enum, max len 2000)
   - `/health`
   - slowapi limiter 10/min by IP
   - basic sanitization (trim, normalize whitespace, strip control chars)
   - Groq call using llama-3.3-70b-versatile with mode system prompts
   - security headers (helmet equivalent) + permissive CORS for hackathon
   - error-only logging (no request bodies)
3. Write `scripts/poc_test.py` to:
   - call `/health`
   - call `/api/generate` for each mode
   - trigger validation failure
   - trigger rate limit failure and assert message: **"Too many requests, please wait a moment."**
4. Fix until stable: handle Groq errors/timeouts, ensure consistent JSON response shape.

**Exit criteria (POC)**
- All tests in `poc_test.py` succeed locally with real Groq key.
- Rate limit + friendly message works.
- No message content appears in logs.

---

### Phase 2 — V1 App Development (Backend + Frontend + one-pass E2E test) ✅ COMPLETE
**Goal:** build full V1 web app using proven backend core.

**Status:** Web app fully functional. Testing agent confirmed 95%+ success rate. All user stories completed.

**User stories (Web V1)**
1. As a user, I can paste a chat (up to 2000 chars) and see a live character counter.
2. As a user, I can pick a mode (flirty/funny/professional/roast/savage/custom) and generate a reply.
3. As a user, in Custom mode I can enter my own tone instruction.
4. As a user, I can copy the reply with one click and regenerate quickly.
5. As a user, I can read How it Works and understand privacy (no storage/logging).

**Backend (FastAPI)**
1. Expand POC into production-ish structure:
   - `app/main.py` (routes + middleware)
   - `app/services/groq_client.py` (Groq call)
   - `app/security/sanitize.py`
   - `app/prompts/modes.py` (6 system prompts)
2. Implement:
   - strict input validation (mode enum, max 2000)
   - sanitize before passing to model
   - standardized errors (429 friendly message; 400/422 validation)
   - `requirements.txt` per spec

**Frontend (React)**
1. Build layout: Navbar + 3 routes (Generator, How it Works, Get Extension) + footer note.
2. Generator page:
   - textarea + counter
   - 6 mode buttons + custom tone input (only enabled when custom)
   - Generate + spinner
   - Reply box with Copy + Regenerate
   - Friendly errors (including 429 message)
3. Styling: minimal dark, flat components, purple accents (#534AB7).
4. Wire API base URL via env (dev localhost, prod emergent).

**Testing (end of Phase 2)**
- Run 1 round E2E: generate replies across modes, copy, regenerate, nav pages, error states.

---

### Phase 3 — Chrome Extension V1 + Packaging (and one-pass E2E test) ✅ COMPLETE
**Goal:** extension reads context and generates reply via backend; zip for installation.

**Status:** Extension complete with MV3 manifest, content scripts for 4 platforms, popup UI, and packaged as ReplyAI.zip.

**User stories (Extension V1)**
1. As a user, I can press Ctrl+Shift+A to open the extension and generate a reply fast.
2. As a user, the extension auto-reads the last 6 messages on supported sites.
3. As a user, I can select a mode and copy the generated reply to clipboard.
4. As a user, I can use the extension against localhost in dev and the live API in prod.
5. As a user, I see a clear message when rate limited and can retry later.

**Steps**
1. Create MV3 extension structure:
   - `manifest.json` (permissions: activeTab, scripting, clipboardWrite; commands for shortcut)
   - content scripts per host (WhatsApp Web, Instagram, Discord, Telegram) to extract last 6 messages and set `window._replyai_context`
   - popup UI (380px) with mode buttons + generate + copy
2. API URL switching:
   - dev: `http://localhost:8000`
   - prod: Emergent URL (build-time constant or simple heuristic)
3. Validate extension never contains Groq key; only calls backend.
4. Package extension as zip with install instructions (Chrome + Edge).

**Testing (end of Phase 3)**
- Manual E2E on at least 2 targets (e.g., WhatsApp Web + Discord): context extracted → generate → copy.

---

### Phase 4 — Hardening Pass (security + UX polish) + final regression
**User stories (Hardening)**
1. As a user, I always get a helpful error message when something fails (network, 429, 5xx).
2. As a user, I feel confident my text isn’t stored (visible policy + backend behavior).
3. As a developer, I can deploy with only `.env` and no code changes.
4. As a judge, I can quickly verify `/health` and see uptime readiness.
5. As a user, UI remains responsive and accessible (keyboard focus, button states).

**Steps**
1. Confirm headers middleware (CSP-ish, X-Content-Type-Options, etc.) and CORS settings.
2. Add timeouts/retries (conservative) on Groq call; consistent error mapping.
3. Add minimal internal metrics-free logging (errors only) and remove any stray prints.
4. Run full regression: web + extension + rate limit behavior.

## 3) Next Actions
1. Obtain and place `GROQ_API_KEY` in backend `.env`.
2. Start Phase 1: implement POC backend + `poc_test.py` and iterate until green.
3. Once POC passes, proceed to Phase 2 (full web app) and run E2E test.
4. Build extension in Phase 3 and deliver a zipped package + install steps.

## 4) Success Criteria
- `/api/generate` returns high-quality replies for all 6 modes using llama-3.3-70b-versatile.
- Rate limiting: 10 req/min/IP enforced; 429 shows **"Too many requests, please wait a moment."**
- No API keys in frontend/extension; no user message logs.
- React app matches minimal dark theme with purple accents and all pages function.
- Extension works on supported sites (at least verified on 2), extracts last 6 messages, generates + copies.
- Deployment-ready with `.env` only and `/health` OK.
