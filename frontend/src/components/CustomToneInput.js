import React from 'react';
import { Sliders, Terminal } from 'lucide-react';

const CustomToneInput = ({ customTone, setCustomTone }) => {
  return (
    <div className="terminal-card p-4 border border-[#1C2E22] bg-[#0F1F16]">
      <div className="flex items-center justify-between mb-2 font-mono text-xs">
        <span className="text-[#A7B5AD] flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#10B981]" />
          CUSTOM_PERSONA_DIRECTIVE
        </span>
        <span className="text-[10px] text-[#84CC16]">PROMPT_OVERRIDE</span>
      </div>
      <input
        id="custom-tone"
        type="text"
        data-testid="mode-custom-input"
        placeholder="e.g. 'Sarcastic British aristocrat', 'Concise VC investor', 'Gordon Ramsay'..."
        value={customTone}
        onChange={(e) => setCustomTone(e.target.value)}
        maxLength={200}
        className="w-full h-11 bg-[#08120D] border border-[#1C2E22] focus:border-[#10B981] px-3.5 rounded-[4px] text-xs font-mono text-[#F0FDF4] placeholder-[#6B7D73] transition-colors"
      />
    </div>
  );
};

export default CustomToneInput;

