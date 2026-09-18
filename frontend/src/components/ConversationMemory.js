import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, Clock, Terminal, Database } from 'lucide-react';

const ConversationMemory = ({ contextMemory, setContextMemory, conversationHistory, onClearHistory }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="terminal-card border border-[#1C2E22] bg-[#0F1F16] overflow-hidden">
      <div 
        onClick={() => setExpanded(!expanded)}
        className="px-4 py-3 flex items-center justify-between cursor-pointer select-none hover:bg-[#14281D] transition-colors"
      >
        <div className="flex items-center gap-2 font-mono text-xs">
          <Database className="w-3.5 h-3.5 text-[#10B981]" />
          <span className="text-[#F0FDF4] font-medium">SESSION_MEMORY_BUFFER</span>
          {conversationHistory.length > 0 && (
            <span className="text-[10px] bg-[#14281D] text-[#84CC16] px-2 py-0.5 rounded-[3px] border border-[#1C2E22]">
              {conversationHistory.length} TURNS STORED (RAM)
            </span>
          )}
        </div>
        <button
          type="button"
          className="text-[#6B7D73] hover:text-[#F0FDF4] p-1"
          aria-label="Toggle memory"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      
      {expanded && (
        <div className="p-4 bg-[#0A1710] border-t border-[#1C2E22] space-y-3 font-mono text-xs">
          <div>
            <label className="text-[11px] text-[#A7B5AD] mb-1.5 block">
              PERSISTENT_CONTEXT_PROMPT (OPTIONAL):
            </label>
            <textarea
              data-testid="context-memory-input"
              placeholder="e.g. 'Target is a potential VC investor', 'Context: planning a trip together', 'Keep replies under 2 sentences'..."
              value={contextMemory}
              onChange={(e) => setContextMemory(e.target.value)}
              rows={2}
              maxLength={500}
              className="w-full bg-[#08120D] border border-[#1C2E22] focus:border-[#10B981] text-[#F0FDF4] placeholder-[#6B7D73] rounded-[4px] p-2.5 resize-none text-xs"
            />
            <p className="text-[10px] text-[#6B7D73] mt-1">
              * Context is injected into each prompt turn, held in volatile RAM only.
            </p>
          </div>
          
          {conversationHistory.length > 0 && (
            <div className="flex items-center justify-between pt-2 border-t border-[#1C2E22] text-[11px]">
              <span className="text-[#6B7D73]">
                Zero disk retention. Auto-purged on window close.
              </span>
              <button
                type="button"
                onClick={onClearHistory}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-[#14281D] hover:bg-[#EF4444]/20 border border-[#1C2E22] hover:border-[#EF4444]/40 text-[#A7B5AD] hover:text-[#EF4444] text-[10px] transition-colors"
                data-testid="clear-history-button"
              >
                <Trash2 className="h-3 w-3" />
                <span>PURGE_MEMORY</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConversationMemory;

