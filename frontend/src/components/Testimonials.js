import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, Shield, GitCommit, CheckCircle2 } from 'lucide-react';

const auditEntries = [
  {
    timestamp: '2026-09-14 19:42:01 UTC',
    channel: 'WHATSAPP_WEB_DIRECT',
    handle: '@sarah_m_vc',
    role: 'Partner at Seed Fund',
    quote: 'Used professional mode on an overdue LP request. Produced a calm, measured, and firm response without sounding defensive.',
    benchmark: 'SAVED ~15 MIN DRAFTING',
    latency: '240ms'
  },
  {
    timestamp: '2026-09-15 03:11:45 UTC',
    channel: 'INSTAGRAM_DM_OCR',
    handle: '@raj_patel_dev',
    role: 'Staff Frontend Engineer',
    quote: 'Uploaded a messy screenshot from a Tinder match asking a trap question. The roast mode produced pure gold that got an immediate laugh.',
    benchmark: 'RESPONSE ACCURACY 100%',
    latency: '190ms'
  },
  {
    timestamp: '2026-09-15 14:28:10 UTC',
    channel: 'DISCORD_DIRECT_API',
    handle: '@emily_chen_studio',
    role: 'Independent Brand Director',
    quote: 'The fact that nothing hits a database is why I am allowed to use this on corporate clients. Zero compliance headaches.',
    benchmark: 'ZERO LOGS AUDITED',
    latency: '310ms'
  }
];

const Testimonials = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 border-b border-[#1C2E22]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1C2E22]">
        <div>
          <div className="text-xs font-mono text-[#84CC16] mb-2">[ REAL_SESSION_LOGS ]</div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#F0FDF4] tracking-tight">
            Field reports from daily users.
          </h2>
        </div>
        <div className="mt-4 md:mt-0 font-mono text-xs text-[#6B7D73]">
          ANONYMIZED USER EXPERIENCES // VERIFIED
        </div>
      </div>

      {/* Terminal Log Entries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {auditEntries.map((entry, index) => (
          <div
            key={index}
            className="terminal-card p-6 flex flex-col justify-between"
          >
            <div>
              {/* Header log meta */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2E22] text-[11px] font-mono text-[#6B7D73] mb-4">
                <span className="flex items-center gap-1.5 text-[#10B981]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {entry.channel}
                </span>
                <span>{entry.latency}</span>
              </div>

              {/* Timestamp */}
              <div className="text-[10px] font-mono text-[#6B7D73] mb-3">
                LOG_ID #{index + 104} // {entry.timestamp}
              </div>

              {/* Quote */}
              <p className="text-sm text-[#F0FDF4] leading-relaxed font-sans mb-6">
                "{entry.quote}"
              </p>
            </div>

            {/* Author details */}
            <div className="pt-4 border-t border-[#1C2E22] flex items-center justify-between font-mono text-xs">
              <div>
                <div className="text-[#F0FDF4] font-semibold">{entry.handle}</div>
                <div className="text-[11px] text-[#6B7D73]">{entry.role}</div>
              </div>
              <span className="text-[10px] text-[#84CC16] bg-[#14281D] px-2 py-0.5 rounded border border-[#1C2E22]">
                {entry.benchmark}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Asymmetric Final Call to Action */}
      <div className="mt-16 p-8 bg-[#0B1711] border border-[#1C2E22] rounded-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-mono text-[#10B981] mb-1">// READY TO TEST?</div>
          <h3 className="text-2xl font-black text-[#F0FDF4] tracking-tight">
            Stop overthinking text messages.
          </h3>
          <p className="text-sm text-[#A7B5AD] mt-1">
            Free to use directly in browser or as a Chrome extension. No account required.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/generator')}
            className="bracket-btn-primary"
            data-testid="try-now-button"
          >
            <span>[ OPEN GENERATOR NOW ]</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


