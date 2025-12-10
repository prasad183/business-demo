'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

export default function BusinessProfilePage() {
  const [formData, setFormData] = useState({
    legalName: 'Beauty Salon Pvt Ltd',
    gstin: '27ABCDE1234F1Z5',
    pan: 'ABCDE1234F',
    bankName: 'HDFC Bank',
    accountNumber: '1234567890123',
    ifsc: 'HDFC0001234',
    branchName: 'Mumbai Main',
  });

  const [branches, setBranches] = useState([
    { id: 1, name: 'Main Branch', address: '123 Main St, Mumbai', isActive: true },
    { id: 2, name: 'Branch 2', address: '456 Park Ave, Mumbai', isActive: true },
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Business Profile</h1>

        {/* Legal Information */}
        <Card variant="outlined" className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Legal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Legal Name
              </label>
              <input
                type="text"
                value={formData.legalName}
                onChange={(e) => handleInputChange('legalName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">GSTIN</label>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => handleInputChange('gstin', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                maxLength={15}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">PAN</label>
              <input
                type="text"
                value={formData.pan}
                onChange={(e) => handleInputChange('pan', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                maxLength={10}
              />
            </div>
          </div>
        </Card>

        {/* Bank Details */}
        <Card variant="outlined" className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Bank Name</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Account Number</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">IFSC Code</label>
              <input
                type="text"
                value={formData.ifsc}
                onChange={(e) => handleInputChange('ifsc', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Branch Name</label>
              <input
                type="text"
                value={formData.branchName}
                onChange={(e) => handleInputChange('branchName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
          </div>
        </Card>

        {/* Branch List */}
        <Card variant="outlined" className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Branches</h2>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Add Branch
            </button>
          </div>
          <div className="space-y-3">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="p-4 bg-[var(--surface-light)] rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-[var(--text-primary)]">{branch.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{branch.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      branch.isActive
                        ? 'bg-[var(--success)]/20 text-[var(--success)]'
                        : 'bg-[var(--error)]/20 text-[var(--error)]'
                    }`}
                  >
                    {branch.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px] text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Geofence Map */}
        <Card variant="outlined" className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Geofence Map</h2>
          <div className="h-96 bg-[var(--surface-light)] rounded-lg flex items-center justify-center border border-[var(--border)]">
            <div className="text-center">
              <p className="text-[var(--text-muted)] mb-2">Map Widget Placeholder</p>
              <p className="text-sm text-[var(--text-secondary)]">Draw polygon to set geofence boundary</p>
              <button
                type="button"
                className="mt-4 px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
              >
                Draw Geofence
              </button>
            </div>
          </div>
        </Card>

        {/* Invoice & Tax Settings */}
        <Card variant="outlined" className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Invoice & Tax Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                HSN/SAC Codes
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[100px]"
                placeholder="Enter HSN/SAC codes (one per line)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Invoice Template Preview
              </label>
              <div className="p-4 bg-[var(--surface-light)] rounded-lg border border-[var(--border)]">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">INVOICE</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Invoice #INV-001</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Date:</span>
                    <span className="text-[var(--text-primary)]">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Amount:</span>
                    <span className="text-[var(--text-primary)]">₹1,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">GST (18%):</span>
                    <span className="text-[var(--text-primary)]">₹180.00</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-[var(--border)] pt-2 mt-2">
                    <span className="text-[var(--text-primary)]">Total:</span>
                    <span className="text-[var(--text-primary)]">₹1,180.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-semibold hover:bg-[var(--border)] transition-colors min-h-[44px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

