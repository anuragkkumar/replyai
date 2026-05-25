import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Download, Monitor } from 'lucide-react';

const DownloadCard = ({ onDownload }) => {
  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 sm:p-8 mb-8 shadow-[var(--shadow-2)]">
      <div className="flex flex-col items-start gap-4">
        <div className="bg-[var(--primary)]/10 rounded-[var(--radius-md)] p-3">
          <Monitor className="h-8 w-8 text-[var(--primary)]" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Chrome Extension</h2>
          <p className="text-sm text-[var(--text-2)] mb-4">
            Works with Chrome and Edge browsers. The extension reads your chat context and generates replies on-demand.
          </p>
          <Button
            data-testid="download-extension-button"
            onClick={onDownload}
            className="bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)] h-12 px-6 rounded-[12px]"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Extension
          </Button>
          <p className="text-xs text-[var(--text-3)] mt-3">
            Works with Chrome and Edge browsers. Read the included README for installation instructions.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DownloadCard;
