'use client';

import React from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
}

export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-[var(--border)] bg-[var(--surface)] px-2 py-2 safe-area-bottom"
      role="navigation"
      aria-label="Main navigation"
    >
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`flex flex-col items-center justify-center gap-1 rounded-lg px-4 py-2 min-h-[44px] min-w-[44px] transition-colors ${
            item.active
              ? 'text-[var(--primary)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
          aria-current={item.active ? 'page' : undefined}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

