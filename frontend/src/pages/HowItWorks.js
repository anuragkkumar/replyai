import React from 'react';
import { Card } from '../components/ui/card';
import { Clipboard, Sparkles, Copy } from 'lucide-react';

const steps = [
  {
    id: 'step-paste',
    icon: Clipboard,
    title: 'Paste your chat',
    description: 'Drop the conversation you want to reply to.',
  },
  {
    id: 'step-pick',
    icon: Sparkles,
    title: 'Pick your mode',
    description: 'Flirty, funny, professional—or define your own tone.',
  },
  {
    id: 'step-copy',
    icon: Copy,
    title: 'Copy your reply',
    description: 'One click to copy. Regenerate if you want options.',
  },
];

const HowItWorks = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] mb-3">
          How it works
        </h1>
        <p className="text-base md:text-lg text-[var(--text-2)]">
          Generate perfect replies in three simple steps.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card 
              key={step.id}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-2)]"
            >
              <div className="flex flex-col items-start">
                <div className="bg-[var(--primary)]/10 rounded-[var(--radius-md)] p-3 mb-4">
                  <Icon className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-mono font-semibold text-[var(--text-3)]">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-2)] leading-[1.5]">
                  {step.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 mt-8 shadow-[var(--shadow-2)]">
        <h3 className="text-lg font-semibold mb-3">Privacy & Security</h3>
        <ul className="space-y-2 text-sm text-[var(--text-2)]">
          <li className="flex items-start">
            <span className="text-[var(--primary)] mr-2">✓</span>
            <span>Your conversations are never stored or logged</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--primary)] mr-2">✓</span>
            <span>All processing happens server-side with enterprise security</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--primary)] mr-2">✓</span>
            <span>Rate limited to 10 requests per minute for fair usage</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default HowItWorks;
