'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { catalogueItems } from '@/data/sampleData';

interface CartItem {
  id: string;
  serviceId: string;
  quantity: number;
  variantId?: string;
  addOns?: string[];
}

export default function CartPage() {
  // TODO: Fetch from cart state/API
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', serviceId: '1', quantity: 1 },
    { id: '2', serviceId: '2', quantity: 1 },
  ]);
  const [couponCode, setCouponCode] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loyaltyPoints] = useState(150);

  const getCartItemDetails = (item: CartItem) => {
    const service = catalogueItems.find((s) => s.id === item.serviceId);
    return service;
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const service = getCartItemDetails(item);
    return sum + (service?.price || 0) * item.quantity;
  }, 0);

  const gst = subtotal * 0.18; // 18% GST
  const discount = 0; // TODO: Calculate from coupon
  const total = subtotal + gst - discount;

  const handleQuantityChange = (itemId: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center px-4">
        <EmptyState
          icon={
            <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          title="Your cart is empty"
          description="Add items to your cart to continue"
          action={{
            label: 'Browse Catalogue',
            onClick: () => window.location.href = '/catalogue',
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const service = getCartItemDetails(item);
              if (!service) return null;

              return (
                <Card key={item.id} variant="outlined" className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-[var(--surface-light)] rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                            {service.name}
                          </h3>
                          {service.duration && (
                            <p className="text-sm text-[var(--text-secondary)]">
                              {service.duration} minutes
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded hover:bg-[var(--surface-light)]"
                          aria-label="Remove item"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-light)] hover:bg-[var(--border)]"
                            aria-label="Decrease quantity"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-lg font-semibold text-[var(--text-primary)] w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-light)] hover:bg-[var(--border)]"
                            aria-label="Increase quantity"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <span className="text-xl font-bold text-[var(--primary)]">
                          ₹{service.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card variant="outlined" className="p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Order Summary</h2>

              {/* Loyalty Points */}
              <div className="mb-4 p-4 rounded-lg bg-[var(--accent)]/20 border border-[var(--accent)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[var(--text-primary)]">Loyalty Points</span>
                  <span className="text-sm font-bold text-[var(--accent)]">{loyaltyPoints} pts</span>
                </div>
                <button
                  type="button"
                  className="text-xs text-[var(--accent)] hover:underline"
                >
                  Use Points
                </button>
              </div>

              {/* Coupon */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4 pb-4 border-b border-[var(--border)]">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-[var(--text-primary)]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">GST (18%)</span>
                  <span className="text-[var(--text-primary)]">₹{gst.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-[var(--success)]">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold text-[var(--text-primary)]">Total</span>
                <span className="text-2xl font-bold text-[var(--primary)]">₹{total.toFixed(2)}</span>
              </div>

              <button
                type="button"
                onClick={() => setShowPaymentModal(true)}
                className="w-full px-6 py-4 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
              >
                Proceed to Checkout
              </button>
            </Card>
          </div>
        </div>

        {/* Receipt Preview */}
        <Card variant="outlined" className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Receipt Preview</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Invoice Number</span>
              <span className="text-[var(--text-primary)]">INV-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">GST Number</span>
              <span className="text-[var(--text-primary)]">27ABCDE1234F1Z5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">IRN</span>
              <span className="text-[var(--text-primary)]">Will be generated</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Payment"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Payment Method
            </label>
            <div className="space-y-2">
              {['UPI', 'Credit Card', 'Debit Card'].map((method) => (
                <button
                  key={method}
                  type="button"
                  className="w-full p-4 rounded-lg border-2 border-[var(--border)] bg-[var(--surface-light)] hover:border-[var(--primary)] transition-colors text-left"
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              className="w-full px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Pay ₹{total.toFixed(2)}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

