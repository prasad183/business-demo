'use client';

import React, { useState } from 'react';
import { AppBar } from '@/components/ui/AppBar';
import { BottomNav } from '@/components/ui/BottomNav';
import { Timeline } from '@/components/ui/Timeline';
import { Card } from '@/components/ui/Card';

export default function MobileSchedulePage() {
  // TODO: Fetch from API
  const appointments = [
    {
      id: '1',
      time: '09:00 AM',
      title: 'Haircut & Styling',
      description: 'Customer: John Doe',
      status: 'upcoming' as const,
      actions: [
        { label: 'Start', onClick: () => {}, variant: 'primary' as const },
        { label: 'Reschedule', onClick: () => {}, variant: 'secondary' as const },
      ],
    },
    {
      id: '2',
      time: '10:30 AM',
      title: 'Facial Treatment',
      description: 'Customer: Jane Smith',
      status: 'in-progress' as const,
      actions: [
        { label: 'Complete', onClick: () => {}, variant: 'primary' as const },
      ],
    },
    {
      id: '3',
      time: '02:00 PM',
      title: 'Manicure & Pedicure',
      description: 'Customer: Bob Johnson',
      status: 'upcoming' as const,
      actions: [
        { label: 'Start', onClick: () => {}, variant: 'primary' as const },
      ],
    },
    {
      id: '4',
      time: '04:00 PM',
      title: 'Haircut & Styling',
      description: 'Customer: Alice Brown',
      status: 'completed' as const,
    },
  ];

  const [consumables] = useState([
    { id: '1', name: 'Shampoo', used: 2, available: 10 },
    { id: '2', name: 'Conditioner', used: 1, available: 8 },
  ]);

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20">
      <AppBar title="Provider Day View" showBack />

      <div className="px-4 py-6 space-y-6">
        {/* Timeline */}
        <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Today&apos;s Appointments</h2>
          <Card variant="outlined" className="p-4">
            <Timeline items={appointments} />
          </Card>
        </div>

        {/* Consumables Usage */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Consumables Usage</h2>
          <Card variant="outlined" className="p-4">
            <div className="space-y-3">
              {consumables.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-[var(--surface-light)]">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{item.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Used: {item.used} / Available: {item.available}
                    </p>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)]"
                        style={{ width: `${(item.used / item.available) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full mt-4 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
            >
              Update Consumables
            </button>
          </Card>
        </div>
      </div>

      <BottomNav
        items={[
          { label: 'Home', icon: '🏠', href: '/mobile/home', active: false },
          { label: 'Orders', icon: '📝', href: '/mobile/order', active: false },
          { label: 'Schedule', icon: '📅', href: '/mobile/schedule', active: true },
          { label: 'Stock', icon: '📦', href: '/mobile/stock', active: false },
          { label: 'Profile', icon: '👤', href: '/mobile/profile', active: false },
        ]}
      />
    </div>
  );
}

