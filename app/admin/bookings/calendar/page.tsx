'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { CalendarGrid } from '@/components/ui/CalendarGrid';

interface Booking {
  id: string;
  customerName: string;
  service: string;
  provider: string;
  room: string;
  startTime: Date;
  endTime: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function BookingsCalendarPage() {
  const [viewMode, setViewMode] = useState<'services' | 'classes' | 'resource'>('services');
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const bookings: Booking[] = [
    {
      id: '1',
      customerName: 'Priya Sharma',
      service: 'Haircut & Styling',
      provider: 'Sarah Johnson',
      room: 'Room 1',
      startTime: new Date('2024-01-20T10:00'),
      endTime: new Date('2024-01-20T11:00'),
      status: 'confirmed',
    },
    {
      id: '2',
      customerName: 'Raj Kumar',
      service: 'Facial Treatment',
      provider: 'Emma Davis',
      room: 'Room 2',
      startTime: new Date('2024-01-20T14:00'),
      endTime: new Date('2024-01-20T15:30'),
      status: 'confirmed',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Bookings Calendar</h1>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Add Booking
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
            >
              Batch SMS Reminders
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <Card variant="outlined" className="p-4 mb-6">
          <div className="flex gap-2">
            {(['services', 'classes', 'resource'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] capitalize ${
                  viewMode === mode
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--surface-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {mode === 'resource' ? 'By Provider/Room' : mode}
              </button>
            ))}
          </div>
        </Card>

        {/* Calendar View */}
        <Card variant="outlined" className="p-6">
          {viewMode === 'services' && (
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Services & Classes</h2>
              <div className="h-96 bg-[var(--surface-light)] rounded-lg flex items-center justify-center mb-4">
                <p className="text-[var(--text-muted)]">Calendar view with bookings (coming soon)</p>
              </div>
              <div className="space-y-2">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-3 bg-[var(--surface-light)] rounded-lg">
                    <p className="font-medium text-[var(--text-primary)]">
                      {booking.customerName} - {booking.service}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {booking.startTime.toLocaleString()} - {booking.endTime.toLocaleString()}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {booking.provider} | {booking.room}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'resource' && (
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Resource View</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Select Provider or Room
                </label>
                <select
                  value={selectedResource || ''}
                  onChange={(e) => setSelectedResource(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                >
                  <option value="">All Resources</option>
                  <option value="provider1">Sarah Johnson</option>
                  <option value="provider2">Emma Davis</option>
                  <option value="room1">Room 1</option>
                  <option value="room2">Room 2</option>
                </select>
              </div>
              <div className="h-96 bg-[var(--surface-light)] rounded-lg flex items-center justify-center mb-4">
                <p className="text-[var(--text-muted)]">Resource calendar view (coming soon)</p>
              </div>
              <div className="space-y-2">
                {bookings
                  .filter((b) => !selectedResource || b.provider === selectedResource || b.room === selectedResource)
                  .map((booking) => (
                    <div key={booking.id} className="p-3 bg-[var(--surface-light)] rounded-lg">
                      <p className="font-medium text-[var(--text-primary)]">
                        {booking.customerName} - {booking.service}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {booking.startTime.toLocaleString()} - {booking.endTime.toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </Card>

        {/* Bulk Actions */}
        <Card variant="outlined" className="p-6 mt-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Bulk Actions</h2>
          <div className="flex gap-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px]"
            >
              Bulk Reschedule
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px]"
            >
              Block Slots
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

