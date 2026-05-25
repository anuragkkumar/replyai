import React from 'react';
import { Card } from './ui/card';

const SupportedPlatforms = () => {
  const platforms = ['WhatsApp Web', 'Instagram DMs', 'Discord', 'Telegram Web'];
  
  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 mt-8 shadow-[var(--shadow-2)]">
      <h3 className="text-lg font-semibold mb-3">Supported Platforms</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {platforms.map((platform) => (
          <div key={platform} className="flex items-center gap-2 text-sm text-[var(--text-2)]">
            <span className="text-[var(--primary)]">✓</span>
            <span>{platform}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-[var(--text-3)] mt-4">
        The extension automatically detects the platform and extracts the last 6 messages for context.
      </p>
    </Card>
  );
};

export default SupportedPlatforms;
