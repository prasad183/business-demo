'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  className?: string;
  fallbackPath?: string;
}

export function BackButton({ className = '', fallbackPath }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else if (fallbackPath) {
      router.push(fallbackPath);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`flex h-11 w-11 items-center justify-center rounded-lg hover:bg-[var(--surface-light)] transition-colors ${className}`}
      aria-label="Go back"
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

