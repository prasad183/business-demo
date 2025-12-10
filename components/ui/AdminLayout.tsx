'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
  role?: 'Owner' | 'Manager' | 'Accountant' | 'HR';
}

const navigationItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Store', href: '/admin/store', icon: '🛍️' },
  { name: 'Service', href: '/admin/service', icon: '💆' },
  { name: 'Space', href: '/admin/space', icon: '🏛️' },
  { name: 'CRM', href: '/admin/crm', icon: '👥' },
  { name: 'Employees', href: '/admin/employees', icon: '👤' },
  { name: 'Schedule', href: '/admin/schedule', icon: '📅' },
  { name: 'Bookings', href: '/admin/bookings', icon: '📋' },
  { name: 'Transactions', href: '/admin/transactions', icon: '💰' },
  { name: 'Reports', href: '/admin/reports', icon: '📈' },
  { name: 'Profile', href: '/admin/profile', icon: '⚙️' },
  { name: 'Integrations', href: '/admin/integrations', icon: '🔌' },
];

export function AdminLayout({ children, role = 'Owner' }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/login');
        return;
      }
      try {
        const parsed = JSON.parse(userData);
        // Check if user is admin
        if (parsed.type !== 'admin') {
          router.push('/user');
          return;
        }
        setUser(parsed);
      } catch (e) {
        router.push('/login');
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[var(--surface-light)] border-r border-[var(--border)] transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Admin Portal</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
                  isActive
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Role Badge */}
        {sidebarOpen && (
          <div className="p-4 border-t border-[var(--border)]">
            <div className="px-3 py-2 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium">
              Role: {role}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-[var(--surface-light)] border-b border-[var(--border)] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Back Button - Show when not on dashboard */}
              {pathname !== '/admin/dashboard' && (
                <button
                  onClick={() => router.back()}
                  className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-[var(--border)] transition-colors"
                  aria-label="Go back"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {/* Branch Selector */}
              <select className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]">
                <option>Main Branch</option>
                <option>Branch 2</option>
                <option>Branch 3</option>
              </select>

              {/* Date Range */}
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                />
                <span className="text-[var(--text-secondary)]">to</span>
                <input
                  type="date"
                  className="px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] min-h-[44px]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-[var(--border)] transition-colors min-h-[44px] min-w-[44px]"
                  aria-label="Notifications"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--error)] rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[var(--surface-light)] border border-[var(--border)] rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-[var(--border)]">
                      <h3 className="font-semibold text-[var(--text-primary)]">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[
                        { id: 1, message: 'New booking received', time: '5 min ago', type: 'info' },
                        { id: 2, message: 'Low stock alert', time: '1 hour ago', type: 'warning' },
                        { id: 3, message: 'Payment received', time: '2 hours ago', type: 'success' },
                      ].map((notif) => (
                        <div
                          key={notif.id}
                          className="p-4 border-b border-[var(--border)] hover:bg-[var(--border)] cursor-pointer"
                        >
                          <p className="text-sm text-[var(--text-primary)]">{notif.message}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile & Logout */}
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[var(--border)] transition-colors min-h-[44px]"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold">
                    {user?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  {sidebarOpen && (
                    <span className="text-[var(--text-primary)] font-medium">
                      {user?.name || 'Admin'}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

