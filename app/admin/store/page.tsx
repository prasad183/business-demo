'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { storeProducts, StoreProduct } from '@/data/storeProducts';

export default function StoreManagerPage() {
  const [products, setProducts] = useState<StoreProduct[]>(storeProducts);
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowEditor(true);
  };

  const handleEdit = (product: StoreProduct) => {
    setSelectedProduct(product);
    setShowEditor(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Store Products Manager</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your product catalog</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px] flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Filters */}
        <Card variant="outlined" className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} variant="elevated" className="p-4 hover-lift">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">{product.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">{product.brand}</p>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--primary)]/20 text-[var(--primary)]">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xl font-bold text-[var(--text-primary)]">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[var(--text-muted)] line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--accent)]">⭐ {product.rating}</span>
                  <span className="text-[var(--text-secondary)]">({product.reviews} reviews)</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    product.inStock 
                      ? 'bg-[var(--success)]/20 text-[var(--success)]' 
                      : 'bg-[var(--error)]/20 text-[var(--error)]'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {product.fastDelivery && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--info)]/20 text-[var(--info)]">
                      ⚡ Fast Delivery
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(product)}
                  className="flex-1 px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px] text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  className="px-4 py-2 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px] text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card variant="outlined" className="p-12 text-center">
            <p className="text-[var(--text-secondary)]">No products found</p>
          </Card>
        )}

        {/* Product Editor Modal */}
        <Modal
          isOpen={showEditor}
          onClose={() => {
            setShowEditor(false);
            setSelectedProduct(null);
          }}
          title={selectedProduct ? 'Edit Product' : 'Add New Product'}
          size="lg"
        >
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">
              {selectedProduct 
                ? 'Product editing form will be available when backend is connected.'
                : 'Product creation form will be available when backend is connected.'}
            </p>
            <div className="p-4 rounded-lg bg-[var(--surface-light)] border border-[var(--border)]">
              <pre className="text-xs text-[var(--text-secondary)] overflow-auto">
                {selectedProduct ? JSON.stringify(selectedProduct, null, 2) : 'New product form'}
              </pre>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditor(false);
                  setSelectedProduct(null);
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
              >
                Close
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
              >
                {selectedProduct ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

