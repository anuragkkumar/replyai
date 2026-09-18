// Popup script for ReplyAI Chrome Extension
const BACKEND_URL = 'http://localhost:8001';

let selectedMode = 'flirty';
let generatedReply = null;

// DOM elements
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const contextInput = document.getElementById('contextInput');
const modeButtons = document.querySelectorAll('.mode-btn');
const customInput = document.getElementById('customInput');
const generateBtn = document.getElementById('generateBtn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const errorDiv = document.getElementById('error');

// Update generate button state based on text presence
function updateGenerateButtonState() {
  const hasText = contextInput.value.trim().length > 0;
  generateBtn.disabled = !hasText;
}

contextInput.addEventListener('input', updateGenerateButtonState);

// Initialize
async function init() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab && tab.id) {
      try {
        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => window._replyai_context
        });
        
        const detected = results[0]?.result;
        
        if (detected && typeof detected === 'string' && detected.trim().length > 0) {
          contextInput.value = detected.trim();
          statusDot.classList.remove('inactive');
          statusDot.classList.add('active');
          statusText.textContent = 'Auto-detected';
          updateGenerateButtonState();
          return;
        }
      } catch (err) {
        // Scripting not allowed on chrome:// or restricted pages, fallback silently
      }
    }

    // Default status: manual direct input
    statusDot.classList.remove('active');
    statusDot.classList.add('inactive');
    statusText.textContent = 'Direct Input';
    updateGenerateButtonState();
  } catch (error) {
    console.error('Error initializing popup:', error);
    statusText.textContent = 'Direct Input';
    updateGenerateButtonState();
  }
}

// Mode selection
modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    modeButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMode = btn.dataset.mode;
    
    if (selectedMode === 'custom') {
      customInput.classList.remove('hidden');
      customInput.focus();
    } else {
      customInput.classList.add('hidden');
    }
  });
});

// Generate reply
generateBtn.addEventListener('click', async () => {
  const messageText = contextInput.value.trim();
  
  if (!messageText) {
    showError('Please paste or type a conversation');
    return;
  }
  
  if (selectedMode === 'custom' && !customInput.value.trim()) {
    showError('Please describe your custom tone');
    return;
  }
  
  try {
    generateBtn.disabled = true;
    generateBtn.textContent = '[ SYNTHESIZING... ]';
    output.classList.remove('empty');
    output.innerHTML = '<div class="loading">&gt; Synthesizing response...</div>';
    errorDiv.classList.add('hidden');
    copyBtn.classList.add('hidden');
    
    const response = await fetch(`${BACKEND_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messageText,
        mode: selectedMode,
        custom_tone: selectedMode === 'custom' ? customInput.value.trim() : null,
        recaptcha_token: 'extension',
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 429) {
        showError('Rate limit reached, please wait a moment.');
      } else {
        showError(data.detail || 'Failed to generate reply');
      }
      output.textContent = 'Error generating reply';
      output.classList.add('empty');
      return;
    }
    
    // Support both single reply and replies list
    generatedReply = data.reply || (data.replies && data.replies[0]) || '';
    
    if (generatedReply) {
      output.textContent = generatedReply;
      copyBtn.classList.remove('hidden');
    } else {
      output.textContent = 'No reply returned';
      output.classList.add('empty');
    }
    
  } catch (error) {
    console.error('Error generating reply:', error);
    showError('Cannot connect to backend server (port 8001)');
    output.textContent = 'Server connection failed';
    output.classList.add('empty');
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = '[ GENERATE REPLY ]';
  }
});

// Copy to clipboard
copyBtn.addEventListener('click', async () => {
  if (!generatedReply) return;
  
  try {
    await navigator.clipboard.writeText(generatedReply);
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '[ COPIED! ]';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 1500);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    showError('Failed to copy');
  }
});

// Show error
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
  setTimeout(() => {
    errorDiv.classList.add('hidden');
  }, 4000);
}

// Initialize on load
init();
