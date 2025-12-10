'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'error';
  category: 'payment' | 'logistics' | 'messaging' | 'social';
}

export default function IntegrationsPage() {
  const [integrations] = useState<Integration[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment gateway for online transactions',
      icon: '💳',
      status: 'connected',
      category: 'payment',
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'UPI and card payments',
      icon: '💵',
      status: 'connected',
      category: 'payment',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Send notifications and messages',
      icon: '💬',
      status: 'connected',
      category: 'messaging',
    },
    {
      id: 'sms',
      name: 'SMS Gateway',
      description: 'Text message notifications',
      icon: '📱',
      status: 'disconnected',
      category: 'messaging',
    },
    {
      id: 'delhivery',
      name: 'Delhivery',
      description: 'Logistics and shipping',
      icon: '🚚',
      status: 'disconnected',
      category: 'logistics',
    },
    {
      id: 'google',
      name: 'Google Reviews',
      description: 'Manage reviews and ratings',
      icon: '⭐',
      status: 'error',
      category: 'social',
    },
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState('');

  const handleTestConnection = (integration: Integration) => {
    // TODO: Test connection
    console.log('Testing connection for:', integration.name);
  };

  const handleSaveCredentials = () => {
    // TODO: Save credentials
    console.log('Saving credentials for:', selectedIntegration?.name);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Integrations</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {integrations.map((integration) => (
            <Card key={integration.id} variant="outlined" className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{integration.icon}</span>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{integration.name}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{integration.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    integration.status === 'connected'
                      ? 'bg-[var(--success)]/20 text-[var(--success)]'
                      : integration.status === 'error'
                      ? 'bg-[var(--error)]/20 text-[var(--error)]'
                      : 'bg-[var(--warning)]/20 text-[var(--warning)]'
                  }`}
                >
                  {integration.status === 'connected'
                    ? 'Connected'
                    : integration.status === 'error'
                    ? 'Error'
                    : 'Disconnected'}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIntegration(integration);
                    setApiKey('');
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px] text-sm font-medium"
                >
                  Configure
                </button>
                <button
                  type="button"
                  onClick={() => handleTestConnection(integration)}
                  className="flex-1 px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors min-h-[44px] text-sm font-medium"
                >
                  Test
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Configuration Modal */}
        {selectedIntegration && (
          <Card variant="elevated" className="p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Configure {selectedIntegration.name}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedIntegration(null)}
                className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors min-h-[44px] min-w-[44px]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  API Key / Secret Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px] font-mono"
                    placeholder="Enter API key (masked)"
                  />
                  <button
                    type="button"
                    className="px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors min-h-[44px]"
                    aria-label="Toggle visibility"
                  >
                    👁️
                  </button>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Your API key is encrypted and stored securely
                </p>
              </div>

              {selectedIntegration.category === 'payment' && (
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                    placeholder="https://yourdomain.com/webhook"
                  />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleSaveCredentials}
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                >
                  Save Credentials
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIntegration(null)}
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

