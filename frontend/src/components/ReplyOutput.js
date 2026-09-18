import React from 'react';
import { Skeleton } from './ui/skeleton';
import { Copy, RefreshCw, Check, Terminal, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

const ReplyOutput = ({ reply, loading, copied, copyToClipboard, regenerate }) => {
  return (
    <div className="terminal-card overflow-hidden shadow-2xl border border-[#1C2E22] bg-[#0F1F16] min-h-[460px] flex flex-col justify-between">
      {/* Terminal Titlebar */}
      <div className="px-4 py-3 bg-[#08120D] border-b border-[#1C2E22] flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#1C2E22] border border-[#2B4533]" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#1C2E22] border border-[#2B4533]" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-[0_0_8px_#10B981]" />
          <span className="text-[#A7B5AD] ml-2 font-medium">SYNTHESIS_MONITOR.EXE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[#84CC16] bg-[#14281D] px-2 py-0.5 rounded-[3px] border border-[#1C2E22]">
            LATENCY: ~200MS
          </span>
        </div>
      </div>

      {/* Main Terminal Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-[#0F1F16] relative">
        {/* Subtle scanline */}
        <div className="absolute inset-0 bg-scanline pointer-events-none opacity-10" />

        {!reply && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto font-mono">
            <div className="w-16 h-16 rounded-md bg-[#08120D] border border-[#1C2E22] flex items-center justify-center mb-4 text-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <Terminal className="w-8 h-8" />
            </div>
            <div className="text-xs text-[#10B981] font-semibold mb-1">
              [ WAITING_FOR_INPUT_PAYLOAD ]
            </div>
            <p className="text-xs text-[#6B7D73] max-w-xs leading-relaxed">
              Paste a chat thread on the left and choose a tone to stream synthesized responses here.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#08120D] border border-[#1C2E22] text-[10px] text-[#6B7D73]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              <span>ZERO_LOGS // VOLATILE_RAM_ONLY</span>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex-1 flex flex-col justify-center space-y-4 my-auto p-4 font-mono">
            <div className="flex items-center gap-2 text-xs text-[#84CC16]">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>ENGAGING GROQ INFERENCE PIPELINE...</span>
            </div>
            <div className="space-y-3 p-4 rounded bg-[#08120D] border border-[#1C2E22]">
              <div className="h-4 bg-[#14281D] rounded animate-pulse w-full" />
              <div className="h-4 bg-[#14281D] rounded animate-pulse w-5/6" />
              <div className="h-4 bg-[#14281D] rounded animate-pulse w-4/6" />
            </div>
          </div>
        )}

        {reply && !loading && (
          <div className="space-y-4">
            {/* Context Meta Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2E22] font-mono text-xs">
              <div className="flex items-center gap-2 text-[#10B981]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-semibold">SYNTHESIZED_OUTPUT</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  data-testid="copy-reply-button"
                  onClick={copyToClipboard}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] font-mono text-xs font-semibold transition-all border ${
                    copied
                      ? 'bg-[#10B981] text-[#08120D] border-[#10B981]'
                      : 'bg-[#14281D] text-[#F0FDF4] border-[#1C2E22] hover:border-[#10B981] hover:text-[#10B981]'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED!' : 'COPY'}</span>
                </button>

                <button
                  data-testid="regenerate-reply-button"
                  onClick={regenerate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] font-mono text-xs text-[#A7B5AD] bg-[#08120D] border border-[#1C2E22] hover:border-[#10B981] hover:text-[#10B981] transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>RE-ROLL</span>
                </button>
              </div>
            </div>

            {/* Synthesized Output Display */}
            <div className="p-4 sm:p-5 bg-[#14281D] border border-[#10B981]/40 rounded-[4px] relative shadow-[inset_0_1px_1px_rgba(16,185,129,0.2)]">
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#10B981] rounded-full animate-ping" />
              <p 
                className="text-[#F0FDF4] font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap select-text"
                data-testid="reply-output"
              >
                "{reply}"
              </p>
            </div>
          </div>
        )}

        {/* Footer Hardware & Security Bar */}
        <div className="pt-4 mt-6 border-t border-[#1C2E22] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#6B7D73]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <Cpu className="w-3 h-3" />
              <span>LLAMA-3.3-70B-TURBO</span>
            </span>
            <span>|</span>
            <span className="flex items-center gap-1.5 text-[#84CC16]">
              <ShieldCheck className="w-3 h-3" />
              <span>TLS_1.3</span>
            </span>
          </div>
          <span className="text-[10px] text-[#A7B5AD]">STATUS: 200 OK</span>
        </div>
      </div>
    </div>
  );
};

export default ReplyOutput;

