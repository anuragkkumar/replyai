import React from 'react';
import { Card } from './ui/card';
import { Image, Mic, Sparkles, User, Brain, Zap } from 'lucide-react';

const features = [
  {
    icon: Image,
    title: 'Screenshot Upload',
    description: 'Upload any chat screenshot and AI reads it automatically'
  },
  {
    icon: Mic,
    title: 'Voice Messages',
    description: 'Upload voice notes, AI transcribes and replies instantly'
  },
  {
    icon: Sparkles,
    title: '6 Reply Modes',
    description: 'Flirty, Funny, Professional, Roast, Savage, or Custom'
  },
  {
    icon: User,
    title: 'Human vs AI Style',
    description: 'Replies that sound like a real person or perfect AI'
  },
  {
    icon: Brain,
    title: 'Conversation Memory',
    description: 'AI remembers context across your conversation'
  },
  {
    icon: Zap,
    title: 'Chrome Extension',
    description: 'Works on WhatsApp, Instagram, Discord, Telegram'
  }
];

const Features = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        Everything you need for perfect replies
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6">
              <div className="bg-[var(--primary)]/10 rounded-[var(--radius-md)] p-3 w-fit mb-4">
                <Icon className="h-6 w-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--text-2)]">{feature.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
