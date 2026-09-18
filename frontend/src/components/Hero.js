import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Download, ShieldCheck, Cpu, Copy, Check, Sparkles } from 'lucide-react';
import { CursorDrivenParticleTypography } from './ui/text-repel';
import { useTheme } from '../context/ThemeContext';

const Hero = ({ onTryNow, onDownload }) => {
  const { isDark } = useTheme();
  const [activePersona, setActivePersona] = useState('roast');
  const [copied, setCopied] = useState(false);

  const sampleChats = {
    flirty: {
      incoming: "Are you always this slow to text back?",
      response: "Only when I'm trying to think of something witty enough to keep your attention 😉",
      latency: "0.24s",
      intent: "PLAYFUL_DEFLECTION"
    },
    roast: {
      incoming: "I make 6 figures and go to the gym 6 days a week.",
      response: "Congratulations on having the personality of a LinkedIn post and a protein shaker.",
      latency: "0.19s",
      intent: "EGO_CHECK"
    },
    professional: {
      incoming: "Can you do this for exposure? We don't have budget.",
      response: "Unfortunately our vendors do not accept exposure as legal tender. I'd be happy to revisit when funding aligns with scope.",
      latency: "0.31s",
      intent: "BOUNDARY_ENFORCED"
    },
    savage: {
      incoming: "You'll never find someone like me again.",
      response: "That's literally the whole point of walking away.",
      latency: "0.18s",
      intent: "ZERO_HESITATION"
    }
  };

  const currentSample = sampleChats[activePersona];

  const handleDownloadClick = () => {
    if (onDownload) {
      onDownload();
    } else {
      const link = document.createElement('a');
      link.href = '/ReplyAI.zip';
      link.download = 'ReplyAI.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSample.response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 border-b border-[#1C2E22] overflow-hidden">
      {/* Subtle emerald grid background */}
      <div className="absolute inset-0 bg-emerald-grid pointer-events-none opacity-60 -z-10" />

      {/* Top System Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2 px-3 border border-[var(--border)] bg-[var(--surface)] rounded-sm mb-12 font-mono text-xs text-[var(--text-2)] shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
          <span className="text-[var(--text)] font-medium tracking-tight">SYSTEM: ONLINE</span>
          <span className="text-[var(--border)]">|</span>
          <span className="hidden sm:inline text-[var(--text-3)]">MODEL: GROQ/LLAMA-3.3-TURBO</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-[#84CC16]">LATENCY: ~200ms</span>
          <span className="text-[var(--text-3)]">STATE: ZERO-LOGS</span>
        </div>
      </div>

      {/* Asymmetric 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
        
        {/* Left Column: Bold Typography & Action */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
          
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--primary)] uppercase tracking-wider mb-4">
            <span>[ CONVERSATIONAL INTELLIGENCE ]</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[var(--text)] tracking-tight leading-[1.05]">
            Never freeze on a reply.
            <br />
            Say the right thing,
          </h1>

          {/* Interactive Particle Typography for "every single time." */}
          <div className="w-full flex justify-start -mt-2 -mb-2 overflow-visible">
            <CursorDrivenParticleTypography
              text="every single time."
              fontSize={80}
              particleSize={1.5}
              particleDensity={4}
              dispersionStrength={18}
              returnSpeed={0.09}
              color={isDark ? "#10B981" : "#059669"}
            />
          </div>

          <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#A7B5AD] max-w-2xl leading-relaxed font-normal">
            A high-speed conversational engine that dismantles awkward texts, tense corporate standoffs, and dating banter into articulate responses within 300 milliseconds.
          </p>

          {/* Distinctive Terminal Bracket Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onTryNow}
              className="bracket-btn-primary group"
              data-testid="try-free-button"
            >
              <span>[ RUN GENERATOR ]</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleDownloadClick}
              className="bracket-btn group"
            >
              <Download className="w-4 h-4 text-[#84CC16]" />
              <span>[ GET EXTENSION .ZIP ]</span>
            </button>
          </div>

          {/* Architectural Notes */}
          <div className="mt-10 pt-6 border-t border-[#1C2E22] grid grid-cols-3 gap-4 text-xs font-mono text-[#6B7D73]">
            <div>
              <div className="text-[#F0FDF4] font-semibold flex items-center gap-1.5 mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Stateless</span>
              </div>
              <span>RAM-only execution</span>
            </div>
            <div>
              <div className="text-[#F0FDF4] font-semibold flex items-center gap-1.5 mb-1">
                <Terminal className="w-3.5 h-3.5 text-[#84CC16]" />
                <span>Multimodal</span>
              </div>
              <span>OCR + Whisper v3</span>
            </div>
            <div>
              <div className="text-[#F0FDF4] font-semibold flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Private</span>
              </div>
              <span>Zero chat persistence</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Chat Console / Interactive Product Artifact */}
        <div className="lg:col-span-5 xl:col-span-5 w-full">
          <div className="terminal-card overflow-hidden shadow-2xl w-full">
            
            {/* Terminal Window Header */}
            <div className="px-4 py-3 bg-[#08120D] border-b border-[#1C2E22] flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#1C2E22] border border-[#2B4533]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#1C2E22] border border-[#2B4533]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" />
                <span className="text-[#A7B5AD] ml-2 font-medium">REPLY_SIMULATOR.EXE</span>
              </div>
              <span className="text-[#84CC16]">{currentSample.latency}</span>
            </div>

            {/* Persona Switcher Tabs */}
            <div className="grid grid-cols-4 border-b border-[#1C2E22] bg-[#0B1711] text-xs font-mono">
              {['roast', 'flirty', 'professional', 'savage'].map((persona) => (
                <button
                  key={persona}
                  onClick={() => setActivePersona(persona)}
                  className={`py-2 px-1 text-center uppercase tracking-wider transition-colors border-r border-[#1C2E22] last:border-r-0 ${
                    activePersona === persona
                      ? 'bg-[#0F1F16] text-[#10B981] font-semibold border-b-2 border-b-[#10B981]'
                      : 'text-[#6B7D73] hover:text-[#A7B5AD]'
                  }`}
                >
                  .{persona}
                </button>
              ))}
            </div>

            {/* Chat Simulation Area */}
            <div className="p-5 space-y-4 bg-[#0F1F16]">
              {/* Incoming Context Message */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6B7D73] mb-1.5">
                  <span>INCOMING THREAD // TARGET</span>
                  <span>STATUS: READ</span>
                </div>
                <div className="p-3 bg-[#08120D] border border-[#1C2E22] rounded-sm text-sm text-[#F0FDF4] font-sans leading-relaxed">
                  "{currentSample.incoming}"
                </div>
              </div>

              {/* Engine Processing Line */}
              <div className="flex items-center gap-2 py-1 text-xs font-mono text-[#84CC16]">
                <span>⚡ INTENT:</span>
                <span className="px-1.5 py-0.5 bg-[#14281D] border border-[#1C2E22] rounded text-[10px]">
                  {currentSample.intent}
                </span>
              </div>

              {/* Synthesized Output Bubble */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#10B981] mb-1.5">
                  <span>SYNTHESIZED REPLY // 1-CLICK</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[#A7B5AD] hover:text-[#10B981] transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <div className="p-3.5 bg-[#14281D] border border-[#10B981]/40 rounded-sm text-sm text-[#F0FDF4] font-sans leading-relaxed relative">
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping" />
                  "{currentSample.response}"
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-2">
                <button
                  onClick={onTryNow}
                  className="w-full py-2.5 bg-[#08120D] hover:bg-[#14281D] border border-[#1C2E22] hover:border-[#10B981] text-xs font-mono text-[#F0FDF4] flex items-center justify-center gap-2 transition-all rounded-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>TRY YOUR OWN CHAT IN GENERATOR &gt;</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;


