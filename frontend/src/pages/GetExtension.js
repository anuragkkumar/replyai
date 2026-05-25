import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Download, Monitor, Settings, Puzzle } from 'lucide-react';
import { toast } from 'sonner';

const GetExtension = () => {
  const handleDownload = () => {
    toast.info('Extension download will be available after Phase 3');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] mb-3">
          Get the Extension
        </h1>
        <p className="text-base md:text-lg text-[var(--text-2)]">
          Generate replies directly from WhatsApp, Instagram, Discord, and Telegram.
        </p>
      </div>

      {/* Download Card */}
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
              onClick={handleDownload}
              className="bg-[var(--primary)] text-[var(--primary-contrast)] hover:bg-[var(--primary-hover)] h-12 px-6 rounded-[12px]"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Extension
            </Button>
            <p className="text-xs text-[var(--text-3)] mt-3">
              The extension will be available after Phase 3 development is complete.
            </p>
          </div>
        </div>
      </Card>

      {/* Installation Steps */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Installation Instructions</h3>
        <div className="space-y-4">
          {[
            {
              icon: Download,
              step: '1',
              title: 'Download the extension',
              description: 'Click the download button above to get the ReplyAI.zip file.',
            },
            {
              icon: Monitor,
              step: '2',
              title: 'Open Extensions page',
              description: 'In Chrome or Edge, navigate to chrome://extensions or edge://extensions',
            },
            {
              icon: Settings,
              step: '3',
              title: 'Enable Developer mode',
              description: 'Toggle the "Developer mode" switch in the top right corner.',
            },
            {
              icon: Puzzle,
              step: '4',
              title: 'Load the extension',
              description: 'Click "Load unpacked" and select the extracted ReplyAI folder.',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-1)]"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--primary)]/10 rounded-[var(--radius-sm)] p-2 flex-shrink-0">
                    <Icon className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-lg font-mono font-semibold text-[var(--text-3)]">
                        {item.step}
                      </span>
                      <h4 className="text-base font-semibold">{item.title}</h4>
                    </div>
                    <p className="text-sm text-[var(--text-2)]">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Supported Platforms */}
      <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 mt-8 shadow-[var(--shadow-2)]">
        <h3 className="text-lg font-semibold mb-3">Supported Platforms</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {['WhatsApp Web', 'Instagram DMs', 'Discord', 'Telegram Web'].map((platform) => (
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

      {/* Keyboard Shortcut */}
      <Card className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-[var(--radius-lg)] p-6 mt-8">
        <h3 className="text-lg font-semibold mb-2">Keyboard Shortcut</h3>
        <p className="text-sm text-[var(--text-2)] mb-3">
          Press <kbd className="px-2 py-1 bg-[var(--surface)] border border-[var(--border)] rounded text-xs font-mono">Ctrl+Shift+A</kbd> to quickly open ReplyAI from any supported chat platform.
        </p>
      </Card>
    </div>
  );
};

export default GetExtension;
