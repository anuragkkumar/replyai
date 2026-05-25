import React from 'react';
import { Clipboard, Sparkles, Copy } from 'lucide-react';
import StepCard from '../components/StepCard';
import PrivacyCard from '../components/PrivacyCard';

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
        {steps.map((step, index) => (
          <StepCard
            key={step.id}
            icon={step.icon}
            step={index + 1}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>

      <PrivacyCard />
    </div>
  );
};

export default HowItWorks;
