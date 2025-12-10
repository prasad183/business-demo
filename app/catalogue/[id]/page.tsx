'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { BackButton } from '@/components/ui/BackButton';
import { catalogueItems, providers } from '@/data/sampleData';

export default function CatalogueDetailPage() {
  const params = useParams();
  const itemId = params.id as string;
  
  // TODO: Fetch from API
  const item = catalogueItems.find((i) => i.id === itemId);
  const [selectedVariant, setSelectedVariant] = useState(item?.variants?.[0]?.id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
            Item not found
          </h1>
          <Link
            href="/catalogue"
            className="text-[var(--primary)] hover:underline"
          >
            Back to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariantPrice = item.variants?.find((v) => v.id === selectedVariant)?.price || item.price;
  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const addOn = item.addOns?.find((a) => a.id === addOnId);
    return sum + (addOn?.price || 0);
  }, 0);
  const totalPrice = (selectedVariantPrice + addOnsTotal) * quantity;

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--surface)] border-b border-[var(--border)] px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <BackButton fallbackPath="/catalogue" />
          <h1 className="text-xl font-semibold text-[var(--text-primary)] flex-1">
            {item.name}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Gallery */}
        <div className="mb-6">
          <div className="aspect-video bg-[var(--surface-light)] rounded-lg flex items-center justify-center mb-4">
            <span className="text-[var(--text-muted)] text-lg">Product Image Gallery</span>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-20 h-20 bg-[var(--surface-light)] rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Price Block */}
        <Card variant="outlined" className="p-6 mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-1">Starting from</p>
              <p className="text-3xl font-bold text-[var(--primary)]">₹{selectedVariantPrice}</p>
            </div>
            {item.duration && (
              <div className="text-right">
                <p className="text-sm text-[var(--text-secondary)]">Duration</p>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  {item.duration} minutes
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Description</h2>
          <p className="text-[var(--text-secondary)]">{item.description}</p>
        </div>

        {/* Variant Picker */}
        {item.variants && item.variants.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Select Variant</h2>
            <div className="flex flex-wrap gap-3">
              {item.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`px-6 py-3 rounded-lg font-medium min-h-[44px] transition-colors ${
                    selectedVariant === variant.id
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] border border-[var(--border)]'
                  }`}
                >
                  {variant.name} - ₹{variant.price}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add-ons */}
        {item.addOns && item.addOns.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Add-ons</h2>
            <div className="space-y-2">
              {item.addOns.map((addOn) => (
                <label
                  key={addOn.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-[var(--surface-light)] cursor-pointer hover:bg-[var(--border)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addOn.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAddOns([...selectedAddOns, addOn.id]);
                        } else {
                          setSelectedAddOns(selectedAddOns.filter((id) => id !== addOn.id));
                        }
                      }}
                      className="h-5 w-5"
                    />
                    <span className="text-[var(--text-primary)] font-medium">{addOn.name}</span>
                  </div>
                  <span className="text-[var(--primary)] font-semibold">+₹{addOn.price}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Provider Selector */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Select Provider</h2>
          <button
            type="button"
            onClick={() => setShowProviderModal(true)}
            className="w-full p-4 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors text-left"
          >
            {selectedProvider ? (
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-primary)]">
                  {providers.find((p) => p.id === selectedProvider)?.name}
                </span>
                <span className="text-[var(--text-secondary)]">Change</span>
              </div>
            ) : (
              <span className="text-[var(--text-secondary)]">Select a provider</span>
            )}
          </button>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Quantity</h2>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--surface-light)] hover:bg-[var(--border)] transition-colors"
              aria-label="Decrease quantity"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-xl font-semibold text-[var(--text-primary)] w-12 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--surface-light)] hover:bg-[var(--border)] transition-colors"
              aria-label="Increase quantity"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] border-t border-[var(--border)] p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Total</p>
            <p className="text-2xl font-bold text-[var(--primary)]">₹{totalPrice}</p>
          </div>
          <button
            type="button"
            className="px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Provider Modal */}
      <Modal
        isOpen={showProviderModal}
        onClose={() => setShowProviderModal(false)}
        title="Select Provider"
      >
        <div className="space-y-3">
          {providers.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => {
                setSelectedProvider(provider.id);
                setShowProviderModal(false);
              }}
              className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                selectedProvider === provider.id
                  ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                  : 'border-[var(--border)] bg-[var(--surface-light)] hover:border-[var(--primary)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{provider.name}</p>
                  {provider.specialization && (
                    <p className="text-sm text-[var(--text-secondary)]">{provider.specialization}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    <svg className="h-4 w-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-[var(--text-secondary)]">{provider.rating}</span>
                  </div>
                </div>
                {selectedProvider === provider.id && (
                  <svg className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

