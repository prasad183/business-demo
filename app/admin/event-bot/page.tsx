'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function EventBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help you create events and promotions. What would you like to create?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I understand you want to create: "${input}". Let me generate some options for you...`,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Event Bot (AI)</h1>

        <Card variant="outlined" className="p-6 h-[600px] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--surface-light)] text-[var(--text-primary)]'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your event or promotion..."
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Send
            </button>
          </form>
        </Card>

        {/* Generated Assets Preview */}
        <Card variant="outlined" className="p-6 mt-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Generated Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { type: 'Title', value: 'Summer Special Event' },
              { type: 'Image', value: 'event-image.jpg' },
              { type: 'Copy', value: 'Join us for an amazing summer event...' },
            ].map((asset, index) => (
              <div key={index} className="p-4 bg-[var(--surface-light)] rounded-lg">
                <p className="text-xs text-[var(--text-secondary)] mb-2">{asset.type}</p>
                <p className="text-sm text-[var(--text-primary)]">{asset.value}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 w-full px-4 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
          >
            Save to Campaigns
          </button>
        </Card>
      </div>
    </div>
  );
}

