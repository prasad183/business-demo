'use client';

import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeClasses = {
    success: 'bg-[var(--success)]',
    error: 'bg-[var(--error)]',
    warning: 'bg-[var(--warning)]',
    info: 'bg-[var(--info)]',
  };

  return (
    <div
      className={`fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-lg ${typeClasses[type]} px-4 py-3 text-white shadow-lg transition-all`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 flex h-6 w-6 items-center justify-center rounded hover:bg-black/20"
          aria-label="Close notification"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

