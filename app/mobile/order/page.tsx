'use client';

import React, { useState } from 'react';
import { AppBar } from '@/components/ui/AppBar';
import { BottomNav } from '@/components/ui/BottomNav';
import { Card } from '@/components/ui/Card';
import { OfflineBanner } from '@/components/ui/OfflineBanner';
import { catalogueItems } from '@/data/sampleData';

export default function MobileOrderPage() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<Array<{ id: string; quantity: number }>>([]);
  const [isOffline] = useState(false); // TODO: Bind to network status

  // TODO: Fetch from API
  const tables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5'];
  const menuItems = catalogueItems;

  const handleAddToOrder = (itemId: string) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { id: itemId, quantity: 1 }];
    });
  };

  const getItemQuantity = (itemId: string) => {
    return orderItems.find((i) => i.id === itemId)?.quantity || 0;
  };

  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = orderItems.reduce((sum, item) => {
    const menuItem = menuItems.find((m) => m.id === item.id);
    return sum + (menuItem?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20">
      <OfflineBanner isOffline={isOffline} />
      <AppBar title="Order Taking" showBack />

      <div className="px-4 py-6">
        {/* Table Selector */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Select Table</h2>
          <div className="grid grid-cols-3 gap-3">
            {tables.map((table) => (
              <button
                key={table}
                type="button"
                onClick={() => setSelectedTable(table)}
                className={`p-4 rounded-lg border-2 transition-colors min-h-[44px] ${
                  selectedTable === table
                    ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                    : 'border-[var(--border)] bg-[var(--surface-light)] text-[var(--text-primary)] hover:border-[var(--primary)]'
                }`}
              >
                {table}
              </button>
            ))}
          </div>
        </div>

        {/* Offline Queue Indicator */}
        {isOffline && (
          <Card variant="outlined" className="p-4 mb-6 bg-[var(--warning)]/10 border-[var(--warning)]">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[var(--warning)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm font-medium text-[var(--warning)]">
                Offline mode - Orders will sync when connection is restored
              </p>
            </div>
          </Card>
        )}

        {/* Menu List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Menu</h2>
          <div className="space-y-3">
            {menuItems.map((item) => {
              const quantity = getItemQuantity(item.id);
              return (
                <Card key={item.id} variant="outlined" className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-2 line-clamp-1">
                        {item.description}
                      </p>
                      <p className="text-lg font-bold text-[var(--primary)]">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      {quantity > 0 && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setOrderItems((prev) =>
                                prev
                                  .map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
                                  .filter((i) => i.quantity > 0)
                              );
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-light)] hover:bg-[var(--border)]"
                            aria-label="Decrease quantity"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-lg font-semibold text-[var(--text-primary)] w-8 text-center">
                            {quantity}
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleAddToOrder(item.id)}
                        className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                      >
                        {quantity > 0 ? '+' : 'Add'}
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        {totalItems > 0 && (
          <Card variant="elevated" className="p-4 sticky bottom-20 bg-[var(--surface)] border-2 border-[var(--primary)]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Total Items</p>
                <p className="text-xl font-bold text-[var(--text-primary)]">{totalItems}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[var(--text-secondary)]">Total Amount</p>
                <p className="text-2xl font-bold text-[var(--primary)]">₹{totalAmount}</p>
              </div>
            </div>
            <button
              type="button"
              className="w-full px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Place Order
            </button>
          </Card>
        )}
      </div>

      <BottomNav
        items={[
          { label: 'Home', icon: '🏠', href: '/mobile/home', active: false },
          { label: 'Orders', icon: '📝', href: '/mobile/order', active: true },
          { label: 'Schedule', icon: '📅', href: '/mobile/schedule', active: false },
          { label: 'Stock', icon: '📦', href: '/mobile/stock', active: false },
          { label: 'Profile', icon: '👤', href: '/mobile/profile', active: false },
        ]}
      />
    </div>
  );
}

