import React from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';

const CustomToneInput = ({ customTone, setCustomTone }) => {
  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4">
      <label className="text-sm font-medium mb-2 block" htmlFor="custom-tone">
        Describe your tone
      </label>
      <Input
        id="custom-tone"
        data-testid="mode-custom-input"
        placeholder="e.g., Reply like a motivational coach"
        value={customTone}
        onChange={(e) => setCustomTone(e.target.value)}
        maxLength={200}
        className="bg-[var(--bg-2)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-3)]"
      />
    </Card>
  );
};

export default CustomToneInput;
