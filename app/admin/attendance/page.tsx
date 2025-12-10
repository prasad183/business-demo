'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hours: number;
  overtime: number;
  status: 'present' | 'absent' | 'late';
}

export default function AttendancePage() {
  const [attendance] = useState<AttendanceRecord[]>([
    {
      id: '1',
      employeeId: '1',
      employeeName: 'Sarah Johnson',
      date: '2024-01-20',
      checkIn: '09:00',
      checkOut: '17:30',
      hours: 8.5,
      overtime: 0.5,
      status: 'present',
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'Mike Chen',
      date: '2024-01-20',
      checkIn: '09:15',
      checkOut: '18:00',
      hours: 8.75,
      overtime: 0.75,
      status: 'late',
    },
  ]);

  const totalHours = attendance.reduce((sum, record) => sum + record.hours, 0);
  const totalOvertime = attendance.reduce((sum, record) => sum + record.overtime, 0);

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Attendance & Payroll</h1>
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
          >
            Export Payroll
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card variant="outlined" className="p-4">
            <p className="text-sm text-[var(--text-secondary)] mb-1">Total Hours</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalHours.toFixed(1)}</p>
          </Card>
          <Card variant="outlined" className="p-4">
            <p className="text-sm text-[var(--text-secondary)] mb-1">Overtime</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalOvertime.toFixed(1)}</p>
          </Card>
          <Card variant="outlined" className="p-4">
            <p className="text-sm text-[var(--text-secondary)] mb-1">Present</p>
            <p className="text-2xl font-bold text-[var(--success)]">
              {attendance.filter((a) => a.status === 'present').length}
            </p>
          </Card>
          <Card variant="outlined" className="p-4">
            <p className="text-sm text-[var(--text-secondary)] mb-1">Absent</p>
            <p className="text-2xl font-bold text-[var(--error)]">
              {attendance.filter((a) => a.status === 'absent').length}
            </p>
          </Card>
        </div>

        {/* Hours Chart */}
        <Card variant="outlined" className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Hours Chart</h2>
          <div className="h-64 bg-[var(--surface-light)] rounded-lg flex items-center justify-center">
            <p className="text-[var(--text-muted)]">Chart visualization placeholder</p>
          </div>
        </Card>

        {/* Attendance Table */}
        <Card variant="outlined" className="p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Attendance Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Employee</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Check In</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Check Out</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Overtime</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-b border-[var(--border)] hover:bg-[var(--surface-light)]">
                    <td className="py-4 px-4">
                      <p className="font-medium text-[var(--text-primary)]">{record.employeeName}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-[var(--text-primary)]">{new Date(record.date).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-[var(--text-primary)]">{record.checkIn}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-[var(--text-primary)]">{record.checkOut}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-[var(--text-primary)]">{record.hours}h</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-[var(--text-primary)]">{record.overtime > 0 ? `${record.overtime}h` : '-'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.status === 'present'
                            ? 'bg-[var(--success)]/20 text-[var(--success)]'
                            : record.status === 'late'
                            ? 'bg-[var(--warning)]/20 text-[var(--warning)]'
                            : 'bg-[var(--error)]/20 text-[var(--error)]'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Geo Exceptions */}
        <Card variant="outlined" className="p-6 mt-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Geo Exceptions</h2>
          <div className="space-y-2">
            <div className="p-3 bg-[var(--warning)]/10 border border-[var(--warning)] rounded-lg">
              <p className="text-sm text-[var(--text-primary)]">
                <strong>Mike Chen</strong> checked in from outside geofence (500m away) on 2024-01-20
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

