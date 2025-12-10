'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { BackButton } from '@/components/ui/BackButton';
import { catalogueItems } from '@/data/sampleData';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  // TODO: Fetch from API
  const categories = ['all', 'Hair Services', 'Skincare', 'Nail Care'];

  const filteredItems = catalogueItems.filter((item) => {
    const matchesSearch = searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Update URL with search params
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <BackButton fallbackPath="/user" />
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Search</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services, products..."
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              aria-label="Search"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Category</h2>
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

        {/* Results */}
        <div>
          {searchTerm && (
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          )}

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title={searchTerm ? 'No results found' : 'Start searching'}
              description={
                searchTerm
                  ? 'Try different keywords or adjust your filters'
                  : 'Enter a search term to find services and products'
              }
              action={
                searchTerm
                  ? {
                      label: 'Clear Search',
                      onClick: () => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      },
                    }
                  : undefined
              }
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
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <Skeleton height={60} className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} height={250} className="rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

