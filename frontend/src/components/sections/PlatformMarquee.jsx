import React from 'react';
import MarqueeText from '../ui/MarqueeText';
import { MessageCircle, Send, Mail, MessageSquare } from 'lucide-react';

const InstagramIcon = () => (
  <svg className="w-4 h-4 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-4 h-4 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="12" r="1"/>
    <circle cx="15" cy="12" r="1"/>
    <path d="M7.5 7.5c3.5-1 5.5-1 9 0"/>
    <path d="M7 16.5c3.5 1 6.5 1 10 0"/>
    <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .5-3.5-.5-9-1-10.5-2-.5-4-.5-4.5-.5l-.5 1"/>
    <path d="M8.5 17c0 1-1.5 3-2 3-1.5 0-2.833-1.667-3.5-3-.5-3.5.5-9 1-10.5 2-.5 4-.5 4.5-.5l.5 1"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const platforms = [
  { name: 'WhatsApp Web', icon: MessageCircle },
  { name: 'Instagram DMs', icon: InstagramIcon },
  { name: 'Discord', icon: DiscordIcon },
  { name: 'Telegram', icon: Send },
  { name: 'LinkedIn Messaging', icon: LinkedinIcon },
  { name: 'Gmail', icon: Mail },
  { name: 'Twitter / X', icon: TwitterIcon },
  { name: 'Slack', icon: MessageSquare },
];


export default function PlatformMarquee() {
  const items = platforms.map((p, i) => {
    const Icon = p.icon;
    return (
      <div key={i} className="flex items-center gap-2.5 px-3 py-1.5 rounded-[4px] bg-[#0F1F16] border border-[#1C2E22] text-[#A7B5AD] hover:text-[#F0FDF4] hover:border-[#10B981]/50 transition-colors font-mono text-xs">
        <Icon />
        <span className="font-medium">{p.name}</span>
      </div>
    );
  });

  return (
    <div className="py-6 border-b border-[#1C2E22] bg-[#0B1711] relative">
      <div className="text-center mb-4">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#6B7D73] font-mono">
          // IN-BROWSER INJECTION COMPATIBLE ACROSS CLIENTS
        </p>
      </div>
      <MarqueeText items={items} speed={26} />
    </div>
  );
}


