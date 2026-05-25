import React, { useState, useEffect } from 'react';
import ConversationInput from '../components/ConversationInput';
import ModeSelector from '../components/ModeSelector';
import CustomToneInput from '../components/CustomToneInput';
import ErrorAlert from '../components/ErrorAlert';
import GenerateButton from '../components/GenerateButton';
import ReplyOutput from '../components/ReplyOutput';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import StyleToggle from '../components/StyleToggle';
import ConversationMemory from '../components/ConversationMemory';
import { toast } from 'sonner';
import { validateInput, handleApiError, generateFingerprint } from '../utils/homepageHelpers';
import { 
  CHAR_LIMIT, 
  NEAR_LIMIT_THRESHOLD, 
  COPIED_FEEDBACK_DURATION_MS, 
  MAX_REQUEST_COUNT,
  REQUEST_COOLDOWN_MS,
  BACKEND_URL,
  RECAPTCHA_SITE_KEY
} from '../constants/homepage';

const HomePage = () => {
  const [conversation, setConversation] = useState('');
  const [selectedMode, setSelectedMode] = useState('flirty');
  const [selectedStyle, setSelectedStyle] = useState('ai');
  const [customTone, setCustomTone] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [requestCount, setRequestCount] = useState(0);
  const [copied, setCopied] = useState(false);
  
  // Conversation memory
  const [conversationHistory, setConversationHistory] = useState([]);
  const [contextMemory, setContextMemory] = useState('');
  
  // File upload state
  const [uploadingFile, setUploadingFile] = useState(false);
  
  // Anti-bot states
  const [fingerprint, setFingerprint] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Honeypot field
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const charCount = conversation.length;
  const isNearLimit = charCount > NEAR_LIMIT_THRESHOLD;
  const isAtLimit = charCount >= CHAR_LIMIT;

  // Generate fingerprint on mount
  useEffect(() => {
    setFingerprint(generateFingerprint());
  }, []);

  const handleImageUpload = async (file) => {
    setUploadingFile(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${BACKEND_URL}/api/extract-text`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 429 && data.detail && data.detail.includes('Come back tomorrow')) {
          setError('You have used a lot of requests today. Come back tomorrow!');
          toast.error('You have used a lot of requests today. Come back tomorrow!');
        } else {
          throw new Error(data.detail || 'Failed to extract text from image');
        }
        return;
      }
      
      setConversation(data.text);
      toast.success('Text extracted from screenshot!');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to extract text from image');
    } finally {
      setUploadingFile(false);
    }
  };
  
  const handleAudioUpload = async (file) => {
    setUploadingFile(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${BACKEND_URL}/api/transcribe`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 429 && data.detail && data.detail.includes('Come back tomorrow')) {
          setError('You have used a lot of requests today. Come back tomorrow!');
          toast.error('You have used a lot of requests today. Come back tomorrow!');
        } else {
          throw new Error(data.detail || 'Failed to transcribe audio');
        }
        return;
      }
      
      setConversation(data.text);
      toast.success('Audio transcribed successfully!');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to transcribe audio');
    } finally {
      setUploadingFile(false);
    }
  };

  const generateReply = async () => {
    // Cooldown check (2 seconds between requests)
    const now = Date.now();
    if (now - lastRequestTime < REQUEST_COOLDOWN_MS) {
      setError('Please wait a moment between requests');
      return;
    }

    if (!validateInput(conversation, selectedMode, customTone, setError)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await new Promise((resolve, reject) => {
        if (!window.grecaptcha) {
          reject(new Error('reCAPTCHA not loaded'));
          return;
        }
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'generate_reply' })
            .then(resolve)
            .catch(reject);
        });
      });

      const response = await fetch(`${BACKEND_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversation,
          mode: selectedMode,
          style: selectedStyle,
          custom_tone: selectedMode === 'custom' ? customTone : null,
          conversation_history: conversationHistory,
          context: contextMemory || null,
          recaptcha_token: recaptchaToken,
          fingerprint: fingerprint,
          honeypot: honeypot, // Should always be empty
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        handleApiError(response, data, setError, toast);
        return;
      }

      setReply(data.reply);
      
      // Add to conversation history
      setConversationHistory(prev => [...prev, conversation, data.reply]);
      
      setRequestCount(prev => Math.min(prev + 1, MAX_REQUEST_COUNT));
      setLastRequestTime(now);
      toast.success('Reply generated successfully!');
    } catch (err) {
      console.error('Generate error:', err);
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
  
  const clearHistory = () => {
    setConversationHistory([]);
    toast.info('Conversation history cleared');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <HeroSection />

      {/* Honeypot field - hidden from users, visible to bots */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

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
            onImageUpload={handleImageUpload}
            onAudioUpload={handleAudioUpload}
            uploadingFile={uploadingFile}
          />
          
          {/* Conversation Memory */}
          <ConversationMemory 
            contextMemory={contextMemory}
            setContextMemory={setContextMemory}
            conversationHistory={conversationHistory}
            onClearHistory={clearHistory}
          />
          
          {/* Style Toggle */}
          <StyleToggle 
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
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
