'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { services, Service } from '@/data/serviceData';

export default function ServiceManagerPage() {
  const [serviceList, setServiceList] = useState<Service[]>(services);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = Array.from(new Set(serviceList.map(s => s.category)));

  const filteredServices = serviceList.filter(service => {
    const matchesSearch = searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setSelectedService(null);
    setShowEditor(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setShowEditor(true);
  };

  const handleDelete = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServiceList(serviceList.filter(s => s.id !== serviceId));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Service Manager</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your service offerings</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px] flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Service
          </button>
        </div>

        {/* Filters */}
        <Card variant="outlined" className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search services..."
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredServices.map((service) => (
            <Card key={service.id} variant="elevated" className="p-4 hover-lift">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-4xl mb-2">{service.image}</div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">{service.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">{service.description}</p>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--accent)]/20 text-[var(--accent)]">
                    {service.category}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xl font-bold text-[var(--text-primary)]">₹{service.price}</span>
                  {service.originalPrice && (
                    <span className="text-sm text-[var(--text-muted)] line-through">
                      ₹{service.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm mb-2">
                  <span className="text-[var(--accent)]">⭐ {service.rating}</span>
                  <span className="text-[var(--text-secondary)]">({service.reviews} reviews)</span>
                  {service.duration > 0 && (
                    <span className="text-[var(--text-secondary)]">⏱️ {service.duration} min</span>
                  )}
                </div>
                {service.provider && (
                  <div className="mt-2 p-2 rounded bg-[var(--surface-light)]">
                    <p className="text-xs font-medium text-[var(--text-primary)]">{service.provider.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{service.provider.specialization}</p>
                  </div>
                )}
                {service.businessType && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--info)]/20 text-[var(--info)]">
                      {service.businessType === 'both' ? '📍 At Location / 🏠 Home Visit' : 
                       service.businessType === 'at-location' ? '📍 At Location' : '🏠 Home Visit'}
                    </span>
                    {service.pricingModel && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--primary)]/20 text-[var(--primary)]">
                        {service.pricingModel}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(service)}
                  className="flex-1 px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px] text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(service.id)}
                  className="px-4 py-2 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px] text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <Card variant="outlined" className="p-12 text-center">
            <p className="text-[var(--text-secondary)]">No services found</p>
          </Card>
        )}

        {/* Service Editor Modal */}
        <Modal
          isOpen={showEditor}
          onClose={() => {
            setShowEditor(false);
            setSelectedService(null);
          }}
          title={selectedService ? 'Edit Service' : 'Add New Service'}
          size="lg"
        >
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">
              {selectedService 
                ? 'Service editing form will be available when backend is connected.'
                : 'Service creation form will be available when backend is connected.'}
            </p>
            <div className="p-4 rounded-lg bg-[var(--surface-light)] border border-[var(--border)]">
              <pre className="text-xs text-[var(--text-secondary)] overflow-auto">
                {selectedService ? JSON.stringify(selectedService, null, 2) : 'New service form'}
              </pre>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditor(false);
                  setSelectedService(null);
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
              >
                Close
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-medium hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
              >
                {selectedService ? 'Save Changes' : 'Create Service'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

