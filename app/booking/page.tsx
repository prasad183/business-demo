'use client';

import React, { useState } from 'react';
import { Stepper } from '@/components/ui/Stepper';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { CalendarGrid } from '@/components/ui/CalendarGrid';
import { catalogueItems, providers } from '@/data/sampleData';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const steps = [
    { label: 'Select Service', description: 'Choose a service' },
    { label: 'Select Provider', description: 'Choose your provider' },
    { label: 'Select Time', description: 'Pick date & time' },
    { label: 'Payment', description: 'Complete payment' },
  ];

  // Generate calendar days
  const generateDays = React.useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date,
        isAvailable: i < 10, // First 10 days available
        slots: (i % 5) + 1, // Deterministic slot count
      });
    }
    return days;
  }, []);

  const calendarDays = generateDays;
  const selectedProviderData = providers.find((p) => p.id === selectedProvider);
  const availableSlots = selectedProviderData?.availableSlots || [];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Book a Service</h1>

        <Stepper steps={steps} currentStep={currentStep} className="mb-8" />

        {/* Step 1: Select Service */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Select Service</h2>
            <div className="space-y-3">
              {catalogueItems.map((item) => (
                <Card
                  key={item.id}
                  variant="outlined"
                  onClick={() => {
                    setSelectedService(item.id);
                    setTimeout(handleNext, 300);
                  }}
                  className={`p-4 cursor-pointer ${
                    selectedService === item.id ? 'border-[var(--primary)] border-2' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[var(--primary)]">₹{item.price}</p>
                      {item.duration && (
                        <p className="text-sm text-[var(--text-muted)]">{item.duration} min</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Provider */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Select Provider</h2>
            <div className="space-y-3">
              {providers.map((provider) => (
                <Card
                  key={provider.id}
                  variant="outlined"
                  onClick={() => {
                    setSelectedProvider(provider.id);
                    setTimeout(handleNext, 300);
                  }}
                  className={`p-4 cursor-pointer ${
                    selectedProvider === provider.id ? 'border-[var(--primary)] border-2' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                        {provider.name}
                      </h3>
                      {provider.specialization && (
                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                          {provider.specialization}
                        </p>
                      )}
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-[var(--text-secondary)]">{provider.rating}</span>
                      </div>
                    </div>
                    {selectedProvider === provider.id && (
                      <svg className="h-6 w-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Time */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Select Date & Time</h2>
            
            <div className="mb-6">
              <CalendarGrid
                days={calendarDays}
                onDayClick={(day) => setSelectedDate(day.date)}
                month={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              />
            </div>

            {selectedDate && (
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Available Time Slots</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedTime(slot);
                        setTimeout(handleNext, 300);
                      }}
                      className={`p-3 rounded-lg border-2 transition-colors min-h-[44px] ${
                        selectedTime === slot
                          ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                          : 'border-[var(--border)] bg-[var(--surface-light)] text-[var(--text-primary)] hover:border-[var(--primary)]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Payment */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Payment</h2>
            
            <Card variant="outlined" className="p-6 mb-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Service</span>
                  <span className="text-[var(--text-primary)] font-medium">
                    {catalogueItems.find((i) => i.id === selectedService)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Provider</span>
                  <span className="text-[var(--text-primary)] font-medium">
                    {selectedProviderData?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Date & Time</span>
                  <span className="text-[var(--text-primary)] font-medium">
                    {selectedDate?.toLocaleDateString()} at {selectedTime}
                  </span>
                </div>
                <div className="border-t border-[var(--border)] pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-[var(--text-primary)]">Total</span>
                    <span className="text-xl font-bold text-[var(--primary)]">
                      ₹{catalogueItems.find((i) => i.id === selectedService)?.price || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="outlined" className="p-6 mb-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Policy Summary</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li>• Cancellation allowed up to 24 hours before appointment</li>
                <li>• Rescheduling available based on availability</li>
                <li>• Refund processed within 5-7 business days</li>
              </ul>
            </Card>

            <div className="mb-4">
              <p className="text-sm text-[var(--text-muted)] mb-2">
                Offline queue fallback: If payment fails, your booking will be queued for manual processing.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPaymentModal(true)}
              className="w-full px-6 py-4 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Proceed to Payment
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-medium min-h-[44px] transition-colors ${
              currentStep === 0
                ? 'bg-[var(--surface-light)] text-[var(--text-muted)] cursor-not-allowed'
                : 'bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)]'
            }`}
          >
            Back
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Payment"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Payment Method
            </label>
            <div className="space-y-2">
              {['UPI', 'Credit Card', 'Debit Card', 'Net Banking'].map((method) => (
                <button
                  key={method}
                  type="button"
                  className="w-full p-4 rounded-lg border-2 border-[var(--border)] bg-[var(--surface-light)] hover:border-[var(--primary)] transition-colors text-left"
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              className="w-full px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Pay ₹{catalogueItems.find((i) => i.id === selectedService)?.price || 0}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

