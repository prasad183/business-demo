'use client';

import React, { useState } from 'react';
import { AppBar } from '@/components/ui/AppBar';
import { BottomNav } from '@/components/ui/BottomNav';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

export default function MobileProfilePage() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [geofenceStatus] = useState<'inside' | 'outside'>('inside');

  // TODO: Fetch from API
  const leaves = [
    { id: '1', type: 'Sick Leave', date: '2024-01-10', status: 'approved' },
    { id: '2', type: 'Personal Leave', date: '2024-01-15', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20">
      <AppBar title="Profile" showBack />

      <div className="px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card variant="elevated" className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">John Doe</h2>
              <p className="text-sm text-[var(--text-secondary)]">Hair Specialist</p>
              <p className="text-sm text-[var(--text-secondary)]">Employee ID: E001</p>
            </div>
          </div>
        </Card>

        {/* Clock In/Out */}
        <Card variant="outlined" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Attendance</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {isClockedIn ? 'Clocked in at 9:00 AM' : 'Not clocked in'}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              geofenceStatus === 'inside'
                ? 'bg-[var(--success)]/20 text-[var(--success)]'
                : 'bg-[var(--warning)]/20 text-[var(--warning)]'
            }`}>
              {geofenceStatus === 'inside' ? '📍 In Location' : '📍 Out of Location'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsClockedIn(!isClockedIn)}
            disabled={geofenceStatus === 'outside'}
            className={`w-full px-6 py-4 rounded-lg font-semibold transition-colors min-h-[44px] ${
              isClockedIn
                ? 'bg-[var(--error)] text-white hover:bg-[var(--error)]/90'
                : geofenceStatus === 'inside'
                ? 'bg-[var(--success)] text-white hover:bg-[var(--success)]/90'
                : 'bg-[var(--surface-light)] text-[var(--text-muted)] cursor-not-allowed'
            }`}
          >
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </button>
          {geofenceStatus === 'outside' && (
            <p className="text-xs text-[var(--warning)] mt-2 text-center">
              You must be at the workplace to clock in/out
            </p>
          )}
        </Card>

        {/* Leaves */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Leaves</h2>
            <button
              type="button"
              onClick={() => setShowLeaveModal(true)}
              className="text-sm text-[var(--primary)] hover:underline font-medium"
            >
              Request Leave
            </button>
          </div>
          <div className="space-y-3">
            {leaves.map((leave) => (
              <Card key={leave.id} variant="outlined" className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] mb-1">{leave.type}</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {new Date(leave.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      leave.status === 'approved'
                        ? 'bg-[var(--success)]/20 text-[var(--success)]'
                        : 'bg-[var(--warning)]/20 text-[var(--warning)]'
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Payslip */}
        <Card variant="outlined" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Payslip</h3>
              <p className="text-sm text-[var(--text-secondary)]">January 2024</p>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              View
            </button>
          </div>
        </Card>
      </div>

      {/* Leave Request Modal */}
      <Modal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        title="Request Leave"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Leave Type
            </label>
            <select className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]">
              <option>Sick Leave</option>
              <option>Personal Leave</option>
              <option>Vacation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Reason
            </label>
            <textarea
              placeholder="Enter reason for leave"
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[100px]"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={() => setShowLeaveModal(false)}
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Submit Request
            </button>
          </div>
        </div>
      </Modal>

      <BottomNav
        items={[
          { label: 'Home', icon: '🏠', href: '/mobile/home', active: false },
          { label: 'Orders', icon: '📝', href: '/mobile/order', active: false },
          { label: 'Schedule', icon: '📅', href: '/mobile/schedule', active: false },
          { label: 'Stock', icon: '📦', href: '/mobile/stock', active: false },
          { label: 'Profile', icon: '👤', href: '/mobile/profile', active: true },
        ]}
      />
    </div>
  );
}

