'use client';

import React from 'react';
import { AppBar } from '@/components/ui/AppBar';
import { BottomNav } from '@/components/ui/BottomNav';
import { Card } from '@/components/ui/Card';
import { KPITile } from '@/components/ui/KPITile';
import { OfflineBanner } from '@/components/ui/OfflineBanner';

export default function MobileHomePage() {
  const [isOffline] = React.useState(false); // TODO: Bind to network status
  // const role = 'provider'; // TODO: Get from auth context

  // TODO: Fetch from API
  const announcements = [
    { id: '1', title: 'New service added', message: 'Facial treatment now available', time: '2 hours ago' },
    { id: '2', title: 'Schedule update', message: 'Weekend shifts available', time: '5 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20">
      <OfflineBanner isOffline={isOffline} />
      <AppBar title="Today" />

      <div className="px-4 py-6 space-y-6">
        {/* Role-aware Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card variant="elevated" className="p-4">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">Appointments</h3>
            <p className="text-2xl font-bold text-[var(--primary)]">8</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Today</p>
          </Card>
          <Card variant="elevated" className="p-4">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">Earnings</h3>
            <p className="text-2xl font-bold text-[var(--accent)]">₹2,500</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Today</p>
          </Card>
        </div>

        {/* KPI Chips */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-3">
            <KPITile title="Completed" value="12" />
            <KPITile title="Pending" value="3" />
          </div>
        </div>

        {/* Announcements */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Announcements</h2>
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <Card key={announcement.id} variant="outlined" className="p-4">
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                  {announcement.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  {announcement.message}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{announcement.time}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card variant="outlined" className="p-4 text-center">
              <div className="text-2xl mb-2">📝</div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Take Order</p>
            </Card>
            <Card variant="outlined" className="p-4 text-center">
              <div className="text-2xl mb-2">📦</div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Check Stock</p>
            </Card>
          </div>
        </div>
      </div>

      <BottomNav
        items={[
          { label: 'Home', icon: '🏠', href: '/mobile/home', active: true },
          { label: 'Orders', icon: '📝', href: '/mobile/order', active: false },
          { label: 'Schedule', icon: '📅', href: '/mobile/schedule', active: false },
          { label: 'Stock', icon: '📦', href: '/mobile/stock', active: false },
          { label: 'Profile', icon: '👤', href: '/mobile/profile', active: false },
        ]}
      />
    </div>
  );
}

