import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Copy, RefreshCw } from 'lucide-react';

const ReplyOutput = ({ reply, loading, copied, copyToClipboard, regenerate }) => {
  if (!reply && !loading) {
    return (
      <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-2)] min-h-[400px]">
        <div className="flex flex-col items-center justify-center h-full min-h-[350px]">
          <div className="text-6xl mb-4 opacity-30">🤖</div>
          <p className="text-[var(--text-3)] text-center text-sm">
            Your AI reply will appear here...
          </p>
        </div>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-2)] min-h-[400px]">
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-[var(--surface-2)]" />
          <Skeleton className="h-4 w-5/6 bg-[var(--surface-2)]" />
          <Skeleton className="h-4 w-4/6 bg-[var(--surface-2)]" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-2)] min-h-[400px]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Your Reply</span>
          <div className="flex gap-2">
            <Button
              data-testid="copy-reply-button"
              onClick={copyToClipboard}
              size="sm"
              className="bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)] h-9 rounded-[10px]"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button
              data-testid="regenerate-reply-button"
              onClick={regenerate}
              size="sm"
              variant="secondary"
              className="bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--text-3)] h-9 rounded-[10px]"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </div>
        <p 
          className="text-[var(--text)] leading-[1.5] text-sm md:text-base"
          data-testid="reply-output"
        >
          {reply}
        </p>
      </div>
    </Card>
  );
};

export default ReplyOutput;
