'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export function Card({ children, className = '', onClick, variant = 'default' }: CardProps) {
  const baseClasses = 'rounded-[var(--border-radius-lg)] bg-[var(--surface-light)]';
  const variantClasses = {
    default: '',
    elevated: 'shadow-lg',
    outlined: 'border border-[var(--border)]',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

