import React from 'react';
import { Card } from './ui/card';

const InstallationStep = ({ icon: Icon, step, title, description }) => {
  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-1)]">
      <div className="flex items-start gap-4">
        <div className="bg-[var(--primary)]/10 rounded-[var(--radius-sm)] p-2 flex-shrink-0">
          <Icon className="h-5 w-5 text-[var(--primary)]" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-lg font-mono font-semibold text-[var(--text-3)]">
              {step}
            </span>
            <h4 className="text-base font-semibold">{title}</h4>
          </div>
          <p className="text-sm text-[var(--text-2)]">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default InstallationStep;
