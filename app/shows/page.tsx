'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { SeatMap } from '@/components/ui/SeatMap';
import type { Seat } from '@/components/ui/SeatMap';

export default function ShowsPage() {
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // TODO: Fetch from API
  const shows = [
    { id: '1', title: 'Evening Show', time: '7:00 PM', date: '2024-01-15', price: 500 },
    { id: '2', title: 'Matinee Show', time: '2:00 PM', date: '2024-01-15', price: 400 },
    { id: '3', title: 'Night Show', time: '9:30 PM', date: '2024-01-15', price: 600 },
  ];

  // Generate sample seats
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const y = 60;
    
    rows.forEach((row, rowIndex) => {
      for (let num = 1; num <= 8; num++) {
        const x = 50 + (num - 1) * 40;
        const status: Seat['status'] = 
          Math.random() > 0.7 ? 'sold' :
          Math.random() > 0.9 ? 'locked' : 'available';
        
        seats.push({
          id: `${row}${num}`,
          row,
          number: num,
          status,
          x,
          y: y + rowIndex * 30,
        });
      }
    });
    
    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available') {
      setSelectedSeats((prev) =>
        prev.includes(seat.id)
          ? prev.filter((id) => id !== seat.id)
          : [...prev, seat.id]
      );
    }
  };

  const selectedShowData = shows.find((s) => s.id === selectedShow);
  const totalPrice = selectedShowData ? selectedSeats.length * selectedShowData.price : 0;

  // Update seat status based on selection
  const seatsWithSelection = seats.map((seat) => ({
    ...seat,
    status: selectedSeats.includes(seat.id) ? 'selected' : seat.status,
  }));

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Showtimes & Seating</h1>

        {/* Show List */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Available Shows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shows.map((show) => (
              <Card
                key={show.id}
                variant="outlined"
                onClick={() => setSelectedShow(show.id)}
                className={`p-4 cursor-pointer transition-all ${
                  selectedShow === show.id ? 'border-[var(--primary)] border-2' : ''
                }`}
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {show.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-1">
                  {new Date(show.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-3">{show.time}</p>
                <p className="text-xl font-bold text-[var(--primary)]">₹{show.price}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Seat Map */}
        {selectedShow && (
          <div className="mb-6">
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Select Seats - {selectedShowData?.title}
              </h2>
              <SeatMap
                seats={seatsWithSelection}
                onSeatClick={handleSeatClick}
                showLegend={true}
              />
              
              {selectedSeats.length > 0 && (
                <div className="mt-6 p-4 rounded-lg bg-[var(--surface-light)]">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">Selected Seats</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSeats.map((seatId) => {
                      const seat = seats.find((s) => s.id === seatId);
                      return (
                        <span
                          key={seatId}
                          className="px-3 py-1 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-medium"
                        >
                          {seat?.row}{seat?.number}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-[var(--text-primary)]">Total</span>
                    <span className="text-2xl font-bold text-[var(--primary)]">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowConfirmation(true)}
                disabled={selectedSeats.length === 0}
                className={`w-full mt-4 px-6 py-4 rounded-lg font-semibold transition-colors min-h-[44px] ${
                  selectedSeats.length === 0
                    ? 'bg-[var(--surface-light)] text-[var(--text-muted)] cursor-not-allowed'
                    : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
                }`}
              >
                Confirm Booking
              </button>
            </Card>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Confirm Booking"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Show Details</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {selectedShowData?.title} - {selectedShowData?.date} at {selectedShowData?.time}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Selected Seats</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seatId) => {
                const seat = seats.find((s) => s.id === seatId);
                return (
                  <span
                    key={seatId}
                    className="px-3 py-1 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-medium"
                  >
                    {seat?.row}{seat?.number}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="pt-4 border-t border-[var(--border)]">
            <div className="flex justify-between mb-4">
              <span className="text-lg font-semibold text-[var(--text-primary)]">Total</span>
              <span className="text-2xl font-bold text-[var(--primary)]">₹{totalPrice}</span>
            </div>
            <button
              type="button"
              className="w-full px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

