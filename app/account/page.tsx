'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { bookings, transactions } from '@/data/sampleData';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'invoices' | 'profile'>('bookings');
  const [upcomingBookings, pastBookings] = [
    bookings.filter((b) => b.status === 'upcoming'),
    bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled'),
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">My Account</h1>

        {/* Profile Card */}
        <Card variant="elevated" className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">John Doe</h2>
              <p className="text-sm text-[var(--text-secondary)]">john.doe@example.com</p>
              <p className="text-sm text-[var(--text-secondary)]">+91 98765 43210</p>
            </div>
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
          >
            Edit Profile
          </button>
        </Card>

        {/* Loyalty Widget */}
        <Card variant="outlined" className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Loyalty Points</h3>
              <p className="text-3xl font-bold text-[var(--accent)]">1,250</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">150 points to next tier</p>
            </div>
            <div className="text-4xl">🎁</div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[var(--border)]">
          {[
            { id: 'bookings' as const, label: 'Bookings' },
            { id: 'invoices' as const, label: 'Invoices' },
            { id: 'profile' as const, label: 'Profile' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium min-h-[44px] border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Upcoming</h2>
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} variant="outlined" className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                            {booking.serviceName}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)] mb-1">
                            Provider: {booking.providerName}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--info)]/20 text-[var(--info)]">
                            {booking.status}
                          </span>
                          <p className="text-lg font-bold text-[var(--primary)] mt-2">
                            ₹{booking.amount}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          className="flex-1 px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
                        >
                          Reschedule
                        </button>
                        <button
                          type="button"
                          className="flex-1 px-4 py-2 rounded-lg bg-[var(--error)]/20 text-[var(--error)] font-medium hover:bg-[var(--error)]/30 transition-colors min-h-[44px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Past</h2>
                <div className="space-y-3">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id} variant="outlined" className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                            {booking.serviceName}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)] mb-1">
                            Provider: {booking.providerName}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              booking.status === 'completed'
                                ? 'bg-[var(--success)]/20 text-[var(--success)]'
                                : 'bg-[var(--error)]/20 text-[var(--error)]'
                            }`}
                          >
                            {booking.status}
                          </span>
                          <p className="text-lg font-bold text-[var(--primary)] mt-2">
                            ₹{booking.amount}
                          </p>
                        </div>
                      </div>
                      {booking.status === 'completed' && (
                        <button
                          type="button"
                          className="mt-4 w-full px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
                        >
                          Book Again
                        </button>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {upcomingBookings.length === 0 && pastBookings.length === 0 && (
              <EmptyState
                title="No bookings yet"
                description="Start booking services to see them here"
                action={{
                  label: 'Browse Services',
                  onClick: () => window.location.href = '/catalogue',
                }}
              />
            )}
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div>
            {transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} variant="outlined" className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                          {transaction.invoiceId}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] mb-1">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        {transaction.irn && (
                          <p className="text-xs text-[var(--text-muted)]">IRN: {transaction.irn}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            transaction.status === 'success'
                              ? 'bg-[var(--success)]/20 text-[var(--success)]'
                              : 'bg-[var(--error)]/20 text-[var(--error)]'
                          }`}
                        >
                          {transaction.status}
                        </span>
                        <p className="text-lg font-bold text-[var(--primary)] mt-2">
                          ₹{transaction.amount}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mt-4 w-full px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
                    >
                      Download PDF
                    </button>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No invoices yet"
                description="Your invoices will appear here after bookings"
              />
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <Card variant="outlined" className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
                <button
                  type="button"
                  className="w-full px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                >
                  Save Changes
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

