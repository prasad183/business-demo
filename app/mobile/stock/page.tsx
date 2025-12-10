'use client';

import React, { useState } from 'react';
import { AppBar } from '@/components/ui/AppBar';
import { BottomNav } from '@/components/ui/BottomNav';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Stepper } from '@/components/ui/Stepper';
import { EmptyState } from '@/components/ui/EmptyState';

export default function MobileStockPage() {
  const [showScanModal, setShowScanModal] = useState(false);
  const [showCycleCount, setShowCycleCount] = useState(false);
  const [cycleCountStep, setCycleCountStep] = useState(0);

  // TODO: Fetch from API
  const stockItems = [
    { id: '1', name: 'Shampoo', sku: 'SH001', quantity: 45, lowStock: false },
    { id: '2', name: 'Conditioner', sku: 'CO001', quantity: 8, lowStock: true },
    { id: '3', name: 'Hair Gel', sku: 'HG001', quantity: 20, lowStock: false },
  ];

  const lowStockItems = stockItems.filter((item) => item.lowStock);

  const cycleCountSteps = [
    { label: 'Scan Items', description: 'Scan barcode/QR code' },
    { label: 'Enter Quantity', description: 'Input counted quantity' },
    { label: 'Confirm', description: 'Complete cycle count' },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20">
      <AppBar title="Stock Management" showBack />

      <div className="px-4 py-6 space-y-6">
        {/* Low Stock Banner */}
        {lowStockItems.length > 0 && (
          <Card variant="outlined" className="p-4 bg-[var(--warning)]/10 border-[var(--warning)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[var(--warning)] mb-1">Low Stock Alert</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {lowStockItems.length} item{lowStockItems.length !== 1 ? 's' : ''} running low
                </p>
              </div>
              <svg className="h-8 w-8 text-[var(--warning)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setShowScanModal(true)}
            className="p-6 rounded-lg bg-[var(--primary)] text-white text-center min-h-[44px]"
          >
            <div className="text-3xl mb-2">📷</div>
            <p className="font-semibold">Scan Barcode</p>
          </button>
          <button
            type="button"
            onClick={() => setShowCycleCount(true)}
            className="p-6 rounded-lg bg-[var(--accent)] text-[var(--neutral)] text-center min-h-[44px]"
          >
            <div className="text-3xl mb-2">📊</div>
            <p className="font-semibold">Cycle Count</p>
          </button>
        </div>

        {/* Stock List */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Current Stock</h2>
          {stockItems.length === 0 ? (
            <EmptyState
              title="No stock items"
              description="Add items to track inventory"
            />
          ) : (
            <div className="space-y-3">
              {stockItems.map((item) => (
                <Card key={item.id} variant="outlined" className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${item.lowStock ? 'text-[var(--warning)]' : 'text-[var(--primary)]'}`}>
                        {item.quantity}
                      </p>
                      {item.lowStock && (
                        <p className="text-xs text-[var(--warning)]">Low Stock</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scan Modal */}
      <Modal
        isOpen={showScanModal}
        onClose={() => setShowScanModal(false)}
        title="Scan Barcode/QR Code"
        size="md"
      >
        <div className="space-y-4">
          <div className="aspect-square bg-[var(--surface-light)] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">📷</div>
              <p className="text-[var(--text-secondary)]">Camera placeholder</p>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                TODO: Integrate barcode/QR scanner
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Or enter manually
            </label>
            <input
              type="text"
              placeholder="Enter barcode/QR code"
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
            />
          </div>
          <button
            type="button"
            className="w-full px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
          >
            Lookup Item
          </button>
        </div>
      </Modal>

      {/* Cycle Count Wizard */}
      <Modal
        isOpen={showCycleCount}
        onClose={() => {
          setShowCycleCount(false);
          setCycleCountStep(0);
        }}
        title="Cycle Count"
        size="md"
      >
        <div className="space-y-6">
          <Stepper steps={cycleCountSteps} currentStep={cycleCountStep} />

          {cycleCountStep === 0 && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Scan Items</h3>
              <div className="aspect-video bg-[var(--surface-light)] rounded-lg flex items-center justify-center mb-4">
                <p className="text-[var(--text-muted)]">Scanner placeholder</p>
              </div>
              <input
                type="text"
                placeholder="Or enter SKU manually"
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
          )}

          {cycleCountStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Enter Quantity</h3>
              <div className="space-y-3">
                {stockItems.slice(0, 2).map((item) => (
                  <div key={item.id} className="p-4 rounded-lg bg-[var(--surface-light)]">
                    <p className="font-medium text-[var(--text-primary)] mb-2">{item.name}</p>
                    <input
                      type="number"
                      defaultValue={item.quantity}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {cycleCountStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Confirm</h3>
              <Card variant="outlined" className="p-4">
                <p className="text-sm text-[var(--text-secondary)] mb-2">Cycle count completed</p>
                <p className="text-lg font-semibold text-[var(--text-primary)]">2 items counted</p>
              </Card>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
            {cycleCountStep > 0 && (
              <button
                type="button"
                onClick={() => setCycleCountStep(cycleCountStep - 1)}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (cycleCountStep < cycleCountSteps.length - 1) {
                  setCycleCountStep(cycleCountStep + 1);
                } else {
                  setShowCycleCount(false);
                  setCycleCountStep(0);
                }
              }}
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              {cycleCountStep === cycleCountSteps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </Modal>

      <BottomNav
        items={[
          { label: 'Home', icon: '🏠', href: '/mobile/home', active: false },
          { label: 'Orders', icon: '📝', href: '/mobile/order', active: false },
          { label: 'Schedule', icon: '📅', href: '/mobile/schedule', active: false },
          { label: 'Stock', icon: '📦', href: '/mobile/stock', active: true },
          { label: 'Profile', icon: '👤', href: '/mobile/profile', active: false },
        ]}
      />
    </div>
  );
}

