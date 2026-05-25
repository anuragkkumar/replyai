import React from 'react';
import { Card } from './ui/card';

const PrivacyCard = () => {
  const features = [
    'Your conversations are never stored or logged',
    'All processing happens server-side with enterprise security',
    'Rate limited to 10 requests per minute for fair usage',
  ];

  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 mt-8 shadow-[var(--shadow-2)]">
      <h3 className="text-lg font-semibold mb-3">Privacy & Security</h3>
      <ul className="space-y-2 text-sm text-[var(--text-2)]">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-[var(--primary)] mr-2">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default PrivacyCard;
