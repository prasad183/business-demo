'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { transactions } from '@/data/sampleData';

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [refundType, setRefundType] = useState<'booking' | 'order' | 'ticket'>('booking');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // TODO: Fetch from API
  const allTransactions = transactions;

  const handleViewInvoice = (transactionId: string) => {
    setSelectedTransaction(transactionId);
    setShowInvoiceModal(true);
  };

  const handleRefund = (transactionId: string) => {
    setSelectedTransaction(transactionId);
    setShowRefundModal(true);
  };

  const handleProcessRefund = () => {
    // TODO: Process refund
    console.log('Processing refund:', { selectedTransaction, refundReason });
    setShowRefundModal(false);
    setRefundReason('');
  };

  const selectedTransactionData = allTransactions.find((t) => t.id === selectedTransaction);

  const filteredTransactions = allTransactions.filter((t) => {
    // Note: refundType filter is for UI, transaction.type is 'payment' | 'refund'
    // TODO: Add date range filtering
    return true; // Simplified filter for now
  });

  return (
    <div className="min-h-screen bg-[var(--surface)] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Transactions & Refunds</h1>

        {/* Filters */}
        <Card variant="outlined" className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Type</label>
              <select
                value={refundType}
                onChange={(e) => setRefundType(e.target.value as 'booking' | 'order' | 'ticket')}
                className="px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              >
                <option value="booking">Booking</option>
                <option value="order">Order</option>
                <option value="ticket">Ticket</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              >
                <option value="all">All</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="cash">Cash</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Date From</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Date To</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors min-h-[44px]"
              >
                Export CSV
              </button>
            </div>
          </div>
        </Card>

        <Card variant="outlined" className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Transaction ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Invoice
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--surface-light)]"
                  >
                    <td className="py-4 px-4">
                      <p className="font-medium text-[var(--text-primary)]">{transaction.id}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'payment'
                            ? 'bg-[var(--success)]/20 text-[var(--success)]'
                            : 'bg-[var(--warning)]/20 text-[var(--warning)]'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-[var(--text-primary)]">₹{transaction.amount}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-[var(--text-secondary)]">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'success'
                            ? 'bg-[var(--success)]/20 text-[var(--success)]'
                            : transaction.status === 'pending'
                            ? 'bg-[var(--warning)]/20 text-[var(--warning)]'
                            : 'bg-[var(--error)]/20 text-[var(--error)]'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {transaction.invoiceId ? (
                        <button
                          type="button"
                          onClick={() => handleViewInvoice(transaction.id)}
                          className="text-[var(--primary)] hover:underline text-sm font-medium"
                        >
                          {transaction.invoiceId}
                        </button>
                      ) : (
                        <span className="text-sm text-[var(--text-muted)]">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {transaction.type === 'payment' && transaction.status === 'success' && (
                        <button
                          type="button"
                          onClick={() => handleRefund(transaction.id)}
                          className="px-4 py-2 rounded-lg bg-[var(--warning)]/20 text-[var(--warning)] hover:bg-[var(--warning)]/30 transition-colors min-h-[44px] text-sm font-medium"
                        >
                          Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Invoice Detail Modal */}
      <Modal
        isOpen={showInvoiceModal}
        onClose={() => {
          setShowInvoiceModal(false);
          setSelectedTransaction(null);
        }}
        title="Invoice Details"
        size="lg"
      >
        {selectedTransactionData && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Invoice ID</h3>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  {selectedTransactionData.invoiceId || 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Transaction ID</h3>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  {selectedTransactionData.id}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Amount</h3>
                <p className="text-lg font-semibold text-[var(--primary)]">
                  ₹{selectedTransactionData.amount}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">GST (18%)</h3>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  ₹{selectedTransactionData.gst || 0}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">GST Number</h3>
              <p className="text-lg font-semibold text-[var(--text-primary)]">27ABCDE1234F1Z5</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">IRN (Invoice Reference Number)</h3>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {selectedTransactionData.irn || 'Not generated yet'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Date</h3>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {new Date(selectedTransactionData.date).toLocaleDateString()}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex gap-3">
              <button
                type="button"
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
              >
                Download PDF
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
              >
                Print
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Refund Modal */}
      <Modal
        isOpen={showRefundModal}
        onClose={() => {
          setShowRefundModal(false);
          setSelectedTransaction(null);
          setRefundReason('');
        }}
        title="Process Refund"
        size="lg"
      >
        {selectedTransactionData && (
          <div className="space-y-4">
            <div className="p-4 bg-[var(--surface-light)] rounded-lg">
              <p className="text-sm text-[var(--text-secondary)] mb-1">Transaction ID</p>
              <p className="font-semibold text-[var(--text-primary)]">{selectedTransactionData.id}</p>
              <p className="text-sm text-[var(--text-secondary)] mb-1 mt-2">Amount</p>
              <p className="font-semibold text-[var(--text-primary)]">₹{selectedTransactionData.amount}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Refund Reason
              </label>
              <select
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
              >
                <option value="">Select reason</option>
                <option value="customer_request">Customer Request</option>
                <option value="service_issue">Service Issue</option>
                <option value="cancellation">Cancellation</option>
                <option value="duplicate">Duplicate Transaction</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="p-4 bg-[var(--info)]/10 border border-[var(--info)] rounded-lg">
              <p className="text-sm text-[var(--text-primary)]">
                <strong>Refund Policy:</strong> Full refunds are processed within 5-7 business days. Partial refunds
                may apply based on service completion.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowRefundModal(false);
                  setSelectedTransaction(null);
                  setRefundReason('');
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProcessRefund}
                disabled={!refundReason}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--error)] text-white font-medium hover:bg-[var(--error)]/90 transition-colors min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Process Refund
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

