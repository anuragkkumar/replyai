import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Progress } from '../components/ui/progress';
import { Skeleton } from '../components/ui/skeleton';
import { toast } from 'sonner';
import { Copy, RefreshCw, Heart, Laugh, Briefcase, Flame, Zap, Edit3, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const modes = [
  { id: 'flirty', label: 'Flirty', icon: Heart },
  { id: 'funny', label: 'Funny', icon: Laugh },
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'roast', label: 'Roast', icon: Flame },
  { id: 'savage', label: 'Savage', icon: Zap },
  { id: 'custom', label: 'Custom', icon: Edit3 },
];

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
  const charLimit = 2000;
  const isNearLimit = charCount > 1800;
  const isAtLimit = charCount >= charLimit;

  const generateReply = async () => {
    if (!conversation.trim()) {
      setError('Please paste a conversation first');
      return;
    }

    if (selectedMode === 'custom' && !customTone.trim()) {
      setError('Please describe your custom tone');
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
        if (response.status === 429) {
          setError('Too many requests, please wait a moment.');
          toast.error('Rate limit reached. Please wait a moment.');
        } else {
          setError(data.detail || 'Failed to generate reply');
        }
        return;
      }

      setReply(data.reply);
      setRequestCount(prev => Math.min(prev + 1, 10));
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
    setTimeout(() => setCopied(false), 1200);
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
          {/* Conversation Input */}
          <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-2)]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium" htmlFor="conversation">
                Paste your conversation
              </label>
              <span 
                className={`text-xs font-mono ${
                  isAtLimit ? 'text-[var(--danger)]' : 
                  isNearLimit ? 'text-[var(--warning)]' : 
                  'text-[var(--text-3)]'
                }`}
                data-testid="conversation-char-counter"
              >
                {charCount}/{charLimit}
              </span>
            </div>
            <Textarea
              id="conversation"
              data-testid="conversation-textarea"
              placeholder="Paste the conversation you want to reply to..."
              value={conversation}
              onChange={(e) => setConversation(e.target.value)}
              rows={8}
              maxLength={charLimit}
              className="bg-[var(--bg-2)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-3)] resize-none"
            />
          </Card>

          {/* Mode Selector */}
          <div>
            <p className="text-sm text-[var(--text-2)] mb-3">
              Pick a tone. Custom lets you describe your vibe.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isSelected = selectedMode === mode.id;
                return (
                  <Button
                    key={mode.id}
                    data-testid={`mode-${mode.id}-button`}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`h-12 ${
                      isSelected
                        ? 'bg-[var(--primary)] text-[var(--primary-contrast)] border-[var(--primary)] hover:bg-[var(--primary-hover)]'
                        : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--text-3)]'
                    } transition-colors duration-150`}
                    variant="secondary"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {mode.label}
                  </Button>
                );
              })}
            </div>
          </div>

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
                Requests used: {requestCount}/10 per minute
              </span>
              <Progress 
                value={(requestCount / 10) * 100} 
                className="h-1.5 flex-1 bg-[var(--surface)]" 
              />
            </div>
          </div>
        </div>

        {/* Right Column - Output */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-2)] min-h-[400px]">
            {!reply && !loading && (
              <div className="flex items-center justify-center h-full border-2 border-dashed border-[var(--border)] rounded-[var(--radius-md)] p-8">
                <p className="text-[var(--text-2)] text-center">
                  Paste a chat to get started.
                </p>
              </div>
            )}

            {loading && (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-[var(--surface-2)]" />
                <Skeleton className="h-4 w-5/6 bg-[var(--surface-2)]" />
                <Skeleton className="h-4 w-4/6 bg-[var(--surface-2)]" />
              </div>
            )}

            {reply && !loading && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Your Reply</span>
                  <div className="flex gap-2">
                    <Button
                      data-testid="copy-reply-button"
                      onClick={copyToClipboard}
                      size="sm"
                      className="bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)] h-9 rounded-[10px]"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                    <Button
                      data-testid="regenerate-reply-button"
                      onClick={regenerate}
                      size="sm"
                      variant="secondary"
                      className="bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--text-3)] h-9 rounded-[10px]"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </div>
                <p 
                  className="text-[var(--text)] leading-[1.5] text-sm md:text-base"
                  data-testid="reply-output"
                >
                  {reply}
                </p>
              </div>
            )}
          </Card>
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
