import React from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { getCharCounterColor } from '../utils/homepageHelpers';
import { CHAR_LIMIT } from '../constants/homepage';

const ConversationInput = ({ conversation, setConversation, charCount, isNearLimit, isAtLimit }) => {
  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-2)]">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium" htmlFor="conversation">
          Paste your conversation
        </label>
        <span 
          className={`text-xs font-mono ${getCharCounterColor(charCount, isNearLimit, isAtLimit)}`}
          data-testid="conversation-char-counter"
        >
          {charCount}/{CHAR_LIMIT}
        </span>
      </div>
      <Textarea
        id="conversation"
        data-testid="conversation-textarea"
        placeholder="Paste the conversation you want to reply to..."
        value={conversation}
        onChange={(e) => setConversation(e.target.value)}
        rows={8}
        maxLength={CHAR_LIMIT}
        className="bg-[var(--bg-2)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-3)] resize-none"
      />
    </Card>
  );
};

export default ConversationInput;
