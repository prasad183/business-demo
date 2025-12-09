'use client';

import React, { useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'bottom';
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'bottom',
}: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses = {
    left: 'left-0 top-0 bottom-0 max-w-sm',
    right: 'right-0 top-0 bottom-0 max-w-sm',
    bottom: 'left-0 right-0 bottom-0 max-h-[90vh]',
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed z-50 ${positionClasses[position]} bg-[var(--surface)] shadow-xl ${
          position === 'bottom' ? 'rounded-t-[var(--border-radius-lg)]' : ''
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-4">
            <h2 id="drawer-title" className="text-lg font-semibold text-[var(--text-primary)]">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-[var(--surface-light)] transition-colors"
              aria-label="Close drawer"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </>
  );
}

