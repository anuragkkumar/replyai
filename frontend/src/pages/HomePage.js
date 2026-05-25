import React, { useState } from 'react';
import ConversationInput from '../components/ConversationInput';
import ModeSelector from '../components/ModeSelector';
import CustomToneInput from '../components/CustomToneInput';
import ErrorAlert from '../components/ErrorAlert';
import GenerateButton from '../components/GenerateButton';
import ReplyOutput from '../components/ReplyOutput';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { toast } from 'sonner';
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
      <HeroSection />

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

          {selectedMode === 'custom' && (
            <CustomToneInput 
              customTone={customTone}
              setCustomTone={setCustomTone}
            />
          )}

          <ErrorAlert error={error} />

          <GenerateButton 
            loading={loading}
            isAtLimit={isAtLimit}
            hasConversation={conversation.trim().length > 0}
            onGenerate={generateReply}
            requestCount={requestCount}
          />
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

      <Footer />
    </div>
  );
};

export default HomePage;
