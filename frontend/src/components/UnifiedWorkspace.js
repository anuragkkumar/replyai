import React, { useRef, useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Copy, 
  RefreshCw, 
  Check, 
  Heart, 
  Laugh, 
  Briefcase, 
  Flame, 
  Zap, 
  Sliders, 
  Loader2,
  ChevronDown,
  Database
} from 'lucide-react';
import { toast } from 'sonner';
import { CHAR_LIMIT, MAX_REQUEST_COUNT } from '../constants/homepage';

const samplePrompts = [
  {
    text: "Hey, are you always this slow to text back or am I special?",
    mode: "flirty"
  },
  {
    text: "I make 6 figures and go to the gym 6 days a week.",
    mode: "roast"
  },
  {
    text: "Can you do this for exposure? We don't have budget right now.",
    mode: "professional"
  },
  {
    text: "You'll never find someone like me again.",
    mode: "savage"
  },
  {
    text: "Hey, are you free this weekend? Thinking we could grab coffee or drinks.",
    mode: "funny"
  }
];

const modes = [
  { id: 'flirty', label: 'Flirty', icon: Heart },
  { id: 'funny', label: 'Funny', icon: Laugh },
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'roast', label: 'Roast', icon: Flame },
  { id: 'savage', label: 'Savage', icon: Zap },
  { id: 'custom', label: 'Custom', icon: Sliders },
];

