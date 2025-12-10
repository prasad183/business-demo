'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface AppBarProps {
  title?: string;
  showBack?: boolean;
  actions?: React.ReactNode;
  variant?: 'default' | 'transparent';
}

export function AppBar({ title, showBack = false, actions, variant = 'default' }: AppBarProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header
      className={`sticky top-0 z-50 flex h-14 items-center justify-between px-4 ${
        variant === 'transparent' ? 'bg-transparent' : 'bg-[var(--surface)] border-b border-[var(--border)]'
      }`}
      role="banner"
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-[var(--surface-light)] transition-colors"
            aria-label="Go back"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {title && (
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">
            {title}
          </h1>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}

