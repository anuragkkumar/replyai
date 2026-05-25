import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, User } from 'lucide-react';

const StyleToggle = ({ selectedStyle, setSelectedStyle }) => {
  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium">Reply Style</label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          data-testid="style-ai-button"
          onClick={() => setSelectedStyle('ai')}
          className={`h-12 ${
            selectedStyle === 'ai'
              ? 'bg-[var(--primary)] text-[var(--primary-contrast)] border-[var(--primary)] hover:bg-[var(--primary-hover)]'
              : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--text-3)]'
          } transition-colors duration-150`}
          variant="secondary"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI ✨
        </Button>
        <Button
          data-testid="style-human-button"
          onClick={() => setSelectedStyle('human')}
          className={`h-12 ${
            selectedStyle === 'human'
              ? 'bg-[var(--primary)] text-[var(--primary-contrast)] border-[var(--primary)] hover:bg-[var(--primary-hover)]'
              : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--text-3)]'
          } transition-colors duration-150`}
          variant="secondary"
        >
          <User className="h-4 w-4 mr-2" />
          Human 🧑
        </Button>
      </div>
      <p className="text-xs text-[var(--text-3)] mt-2">
        {selectedStyle === 'ai' ? 'Perfect grammar and professional language' : 'Casual texting style with slang and typos'}
      </p>
    </Card>
  );
};

export default StyleToggle;
