import React, { useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Upload, Image, Mic, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const FileUploadSection = ({ onImageUpload, onAudioUpload, uploadingImage, uploadingAudio }) => {
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }
    
    if (file.size > 4 * 1024 * 1024) {
      toast.error('Image must be less than 4MB');
      return;
    }
    
    onImageUpload(file);
  };
  
  const handleAudioChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('audio/')) {
      toast.error('Please select a valid audio file');
      return;
    }
    
    if (file.size > 25 * 1024 * 1024) {
      toast.error('Audio must be less than 25MB');
      return;
    }
    
    onAudioUpload(file);
  };
  
  const handleImageClick = () => {
    imageInputRef.current?.click();
  };
  
  const handleAudioClick = () => {
    audioInputRef.current?.click();
  };

  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium">Upload Screenshot or Voice</label>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImageChange}
            className="hidden"
            data-testid="image-upload-input"
          />
          <Button
            onClick={handleImageClick}
            disabled={uploadingImage}
            className="w-full h-20 bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--primary)] flex flex-col items-center justify-center gap-1"
            variant="secondary"
            data-testid="image-upload-button"
          >
            {uploadingImage ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-xs">Reading...</span>
              </>
            ) : (
              <>
                <Image className="h-5 w-5" />
                <span className="text-xs">Screenshot</span>
              </>
            )}
          </Button>
        </div>
        
        <div>
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg"
            onChange={handleAudioChange}
            className="hidden"
            data-testid="audio-upload-input"
          />
          <Button
            onClick={handleAudioClick}
            disabled={uploadingAudio}
            className="w-full h-20 bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--primary)] flex flex-col items-center justify-center gap-1"
            variant="secondary"
            data-testid="audio-upload-button"
          >
            {uploadingAudio ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-xs">Transcribing...</span>
              </>
            ) : (
              <>
                <Mic className="h-5 w-5" />
                <span className="text-xs">Voice Message</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-[var(--text-3)] mt-2">
        Upload a chat screenshot or voice message to extract text automatically
      </p>
    </Card>
  );
};

export default FileUploadSection;
