'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpend: number;
  visits: number;
  lastVisit: string;
  segment: string;
  churnRisk: 'low' | 'medium' | 'high';
}

export default function CRMPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const customers: Customer[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543210',
      totalSpend: 45000,
      visits: 12,
      lastVisit: '2024-01-15',
      segment: 'VIP',
      churnRisk: 'low',
    },
    {
      id: '2',
      name: 'Raj Kumar',
      email: 'raj@example.com',
      phone: '+91 9876543211',
      totalSpend: 12000,
      visits: 5,
      lastVisit: '2023-12-20',
      segment: 'Regular',
      churnRisk: 'high',
    },
    {
      id: '3',
      name: 'Anita Patel',
      email: 'anita@example.com',
      phone: '+91 9876543212',
      totalSpend: 28000,
      visits: 8,
      lastVisit: '2024-01-10',
      segment: 'Regular',
      churnRisk: 'medium',
    },
  ];

  const segments = ['all', 'VIP', 'Regular', 'New', 'Churned'];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesSegment = selectedSegment === 'all' || customer.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const handleViewProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowProfile(true);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">CRM Dashboard</h1>
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
          >
            Create Campaign
          </button>
        </div>

        {/* Filters */}
        <Card variant="outlined" className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customers..."
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
            />
            <div className="flex gap-2">
              {segments.map((segment) => (
                <button
                  key={segment}
                  type="button"
                  onClick={() => setSelectedSegment(segment)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] capitalize ${
                    selectedSegment === segment
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--surface-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {segment}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Customer Table */}
        <Card variant="outlined" className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Total Spend</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Visits</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Segment</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Churn Risk</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--surface-light)]"
                  >
                    <td className="py-4 px-4">
                      <p className="font-medium text-[var(--text-primary)]">{customer.name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-[var(--text-secondary)]">{customer.email}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{customer.phone}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-[var(--text-primary)]">₹{customer.totalSpend.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-[var(--text-primary)]">{customer.visits}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary)]/20 text-[var(--primary)]">
                        {customer.segment}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          customer.churnRisk === 'low'
                            ? 'bg-[var(--success)]/20 text-[var(--success)]'
                            : customer.churnRisk === 'medium'
                            ? 'bg-[var(--warning)]/20 text-[var(--warning)]'
                            : 'bg-[var(--error)]/20 text-[var(--error)]'
                        }`}
                      >
                        {customer.churnRisk}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleViewProfile(customer)}
                        className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors min-h-[44px] text-sm font-medium"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Segments Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {['VIP', 'Regular', 'New', 'Churned'].map((segment) => {
            const count = customers.filter((c) => c.segment === segment).length;
            return (
              <Card key={segment} variant="outlined" className="p-4">
                <p className="text-sm text-[var(--text-secondary)] mb-1">{segment}</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{count}</p>
              </Card>
            );
          })}
        </div>

        {/* Customer Profile Modal */}
        <Modal
          isOpen={showProfile}
          onClose={() => {
            setShowProfile(false);
            setSelectedCustomer(null);
          }}
          title={selectedCustomer?.name || 'Customer Profile'}
          size="lg"
        >
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Email</p>
                  <p className="text-[var(--text-primary)]">{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Phone</p>
                  <p className="text-[var(--text-primary)]">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Total Spend</p>
                  <p className="text-[var(--text-primary)] font-semibold">
                    ₹{selectedCustomer.totalSpend.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Total Visits</p>
                  <p className="text-[var(--text-primary)]">{selectedCustomer.visits}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Timeline</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-[var(--surface-light)] rounded-lg">
                    <p className="text-sm text-[var(--text-primary)]">Last visit: {selectedCustomer.lastVisit}</p>
                    <p className="text-xs text-[var(--text-muted)]">Service: Haircut & Styling</p>
                  </div>
                  <div className="p-3 bg-[var(--surface-light)] rounded-lg">
                    <p className="text-sm text-[var(--text-primary)]">Visit on: 2024-01-10</p>
                    <p className="text-xs text-[var(--text-muted)]">Service: Facial Treatment</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

