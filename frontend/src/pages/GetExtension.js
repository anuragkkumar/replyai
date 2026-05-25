import React from 'react';
import { Download, Monitor, Settings, Puzzle } from 'lucide-react';
import { toast } from 'sonner';
import DownloadCard from '../components/DownloadCard';
import InstallationStep from '../components/InstallationStep';
import SupportedPlatforms from '../components/SupportedPlatforms';
import KeyboardShortcut from '../components/KeyboardShortcut';

const installationSteps = [
  {
    id: 'install-download',
    icon: Download,
    step: '1',
    title: 'Download the extension',
    description: 'Click the download button above to get the ReplyAI.zip file.',
  },
  {
    id: 'install-extensions',
    icon: Monitor,
    step: '2',
    title: 'Open Extensions page',
    description: 'In Chrome or Edge, navigate to chrome://extensions or edge://extensions',
  },
  {
    id: 'install-developer',
    icon: Settings,
    step: '3',
    title: 'Enable Developer mode',
    description: 'Toggle the "Developer mode" switch in the top right corner.',
  },
  {
    id: 'install-load',
    icon: Puzzle,
    step: '4',
    title: 'Load the extension',
    description: 'Click "Load unpacked" and select the extracted ReplyAI folder.',
  },
];

const GetExtension = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/ReplyAI.zip';
    link.download = 'ReplyAI.zip';
    link.click();
    toast.success('Downloading ReplyAI extension...');
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

      <DownloadCard onDownload={handleDownload} />

      {/* Installation Steps */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Installation Instructions</h3>
        <div className="space-y-4">
          {installationSteps.map((step) => (
            <InstallationStep
              key={step.id}
              icon={step.icon}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>

      <SupportedPlatforms />
      <KeyboardShortcut />
    </div>
  );
};

export default GetExtension;
