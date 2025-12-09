'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Stepper } from '@/components/ui/Stepper';

export default function SuppliersPage() {
  const [showPOModal, setShowPOModal] = useState(false);
  const [showGRNModal, setShowGRNModal] = useState(false);
  const [grnStep, setGrnStep] = useState(0);

  // TODO: Fetch from API
  const suppliers = [
    { id: 's1', name: 'Beauty Supplies Co.', contact: '+91 98765 43210', email: 'contact@beautysupplies.com', status: 'active' },
    { id: 's2', name: 'Hair Products Ltd.', contact: '+91 98765 43211', email: 'info@hairproducts.com', status: 'active' },
    { id: 's3', name: 'Cosmetic Distributors', contact: '+91 98765 43212', email: 'sales@cosmetic.com', status: 'inactive' },
  ];

  const grnSteps = [
    { label: 'Select Items', description: 'Choose items to receive' },
    { label: 'Verify Quantity', description: 'Check received quantities' },
    { label: 'Confirm', description: 'Complete GRN' },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Suppliers & Procurement</h1>
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
          >
            Add Supplier
          </button>
        </div>

        {/* Supplier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} variant="outlined" className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {supplier.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">{supplier.email}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{supplier.contact}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    supplier.status === 'active'
                      ? 'bg-[var(--success)]/20 text-[var(--success)]'
                      : 'bg-[var(--error)]/20 text-[var(--error)]'
                  }`}
                >
                  {supplier.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPOModal(true)}
                  className="flex-1 px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px] text-sm"
                >
                  Create PO
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px] text-sm"
                >
                  View Orders
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Purchase Order Modal */}
      <Modal
        isOpen={showPOModal}
        onClose={() => setShowPOModal(false)}
        title="Create Purchase Order"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Supplier
            </label>
            <select className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]">
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Items
            </label>
            <div className="space-y-2">
              {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    defaultValue={item}
                    className="flex-1 px-4 py-2 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    className="w-24 px-4 py-2 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 text-sm text-[var(--primary)] hover:underline"
            >
              + Add Item
            </button>
          </div>
          <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={() => setShowPOModal(false)}
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Create PO
            </button>
          </div>
        </div>
      </Modal>

      {/* GRN Receiving Wizard */}
      <Modal
        isOpen={showGRNModal}
        onClose={() => {
          setShowGRNModal(false);
          setGrnStep(0);
        }}
        title="GRN Receiving"
        size="lg"
      >
        <div className="space-y-6">
          <Stepper steps={grnSteps} currentStep={grnStep} />

          {grnStep === 0 && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Select Items</h3>
              <div className="space-y-2">
                {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-[var(--surface-light)] cursor-pointer hover:bg-[var(--border)] transition-colors"
                  >
                    <input type="checkbox" className="h-5 w-5" />
                    <span className="text-[var(--text-primary)] font-medium">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {grnStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Verify Quantity</h3>
              <div className="space-y-3">
                {['Item 1', 'Item 2'].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-[var(--surface-light)]">
                    <span className="text-[var(--text-primary)] font-medium">{item}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[var(--text-secondary)]">Ordered: 10</span>
                      <input
                        type="number"
                        defaultValue="10"
                        className="w-20 px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {grnStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Confirm GRN</h3>
              <Card variant="outlined" className="p-4">
                <p className="text-sm text-[var(--text-secondary)] mb-2">Items received successfully</p>
                <p className="text-lg font-semibold text-[var(--text-primary)]">Total: 20 items</p>
              </Card>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
            {grnStep > 0 && (
              <button
                type="button"
                onClick={() => setGrnStep(grnStep - 1)}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (grnStep < grnSteps.length - 1) {
                  setGrnStep(grnStep + 1);
                } else {
                  setShowGRNModal(false);
                  setGrnStep(0);
                }
              }}
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              {grnStep === grnSteps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </Modal>

      {/* GRN Button */}
      <div className="max-w-7xl mx-auto mt-6">
        <Card variant="outlined" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Goods Receipt Note (GRN)</h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Receive goods from suppliers and update inventory
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowGRNModal(true)}
              className="px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
            >
              Start GRN
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

