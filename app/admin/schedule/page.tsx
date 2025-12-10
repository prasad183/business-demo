'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { CalendarGrid } from '@/components/ui/CalendarGrid';

interface Employee {
  id: string;
  name: string;
  role: string;
  payModel: string;
  status: 'active' | 'inactive';
}

interface Shift {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function SchedulePage() {
  const [employees] = useState<Employee[]>([
    { id: '1', name: 'Sarah Johnson', role: 'Therapist', payModel: 'Hourly', status: 'active' },
    { id: '2', name: 'Mike Chen', role: 'Stylist', payModel: 'Commission', status: 'active' },
    { id: '3', name: 'Emma Davis', role: 'Manager', payModel: 'Salary', status: 'active' },
  ]);

  const [shifts, setShifts] = useState<Shift[]>([
    { id: '1', employeeId: '1', date: '2024-01-20', startTime: '09:00', endTime: '17:00' },
    { id: '2', employeeId: '2', date: '2024-01-20', startTime: '10:00', endTime: '18:00' },
  ]);

  const [viewMode, setViewMode] = useState<'week' | 'employee' | 'zone'>('week');

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Roster Calendar</h1>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
            >
              AI Suggest Roster
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Clone Week
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <Card variant="outlined" className="p-4 mb-6">
          <div className="flex gap-2">
            {(['week', 'employee', 'zone'] as const).map((mode) => (
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
                {mode}
              </button>
            ))}
          </div>
        </Card>

        {/* Calendar View */}
        <Card variant="outlined" className="p-6">
          {viewMode === 'week' && (
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Week View</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Employee</th>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <th key={day} className="text-center py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id} className="border-b border-[var(--border)]">
                        <td className="py-4 px-4">
                          <p className="font-medium text-[var(--text-primary)]">{employee.name}</p>
                          <p className="text-xs text-[var(--text-secondary)]">{employee.role}</p>
                        </td>
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                          const shift = shifts.find(
                            (s) => s.employeeId === employee.id && s.date === `2024-01-${15 + day}`
                          );
                          return (
                            <td key={day} className="py-4 px-4 text-center">
                              {shift ? (
                                <div className="p-2 bg-[var(--primary)]/20 rounded-lg">
                                  <p className="text-xs text-[var(--text-primary)]">
                                    {shift.startTime} - {shift.endTime}
                                  </p>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className="w-full p-2 text-[var(--text-muted)] hover:bg-[var(--surface-light)] rounded-lg transition-colors min-h-[44px]"
                                >
                                  +
                                </button>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewMode === 'employee' && (
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Employee View</h2>
              <div className="h-96 bg-[var(--surface-light)] rounded-lg flex items-center justify-center">
                <p className="text-[var(--text-muted)]">Employee calendar view (coming soon)</p>
              </div>
            </div>
          )}

          {viewMode === 'zone' && (
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Zone View</h2>
              <p className="text-[var(--text-muted)]">Zone-based schedule view (coming soon)</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

