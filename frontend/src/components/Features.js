import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, Mic, Eye, Check, X, ArrowUpRight } from 'lucide-react';

const specs = [
  {
    num: '01',
    title: 'Precision Tone Matrix',
    subtitle: 'Zero hallucinations. Exact situational calibration.',
    detail: 'Unlike general-purpose chatbots that produce apologetic corporate sludge, Reply AI enforces strict communicative archetypes: Flirty, Funny, Professional, Roast, Savage, and Custom directives.',
    meta: 'SYSTEM_PROMPT: DETERMINISTIC_STYLE_TUNED',
    icon: Terminal
  },
  {
    num: '02',
    title: 'Multimodal Chat Parser',
    subtitle: 'Vision OCR + Whisper v3 audio ingestion.',
    detail: 'Drag in conversation screenshots from iMessage, WhatsApp, or Twitter DMs. The OCR engine reads timestamps, sender hierarchy, and tone markers directly without manual transcription.',
    meta: 'INPUT_PIPELINE: OCR_SCREENSHOT + VOICE_STREAM',
    icon: Eye
  },
  {
    num: '03',
    title: 'Zero-Retention Enclave',
    subtitle: 'Stateless execution by fundamental design.',
    detail: 'Your private texts are never written to a disk, never cached in a persistent relational database, and never used to fine-tune shared weights. Requests exist in volatile RAM for ~200ms then disappear.',
    meta: 'PERSISTENCE: NONE (RAM ONLY)',
    icon: Shield
  },
  {
    num: '04',
    title: 'Direct Browser Extension',
    subtitle: 'In-situ generation with keyboard shortcuts.',
    detail: 'Inject responses directly into input fields on WhatsApp Web, Discord, and Instagram Web using Ctrl+Shift+R without context-switching between windows.',
    meta: 'INJECTION: DOM_CURSOR_NATIVE',
    icon: Cpu
  }
];

const Features = () => {
  return (
    <section className="py-20 border-b border-[#1C2E22]">
      {/* Section Tagline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1C2E22]">
        <div>
          <div className="text-xs font-mono text-[#10B981] mb-2">[ ARCHITECTURAL_SPECS ]</div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#F0FDF4] tracking-tight">
            Engineered for high-stakes messaging.
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-[#A7B5AD] max-w-md font-sans">
          Purpose-built algorithms replacing generic chat templates with deterministic, razor-sharp conversational responses.
        </p>
      </div>

      {/* Alternating Technical Feature Breakdown List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1C2E22] border border-[#1C2E22] rounded-md overflow-hidden">
        {specs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-8 bg-[#0F1F16] hover:bg-[#14281D] transition-colors duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-[#84CC16] px-2 py-0.5 bg-[#08120D] border border-[#1C2E22] rounded-sm">
                    {item.num} // {item.meta}
                  </span>
                  <Icon className="w-5 h-5 text-[#10B981] group-hover:scale-110 transition-transform" />
                </div>

                <h3 className="text-xl font-bold text-[#F0FDF4] mb-2 tracking-tight">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-[#10B981] mb-3">
                  // {item.subtitle}
                </div>
                <p className="text-sm text-[#A7B5AD] leading-relaxed font-sans">
                  {item.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1C2E22]/60 flex items-center justify-between text-xs font-mono text-[#6B7D73]">
                <span>STATUS: OPERATIONAL</span>
                <span className="text-[#84CC16] group-hover:translate-x-1 transition-transform">EXPAND &gt;</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Comparison Table: Generic LLM vs Reply AI */}
      <div className="mt-16 terminal-card overflow-hidden">
        <div className="px-5 py-3.5 bg-[#08120D] border-b border-[#1C2E22] flex items-center justify-between font-mono text-xs">
          <span className="text-[#F0FDF4] font-semibold">// BENCHMARK_COMPARISON: GENERIC_LLM vs REPLY_AI</span>
          <span className="text-[#10B981]">VERIFIED_SPEC_v2.0</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1C2E22] bg-[#0B1711] text-[#6B7D73]">
                <th className="p-4">CAPABILITY</th>
                <th className="p-4">STANDARD CHATGPT / CLAUDE</th>
                <th className="p-4 text-[#10B981]">REPLY AI ENGINE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2E22] text-[#A7B5AD]">
              <tr className="hover:bg-[#14281D]/50 transition-colors">
                <td className="p-4 font-medium text-[#F0FDF4]">Social Cadence & Wit</td>
                <td className="p-4 text-[#6B7D73]">Overly polite, apologetic, 4 paragraphs</td>
                <td className="p-4 text-[#10B981] font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#10B981]" /> Sharp 1-to-2 liner punch
                </td>
              </tr>
              <tr className="hover:bg-[#14281D]/50 transition-colors">
                <td className="p-4 font-medium text-[#F0FDF4]">Screenshot Parsing</td>
                <td className="p-4 text-[#6B7D73]">Upload image, type instructions, wait 6s</td>
                <td className="p-4 text-[#10B981] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#10B981]" /> 1-Click OCR extraction &lt; 400ms
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#14281D]/50 transition-colors">
                <td className="p-4 font-medium text-[#F0FDF4]">Data Retention & Logging</td>
                <td className="p-4 text-[#6B7D73]">Trained on prompts, logged for 30+ days</td>
                <td className="p-4 text-[#10B981] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#10B981]" /> 100% Stateless RAM execution
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#14281D]/50 transition-colors">
                <td className="p-4 font-medium text-[#F0FDF4]">Workflow Interruption</td>
                <td className="p-4 text-[#6B7D73]">Switch tabs, copy, paste back & forth</td>
                <td className="p-4 text-[#10B981] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#10B981]" /> Chrome Extension direct field injection
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Features;


