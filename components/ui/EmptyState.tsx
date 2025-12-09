'use client';

import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center" role="status" aria-live="polite">
      {icon && (
        <div className="mb-4 text-[var(--text-muted)]" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md">{description}</p>
      )}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

