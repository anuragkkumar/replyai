// Helper functions for HomePage

export const getCharCounterColor = (charCount, isNearLimit, isAtLimit) => {
  if (isAtLimit) return 'text-[var(--danger)]';
  if (isNearLimit) return 'text-[var(--warning)]';
  return 'text-[var(--text-3)]';
};

export const handleApiError = (response, data, setError, toast) => {
  if (response.status === 429) {
    if (data.detail && data.detail.includes('Come back tomorrow')) {
      setError("You've used a lot of requests today. Come back tomorrow!");
      toast.error("You've used a lot of requests today. Come back tomorrow!");
    } else {
      setError('Too many requests, please wait a moment.');
      toast.error('Rate limit reached. Please wait a moment.');
    }
  } else {
    setError(data.detail || 'Failed to generate reply');
  }
};

export const validateInput = (conversation, selectedMode, customTone, setError) => {
  const cleaned = conversation.trim();
  
  if (!cleaned) {
    setError('Please paste a conversation first');
    return false;
  }
  
  // Minimum 10 characters
  if (cleaned.length < 10) {
    setError('Message must be at least 10 characters');
    return false;
  }

  if (selectedMode === 'custom' && !customTone.trim()) {
    setError('Please describe your custom tone');
    return false;
  }

  return true;
};

// Generate browser fingerprint
export const generateFingerprint = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('fingerprint', 2, 2);
  
  const data = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash).toString(16);
};
