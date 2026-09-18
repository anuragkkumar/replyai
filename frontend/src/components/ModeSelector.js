import React from 'react';
import { Heart, Laugh, Briefcase, Flame, Zap, Sliders, Terminal } from 'lucide-react';

const modes = [
  { id: 'flirty', label: '.flirty', description: 'Playful deflection & chemistry', icon: Heart, badge: 'CHARM' },
  { id: 'funny', label: '.funny', description: 'Self-aware wit & punchlines', icon: Laugh, badge: 'HUMOR' },
  { id: 'professional', label: '.professional', description: 'Firm boundaries & diplomacy', icon: Briefcase, badge: 'CORP' },
  { id: 'roast', label: '.roast', description: 'Ego checks & razor comebacks', icon: Flame, badge: 'SHARP' },
  { id: 'savage', label: '.savage', description: 'Zero hesitation shutdown', icon: Zap, badge: 'LETHAL' },
  { id: 'custom', label: '.custom', description: 'User-specified system prompt', icon: Sliders, badge: 'PROMPT' },
];

const ModeSelector = ({ selectedMode, setSelectedMode }) => {
  return (
    <div className="terminal-card p-4 sm:p-5 border border-[#1C2E22] bg-[#0F1F16]">
      <div className="flex items-center justify-between mb-3 font-mono text-xs">
        <span className="text-[#A7B5AD] flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
          TONE_MATRIX // ARCHETYPE
        </span>
        <span className="text-[10px] text-[#84CC16]">6 PRE-SET ENGINES</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              data-testid={`mode-${mode.id}-button`}
              onClick={() => setSelectedMode(mode.id)}
              className={`p-3 rounded-[4px] border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#14281D] border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-[#08120D] border-[#1C2E22] hover:border-[#10B981]/40 text-[#A7B5AD] hover:text-[#F0FDF4]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#10B981]' : 'text-[#F0FDF4]'}`}>
                  {mode.label}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#10B981]' : 'text-[#6B7D73]'}`} />
              </div>
              <p className="text-[10px] text-[#6B7D73] leading-tight font-sans line-clamp-1">
                {mode.description}
              </p>
              {isSelected && (
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#10B981] rounded-bl-sm shadow-[0_0_6px_#10B981]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;

