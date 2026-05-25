import React from 'react';
import { Button } from './ui/button';
import { Heart, Laugh, Briefcase, Flame, Zap, Edit3 } from 'lucide-react';

const modes = [
  { id: 'flirty', label: 'Flirty', icon: Heart },
  { id: 'funny', label: 'Funny', icon: Laugh },
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'roast', label: 'Roast', icon: Flame },
  { id: 'savage', label: 'Savage', icon: Zap },
  { id: 'custom', label: 'Custom', icon: Edit3 },
];

const ModeSelector = ({ selectedMode, setSelectedMode }) => {
  return (
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
  );
};

export default ModeSelector;
