'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { Toast } from '@/components/ui/Toast';
import { BackButton } from '@/components/ui/BackButton';
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal, clearCart, type CartItem } from '@/utils/cart';
import { storeProducts } from '@/data/storeProducts';
import { services } from '@/data/serviceData';
import { spaces } from '@/data/spaceData';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loyaltyPoints] = useState(150);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  // Load cart items from localStorage
  useEffect(() => {
    const loadCart = () => {
      setCartItems(getCart());
    };
    
    loadCart();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', loadCart);
    
    return () => {
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  const getCartItemDetails = (item: CartItem) => {
    if (item.type === 'product') {
      return storeProducts.find((p) => p.id === item.id);
    } else if (item.type === 'service') {
      return services.find((s) => s.id === item.id);
    } else if (item.type === 'space') {
      return spaces.find((sp) => sp.id === item.id);
    }
    return null;
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const details = getCartItemDetails(item);
    return sum + (details?.price || item.price || 0) * item.quantity;
  }, 0);

  const gst = subtotal * 0.18; // 18% GST
  const discount = 0; // TODO: Calculate from coupon
  const total = subtotal + gst - discount;

  const handleQuantityChange = (itemId: string, itemType: 'product' | 'service' | 'space', delta: number) => {
    const item = cartItems.find((i) => i.id === itemId && i.type === itemType);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      updateCartItemQuantity(itemId, itemType, newQuantity);
      // Update local state
      setCartItems(getCart());
    }
  };

  const handleRemove = (itemId: string, itemType: 'product' | 'service' | 'space') => {
    const item = cartItems.find((i) => i.id === itemId && i.type === itemType);
    removeFromCart(itemId, itemType);
    // Update local state
    setCartItems(getCart());
    if (item) {
      showToast(`${item.name} removed from cart`, 'info');
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />
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
              label: 'Browse Store',
              onClick: () => router.push('/user'),
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
      <div className="min-h-screen bg-[var(--surface)] px-4 py-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <BackButton />
            <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Shopping Cart</h1>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const details = getCartItemDetails(item);
              if (!details) return null;

              const displayPrice = 'price' in details ? details.price : item.price;
 
              return (
                <Card key={`${item.type}-${item.id}`} variant="outlined" className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-[var(--surface-light)] rounded-lg flex-shrink-0 flex items-center justify-center text-4xl">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-[var(--primary)]/20 text-[var(--primary)]">
                              {item.type === 'product' ? '🛍️ Product' : item.type === 'service' ? '💆 Service' : '🏛️ Space'}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                            {item.name}
                          </h3>
                          {item.type === 'service' && item.duration && (
                            <p className="text-sm text-[var(--text-secondary)]">
                              {item.duration} minutes
                            </p>
                          )}
                          {item.type === 'product' && item.brand && (
                            <p className="text-sm text-[var(--text-secondary)]">
                              Brand: {item.brand}
                            </p>
                          )}
                          {item.type === 'space' && item.location && (
                            <p className="text-sm text-[var(--text-secondary)]">
                              📍 {item.location}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id, item.type)}
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
                            onClick={() => handleQuantityChange(item.id, item.type, -1)}
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
                            onClick={() => handleQuantityChange(item.id, item.type, 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-light)] hover:bg-[var(--border)]"
                            aria-label="Increase quantity"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <div className="text-right">
                          {item.originalPrice && item.originalPrice > displayPrice && (
                            <p className="text-xs text-[var(--text-muted)] line-through mb-1">
                              ₹{item.originalPrice * item.quantity}
                            </p>
                          )}
                          <span className="text-xl font-bold text-[var(--primary)]">
                            ₹{(displayPrice * item.quantity).toLocaleString()}
                          </span>
                        </div>
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
    </>
  );
}

