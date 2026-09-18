import React from 'react';
import { Sparkles, Terminal, User } from 'lucide-react';

const StyleToggle = ({ selectedStyle, setSelectedStyle }) => {
  return (
    <div className="terminal-card p-4 border border-[#1C2E22] bg-[#0F1F16]">
      <div className="flex items-center justify-between mb-3 font-mono text-xs">
        <span className="text-[#A7B5AD] flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
          SYNTAX_PARSER // FORMAT
        </span>
        <span className="text-[10px] text-[#6B7D73]">
          {selectedStyle === 'ai' ? 'MODE: SYNTACTIC_PRECISION' : 'MODE: NATURAL_HUMAN_CADENCE'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
        <button
          type="button"
          data-testid="style-ai-button"
          onClick={() => setSelectedStyle('ai')}
          className={`h-11 px-3 rounded-[4px] border flex items-center justify-center gap-2 transition-all ${
            selectedStyle === 'ai'
              ? 'bg-[#10B981] text-[#08120D] border-[#10B981] font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-[#08120D] text-[#A7B5AD] border-[#1C2E22] hover:border-[#10B981]/50 hover:text-[#F0FDF4]'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>[ AI_SYNTAX ]</span>
        </button>

        <button
          type="button"
          data-testid="style-human-button"
          onClick={() => setSelectedStyle('human')}
          className={`h-11 px-3 rounded-[4px] border flex items-center justify-center gap-2 transition-all ${
            selectedStyle === 'human'
              ? 'bg-[#84CC16] text-[#08120D] border-[#84CC16] font-bold shadow-[0_0_15px_rgba(132,204,22,0.3)]'
              : 'bg-[#08120D] text-[#A7B5AD] border-[#1C2E22] hover:border-[#84CC16]/50 hover:text-[#F0FDF4]'
          }`}
        >
          <User className="h-3.5 w-3.5" />
          <span>[ HUMAN_CADENCE ]</span>
        </button>
      </div>
      
      <div className="mt-2.5 pt-2 border-t border-[#1C2E22] text-[11px] font-mono text-[#6B7D73] flex items-center justify-between">
        <span>{selectedStyle === 'ai' ? 'Zero grammatical errors, articulate tone' : 'Realistic typing speed, natural lowercase, slang'}</span>
        <span className="text-[#84CC16]">• ACTIVE</span>
      </div>
    </div>
  );
};

export default StyleToggle;

