import React from 'react';
import { Card } from './ui/card';

const KeyboardShortcut = () => {
  return (
    <Card className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-[var(--radius-lg)] p-6 mt-8">
      <h3 className="text-lg font-semibold mb-2">Keyboard Shortcut</h3>
      <p className="text-sm text-[var(--text-2)] mb-3">
        Press <kbd className="px-2 py-1 bg-[var(--surface)] border border-[var(--border)] rounded text-xs font-mono">Ctrl+Shift+A</kbd> to quickly open ReplyAI from any supported chat platform.
      </p>
    </Card>
  );
};

export default KeyboardShortcut;
