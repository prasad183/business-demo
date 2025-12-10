'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Drawer } from '@/components/ui/Drawer';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { BackButton } from '@/components/ui/BackButton';
import { catalogueItems } from '@/data/sampleData';

export default function CataloguePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading] = useState(false);
  const [cartCount] = useState(0); // TODO: Bind to cart state

  // TODO: Fetch from API
  const categories = ['all', 'Hair Services', 'Skincare', 'Nail Care'];
  const tags = ['popular', 'styling', 'skincare', 'premium', 'care'];

  const filteredItems = catalogueItems.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
    if (selectedTags.length > 0 && !selectedTags.some((tag) => item.tags.includes(tag))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--surface)] border-b border-[var(--border)] px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton fallbackPath="/user" />
            <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Catalogue</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-[var(--surface-light)] transition-colors"
              aria-label="Open filters"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-lg hover:bg-[var(--surface-light)] transition-colors"
              aria-label="View cart"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Drawer */}
      <Drawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Filters"
        position="bottom"
      >
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </h3>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSelectedTags((prev) =>
                      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                    );
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-[var(--accent)] text-[var(--neutral)]'
                      : 'bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setPriceRange([0, 5000]);
              setSelectedTags([]);
            }}
            className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
          >
            Clear All Filters
          </button>
        </div>
      </Drawer>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} height={250} className="rounded-lg" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <EmptyState
            icon={
              <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            }
            title="No items found"
            description="Try adjusting your filters to see more results"
            action={{
              label: 'Clear Filters',
              onClick: () => {
                setSelectedCategory('all');
                setPriceRange([0, 5000]);
                setSelectedTags([]);
              },
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Link key={item.id} href={`/catalogue/${item.id}`}>
                <Card variant="elevated" className="p-4 hover:scale-105 transition-transform">
                  <div className="aspect-video bg-[var(--surface-light)] rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-[var(--text-muted)]">Image</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[var(--primary)]">
                      ₹{item.price}
                    </span>
                    {item.duration && (
                      <span className="text-sm text-[var(--text-muted)]">
                        {item.duration} min
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Sticky Mini Cart (Mobile) */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-0 right-0 z-30 px-4 md:hidden">
          <Link
            href="/cart"
            className="block rounded-lg bg-[var(--primary)] text-white p-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{cartCount} items in cart</span>
              <span className="text-lg font-bold">View Cart →</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

