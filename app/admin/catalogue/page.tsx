'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { catalogueItems } from '@/data/sampleData';

export default function CatalogueManagerPage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [metadata, setMetadata] = useState('');

  // TODO: Fetch from API
  const items = catalogueItems;

  const handleEdit = (itemId: string) => {
    setSelectedItem(itemId);
    const item = items.find((i) => i.id === itemId);
    // TODO: Load actual metadata
    if (item) {
      setMetadata(JSON.stringify(item, null, 2));
    }
    setShowEditor(true);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Catalogue Manager</h1>
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
          >
            Add New Item
          </button>
        </div>

        {/* Bulk Import */}
        <Card variant="outlined" className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Bulk Import</h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Import multiple items from CSV or JSON file
              </p>
            </div>
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
            >
              Import File
            </button>
          </div>
        </Card>

        {/* Items Table/List */}
        <Card variant="outlined" className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Duration
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-[var(--border)] hover:bg-[var(--surface-light)]">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{item.name}</p>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary)]/20 text-[var(--primary)]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-[var(--text-primary)]">₹{item.price}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-[var(--text-secondary)]">
                        {item.duration || '-'} {item.duration ? 'min' : ''}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item.id)}
                          className="px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px] text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px] text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Item Editor Modal */}
      <Modal
        isOpen={showEditor}
        onClose={() => {
          setShowEditor(false);
          setSelectedItem(null);
        }}
        title="Edit Item Metadata"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Metadata (JSON)
            </label>
            <textarea
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              className="w-full h-64 px-4 py-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-primary)] font-mono text-sm"
              readOnly
              aria-label="Item metadata in JSON format"
            />
            <p className="text-xs text-[var(--text-muted)] mt-2">
              This is a read-only preview. Full editing will be available when backend is connected.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setShowEditor(false);
                setSelectedItem(null);
              }}
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
            >
              Close
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

