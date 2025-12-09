'use client';

import React from 'react';
import { KPITile } from '@/components/ui/KPITile';
import { Card } from '@/components/ui/Card';

export default function AdminDashboard() {
  // TODO: Fetch KPIs from API
  const kpis = [
    {
      title: 'Total Revenue',
      value: '₹1,25,000',
      change: { value: 12.5, isPositive: true },
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      trend: 'up' as const,
    },
    {
      title: 'Total Bookings',
      value: '245',
      change: { value: 8.3, isPositive: true },
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      trend: 'up' as const,
    },
    {
      title: 'Active Customers',
      value: '1,234',
      change: { value: 5.2, isPositive: true },
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      trend: 'up' as const,
    },
    {
      title: 'Low Stock Items',
      value: '12',
      change: { value: 3.1, isPositive: false },
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      trend: 'down' as const,
    },
  ];

  const alerts = [
    { id: '1', type: 'warning', message: 'Low stock alert: Hair products running low', time: '2 hours ago' },
    { id: '2', type: 'info', message: 'New booking received for tomorrow', time: '3 hours ago' },
    { id: '3', type: 'success', message: 'Payment received: ₹2,500', time: '5 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Dashboard</h1>

        {/* KPI Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((kpi, index) => (
            <KPITile key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart */}
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Revenue Trend</h2>
              <div className="h-64 bg-[var(--surface-light)] rounded-lg flex items-center justify-center">
                <p className="text-[var(--text-muted)]">Area Chart Placeholder</p>
                {/* TODO: Integrate chart library (Chart.js, Recharts, etc.) */}
              </div>
            </Card>

            {/* Bookings Heatmap */}
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Booking Heatmap</h2>
              <div className="h-64 bg-[var(--surface-light)] rounded-lg flex items-center justify-center">
                <p className="text-[var(--text-muted)]">Heatmap Chart Placeholder</p>
                {/* TODO: Integrate heatmap visualization */}
              </div>
            </Card>
          </div>

          {/* Alerts & Quick Actions */}
          <div className="space-y-6">
            {/* Alerts Feed */}
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Recent Alerts</h2>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'warning'
                        ? 'bg-[var(--warning)]/10 border-[var(--warning)]'
                        : alert.type === 'success'
                        ? 'bg-[var(--success)]/10 border-[var(--success)]'
                        : 'bg-[var(--info)]/10 border-[var(--info)]'
                    }`}
                  >
                    <p className="text-sm text-[var(--text-primary)] mb-1">{alert.message}</p>
                    <p className="text-xs text-[var(--text-muted)]">{alert.time}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px] text-left"
                >
                  Create New Booking
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px] text-left"
                >
                  Add Catalogue Item
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px] text-left"
                >
                  View Reports
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

