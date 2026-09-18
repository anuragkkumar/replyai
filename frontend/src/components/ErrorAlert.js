import React from 'react';
import { AlertTriangle, Terminal } from 'lucide-react';

const ErrorAlert = ({ error }) => {
  if (!error) return null;
  
  return (
    <div 
      className="p-3.5 bg-[#EF4444]/10 border border-[#EF4444]/40 rounded-[4px] text-[#EF4444] font-mono text-xs flex items-center gap-2.5 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
      data-testid="error-alert"
    >
      <AlertTriangle className="h-4 w-4 shrink-0 text-[#EF4444]" />
      <span className="leading-snug">[ SYSTEM_FAULT ]: {error}</span>
    </div>
  );
};

export default ErrorAlert;

