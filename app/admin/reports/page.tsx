'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface Report {
  id: string;
  name: string;
  description: string;
  category: string;
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const reports: Report[] = [
    {
      id: '1',
      name: 'Revenue Report',
      description: 'Daily, weekly, monthly revenue breakdown',
      category: 'Financial',
    },
    {
      id: '2',
      name: 'Customer Analytics',
      description: 'Customer segments, retention, and lifetime value',
      category: 'CRM',
    },
    {
      id: '3',
      name: 'Employee Performance',
      description: 'Productivity, utilization, and attendance',
      category: 'HR',
    },
    {
      id: '4',
      name: 'Service Popularity',
      description: 'Most booked services and packages',
      category: 'Operations',
    },
    {
      id: '5',
      name: 'Inventory Report',
      description: 'Stock levels, reorder points, and turnover',
      category: 'Inventory',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Reports & Analytics</h1>

        {/* Filters */}
        <Card variant="outlined" className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Date From</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Date To</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Gallery */}
          <div className="lg:col-span-1">
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Report Gallery</h2>
              <div className="space-y-2">
                {reports.map((report) => (
                  <button
                    key={report.id}
                    type="button"
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      selectedReport === report.id
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-[var(--surface-light)] hover:bg-[var(--border)]'
                    }`}
                  >
                    <p className="font-medium mb-1">{report.name}</p>
                    <p className={`text-xs ${selectedReport === report.id ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>
                      {report.description}
                    </p>
                    <span
                      className={`mt-2 inline-block px-2 py-1 rounded text-xs ${
                        selectedReport === report.id
                          ? 'bg-white/20 text-white'
                          : 'bg-[var(--primary)]/20 text-[var(--primary)]'
                      }`}
                    >
                      {report.category}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Report Preview */}
          <div className="lg:col-span-2">
            <Card variant="outlined" className="p-6">
              {selectedReport ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                      {reports.find((r) => r.id === selectedReport)?.name}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
                      >
                        Export PDF
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
                      >
                        Export CSV
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                      >
                        Schedule
                      </button>
                    </div>
                  </div>

                  {/* Chart Preview */}
                  <div className="h-64 bg-[var(--surface-light)] rounded-lg flex items-center justify-center mb-4">
                    <p className="text-[var(--text-muted)]">Chart visualization placeholder</p>
                  </div>

                  {/* Table Preview */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[var(--border)]">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                            Revenue
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                            Bookings
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { date: '2024-01-20', revenue: '₹45,250', bookings: 28 },
                          { date: '2024-01-19', revenue: '₹38,500', bookings: 24 },
                          { date: '2024-01-18', revenue: '₹52,100', bookings: 32 },
                        ].map((row, index) => (
                          <tr key={index} className="border-b border-[var(--border)]">
                            <td className="py-4 px-4 text-[var(--text-primary)]">{row.date}</td>
                            <td className="py-4 px-4 text-[var(--text-primary)]">{row.revenue}</td>
                            <td className="py-4 px-4 text-[var(--text-primary)]">{row.bookings}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-[var(--text-muted)]">Select a report from the gallery to preview</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

