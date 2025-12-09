'use client';

import React from 'react';

export type SeatStatus = 'available' | 'selected' | 'sold' | 'locked';

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
  x: number;
  y: number;
}

interface SeatMapProps {
  seats: Seat[];
  onSeatClick?: (seat: Seat) => void;
  showLegend?: boolean;
}

export function SeatMap({ seats, onSeatClick, showLegend = true }: SeatMapProps) {
  const getSeatColor = (status: SeatStatus) => {
    switch (status) {
      case 'available':
        return '#10b981'; // green
      case 'selected':
        return '#F0C36A'; // accent
      case 'sold':
        return '#6b7280'; // gray
      case 'locked':
        return '#ef4444'; // red
      default:
        return '#6b7280';
    }
  };

  const getSeatLabel = (status: SeatStatus) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'selected':
        return 'Selected';
      case 'sold':
        return 'Sold';
      case 'locked':
        return 'Locked';
      default:
        return '';
    }
  };

  return (
    <div className="w-full">
      {showLegend && (
        <div className="mb-4 flex flex-wrap gap-4 justify-center">
          {(['available', 'selected', 'sold', 'locked'] as SeatStatus[]).map((status) => (
            <div key={status} className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: getSeatColor(status) }}
                aria-label={getSeatLabel(status)}
              />
              <span className="text-sm text-[var(--text-secondary)]">{getSeatLabel(status)}</span>
            </div>
          ))}
        </div>
      )}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto"
          role="img"
          aria-label="Seat map"
        >
          {/* Screen indicator */}
          <rect x="50" y="20" width="300" height="10" fill="#0E7C86" rx="2" />
          <text x="200" y="28" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            SCREEN
          </text>

          {/* Seats */}
          {seats.map((seat) => (
            <g key={seat.id}>
              <rect
                x={seat.x}
                y={seat.y}
                width="20"
                height="20"
                fill={getSeatColor(seat.status)}
                stroke={seat.status === 'selected' ? '#F0C36A' : 'transparent'}
                strokeWidth="2"
                rx="3"
                className={seat.status === 'available' ? 'cursor-pointer hover:opacity-80' : ''}
                onClick={() => seat.status === 'available' && onSeatClick?.(seat)}
                role="button"
                tabIndex={seat.status === 'available' ? 0 : undefined}
                aria-label={`Seat ${seat.row}${seat.number}, ${getSeatLabel(seat.status)}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && seat.status === 'available') {
                    onSeatClick?.(seat);
                  }
                }}
              />
              <text
                x={seat.x + 10}
                y={seat.y + 14}
                textAnchor="middle"
                fill={seat.status === 'sold' || seat.status === 'locked' ? 'white' : 'black'}
                fontSize="8"
                fontWeight="bold"
              >
                {seat.number}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

