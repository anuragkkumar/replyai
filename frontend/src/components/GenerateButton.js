import React from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { RefreshCw } from 'lucide-react';
import { MAX_REQUEST_COUNT } from '../constants/homepage';

const GenerateButton = ({ loading, isAtLimit, hasConversation, onGenerate, requestCount }) => {
  return (
    <div>
      <Button
        data-testid="generate-reply-button"
        onClick={onGenerate}
        disabled={loading || isAtLimit || !hasConversation}
        className="w-full h-12 bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-pressed)] font-medium rounded-[12px] transition-colors duration-150"
      >
        {loading ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Reply'
        )}
      </Button>

      {/* Rate Limit Indicator */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-[var(--text-3)]" data-testid="rate-limit-remaining">
          Requests used: {requestCount}/{MAX_REQUEST_COUNT} per minute
        </span>
        <Progress 
          value={(requestCount / MAX_REQUEST_COUNT) * 100} 
          className="h-1.5 flex-1 bg-[var(--surface)]" 
        />
      </div>
    </div>
  );
};

export default GenerateButton;
