import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import { RefreshCw, AlertCircle, Upload, Mic, Sparkles, User } from 'lucide-react';
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
import FileUploadSection from '../components/FileUploadSection';
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
  const [selectedStyle, setSelectedStyle] = useState('ai'); // 'ai' or 'human'
  const [customTone, setCustomTone] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [requestCount, setRequestCount] = useState(0);
  const [copied, setCopied] = useState(false);
  
  // Conversation memory
  const [conversationHistory, setConversationHistory] = useState([]);
  const [contextMemory, setContextMemory] = useState('');
  
  // File upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);

  const charCount = conversation.length;
  const isNearLimit = charCount > NEAR_LIMIT_THRESHOLD;
  const isAtLimit = charCount >= CHAR_LIMIT;

  const handleImageUpload = async (file) => {
    setUploadingImage(true);
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
        throw new Error(data.detail || 'Failed to extract text from image');
      }
      
      setConversation(data.text);
      toast.success('Text extracted from screenshot!');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to extract text from image');
    } finally {
      setUploadingImage(false);
    }
  };
  
  const handleAudioUpload = async (file) => {
    setUploadingAudio(true);
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
        throw new Error(data.detail || 'Failed to transcribe audio');
      }
      
      setConversation(data.text);
      toast.success('Audio transcribed successfully!');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to transcribe audio');
    } finally {
      setUploadingAudio(false);
    }
  };

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
          style: selectedStyle,
          custom_tone: selectedMode === 'custom' ? customTone : null,
          conversation_history: conversationHistory,
          context: contextMemory || null,
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
  
  const clearHistory = () => {
    setConversationHistory([]);
    toast.info('Conversation history cleared');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <HeroSection />

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Input */}
        <div className="space-y-6">
          {/* File Upload Section */}
          <FileUploadSection 
            onImageUpload={handleImageUpload}
            onAudioUpload={handleAudioUpload}
            uploadingImage={uploadingImage}
            uploadingAudio={uploadingAudio}
          />
          
          <ConversationInput 
            conversation={conversation}
            setConversation={setConversation}
            charCount={charCount}
            isNearLimit={isNearLimit}
            isAtLimit={isAtLimit}
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
