import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import { RefreshCw, AlertCircle } from 'lucide-react';
import ConversationInput from '../components/ConversationInput';
import ModeSelector from '../components/ModeSelector';
import ReplyOutput from '../components/ReplyOutput';
import { validateInput, handleApiError } from '../utils/homepageHelpers';
import { 
  CHAR_LIMIT, 
  NEAR_LIMIT_THRESHOLD, 
  COPIED_FEEDBACK_DURATION_MS, 
  MAX_REQUEST_COUNT,
  BACKEND_URL 
} from '../constants/homepage';

const HomePage = () => {
  const [conversation, setConversation] = useState('');
  const [selectedMode, setSelectedMode] = useState('flirty');
  const [customTone, setCustomTone] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [requestCount, setRequestCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const charCount = conversation.length;
  const isNearLimit = charCount > NEAR_LIMIT_THRESHOLD;
  const isAtLimit = charCount >= CHAR_LIMIT;

  const generateReply = async () => {
    if (!validateInput(conversation, selectedMode, customTone, setError)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversation,
          mode: selectedMode,
          custom_tone: selectedMode === 'custom' ? customTone : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        handleApiError(response, data, setError, toast);
        return;
      }

      setReply(data.reply);
      setRequestCount(prev => Math.min(prev + 1, MAX_REQUEST_COUNT));
      toast.success('Reply generated successfully!');
    } catch (err) {
      setError('Failed to connect to server. Please try again.');
      toast.error('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), COPIED_FEEDBACK_DURATION_MS);
  };

  const regenerate = () => {
    generateReply();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] mb-3">
          Reply smarter. Every time.
        </h1>
        <p className="text-base md:text-lg text-[var(--text-2)]">
          Paste a conversation, pick a tone, get a reply you can send in seconds.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Input */}
        <div className="space-y-6">
          <ConversationInput 
            conversation={conversation}
            setConversation={setConversation}
            charCount={charCount}
            isNearLimit={isNearLimit}
            isAtLimit={isAtLimit}
          />

          <ModeSelector 
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
          />

          {/* Custom Tone Input */}
          {selectedMode === 'custom' && (
            <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4">
              <label className="text-sm font-medium mb-2 block" htmlFor="custom-tone">
                Describe your tone
              </label>
              <Input
                id="custom-tone"
                data-testid="mode-custom-input"
                placeholder="e.g., Reply like a motivational coach"
                value={customTone}
                onChange={(e) => setCustomTone(e.target.value)}
                maxLength={200}
                className="bg-[var(--bg-2)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-3)]"
              />
            </Card>
          )}

          {/* Error Alert */}
          {error && (
            <Alert className="bg-[var(--danger)]/10 border-[var(--danger)] text-[var(--text)]" data-testid="error-alert">
              <AlertCircle className="h-4 w-4 text-[var(--danger)]" />
              <AlertDescription className="text-[var(--text)]">{error}</AlertDescription>
            </Alert>
          )}

          {/* Generate Button */}
          <div>
            <Button
              data-testid="generate-reply-button"
              onClick={generateReply}
              disabled={loading || isAtLimit || !conversation.trim()}
              className="w-full h-12 bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-pressed)] font-medium rounded-[12px] transition-colors duration-150"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Reply'
              )}
            </Button>

            {/* Rate Limit Indicator */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs text-[var(--text-3)]" data-testid="rate-limit-remaining">
                Requests used: {requestCount}/{MAX_REQUEST_COUNT} per minute
              </span>
              <Progress 
                value={(requestCount / MAX_REQUEST_COUNT) * 100} 
                className="h-1.5 flex-1 bg-[var(--surface)]" 
              />
            </div>
          </div>
        </div>

        {/* Right Column - Output */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <ReplyOutput 
            reply={reply}
            loading={loading}
            copied={copied}
            copyToClipboard={copyToClipboard}
            regenerate={regenerate}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-12 pt-8 text-center">
        <p className="text-xs text-[var(--text-3)]">
          Your conversations are never stored or logged.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
