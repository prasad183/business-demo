'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { spaces, Space } from '@/data/spaceData';

export default function SpaceManagerPage() {
  const [spaceList, setSpaceList] = useState<Space[]>(spaces);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = Array.from(new Set(spaceList.map(s => s.category)));

  const filteredSpaces = spaceList.filter(space => {
    const matchesSearch = searchQuery === '' || 
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || space.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setSelectedSpace(null);
    setShowEditor(true);
  };

  const handleEdit = (space: Space) => {
    setSelectedSpace(space);
    setShowEditor(true);
  };

  const handleDelete = (spaceId: string) => {
    if (confirm('Are you sure you want to delete this space?')) {
      setSpaceList(spaceList.filter(s => s.id !== spaceId));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Space Manager</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your venues and spaces</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="px-6 py-3 rounded-lg bg-[var(--info)] text-white font-semibold hover:bg-[var(--info)]/90 transition-colors min-h-[44px] flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Space
          </button>
        </div>

        {/* Filters */}
        <Card variant="outlined" className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px] min-w-[200px]"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredSpaces.map((space) => (
            <Card key={space.id} variant="elevated" className="p-4 hover-lift">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-4xl mb-2">{space.image}</div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">{space.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)] mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {space.location}
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--info)]/20 text-[var(--info)]">
                    {space.category}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xl font-bold text-[var(--text-primary)]">₹{space.price.toLocaleString()}</span>
                  {space.originalPrice && (
                    <span className="text-sm text-[var(--text-muted)] line-through">
                      ₹{space.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm mb-2">
                  <span className="text-[var(--accent)]">⭐ {space.rating}</span>
                  <span className="text-[var(--text-secondary)]">({space.reviews} reviews)</span>
                  {space.capacity && (
                    <span className="text-[var(--text-secondary)]">👥 {space.capacity} {space.type === 'hotel' ? 'guests' : 'people'}</span>
                  )}
                </div>
                {space.type && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--primary)]/20 text-[var(--primary)]">
                      {space.type}
                    </span>
                    {space.businessType && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--info)]/20 text-[var(--info)]">
                        {space.businessType === 'seat-sale' ? '🎫 Seat Sale' : '🏛️ Space Rental'}
                      </span>
                    )}
                    {space.pricingModel && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--accent)]/20 text-[var(--accent)]">
                        {space.pricingModel}
                      </span>
                    )}
                    {space.seatMapRequired && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--warning)]/20 text-[var(--warning)]">
                        🗺️ Seat Map
                      </span>
                    )}
                  </div>
                )}
                {space.amenities && space.amenities.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-[var(--text-secondary)] mb-1">Amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {space.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-[var(--surface-light)] text-[var(--text-secondary)]">
                          {amenity}
                        </span>
                      ))}
                      {space.amenities.length > 3 && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--surface-light)] text-[var(--text-secondary)]">
                          +{space.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(space)}
                  className="flex-1 px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px] text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(space.id)}
                  className="px-4 py-2 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px] text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filteredSpaces.length === 0 && (
          <Card variant="outlined" className="p-12 text-center">
            <p className="text-[var(--text-secondary)]">No spaces found</p>
          </Card>
        )}

        {/* Space Editor Modal */}
        <Modal
          isOpen={showEditor}
          onClose={() => {
            setShowEditor(false);
            setSelectedSpace(null);
          }}
          title={selectedSpace ? 'Edit Space' : 'Add New Space'}
          size="lg"
        >
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">
              {selectedSpace 
                ? 'Space editing form will be available when backend is connected.'
                : 'Space creation form will be available when backend is connected.'}
            </p>
            <div className="p-4 rounded-lg bg-[var(--surface-light)] border border-[var(--border)]">
              <pre className="text-xs text-[var(--text-secondary)] overflow-auto">
                {selectedSpace ? JSON.stringify(selectedSpace, null, 2) : 'New space form'}
              </pre>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditor(false);
                  setSelectedSpace(null);
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
              >
                Close
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--info)] text-white font-medium hover:bg-[var(--info)]/90 transition-colors min-h-[44px]"
              >
                {selectedSpace ? 'Save Changes' : 'Create Space'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

