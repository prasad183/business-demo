'use client';

import React from 'react';
import { KPITile } from '@/components/ui/KPITile';
import { Card } from '@/components/ui/Card';

// Helper function to format dates consistently (avoiding hydration errors)
function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}

export default function AdminDashboard() {
  // TODO: Fetch KPIs from API
  const kpis = [
    {
      title: "Today's Revenue",
      value: '₹45,250',
      change: { value: 12.5, isPositive: true },
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      trend: 'up' as const,
    },
    {
      title: "Today's Bookings",
      value: '28',
      change: { value: 8.3, isPositive: true },
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      trend: 'up' as const,
    },
    {
      title: 'Occupancy / Fill Rate',
      value: '78%',
      change: { value: 5.2, isPositive: true },
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      trend: 'up' as const,
    },
    {
      title: 'Therapist Utilization',
      value: '85%',
      change: { value: 3.1, isPositive: true },
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      trend: 'up' as const,
    },
    {
      title: 'Membership MRR',
      value: '₹2,45,000',
      change: { value: 15.3, isPositive: true },
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      trend: 'up' as const,
    },
    {
      title: 'NPS Score',
      value: '72',
      change: { value: 4.2, isPositive: true },
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      trend: 'up' as const,
    },
  ];

  const alerts = [
    { id: '1', type: 'warning', message: 'Refund spike detected: 5 refunds in last hour', time: '10 min ago' },
    { id: '2', type: 'error', message: 'Employee absence: Sarah (Therapist) - No show', time: '1 hour ago' },
    { id: '3', type: 'error', message: 'Integration failure: Payment gateway timeout', time: '2 hours ago' },
    { id: '4', type: 'warning', message: 'Low stock alert: Hair products running low', time: '2 hours ago' },
    { id: '5', type: 'info', message: 'New booking received for tomorrow', time: '3 hours ago' },
  ];

  const lowStockItems = [
    { sku: 'HP-001', name: 'Hair Shampoo Pro', stock: 5, threshold: 20, expiry: '2024-12-31' },
    { sku: 'FC-002', name: 'Face Cream Premium', stock: 8, threshold: 25, expiry: '2025-01-15' },
    { sku: 'NS-003', name: 'Nail Polish Set', stock: 3, threshold: 15, expiry: null },
    { sku: 'SP-004', name: 'Spa Towels', stock: 12, threshold: 30, expiry: null },
  ];

  const operationalWidgets = {
    roomsInUse: { current: 8, total: 12 },
    nextPeak: { time: '6:00 PM', bookings: 15 },
    pendingPayouts: { count: 3, amount: '₹12,500' },
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Master Dashboard</h1>

        {/* KPI Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {kpis.map((kpi, index) => (
            <KPITile key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hourly Bookings Heatmap */}
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Hourly Bookings Heatmap</h2>
              <div className="h-64 bg-[var(--surface-light)] rounded-lg flex items-center justify-center">
                <p className="text-[var(--text-muted)]">Heatmap visualization showing peak hours</p>
                {/* TODO: Integrate heatmap visualization */}
              </div>
            </Card>

            {/* Revenue by Category */}
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Revenue by Category</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                    <span>🛍️</span> Store
                  </span>
                  <div className="flex-1 mx-4">
                    <div className="h-4 bg-[var(--border)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                    <span>✂️</span> Services
                  </span>
                  <div className="flex-1 mx-4">
                    <div className="h-4 bg-[var(--border)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                    <span>🏛️</span> Spaces
                  </span>
                  <div className="flex-1 mx-4">
                    <div className="h-4 bg-[var(--border)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--info)] rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">25%</span>
                </div>
              </div>
            </Card>

            {/* Package vs Single-Service Mix */}
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Package vs Single-Service Mix</h2>
              <div className="h-48 bg-[var(--surface-light)] rounded-lg flex items-center justify-center">
                <p className="text-[var(--text-muted)]">Pie/Donut chart placeholder</p>
                {/* TODO: Integrate chart library */}
              </div>
            </Card>

            {/* Product Attach Rate */}
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Product Attach Rate</h2>
              <div className="h-48 bg-[var(--surface-light)] rounded-lg flex items-center justify-center">
                <p className="text-[var(--text-muted)]">Bar chart showing products sold with services</p>
                {/* TODO: Integrate chart library */}
              </div>
            </Card>
          </div>

          {/* Alerts & Quick Actions */}
          <div className="space-y-6">
            {/* Operational Widgets */}
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Operational Status</h2>
              <div className="space-y-4">
                <div className="p-4 bg-[var(--surface-light)] rounded-lg">
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Rooms/Chairs in Use</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">
                    {operationalWidgets.roomsInUse.current} / {operationalWidgets.roomsInUse.total}
                  </p>
                </div>
                <div className="p-4 bg-[var(--surface-light)] rounded-lg">
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Next Peak Period</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">{operationalWidgets.nextPeak.time}</p>
                  <p className="text-sm text-[var(--text-muted)]">{operationalWidgets.nextPeak.bookings} bookings</p>
                </div>
                <div className="p-4 bg-[var(--surface-light)] rounded-lg">
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Pending Payouts</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">{operationalWidgets.pendingPayouts.count}</p>
                  <p className="text-sm text-[var(--text-muted)]">{operationalWidgets.pendingPayouts.amount}</p>
                </div>
              </div>
            </Card>

            {/* Alerts Feed */}
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Alerts Feed</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'warning'
                        ? 'bg-[var(--warning)]/10 border-[var(--warning)]'
                        : alert.type === 'success'
                        ? 'bg-[var(--success)]/10 border-[var(--success)]'
                        : alert.type === 'error'
                        ? 'bg-[var(--error)]/10 border-[var(--error)]'
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
                  Add Booking
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px] text-left"
                >
                  Open Roster
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px] text-left"
                >
                  Create Campaign
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Low Stock & Perishables */}
        <Card variant="outlined" className="p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Low Stock & Perishables</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Threshold</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Expiry</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item, index) => (
                  <tr key={index} className="border-b border-[var(--border)] hover:bg-[var(--surface-light)]">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-[var(--text-primary)]">{item.sku}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[var(--text-primary)]">{item.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${item.stock < item.threshold ? 'text-[var(--error)]' : 'text-[var(--text-primary)]'}`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-[var(--text-secondary)]">{item.threshold}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-[var(--text-secondary)]">
                        {item.expiry ? formatDate(item.expiry) : 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