const UnifiedWorkspace = ({
  conversation,
  setConversation,
  charCount,
  isNearLimit,
  isAtLimit,
  onImageUpload,
  onAudioUpload,
  uploadingFile,
  selectedMode,
  setSelectedMode,
  selectedStyle,
  setSelectedStyle,
  customTone,
  setCustomTone,
  error,
  loading,
  onGenerate,
  reply,
  copied,
  copyToClipboard,
  regenerate,
  contextMemory,
  setContextMemory,
  conversationHistory = [],
  clearHistory,
  requestCount = 0,
}) => {
  const fileInputRef = useRef(null);
  const [showAdvancedMemory, setShowAdvancedMemory] = useState(false);
  const [sampleIndex, setSampleIndex] = useState(0);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error('Image must be less than 4MB');
        return;
      }
      onImageUpload(file);
    } else if (file.type.startsWith('audio/')) {
      if (file.size > 25 * 1024 * 1024) {
        toast.error('Audio must be less than 25MB');
        return;
      }
      onAudioUpload(file);
    } else {
      toast.error('Please select an image or audio file');
    }
    e.target.value = '';
  };

  const handleTrySample = () => {
    const nextSample = samplePrompts[sampleIndex % samplePrompts.length];
    setConversation(nextSample.text);
    setSelectedMode(nextSample.mode);
    setSampleIndex((prev) => prev + 1);
    toast.success(`Loaded sample (${nextSample.mode})`);
  };

  const hasContent = conversation.trim().length > 0;

  return (
    <div className="w-full space-y-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,audio/mpeg,audio/mp3,audio/wav,audio/ogg"
        onChange={handleFileChange}
        className="hidden"
        data-testid="file-upload-input"
      />

      {/* Error Alert if any */}
      {error && (
        <div 
          data-testid="error-alert" 
          className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-mono flex items-center justify-between"
        >
          <span>{error}</span>
        </div>
      )}

      {/* Main Unified Workspace Card */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-md overflow-hidden transition-colors">
        
        {/* Top Controls Toolbar: Tone Pills + Style Switch */}
        <div className="px-4 sm:px-6 py-3 border-b border-[var(--border)] bg-[var(--bg-2)]/50 flex flex-wrap items-center justify-between gap-3 select-none">
          {/* Tone Selector Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-xs font-semibold text-[var(--text-3)] hidden sm:inline mr-1">
              Tone:
            </span>
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  data-testid={`mode-${mode.id}-button`}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[var(--primary)] text-[var(--primary-contrast)] shadow-sm font-semibold'
                      : 'bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text)] border border-[var(--border)]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[var(--primary-contrast)]' : 'text-[var(--text-3)]'}`} />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Style Cadence Toggle */}
          <div className="flex items-center gap-1 p-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs">
            <button
              type="button"
              data-testid="style-ai-button"
              onClick={() => setSelectedStyle('ai')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                selectedStyle === 'ai'
                  ? 'bg-[var(--primary)] text-[var(--primary-contrast)] shadow-xs font-semibold'
                  : 'text-[var(--text-2)] hover:text-[var(--text)]'
              }`}
            >
              AI Syntax
            </button>
            <button
              type="button"
              data-testid="style-human-button"
              onClick={() => setSelectedStyle('human')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                selectedStyle === 'human'
                  ? 'bg-[var(--accent)] text-[var(--primary-contrast)] shadow-xs font-semibold'
                  : 'text-[var(--text-2)] hover:text-[var(--text)]'
              }`}
            >
              Human Cadence
            </button>
          </div>
        </div>

        {/* Custom Tone Input Row (visible when 'custom' is active) */}
        {selectedMode === 'custom' && (
          <div className="px-4 sm:px-6 py-2.5 bg-[var(--surface-2)] border-b border-[var(--border)] flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--primary)] shrink-0">&gt; Prompt:</span>
            <input
              type="text"
              data-testid="mode-custom-input"
              value={customTone}
              onChange={(e) => setCustomTone(e.target.value)}
              placeholder="e.g. Sarcastic tech founder, polite British diplomat, playful poet..."
              className="w-full bg-transparent border-0 focus:outline-none text-xs text-[var(--text)] placeholder-[var(--text-3)] font-sans"
            />
          </div>
        )}

        {/* Two-Pane Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)] min-h-[380px]">
          
          {/* Left Pane: Clean Input Area */}
          <div className="flex flex-col justify-between p-4 sm:p-6 bg-[var(--surface)] relative">
            <div className="flex-1 flex flex-col">
              <textarea
                id="conversation"
                data-testid="conversation-textarea"
                placeholder="Type, paste, or upload your text."
                value={conversation}
                onChange={(e) => setConversation(e.target.value)}
                maxLength={CHAR_LIMIT}
                disabled={uploadingFile}
                className="w-full flex-1 min-h-[220px] bg-transparent border-0 focus:outline-none focus:ring-0 text-[var(--text)] placeholder-[var(--text-3)] text-sm sm:text-base leading-relaxed resize-none font-sans"
              />
            </div>

            {/* Bottom Action Bar for Left Pane */}
            <div className="pt-4 mt-2 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 select-none">
              <div className="flex items-center gap-2.5">
                {/* Primary Generate Button */}
                <button
                  type="button"
                  data-testid="generate-reply-button"
                  onClick={onGenerate}
                  disabled={loading || isAtLimit || !hasContent}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                    loading
                      ? 'bg-[var(--primary)] text-[var(--primary-contrast)] opacity-80 cursor-wait'
                      : !hasContent || isAtLimit
                      ? 'bg-[var(--surface-2)] text-[var(--text-3)] border border-[var(--border)] cursor-not-allowed opacity-60'
                      : 'bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-contrast)] cursor-pointer active:scale-95 shadow-[0_2px_10px_rgba(16,185,129,0.25)]'
                  }`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Reply</span>
                    </>
                  )}
                </button>

                {/* Upload File Button */}
                <button
                  type="button"
                  data-testid="paperclip-button"
                  onClick={handleFileClick}
                  disabled={uploadingFile}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text)] transition-colors cursor-pointer"
                  title="Upload Screenshot (OCR) or Voice Audio"
                >
                  {uploadingFile ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--primary)]" />
                      <span className="hidden sm:inline">Parsing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload file</span>
                    </>
                  )}
                </button>

                {/* Try Sample Link */}
                <button
                  type="button"
                  onClick={handleTrySample}
                  className="text-xs text-[var(--text-3)] hover:text-[var(--primary)] transition-colors px-2 py-1 cursor-pointer underline-offset-2 hover:underline hidden sm:inline"
                >
                  Try sample text
                </button>
              </div>

              {/* Character Counter */}
              <div className="flex items-center gap-3">
                <span 
                  data-testid="conversation-char-counter"
                  className={`text-xs font-mono ${
                    isAtLimit 
                      ? 'text-red-500 font-bold' 
                      : isNearLimit 
                      ? 'text-amber-500' 
                      : 'text-[var(--text-3)]'
                  }`}
                >
                  {charCount}/{CHAR_LIMIT}
                </span>
              </div>
            </div>
          </div>

          {/* Right Pane: Clean Output Area */}
          <div className="flex flex-col justify-between p-4 sm:p-6 bg-[var(--surface)]">
            {/* Right Pane Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)] text-xs font-bold font-mono">
                  AI
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[var(--text)]">
                  Generated Reply
                </span>
              </div>

              {/* Actions when reply exists */}
              {reply && !loading && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-testid="copy-reply-button"
                    onClick={copyToClipboard}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      copied
                        ? 'bg-[var(--primary)] text-[var(--primary-contrast)] font-semibold'
                        : 'border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text)]'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    data-testid="regenerate-reply-button"
                    onClick={regenerate}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text)] transition-all"
                    title="Regenerate another option"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Regenerate</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Pane Content: Empty State, Loading, or Generated Result */}
            <div className="flex-1 flex flex-col justify-center py-6">
              {/* Empty State (Matching user reference image 1) */}
              {!reply && !loading && (
                <div className="text-center my-auto flex flex-col items-center justify-center p-4">
                  {/* Clean Friendly Illustration Icon (Notepad with Pencil) */}
                  <div className="w-16 h-16 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center mb-3 shadow-xs text-[var(--primary)]">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-[var(--text)] mb-1">
                    Add your text and click Generate to see results here
                  </h4>
                  <p className="text-xs text-[var(--text-3)] max-w-xs leading-relaxed">
                    Choose a tone above, paste your incoming chat, and receive an articulate response in ~200ms.
                  </p>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="flex flex-col items-center justify-center my-auto py-8 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] animate-pulse">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  </div>
                  <p className="text-xs font-medium text-[var(--text-2)]">
                    Synthesizing articulate reply...
                  </p>
                  <div className="w-full max-w-md space-y-2 pt-2">
                    <div className="h-3.5 bg-[var(--surface-2)] rounded-full animate-pulse w-full" />
                    <div className="h-3.5 bg-[var(--surface-2)] rounded-full animate-pulse w-5/6" />
                    <div className="h-3.5 bg-[var(--surface-2)] rounded-full animate-pulse w-4/6" />
                  </div>
                </div>
              )}

              {/* Result State */}
              {reply && !loading && (
                <div className="space-y-4 my-auto">
                  <div className="p-4 sm:p-5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] relative leading-relaxed">
                    <p 
                      data-testid="reply-output"
                      className="text-[var(--text)] text-sm sm:text-base whitespace-pre-wrap select-text leading-relaxed font-sans"
                    >
                      {reply}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[var(--text-3)] font-mono px-1">
                    <span>Tone: {selectedMode}</span>
                    <span>Style: {selectedStyle === 'ai' ? 'Precise' : 'Human'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Pane Footer Info */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-3)]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                <span>Zero-logs RAM privacy</span>
              </span>
              <span data-testid="rate-limit-remaining">
                Capacity: {requestCount}/{MAX_REQUEST_COUNT} req/min
              </span>
            </div>

          </div>
        </div>

        {/* Optional Collapsible Session Memory (For Advanced Context) */}
        {setContextMemory && (
          <div className="border-t border-[var(--border)] bg-[var(--bg-2)]/30">
            <button
              type="button"
              onClick={() => setShowAdvancedMemory(!showAdvancedMemory)}
              className="w-full px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors select-none cursor-pointer"
            >
              <div className="flex items-center gap-2 font-mono">
                <Database className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>Advanced Session Context Buffer</span>
                {contextMemory.trim() && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                )}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvancedMemory ? 'rotate-180' : ''}`} />
            </button>

            {showAdvancedMemory && (
              <div className="px-4 sm:px-6 pb-4 pt-1 space-y-2 border-t border-[var(--border-subtle)] font-mono text-xs">
                <p className="text-[11px] text-[var(--text-3)]">
                  Provide background context (e.g., "Talking to a recruiter for senior engineer role", "Casual Tinder match").
                </p>
                <textarea
                  data-testid="context-memory-input"
                  value={contextMemory}
                  onChange={(e) => setContextMemory(e.target.value)}
                  placeholder="Set persistent persona or situational context..."
                  rows={2}
                  className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-md p-2.5 text-xs text-[var(--text)] placeholder-[var(--text-3)] resize-none focus:outline-none focus:border-[var(--primary)]"
                />
                {conversationHistory.length > 0 && clearHistory && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      data-testid="clear-history-button"
                      onClick={clearHistory}
                      className="text-[11px] text-[var(--text-3)] hover:text-red-500 transition-colors"
                    >
                      Clear session history
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default UnifiedWorkspace;
