import React, { useRef } from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Paperclip, Loader2, Sparkles, Image as ImageIcon, Mic, Terminal } from 'lucide-react';
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

  return (
    <div className="terminal-card overflow-hidden shadow-2xl border border-[#1C2E22] bg-[#0F1F16]">
      {/* Terminal Titlebar */}
      <div className="px-4 py-2.5 bg-[#08120D] border-b border-[#1C2E22] flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#EF4444]/70 border border-[#EF4444]" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F59E0B]/70 border border-[#F59E0B]" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] border border-[#10B981]" />
          <span className="text-[#A7B5AD] ml-2 font-medium flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[#10B981]" />
            RAW_INPUT_BUFFER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span 
            className={`font-mono text-xs px-2 py-0.5 rounded-[3px] border ${
              isAtLimit
                ? 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30'
                : isNearLimit
                ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                : 'bg-[#14281D] text-[#84CC16] border-[#1C2E22]'
            }`}
            data-testid="conversation-char-counter"
          >
            {charCount}/{CHAR_LIMIT} CHARS
          </span>
        </div>
      </div>
      
      {/* Textarea Area */}
      <div className="p-4 sm:p-5 relative bg-[#0A1710]">
        <div className="relative">
          <Textarea
            id="conversation"
            data-testid="conversation-textarea"
            placeholder="Paste raw conversation thread (WhatsApp, iMessage, Tinder, Slack, Email)..."
            value={conversation}
            onChange={(e) => setConversation(e.target.value)}
            rows={7}
            maxLength={CHAR_LIMIT}
            className="w-full bg-[#08120D] border border-[#1C2E22] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/30 text-[#F0FDF4] placeholder-[#6B7D73] font-mono text-xs sm:text-sm resize-none rounded-[4px] p-3.5 leading-relaxed transition-colors"
            disabled={uploadingFile}
          />
        </div>

        {/* Action bar below textarea */}
        <div className="mt-3 pt-3 border-t border-[#1C2E22] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,audio/mpeg,audio/mp3,audio/wav,audio/ogg"
              onChange={handleFileChange}
              className="hidden"
              data-testid="file-upload-input"
            />
            <button
              type="button"
              onClick={handleFileClick}
              disabled={uploadingFile}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[#0F1F16] border border-[#1C2E22] hover:border-[#10B981] text-[#A7B5AD] hover:text-[#10B981] font-mono text-xs transition-colors"
              data-testid="paperclip-button"
              title="Upload screenshot or audio recording"
            >
              {uploadingFile ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 text-[#10B981] animate-spin" />
                  <span>PARSING MULTIMODAL...</span>
                </>
              ) : (
                <>
                  <Paperclip className="h-3.5 w-3.5 text-[#10B981]" />
                  <span>[ UPLOAD OCR / AUDIO ]</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#6B7D73]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>OCR_ENGINE: READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationInput;

