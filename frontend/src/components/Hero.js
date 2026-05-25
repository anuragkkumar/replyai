import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = ({ onTryNow }) => {
  return (
    <div className="text-center py-16 sm:py-20">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
        Reply Smarter.
        <br />
        <span className="text-[var(--primary)]">Every Time.</span>
      </h1>
      <p className="text-xl sm:text-2xl text-[var(--text-2)] mb-8 max-w-2xl mx-auto">
        AI-powered replies for any chat app in seconds
      </p>
      <Button
        onClick={onTryNow}
        className="h-14 px-8 bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)] text-lg font-semibold rounded-[12px]"
        data-testid="try-free-button"
      >
        Try ReplyAI Free
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default Hero;
