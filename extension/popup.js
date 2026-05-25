// Popup script
// Get backend URL - use production URL by default, localhost for development
const BACKEND_URL = 'https://replyai-secure.preview.emergentagent.com';
// For local development, uncomment:
// const BACKEND_URL = 'http://localhost:8001';

let selectedMode = 'flirty';
let contextMessages = null;
let generatedReply = null;

// DOM elements
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const modeButtons = document.querySelectorAll('.mode-btn');
const customInput = document.getElementById('customInput');
const generateBtn = document.getElementById('generateBtn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const errorDiv = document.getElementById('error');

// Initialize
async function init() {
  try {
    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Execute script to get context
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window._replyai_context
    });
    
    const context = results[0]?.result;
    
    if (context && context.length > 0) {
      contextMessages = context;
      statusDot.classList.remove('inactive');
      statusDot.classList.add('active');
      statusText.textContent = 'Context detected';
      generateBtn.disabled = false;
      output.textContent = 'Ready to generate a reply';
      output.classList.remove('empty');
    } else {
      statusDot.classList.remove('active');
      statusDot.classList.add('inactive');
      statusText.textContent = 'No context detected';
      generateBtn.disabled = true;
      output.textContent = 'Open a supported chat app (WhatsApp, Instagram, Discord, Telegram)';
      output.classList.add('empty');
    }
  } catch (error) {
    console.error('Error initializing popup:', error);
    showError('Failed to detect chat context');
  }
}

// Mode selection
modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove selected from all
    modeButtons.forEach(b => b.classList.remove('selected'));
    // Add selected to clicked
    btn.classList.add('selected');
    selectedMode = btn.dataset.mode;
    
    // Show/hide custom input
    if (selectedMode === 'custom') {
      customInput.classList.remove('hidden');
    } else {
      customInput.classList.add('hidden');
    }
  });
});

// Generate reply
generateBtn.addEventListener('click', async () => {
  if (!contextMessages) {
    showError('No context available');
    return;
  }
  
  if (selectedMode === 'custom' && !customInput.value.trim()) {
    showError('Please describe your tone');
    return;
  }
  
  try {
    // Show loading
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    output.classList.remove('empty');
    output.innerHTML = '<div class="loading">AI is thinking...</div>';
    errorDiv.classList.add('hidden');
    
    // Call API
    const response = await fetch(`${BACKEND_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: contextMessages,
        mode: selectedMode,
        custom_tone: selectedMode === 'custom' ? customInput.value : null,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 429) {
        showError('Too many requests, please wait a moment.');
      } else {
        showError(data.detail || 'Failed to generate reply');
      }
      output.textContent = 'Error generating reply';
      output.classList.add('empty');
      return;
    }
    
    // Show reply
    generatedReply = data.reply;
    output.textContent = generatedReply;
    copyBtn.classList.remove('hidden');
    
  } catch (error) {
    console.error('Error generating reply:', error);
    showError('Failed to connect to server');
    output.textContent = 'Connection error';
    output.classList.add('empty');
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate Reply';
  }
});

// Copy to clipboard
copyBtn.addEventListener('click', async () => {
  if (!generatedReply) return;
  
  try {
    await navigator.clipboard.writeText(generatedReply);
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 1200);
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
  }, 3000);
}

// Initialize on load
init();
