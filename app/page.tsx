'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      
      if (userData) {
        try {
          const user = JSON.parse(userData);
          // Redirect based on user type
          if (user.type === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/user');
          }
        } catch (e) {
          // Invalid data, redirect to login
          router.push('/login');
        }
      } else {
        // No user data, redirect to login
        router.push('/login');
      }
    }
  }, [router]);

  // Show loading state while checking authentication
  return (
    <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
        <p className="text-[var(--text-secondary)]">Loading...</p>
      </div>
    </div>
  );
}
