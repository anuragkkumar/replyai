import React, { useState, useEffect, useRef } from 'react';
import UnifiedWorkspace from '../components/UnifiedWorkspace';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
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
  const [replies, setReplies] = useState([]);
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
  const [honeypot, setHoneypot] = useState('');
  const [lastRequestTime, setLastRequestTime] = useState(0);

  // Ref for scrolling to generator
  const generatorRef = useRef(null);

  const charCount = conversation.length;
  const isNearLimit = charCount > NEAR_LIMIT_THRESHOLD;
  const isAtLimit = charCount >= CHAR_LIMIT;

  useEffect(() => {
    setFingerprint(generateFingerprint());
  }, []);

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          honeypot: honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        handleApiError(response, data, setError, toast);
        return;
      }

      setReplies(data.replies || [data.reply]); // Handle both new (array) and old (single) format
      
      setConversationHistory(prev => [...prev, conversation, data.replies?.[0] || data.reply]);
      
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
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
    <div>
      {/* Landing Page Sections */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <Hero onTryNow={scrollToGenerator} />
        <Features />
        <Testimonials />
      </div>

      {/* Generator Section */}
      <div ref={generatorRef} className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 sm:py-12 border-t border-[var(--border)] mt-12">
        
        {/* Section Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border)]">
          <div>
            <div className="text-xs font-mono text-[var(--primary)] uppercase tracking-wider mb-1">[ GENERATOR_ENGINE ]</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
              Test your reply in real-time
            </h2>
          </div>
          <span className="text-xs text-[var(--text-3)] font-mono">
            Zero logs • Volatile RAM execution
          </span>
        </div>

        {/* Honeypot field */}
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

        {/* Unified Clean Workspace Card */}
        <UnifiedWorkspace
          conversation={conversation}
          setConversation={setConversation}
          charCount={charCount}
          isNearLimit={isNearLimit}
          isAtLimit={isAtLimit}
          onImageUpload={handleImageUpload}
          onAudioUpload={handleAudioUpload}
          uploadingFile={uploadingFile}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          customTone={customTone}
          setCustomTone={setCustomTone}
          error={error}
          loading={loading}
          onGenerate={generateReply}
          reply={replies[0] || ''}
          copied={copied}
          copyToClipboard={() => copyToClipboard(replies[0])}
          regenerate={regenerate}
          contextMemory={contextMemory}
          setContextMemory={setContextMemory}
          conversationHistory={conversationHistory}
          clearHistory={clearHistory}
          requestCount={requestCount}
        />
      </div>

      {/* Contact Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
