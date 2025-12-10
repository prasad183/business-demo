'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

type TabType = 'services' | 'packages' | 'products';

export default function CatalogueFormPage() {
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: '',
    durations: [''],
    basePrice: '',
    addOns: [''],
    contraindications: '',
    allergens: '',
    aftercare: '',
    requiredSkills: '',
    roomRequirements: '',
    bufferTime: '',
  });

  const [productForm, setProductForm] = useState({
    sku: '',
    name: '',
    variants: [{ size: '', color: '' }],
    supplier: '',
    reorderPoint: '',
    leadTime: '',
    hasExpiry: false,
  });

  const [packageForm, setPackageForm] = useState({
    name: '',
    includedServices: [''],
    validityDays: '',
    discount: '',
    renewalRules: '',
  });

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Catalogue Manager</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[var(--surface-light)] p-1 rounded-lg">
          {(['services', 'packages', 'products'] as TabType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors min-h-[44px] capitalize ${
                activeTab === tab
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Services Form */}
        {activeTab === 'services' && (
          <Card variant="outlined" className="p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Service Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Name</label>
                  <input
                    type="text"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Category</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  >
                    <option value="">Select category</option>
                    <option value="hair">Hair Services</option>
                    <option value="skincare">Skincare</option>
                    <option value="nail">Nail Care</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Durations (minutes)
                </label>
                {serviceForm.durations.map((duration, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => {
                        const newDurations = [...serviceForm.durations];
                        newDurations[index] = e.target.value;
                        setServiceForm({ ...serviceForm, durations: newDurations });
                      }}
                      className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                      placeholder="Duration in minutes"
                    />
                    {serviceForm.durations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newDurations = serviceForm.durations.filter((_, i) => i !== index);
                          setServiceForm({ ...serviceForm, durations: newDurations });
                        }}
                        className="px-4 py-3 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px]"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setServiceForm({ ...serviceForm, durations: [...serviceForm.durations, ''] })
                  }
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  + Add Duration
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Base Price (₹)</label>
                <input
                  type="number"
                  value={serviceForm.basePrice}
                  onChange={(e) => setServiceForm({ ...serviceForm, basePrice: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Add-ons</label>
                {serviceForm.addOns.map((addOn, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={addOn}
                      onChange={(e) => {
                        const newAddOns = [...serviceForm.addOns];
                        newAddOns[index] = e.target.value;
                        setServiceForm({ ...serviceForm, addOns: newAddOns });
                      }}
                      className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                      placeholder="Add-on name"
                    />
                    {serviceForm.addOns.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newAddOns = serviceForm.addOns.filter((_, i) => i !== index);
                          setServiceForm({ ...serviceForm, addOns: newAddOns });
                        }}
                        className="px-4 py-3 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px]"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setServiceForm({ ...serviceForm, addOns: [...serviceForm.addOns, ''] })}
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  + Add Add-on
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Contraindications
                  </label>
                  <textarea
                    value={serviceForm.contraindications}
                    onChange={(e) => setServiceForm({ ...serviceForm, contraindications: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Allergens</label>
                  <textarea
                    value={serviceForm.allergens}
                    onChange={(e) => setServiceForm({ ...serviceForm, allergens: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[100px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Aftercare</label>
                <textarea
                  value={serviceForm.aftercare}
                  onChange={(e) => setServiceForm({ ...serviceForm, aftercare: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Required Skills
                  </label>
                  <input
                    type="text"
                    value={serviceForm.requiredSkills}
                    onChange={(e) => setServiceForm({ ...serviceForm, requiredSkills: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                    placeholder="e.g., Massage, Facial"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Room Requirements
                  </label>
                  <input
                    type="text"
                    value={serviceForm.roomRequirements}
                    onChange={(e) => setServiceForm({ ...serviceForm, roomRequirements: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                    placeholder="e.g., Private room, Steam"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Buffer Time (minutes)
                </label>
                <input
                  type="number"
                  value={serviceForm.bufferTime}
                  onChange={(e) => setServiceForm({ ...serviceForm, bufferTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Metadata (JSON Editor)
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[200px] font-mono text-sm"
                  placeholder='{"customField": "value"}'
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                >
                  Save Service
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-semibold hover:bg-[var(--border)] transition-colors min-h-[44px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Packages Form */}
        {activeTab === 'packages' && (
          <Card variant="outlined" className="p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Package/Membership Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Name</label>
                <input
                  type="text"
                  value={packageForm.name}
                  onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Included Services
                </label>
                {packageForm.includedServices.map((service, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => {
                        const newServices = [...packageForm.includedServices];
                        newServices[index] = e.target.value;
                        setPackageForm({ ...packageForm, includedServices: newServices });
                      }}
                      className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                      placeholder="Service name"
                    />
                    {packageForm.includedServices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newServices = packageForm.includedServices.filter((_, i) => i !== index);
                          setPackageForm({ ...packageForm, includedServices: newServices });
                        }}
                        className="px-4 py-3 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px]"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setPackageForm({ ...packageForm, includedServices: [...packageForm.includedServices, ''] })
                  }
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  + Add Service
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Validity Days
                  </label>
                  <input
                    type="number"
                    value={packageForm.validityDays}
                    onChange={(e) => setPackageForm({ ...packageForm, validityDays: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Discount (%)</label>
                  <input
                    type="number"
                    value={packageForm.discount}
                    onChange={(e) => setPackageForm({ ...packageForm, discount: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Renewal Rules</label>
                <textarea
                  value={packageForm.renewalRules}
                  onChange={(e) => setPackageForm({ ...packageForm, renewalRules: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[100px]"
                  placeholder="Auto-renew, Manual renewal, etc."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                >
                  Save Package
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-semibold hover:bg-[var(--border)] transition-colors min-h-[44px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Products Form */}
        {activeTab === 'products' && (
          <Card variant="outlined" className="p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Retail Product Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">SKU</label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Name</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Variants</label>
                {productForm.variants.map((variant, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => {
                        const newVariants = [...productForm.variants];
                        newVariants[index] = { ...newVariants[index], size: e.target.value };
                        setProductForm({ ...productForm, variants: newVariants });
                      }}
                      className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                      placeholder="Size"
                    />
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => {
                        const newVariants = [...productForm.variants];
                        newVariants[index] = { ...newVariants[index], color: e.target.value };
                        setProductForm({ ...productForm, variants: newVariants });
                      }}
                      className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                      placeholder="Color"
                    />
                    {productForm.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newVariants = productForm.variants.filter((_, i) => i !== index);
                          setProductForm({ ...productForm, variants: newVariants });
                        }}
                        className="px-4 py-3 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px]"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setProductForm({
                      ...productForm,
                      variants: [...productForm.variants, { size: '', color: '' }],
                    })
                  }
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  + Add Variant
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Supplier</label>
                  <input
                    type="text"
                    value={productForm.supplier}
                    onChange={(e) => setProductForm({ ...productForm, supplier: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Reorder Point
                  </label>
                  <input
                    type="number"
                    value={productForm.reorderPoint}
                    onChange={(e) => setProductForm({ ...productForm, reorderPoint: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Lead Time (days)</label>
                  <input
                    type="number"
                    value={productForm.leadTime}
                    onChange={(e) => setProductForm({ ...productForm, leadTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  />
                </div>
                <div className="flex items-center gap-2 pt-8">
                  <input
                    type="checkbox"
                    id="hasExpiry"
                    checked={productForm.hasExpiry}
                    onChange={(e) => setProductForm({ ...productForm, hasExpiry: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="hasExpiry" className="text-sm text-[var(--text-primary)]">
                    Enable Batch/Expiry Tracking
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                >
                  Save Product
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-semibold hover:bg-[var(--border)] transition-colors min-h-[44px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

