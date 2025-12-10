'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

export default function PromoPage() {
  const [promoData, setPromoData] = useState({
    title: '',
    description: '',
    discount: '',
    validFrom: '',
    validTo: '',
  });

  const [generatedAssets, setGeneratedAssets] = useState<{
    title: string;
    images: string[];
    copies: string[];
  } | null>(null);

  const handleGenerate = () => {
    // TODO: Call AI to generate assets
    setGeneratedAssets({
      title: 'Summer Special - 30% Off',
      images: ['image1.jpg', 'image2.jpg'],
      copies: [
        'Beat the heat with our summer special! Get 30% off on all services.',
        'Limited time offer - Book now and save!',
      ],
    });
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Promo Generator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card variant="outlined" className="p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Promo Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Title</label>
                <input
                  type="text"
                  value={promoData.title}
                  onChange={(e) => setPromoData({ ...promoData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  placeholder="e.g., Summer Special"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Description</label>
                <textarea
                  value={promoData.description}
                  onChange={(e) => setPromoData({ ...promoData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[100px]"
                  placeholder="Describe your promotion..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Discount (%)</label>
                <input
                  type="number"
                  value={promoData.discount}
                  onChange={(e) => setPromoData({ ...promoData, discount: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Valid From</label>
                  <input
                    type="date"
                    value={promoData.validFrom}
                    onChange={(e) => setPromoData({ ...promoData, validFrom: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Valid To</label>
                  <input
                    type="date"
                    value={promoData.validTo}
                    onChange={(e) => setPromoData({ ...promoData, validTo: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                className="w-full px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
              >
                Generate Assets (AI)
              </button>
            </div>
          </Card>

          {/* Generated Assets */}
          <Card variant="outlined" className="p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Generated Assets</h2>
            {generatedAssets ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Title</label>
                  <div className="p-4 bg-[var(--surface-light)] rounded-lg">
                    <p className="text-[var(--text-primary)] font-semibold">{generatedAssets.title}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Images</label>
                  <div className="grid grid-cols-2 gap-2">
                    {generatedAssets.images.map((img, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-[var(--surface-light)] rounded-lg flex items-center justify-center border border-[var(--border)]"
                      >
                        <span className="text-[var(--text-muted)] text-sm">{img}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Copy Variations</label>
                  <div className="space-y-2">
                    {generatedAssets.copies.map((copy, index) => (
                      <div key={index} className="p-3 bg-[var(--surface-light)] rounded-lg">
                        <p className="text-sm text-[var(--text-primary)]">{copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
                >
                  Save to Campaigns
                </button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <p className="text-[var(--text-muted)] mb-4">No assets generated yet</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Fill in the promo details and click "Generate Assets" to create AI-powered marketing materials
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

