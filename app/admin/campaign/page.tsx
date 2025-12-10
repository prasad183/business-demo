'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Stepper } from '@/components/ui/Stepper';

export default function CampaignPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignData, setCampaignData] = useState({
    name: '',
    segment: '',
    channel: 'whatsapp',
    template: '',
    scheduleTime: '',
    abTest: false,
  });

  const steps = [
    { label: 'Select Segment' },
    { label: 'Choose Channel' },
    { label: 'Create Message' },
    { label: 'Schedule' },
  ];

  const segments = ['VIP', 'Regular', 'New', 'Churned', 'All'];
  const channels = [
    { id: 'whatsapp', name: 'WhatsApp', icon: '💬' },
    { id: 'sms', name: 'SMS', icon: '📱' },
    { id: 'email', name: 'Email', icon: '📧' },
  ];

  const templates = [
    { id: '1', name: 'Welcome Message', preview: 'Welcome to our salon! Get 20% off...' },
    { id: '2', name: 'Reminder', preview: 'Don\'t forget your appointment tomorrow...' },
    { id: '3', name: 'Promotion', preview: 'Special offer just for you...' },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Campaign Builder</h1>

        <Stepper steps={steps} currentStep={currentStep} />

        <Card variant="outlined" className="p-6 mt-6">
          {/* Step 1: Select Segment */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Select Segment</h2>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Target Segment</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {segments.map((segment) => (
                    <button
                      key={segment}
                      type="button"
                      onClick={() => setCampaignData({ ...campaignData, segment })}
                      className={`p-4 rounded-lg border-2 transition-colors min-h-[44px] ${
                        campaignData.segment === segment
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      <span className="font-medium text-[var(--text-primary)]">{segment}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Choose Channel */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Choose Channel</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setCampaignData({ ...campaignData, channel: channel.id })}
                    className={`p-6 rounded-lg border-2 transition-colors text-center ${
                      campaignData.channel === channel.id
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                        : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                    }`}
                  >
                    <div className="text-4xl mb-2">{channel.icon}</div>
                    <p className="font-medium text-[var(--text-primary)]">{channel.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Create Message */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Create Message</h2>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Template Gallery
                </label>
                <div className="space-y-2 mb-4">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setCampaignData({ ...campaignData, template: template.id })}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                        campaignData.template === template.id
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      <p className="font-medium text-[var(--text-primary)] mb-1">{template.name}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{template.preview}</p>
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[150px]"
                  placeholder="Or write your custom message..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="abTest"
                  checked={campaignData.abTest}
                  onChange={(e) => setCampaignData({ ...campaignData, abTest: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="abTest" className="text-sm text-[var(--text-primary)]">
                  Enable A/B Testing
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Schedule */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Schedule</h2>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Schedule Time
                </label>
                <input
                  type="datetime-local"
                  value={campaignData.scheduleTime}
                  onChange={(e) => setCampaignData({ ...campaignData, scheduleTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                />
              </div>
              <div className="p-4 bg-[var(--surface-light)] rounded-lg">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Campaign Summary</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-[var(--text-secondary)]">
                    Name: <span className="text-[var(--text-primary)]">{campaignData.name || 'N/A'}</span>
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    Segment: <span className="text-[var(--text-primary)]">{campaignData.segment || 'N/A'}</span>
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    Channel:{' '}
                    <span className="text-[var(--text-primary)]">
                      {channels.find((c) => c.id === campaignData.channel)?.name || 'N/A'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-6 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-semibold hover:bg-[var(--border)] transition-colors min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
              >
                Launch Campaign
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

