'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

// Demo credentials - In production, this would be handled by a backend API
const DEMO_ADMIN_CREDENTIALS = [
  { email: 'admin@example.com', password: 'admin123', role: 'Owner', name: 'Admin User' },
  { email: 'manager@example.com', password: 'manager123', role: 'Manager', name: 'Manager User' },
  { email: 'accountant@example.com', password: 'accountant123', role: 'Accountant', name: 'Accountant User' },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = DEMO_ADMIN_CREDENTIALS.find((u) => u.email === email && u.password === password);

    if (user) {
      // Store user session
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify({ ...user, type: 'admin' }));
      }
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password. See credentials below.');
    }
  };

  const handleSendOTP = () => {
    setOtpSent(true);
    setError('');
    // For demo, auto-fill OTP
    setTimeout(() => {
      setOtp('123456');
    }, 500);
  };

  const handleOTPLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp === '123456') {
      const user = DEMO_ADMIN_CREDENTIALS.find((u) => u.email === email);
      if (user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify({ ...user, type: 'admin' }));
        }
        router.push('/admin/dashboard');
      } else {
        setError('Email not found. Please use a valid demo email.');
      }
    } else {
      setError('Invalid OTP. For demo, use: 123456');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center px-4">
      <Card variant="elevated" className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Admin Portal</h1>
          <p className="text-[var(--text-secondary)]">Sign in to access your dashboard</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-[var(--error)]/10 border border-[var(--error)] rounded-lg">
            <p className="text-sm text-[var(--error)]">{error}</p>
          </div>
        )}

        {/* Demo Credentials Info */}
        <div className="mb-6 p-4 bg-[var(--info)]/10 border border-[var(--info)] rounded-lg">
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">Demo Admin Credentials:</p>
          <div className="text-xs text-[var(--text-secondary)] space-y-1">
            <p>Admin: admin@example.com / admin123</p>
            <p>Manager: manager@example.com / manager123</p>
            <p>Accountant: accountant@example.com / accountant123</p>
            {loginMethod === 'otp' && <p className="mt-2 text-[var(--info)]">Demo OTP: 123456</p>}
          </div>
        </div>

        {/* Login Method Toggle */}
        <div className="flex gap-2 mb-6 bg-[var(--surface-light)] p-1 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setLoginMethod('password');
              setOtpSent(false);
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
              loginMethod === 'password'
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMethod('otp');
              setOtpSent(false);
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
              loginMethod === 'otp'
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            OTP
          </button>
        </div>

        {/* Password Login Form */}
        {loginMethod === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                required
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-[var(--text-secondary)]">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-[var(--primary)] hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
            >
              Sign In
            </button>
          </form>
        )}

        {/* OTP Login Form */}
        {loginMethod === 'otp' && (
          <form onSubmit={handleOTPLogin} className="space-y-4">
            <div>
              <label htmlFor="otp-email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Email or Phone
              </label>
              <input
                id="otp-email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                required
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                placeholder="admin@example.com or +91 9876543210"
              />
            </div>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOTP}
                className="w-full px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
              >
                Send OTP
              </button>
            ) : (
              <>
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setError('');
                    }}
                    required
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px] text-center text-2xl tracking-widest"
                    placeholder="000000"
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
                    Demo OTP: <span className="font-mono">123456</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors min-h-[44px]"
                >
                  Verify & Sign In
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface-light)] text-[var(--text-primary)] font-medium hover:bg-[var(--border)] transition-colors min-h-[44px]"
                >
                  Resend OTP
                </button>
              </>
            )}
          </form>
        )}

        <div className="mt-6 text-center space-y-2">
          <Link href="/login" className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] block">
            Switch to Customer Login
          </Link>
          <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] block">
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}

