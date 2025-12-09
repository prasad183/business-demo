'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { CalendarGrid } from '@/components/ui/CalendarGrid';
import { bookings } from '@/data/sampleData';

export default function BookingsPage() {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // TODO: Fetch from API
  const allBookings = bookings;

  const handleBookingClick = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setShowBookingModal(true);
  };

  const selectedBookingData = allBookings.find((b) => b.id === selectedBooking);

  // Generate calendar days with bookings
  const generateDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayBookings = allBookings.filter((b) => b.date === dateStr);
      
      days.push({
        date,
        isAvailable: true,
        slots: dayBookings.length,
      });
    }
    return days;
  };

  const calendarDays = generateDays();

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Bookings & Calendar</h1>
          <div className="flex gap-2">
            {(['day', 'week', 'month'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg font-medium min-h-[44px] transition-colors capitalize ${
                  viewMode === mode
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Resource Calendar - {viewMode}
              </h2>
              {viewMode === 'week' && (
                <CalendarGrid days={calendarDays} onDayClick={() => {
                  // TODO: Filter bookings by selected day
                }} />
              )}
              {/* TODO: Add day and month view implementations */}
            </Card>
          </div>

          {/* Bookings List */}
          <div>
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Recent Bookings</h2>
              <div className="space-y-3">
                {allBookings.map((booking) => (
                  <button
                    key={booking.id}
                    type="button"
                    onClick={() => handleBookingClick(booking.id)}
                    className="w-full p-4 rounded-lg bg-[var(--surface-light)] hover:bg-[var(--border)] transition-colors text-left border-l-4 border-[var(--primary)]"
                  >
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                      {booking.serviceName}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">
                      {booking.providerName}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded ${
                        booking.status === 'upcoming'
                          ? 'bg-[var(--info)]/20 text-[var(--info)]'
                          : booking.status === 'completed'
                          ? 'bg-[var(--success)]/20 text-[var(--success)]'
                          : 'bg-[var(--error)]/20 text-[var(--error)]'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedBooking(null);
        }}
        title="Booking Details"
        size="md"
      >
        {selectedBookingData && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Service</h3>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {selectedBookingData.serviceName}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Provider</h3>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {selectedBookingData.providerName}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Date & Time</h3>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {new Date(selectedBookingData.date).toLocaleDateString()} at {selectedBookingData.time}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Amount</h3>
              <p className="text-lg font-semibold text-[var(--primary)]">₹{selectedBookingData.amount}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Status</h3>
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded ${
                  selectedBookingData.status === 'upcoming'
                    ? 'bg-[var(--info)]/20 text-[var(--info)]'
                    : selectedBookingData.status === 'completed'
                    ? 'bg-[var(--success)]/20 text-[var(--success)]'
                    : 'bg-[var(--error)]/20 text-[var(--error)]'
                }`}
              >
                {selectedBookingData.status}
              </span>
            </div>
            <div className="pt-4 border-t border-[var(--border)] flex gap-3">
              <button
                type="button"
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
              >
                Reschedule
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--error)]/20 text-[var(--error)] font-medium hover:bg-[var(--error)]/30 transition-colors min-h-[44px]"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

