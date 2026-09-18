// Constants for HomePage
export const CHAR_LIMIT = 2000;
export const NEAR_LIMIT_THRESHOLD = 1800;
export const HTTP_TOO_MANY_REQUESTS = 429;
export const COPIED_FEEDBACK_DURATION_MS = 1200;
export const MIN_REQUEST_COUNT = 0;
export const MAX_REQUEST_COUNT = 10;
export const REQUEST_COOLDOWN_MS = 2000; // 2 seconds between requests

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || (process.env.NODE_ENV === 'production' ? 'https://replyai-t7vr.onrender.com' : 'http://localhost:8001');
export const RECAPTCHA_SITE_KEY = '6Lc77vssAAAAAGnBhzHacvKQC3by1hAVX-r0SOiN';
