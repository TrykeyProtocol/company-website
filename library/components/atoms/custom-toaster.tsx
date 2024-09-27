// components/CustomToaster.tsx
import { Toaster } from 'react-hot-toast';

export const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: '',
        style: {
          background: 'var(--toaster-bg)',
          color: 'var(--toaster-text)',
          border: '1px solid var(--toaster-border)',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '14px'
        },
        success: {
          style: {
            border: '1px solid var(--toaster-success)',
          },
          iconTheme: {
            primary: 'var(--toaster-success)',
            secondary: 'var(--toaster-bg)',
          },
        },
        error: {
          style: {
            border: '1px solid var(--toaster-error)',
          },
          iconTheme: {
            primary: 'var(--toaster-error)',
            secondary: 'var(--toaster-bg)',
          },
        },
      }}
    />
  );
};