'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { CalendarGrid } from '@/components/ui/CalendarGrid';
import { employees } from '@/data/sampleData';

export default function EmployeesPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // TODO: Fetch from API
  const allEmployees = employees;

  const handleScheduleClick = (employeeId: string) => {
    setSelectedEmployee(employeeId);
    setShowScheduleModal(true);
  };

  // Generate calendar days for roster
  const generateDays = React.useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date,
        isAvailable: true,
        slots: (i % 3) + 1, // Deterministic shifts per day
      });
    }
    return days;
  }, []);

  const calendarDays = generateDays;

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Employees & Scheduling</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
              className="px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px] font-medium"
            >
              {viewMode === 'list' ? 'Calendar View' : 'List View'}
            </button>
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Add Employee
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <Card variant="outlined" className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-[var(--border)] hover:bg-[var(--surface-light)]"
                    >
                      <td className="py-4 px-4">
                        <p className="font-medium text-[var(--text-primary)]">{employee.name}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary)]/20 text-[var(--primary)]">
                          {employee.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-[var(--text-secondary)]">{employee.email}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-[var(--text-secondary)]">{employee.phone}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            employee.status === 'active'
                              ? 'bg-[var(--success)]/20 text-[var(--success)]'
                              : 'bg-[var(--error)]/20 text-[var(--error)]'
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleScheduleClick(employee.id)}
                            className="px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px] text-sm font-medium"
                          >
                            Schedule
                          </button>
                          <button
                            type="button"
                            className="px-4 py-2 rounded-lg bg-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)]/30 transition-colors min-h-[44px] text-sm font-medium"
                          >
                            Payroll
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card variant="outlined" className="p-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Roster Calendar</h2>
            <CalendarGrid days={calendarDays} />
            <div className="mt-6">
              <button
                type="button"
                className="px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
              >
                Clone Schedule
              </button>
            </div>
          </Card>
        )}

        {/* Payroll Export */}
        <Card variant="outlined" className="p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Payroll Export</h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Export payroll data for the current month
              </p>
            </div>
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
            >
              Export CSV
            </button>
          </div>
        </Card>
      </div>

      {/* Schedule Modal */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => {
          setShowScheduleModal(false);
          setSelectedEmployee(null);
        }}
        title="Employee Schedule"
        size="lg"
      >
        <div className="space-y-4">
          {selectedEmployee && (
            <>
              <div>
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Employee</h3>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  {allEmployees.find((e) => e.id === selectedEmployee)?.name}
                </p>
              </div>
              <CalendarGrid days={calendarDays} />
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
                >
                  Save Schedule
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-medium hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
                >
                  Clone from Previous Week
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

