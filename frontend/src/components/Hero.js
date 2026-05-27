import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = ({ onTryNow }) => {
  return (
    <div className="text-center py-12 sm:py-16 md:py-20 px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
        Reply Smarter.
        <br />
        <span className="text-[var(--primary)]">Every Time.</span>
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-2)] mb-6 sm:mb-8 max-w-2xl mx-auto">
        AI-powered replies for any chat app in seconds
      </p>
      <Button
        onClick={onTryNow}
        className="h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)] text-base sm:text-lg font-semibold rounded-[12px]"
        data-testid="try-free-button"
      >
        Try ReplyAI Free
        <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
      </Button>
    </div>
  );
};

export default Hero;
