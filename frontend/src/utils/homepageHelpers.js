// Helper functions for HomePage

export const getCharCounterColor = (charCount, isNearLimit, isAtLimit) => {
  if (isAtLimit) return 'text-[var(--danger)]';
  if (isNearLimit) return 'text-[var(--warning)]';
  return 'text-[var(--text-3)]';
};

export const handleApiError = (response, data, setError, toast) => {
  if (response.status === 429) {
    setError('Too many requests, please wait a moment.');
    toast.error('Rate limit reached. Please wait a moment.');
  } else {
    setError(data.detail || 'Failed to generate reply');
  }
};

export const validateInput = (conversation, selectedMode, customTone, setError) => {
  if (!conversation.trim()) {
    setError('Please paste a conversation first');
    return false;
  }

  if (selectedMode === 'custom' && !customTone.trim()) {
    setError('Please describe your custom tone');
    return false;
  }

  return true;
};
