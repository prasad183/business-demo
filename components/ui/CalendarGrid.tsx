'use client';

import React from 'react';

interface CalendarDay {
  date: Date;
  isAvailable: boolean;
  isSelected?: boolean;
  slots?: number;
}

interface CalendarGridProps {
  days: CalendarDay[];
  onDayClick?: (day: CalendarDay) => void;
  month?: string;
}

export function CalendarGrid({ days, onDayClick, month }: CalendarGridProps) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full">
      {month && (
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 text-center">
          {month}
        </h3>
      )}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-[var(--text-secondary)] py-2"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <button
            key={index}
            type="button"
            onClick={() => day.isAvailable && onDayClick?.(day)}
            disabled={!day.isAvailable}
            className={`min-h-[44px] rounded-lg border-2 transition-colors ${
              day.isSelected
                ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                : day.isAvailable
                ? 'border-[var(--border)] bg-[var(--surface-light)] text-[var(--text-primary)] hover:border-[var(--primary)]'
                : 'border-transparent bg-[var(--surface)] text-[var(--text-muted)] cursor-not-allowed opacity-50'
            }`}
            aria-label={`${day.date.toLocaleDateString()}, ${day.isAvailable ? 'available' : 'unavailable'}`}
          >
            <div className="text-sm font-medium">{day.date.getDate()}</div>
            {day.slots !== undefined && day.isAvailable && (
              <div className="text-xs text-[var(--text-secondary)]">{day.slots} slots</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

