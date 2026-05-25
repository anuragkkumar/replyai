import React, { useState } from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Trash2, Clock } from 'lucide-react';

const ConversationMemory = ({ contextMemory, setContextMemory, conversationHistory, onClearHistory }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Conversation Memory</label>
          {conversationHistory.length > 0 && (
            <span className="text-xs text-[var(--text-3)] flex items-center gap-1">
              <Clock className="h-3 w-3" />
              AI remembers {conversationHistory.length} messages
            </span>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setExpanded(!expanded)}
          className="h-6 w-6 p-0"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {expanded && (
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[var(--text-2)] mb-1 block">
              Help AI remember something...
            </label>
            <Textarea
              data-testid="context-memory-input"
              placeholder="e.g., this is my girlfriend, we're planning a Goa trip..."
              value={contextMemory}
              onChange={(e) => setContextMemory(e.target.value)}
              rows={2}
              maxLength={500}
              className="bg-[var(--bg-2)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-3)] resize-none text-sm"
            />
            <p className="text-xs text-[var(--text-3)] mt-1">
              This context will be remembered in every reply
            </p>
          </div>
          
          {conversationHistory.length > 0 && (
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--text-3)]">
                Session memory active (cleared on refresh)
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClearHistory}
                className="h-7 text-xs"
                data-testid="clear-history-button"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default ConversationMemory;
