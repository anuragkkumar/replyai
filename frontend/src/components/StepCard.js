import React from 'react';
import { Card } from './ui/card';

const StepCard = ({ icon: Icon, step, title, description }) => {
  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-2)]">
      <div className="flex flex-col items-start">
        <div className="bg-[var(--primary)]/10 rounded-[var(--radius-md)] p-3 mb-4">
          <Icon className="h-6 w-6 text-[var(--primary)]" />
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-mono font-semibold text-[var(--text-3)]">
            {step}
          </span>
          <h3 className="text-lg font-semibold">
            {title}
          </h3>
        </div>
        <p className="text-sm text-[var(--text-2)] leading-[1.5]">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default StepCard;
