'use client';

import React from 'react';

interface KPITileProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function KPITile({ title, value, change, icon, trend }: KPITileProps) {
  return (
    <div className="rounded-[var(--border-radius-lg)] bg-[var(--surface-light)] p-4 border border-[var(--border)]">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm text-[var(--text-secondary)] font-medium">{title}</p>
        {icon && <div className="text-[var(--accent)]">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
        {change && (
          <span
            className={`text-sm font-medium ${
              change.isPositive ? 'text-[var(--success)]' : 'text-[var(--error)]'
            }`}
          >
            {change.isPositive ? '+' : ''}
            {change.value}%
          </span>
        )}
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs text-[var(--text-muted)]">
          {trend === 'up' && (
            <svg className="h-4 w-4 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
          {trend === 'down' && (
            <svg className="h-4 w-4 text-[var(--error)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17l5-5m0 0l-5-5m5 5H6" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}

