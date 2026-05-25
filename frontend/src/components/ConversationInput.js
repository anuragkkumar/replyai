import React, { useRef } from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Paperclip, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getCharCounterColor } from '../utils/homepageHelpers';
import { CHAR_LIMIT } from '../constants/homepage';

const ConversationInput = ({ 
  conversation, 
  setConversation, 
  charCount, 
  isNearLimit, 
  isAtLimit,
  onImageUpload,
  onAudioUpload,
  uploadingFile
}) => {
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it's an image
    if (file.type.startsWith('image/')) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error('Image must be less than 4MB');
        return;
      }
      onImageUpload(file);
    }
    // Check if it's audio
    else if (file.type.startsWith('audio/')) {
      if (file.size > 25 * 1024 * 1024) {
        toast.error('Audio must be less than 25MB');
        return;
      }
      onAudioUpload(file);
    }
    else {
      toast.error('Please select an image or audio file');
    }

    // Reset input
    e.target.value = '';
  };

  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-2)] relative">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium" htmlFor="conversation">
          Paste your conversation
        </label>
        <span 
          className={`text-xs font-mono ${getCharCounterColor(charCount, isNearLimit, isAtLimit)}`}
          data-testid="conversation-char-counter"
        >
          {charCount}/{CHAR_LIMIT}
        </span>
      </div>
      
      <div className="relative">
        <Textarea
          id="conversation"
          data-testid="conversation-textarea"
          placeholder="Paste the conversation you want to reply to..."
          value={conversation}
          onChange={(e) => setConversation(e.target.value)}
          rows={8}
          maxLength={CHAR_LIMIT}
          className="bg-[var(--bg-2)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-3)] resize-none pr-12"
          disabled={uploadingFile}
        />
        
        {/* Paperclip button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,audio/mpeg,audio/mp3,audio/wav,audio/ogg"
          onChange={handleFileChange}
          className="hidden"
          data-testid="file-upload-input"
        />
        <Button
          onClick={handleFileClick}
          disabled={uploadingFile}
          className="absolute bottom-2 left-2 h-8 w-8 p-0 bg-transparent hover:bg-[var(--surface-2)] border-none"
          variant="ghost"
          data-testid="paperclip-button"
          title="Upload screenshot or voice message"
        >
          {uploadingFile ? (
            <Loader2 className="h-4 w-4 text-[var(--text-3)] animate-spin" />
          ) : (
            <Paperclip className="h-4 w-4 text-[var(--text-3)] hover:text-[var(--text)]" />
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ConversationInput;
