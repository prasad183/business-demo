'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { transactions } from '@/data/sampleData';

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // TODO: Fetch from API
  const allTransactions = transactions;

  const handleViewInvoice = (transactionId: string) => {
    setSelectedTransaction(transactionId);
    setShowInvoiceModal(true);
  };

  const selectedTransactionData = allTransactions.find((t) => t.id === selectedTransaction);

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Transactions & Invoicing</h1>

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
                {allTransactions.map((transaction) => (
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
    </div>
  );
}

