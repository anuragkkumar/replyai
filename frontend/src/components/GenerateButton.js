import React from 'react';
import { RefreshCw, Zap, Cpu } from 'lucide-react';
import { MAX_REQUEST_COUNT } from '../constants/homepage';

const GenerateButton = ({ loading, isAtLimit, hasConversation, onGenerate, requestCount }) => {
  const percentage = Math.min((requestCount / MAX_REQUEST_COUNT) * 100, 100);

  return (
    <div className="space-y-3">
      <button
        data-testid="generate-reply-button"
        onClick={onGenerate}
        disabled={loading || isAtLimit || !hasConversation}
        className={`w-full h-12 rounded-[4px] font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 flex items-center justify-center gap-2 select-none border ${
          loading
            ? 'bg-[#059669] text-[#F0FDF4] border-[#10B981] opacity-90 cursor-wait'
            : !hasConversation || isAtLimit
            ? 'bg-[#14281D] text-[#6B7D73] border-[#1C2E22] cursor-not-allowed opacity-60'
            : 'btn-shimmer text-[#04140B] border-[#10B981] hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] active:translate-y-0.5 cursor-pointer'
        }`}
      >
        {loading ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin text-[#F0FDF4]" />
            <span>[ SYNTHESIZING_REPLY... ]</span>
          </>
        ) : (
          <>
            <Zap className="h-4 w-4 fill-current" />
            <span>[ EXECUTE INFERENCE &amp; GENERATE ]</span>
          </>
        )}
      </button>

      {/* Rate Limit Indicator Bar */}
      <div className="p-2.5 bg-[#08120D] border border-[#1C2E22] rounded-[4px] font-mono text-[11px] flex items-center justify-between gap-3 text-[#6B7D73]">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
          <span data-testid="rate-limit-remaining">
            THROTTLE_CAPACITY: {requestCount}/{MAX_REQUEST_COUNT} REQ/MIN
          </span>
        </div>
        <div className="w-24 sm:w-36 h-1.5 bg-[#14281D] rounded-full overflow-hidden border border-[#1C2E22]">
          <div 
            className="h-full bg-[#10B981] transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateButton;

