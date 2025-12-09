'use client';

import React from 'react';

interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const getStatusColor = (status: TimelineItem['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-[var(--info)]';
      case 'in-progress':
        return 'bg-[var(--accent)]';
      case 'completed':
        return 'bg-[var(--success)]';
      case 'cancelled':
        return 'bg-[var(--error)]';
      default:
        return 'bg-[var(--text-muted)]';
    }
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Timeline line */}
          {index < items.length - 1 && (
            <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-[var(--border)]" />
          )}
          
          {/* Timeline dot */}
          <div className={`relative z-10 h-6 w-6 rounded-full ${getStatusColor(item.status)} flex-shrink-0 mt-1`} />

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-1">
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{item.time}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  item.status === 'completed'
                    ? 'bg-[var(--success)]/20 text-[var(--success)]'
                    : item.status === 'in-progress'
                    ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                    : item.status === 'cancelled'
                    ? 'bg-[var(--error)]/20 text-[var(--error)]'
                    : 'bg-[var(--info)]/20 text-[var(--info)]'
                }`}
              >
                {item.status.replace('-', ' ')}
              </span>
            </div>
            {item.description && (
              <p className="text-sm text-[var(--text-secondary)] mb-2">{item.description}</p>
            )}
            {item.actions && item.actions.length > 0 && (
              <div className="flex gap-2 mt-3">
                {item.actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    type="button"
                    onClick={action.onClick}
                    className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
                      action.variant === 'primary'
                        ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
                        : 'bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] border border-[var(--border)]'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

