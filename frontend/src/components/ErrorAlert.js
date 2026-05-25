import React from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ error }) => {
  if (!error) return null;
  
  return (
    <Alert className="bg-[var(--danger)]/10 border-[var(--danger)] text-[var(--text)]" data-testid="error-alert">
      <AlertCircle className="h-4 w-4 text-[var(--danger)]" />
      <AlertDescription className="text-[var(--text)]">{error}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
