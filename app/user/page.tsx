'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { OfflineBanner } from '@/components/ui/OfflineBanner';
import { storeProducts, categories as storeCategories, StoreProduct } from '@/data/storeProducts';
import { spaces, spaceCategories, Space } from '@/data/spaceData';
import { services, serviceCategories, Service } from '@/data/serviceData';
import { getCartCount, addToCart as addItemToCart } from '@/utils/cart';
import { Toast } from '@/components/ui/Toast';

type CategoryType = 'store' | 'service' | 'space' | null;

const mainCategories = [
  {
    id: 'store' as const,
    title: 'Store',
    description: 'Shop products like Amazon - Browse and buy items online',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: 'from-[var(--primary)] to-[#0a6269]',
    href: '/catalogue',
    features: ['Product Catalog', 'Shopping Cart', 'Secure Checkout', 'Product Reviews'],
  },
  {
    id: 'service' as const,
    title: 'Service',
    description: 'Book services like Salon - Haircuts, facials, and more',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    gradient: 'from-[var(--accent)] to-[#e8b04f]',
    href: '/booking',
    features: ['Service Booking', 'Provider Selection', 'Time Slots', 'Service Packages'],
  },
  {
    id: 'space' as const,
    title: 'Space',
    description: 'Book spaces like Tickets, Hotels - Movies, rooms, venues',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
    gradient: 'from-[var(--info)] to-[#2563eb]',
    href: '/shows',
    features: ['Ticket Booking', 'Hotel Reservations', 'Seat Selection', 'Venue Booking'],
  },
];

export default function UserPortal() {
  const router = useRouter();
  const [isOffline] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/login');
        return;
      }
      try {
        const parsedUser = JSON.parse(userData);
        // If admin tries to access user portal, redirect to admin
        if (parsedUser.type === 'admin') {
          router.push('/admin/dashboard');
          return;
        }
        setUser(parsedUser);
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (e) {
        router.push('/login');
      }
    }
  }, [router]);
  
  // Store state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoreCategory, setSelectedStoreCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating'>('relevance');
  const [cartCount, setCartCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  // Load cart count on mount and listen for updates
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };
    
    // Initial load
    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);
  
  // Service booking state
  const [serviceBookingCount, setServiceBookingCount] = useState(0);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  // Space booking state
  const [spaceBookingCount, setSpaceBookingCount] = useState(0);
  
  // Service state
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('all');
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [servicePriceRange, setServicePriceRange] = useState<[number, number]>([0, 10000]);
  const [serviceSortBy, setServiceSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating' | 'duration'>('relevance');
  const [showServiceFilters, setShowServiceFilters] = useState(false);
  
  // Space state
  const [selectedSpaceCategory, setSelectedSpaceCategory] = useState('all');
  const [spaceSearchQuery, setSpaceSearchQuery] = useState('');
  const [spacePriceRange, setSpacePriceRange] = useState<[number, number]>([0, 200000]);
  const [spaceSortBy, setSpaceSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating'>('relevance');
  const [showSpaceFilters, setShowSpaceFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = storeProducts.filter((product) => {
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesCategory =
        selectedStoreCategory === 'all' ||
        product.category.toLowerCase() === selectedStoreCategory.toLowerCase();
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedStoreCategory, priceRange, sortBy]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleAddToCart = (productId: string) => {
    const product = storeProducts.find((p) => p.id === productId);
    if (!product) {
      showToast('Product not found', 'error');
      return;
    }

    addItemToCart({
      id: product.id,
      type: 'product',
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      brand: product.brand,
      seller: product.seller,
    });

    // Update cart count
    setCartCount(getCartCount());
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleAddServiceToCart = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) {
      showToast('Service not found', 'error');
      return;
    }

    addItemToCart({
      id: service.id,
      type: 'service',
      name: service.name,
      price: service.price,
      originalPrice: service.originalPrice,
      discount: service.discount,
      image: service.image,
      duration: service.duration,
      provider: service.provider,
    });

    // Update cart count
    setCartCount(getCartCount());
    showToast(`${service.name} added to cart!`, 'success');
  };

  const handleAddSpaceToCart = (spaceId: string) => {
    const space = spaces.find((s) => s.id === spaceId);
    if (!space) {
      showToast('Space not found', 'error');
      return;
    }

    addItemToCart({
      id: space.id,
      type: 'space',
      name: space.name,
      price: space.price,
      originalPrice: space.originalPrice,
      discount: space.discount,
      image: space.image,
      location: space.location,
      capacity: space.capacity,
    });

    // Update cart count
    setCartCount(getCartCount());
    showToast(`${space.name} added to cart!`, 'success');
  };

  // Service filtering - must be at top level (hooks rule)
  const filteredServices = useMemo(() => {
    if (selectedCategory !== 'service' || !services || !Array.isArray(services)) return [];
    let filtered = services.filter((service) => {
      if (!service || !service.id) return false;
      const matchesSearch = serviceSearchQuery
        ? service.name.toLowerCase().includes(serviceSearchQuery.toLowerCase()) ||
          service.category.toLowerCase().includes(serviceSearchQuery.toLowerCase())
        : true;
      
      let matchesCategory = true;
      if (selectedServiceCategory !== 'all') {
        const categoryMap: Record<string, string> = {
          'spa': 'Spa',
          'salon': 'Salon',
          'fitness': 'Fitness Center',
          'ride-sharing': 'Ride-Sharing',
          'hair': 'Hair Services',
          'skincare': 'Skincare',
          'nail': 'Nail Care',
          'wellness': 'Wellness',
          'beauty': 'Beauty',
        };
        const targetCategory = categoryMap[selectedServiceCategory] || selectedServiceCategory;
        matchesCategory = service.category.toLowerCase().includes(targetCategory.toLowerCase());
      }
      
      const matchesPrice = service.price >= servicePriceRange[0] && service.price <= servicePriceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (serviceSortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return a.duration - b.duration;
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, serviceSearchQuery, selectedServiceCategory, servicePriceRange, serviceSortBy, services]);

  // Space filtering - must be at top level (hooks rule)
  const filteredSpaces = useMemo(() => {
    if (selectedCategory !== 'space' || !spaces || !Array.isArray(spaces)) return [];
    let filtered = spaces.filter((space) => {
      if (!space || !space.id) return false;
      const matchesSearch = spaceSearchQuery
        ? space.name.toLowerCase().includes(spaceSearchQuery.toLowerCase()) ||
          space.location.toLowerCase().includes(spaceSearchQuery.toLowerCase())
        : true;
      let matchesCategory = true;
      if (selectedSpaceCategory !== 'all') {
        if (selectedSpaceCategory === 'movie-theater') {
          matchesCategory = space.type === 'movie-theater';
        } else if (selectedSpaceCategory === 'convention-hall') {
          matchesCategory = space.type === 'convention-hall';
        } else if (selectedSpaceCategory === 'function-hall') {
          matchesCategory = space.type === 'function-hall';
        } else if (selectedSpaceCategory === 'concert-venue') {
          matchesCategory = space.type === 'concert-venue';
        } else {
          matchesCategory = space.type === selectedSpaceCategory;
        }
      }
      const matchesPrice = space.price >= spacePriceRange[0] && space.price <= spacePriceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (spaceSortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, spaceSearchQuery, selectedSpaceCategory, spacePriceRange, spaceSortBy, spaces]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Show only category cards if authenticated and no category selected
  if (isAuthenticated && !selectedCategory) {
    return (
      <>
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />
        <div className="min-h-screen bg-[var(--surface)] flex">
        <OfflineBanner isOffline={isOffline} />
        
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } bg-[var(--surface-light)] border-r border-[var(--border)] transition-all duration-300 flex flex-col fixed left-0 top-0 bottom-0 z-40`}
        >
          {/* Logo */}
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            {sidebarOpen && (
              <Link href="/user" onClick={() => setSelectedCategory(null)} className="text-xl font-bold text-gradient-primary">
                MSME Portal
              </Link>
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

          {/* User Profile */}
          <div className="p-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#0a6269] flex items-center justify-center text-white font-semibold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{user?.email || 'user@example.com'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {mainCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
                  selectedCategory === category.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                {sidebarOpen && <span className="font-medium">{category.title}</span>}
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[var(--border)] space-y-2">
            <Link
              href="/account"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {sidebarOpen && <span className="font-medium">My Account</span>}
            </Link>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('user');
                  router.push('/login');
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Hero Section - Enhanced Design */}
        <section className="relative px-4 py-20 md:py-32 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 via-[var(--surface)] to-[var(--accent)]/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,124,134,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(240,195,106,0.2),transparent_50%)]" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-20 animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 backdrop-blur-sm border border-[var(--primary)]/30 shadow-lg">
                <span className="text-2xl">🎉</span>
                <span className="text-[var(--primary)] font-semibold">Welcome, {user?.name || 'User'}!</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight">
                <span className="block text-gradient-primary mb-2">Shop, Book & Reserve</span>
                <span className="block text-[var(--text-primary)] text-4xl md:text-6xl lg:text-7xl">All in One Place</span>
              </h1>
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                Discover amazing products, book professional services, and reserve spaces for your events. 
                <br className="hidden md:block" />
                Experience seamless shopping and booking with our modern platform.
              </p>
            </div>

            {/* Main Category Cards - Enhanced Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {mainCategories.map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="animate-fade-in cursor-pointer group"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <Card
                    variant="elevated"
                    className="relative p-8 text-center hover-lift border-2 border-[var(--border)]/50 hover:border-[var(--primary)]/50 transition-all duration-500 overflow-hidden bg-gradient-to-br from-[var(--surface)] to-[var(--surface-light)]"
                  >
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Icon Container - Enhanced */}
                    <div className={`relative bg-gradient-to-br ${category.gradient} w-28 h-28 rounded-3xl flex items-center justify-center mx-auto mb-8 text-white shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_40px_rgba(14,124,134,0.5)]`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                      <div className="relative z-10 scale-125">{category.icon}</div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--primary)] transition-colors duration-300">
                      {category.title}
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-8 leading-relaxed text-base">
                      {category.description}
                    </p>
                    
                    {/* Features - Enhanced */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                      {category.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-lg text-xs font-medium bg-[var(--surface-light)]/80 text-[var(--text-secondary)] border border-[var(--border)]/50 backdrop-blur-sm group-hover:border-[var(--primary)]/30 transition-all duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* CTA Button - Enhanced */}
                    <div className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--surface-light)] to-[var(--surface)] text-[var(--text-primary)] font-bold text-lg hover:from-[var(--primary)] hover:to-[#0a6269] hover:text-white transition-all duration-500 inline-block border-2 border-[var(--border)]/50 hover:border-[var(--primary)]/50 shadow-lg hover:shadow-xl group-hover:scale-105">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Explore {category.title}
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      </div>
      </>
    );
  }

  // Show Store (Amazon/Flipkart style) interface
  if (selectedCategory === 'store') {
  return (
      <>
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />
        <div className="min-h-screen bg-[var(--surface)] flex">
        <OfflineBanner isOffline={isOffline} />

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } bg-[var(--surface-light)] border-r border-[var(--border)] transition-all duration-300 flex flex-col fixed left-0 top-0 bottom-0 z-40 overflow-y-auto`}
        >
          {/* Logo */}
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between sticky top-0 bg-[var(--surface-light)] z-10">
            {sidebarOpen && (
              <Link href="/user" onClick={() => setSelectedCategory(null)} className="text-xl font-bold text-gradient-primary">
                MSME Store
              </Link>
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
              
              {/* Search Bar */}
          {sidebarOpen && (
            <div className="p-4 border-b border-[var(--border)]">
                <div className="flex shadow-lg rounded-xl overflow-hidden border border-[var(--border)]/50">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-3 bg-[var(--surface)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 text-sm"
                  />
                  <button
                    type="button"
                  className="px-4 py-3 bg-gradient-to-r from-[var(--primary)] to-[#0a6269] text-white hover:from-[#0a6269] hover:to-[var(--primary)] transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
          )}

          {/* Category Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Back to Home Button */}
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors min-h-[44px] font-semibold border border-[var(--primary)]/30"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
              {sidebarOpen && <span>Back to Home</span>}
            </button>
            
              <button
                type="button"
                onClick={() => setShowFilters(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors min-h-[44px]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              {sidebarOpen && <span className="font-medium">Filters</span>}
              </button>
              {storeCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedStoreCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
                    selectedStoreCategory === cat.id
                    ? 'bg-[var(--primary)] text-white font-semibold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]'
                  }`}
                >
                <span className="text-xl">{cat.icon}</span>
                {sidebarOpen && <span className="font-medium">{cat.name}</span>}
                </button>
              ))}
          </nav>

          {/* User Profile & Actions */}
          <div className="p-4 border-t border-[var(--border)] space-y-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#0a6269] flex items-center justify-center text-white font-semibold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{user?.email || 'user@example.com'}</p>
          </div>
              )}
            </div>
            <Link
              href="/cart"
              className="relative flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {sidebarOpen && (
                <>
                  <span className="font-medium">Cart</span>
                  {cartCount > 0 && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </>
              )}
              {!sidebarOpen && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {sidebarOpen && <span className="font-medium">My Account</span>}
            </Link>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('user');
                  router.push('/login');
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {/* Top Bar with Search (if sidebar collapsed) */}
          {!sidebarOpen && (
            <div className="sticky top-0 z-30 bg-[var(--surface)]/95 backdrop-blur-xl border-b border-[var(--border)]/50 shadow-lg p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex shadow-lg rounded-xl overflow-hidden border border-[var(--border)]/50">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, brands and more..."
                    className="flex-1 px-6 py-4 bg-[var(--surface-light)]/80 backdrop-blur-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 min-h-[48px] text-base"
                  />
                  <button
                    type="button"
                    className="px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[#0a6269] text-white hover:from-[#0a6269] hover:to-[var(--primary)] transition-all duration-300 min-h-[48px] font-semibold shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

        {/* Main Content - Enhanced */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Breadcrumbs - Enhanced */}
          <div className="flex items-center gap-3 text-sm mb-6">
            <button 
              type="button" 
              onClick={() => setSelectedCategory(null)} 
              className="px-3 py-1.5 rounded-lg hover:bg-[var(--surface-light)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all duration-300 font-medium"
            >
              Home
            </button>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-primary)] font-semibold">Store</span>
            {selectedStoreCategory !== 'all' && (
              <>
                <span className="text-[var(--text-muted)]">/</span>
                <span className="text-[var(--primary)] font-bold">
                  {storeCategories.find((c) => c.id === selectedStoreCategory)?.name}
                </span>
              </>
            )}
          </div>

          {/* Sort and Results Count - Enhanced */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 rounded-xl bg-gradient-to-r from-[var(--surface-light)]/50 to-transparent border border-[var(--border)]/30">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[var(--text-primary)]">{filteredProducts.length}</span>
              <span className="text-sm text-[var(--text-secondary)]">results found</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[var(--text-secondary)]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-5 py-3 rounded-xl bg-[var(--surface-light)]/80 backdrop-blur-sm border-2 border-[var(--border)]/50 text-[var(--text-primary)] min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid - Enhanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                variant="elevated"
                className="relative p-0 hover-lift group cursor-pointer overflow-hidden border-2 border-[var(--border)]/50 hover:border-[var(--primary)]/50 transition-all duration-500 bg-gradient-to-br from-[var(--surface)] to-[var(--surface-light)]"
              >
                <Link href={`/catalogue/${product.id}`}>
                  {/* Product Image - Enhanced */}
                  <div className="aspect-square bg-gradient-to-br from-[var(--primary)]/30 via-[var(--accent)]/20 to-[var(--primary)]/30 rounded-t-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/0 to-transparent group-hover:from-[var(--primary)]/20 group-hover:to-[var(--accent)]/20 transition-all duration-500" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,124,134,0.1),transparent)]" />
                    <span className="text-7xl relative z-10">{product.image}</span>
                    {product.fastDelivery && (
                      <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[var(--success)] to-[#059669] text-white text-xs font-bold shadow-xl">
                        ⚡ Fast Delivery
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    {/* Product Info - Enhanced */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30">
                          {product.brand}
                        </span>
                        {product.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs font-bold text-[var(--text-primary)]">{product.rating}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300 leading-tight">
                        {product.name}
                      </h3>
                    </div>

                    {/* Rating - Enhanced */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]/30'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-[var(--text-secondary)]">({product.reviews} reviews)</span>
                    </div>

                    {/* Price - Enhanced */}
                    <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-[var(--surface-light)]/50 to-transparent border border-[var(--border)]/30">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-2xl font-extrabold text-gradient-accent">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-[var(--text-muted)] line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {product.discount && (
                        <span className="text-xs text-[var(--success)] font-bold">
                          Save {product.discount}%
                        </span>
                      )}
                      {!product.discount && product.originalPrice && product.price < product.originalPrice && (
                        <span className="text-xs text-[var(--success)] font-bold">
                          Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Seller Info */}
                    {product.seller && (
                      <div className="mb-4 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <span>by</span>
                        <span className="font-semibold text-[var(--text-primary)]">{product.seller}</span>
                        {product.sellerRating && (
                          <span className="flex items-center gap-1 text-[var(--accent)] font-bold">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {product.sellerRating}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Add to Cart Button - Enhanced */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product.id);
                      }}
                      className="w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-[var(--primary)] via-[#0a6269] to-[var(--primary)] text-white font-bold hover:shadow-2xl hover:shadow-[var(--primary)]/50 transition-all duration-300 min-h-[48px] group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </span>
                    </button>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-[var(--text-secondary)] mb-4">No products found</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStoreCategory('all');
                  setPriceRange([0, 50000]);
                }}
                className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Filters Drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setShowFilters(false)}>
            <div
              className="absolute right-0 top-0 bottom-0 w-80 bg-[var(--surface)] p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Filters</h2>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">Categories</h3>
                  <div className="space-y-2">
                    {storeCategories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--surface-light)] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedStoreCategory === cat.id}
                          onChange={() => setSelectedStoreCategory(cat.id)}
                          className="h-4 w-4"
                        />
                        <span className="text-[var(--text-primary)]">{cat.icon} {cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      </>
    );
  }

  // Show Service interface
  if (selectedCategory === 'service') {
    return (
      <>
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />
        <div className="min-h-screen bg-[var(--surface)] flex">
        <OfflineBanner isOffline={isOffline} />

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } bg-[var(--surface-light)] border-r border-[var(--border)] transition-all duration-300 flex flex-col fixed left-0 top-0 bottom-0 z-40 overflow-y-auto`}
        >
          {/* Logo */}
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between sticky top-0 bg-[var(--surface-light)] z-10">
            {sidebarOpen && (
              <Link href="/user" onClick={() => setSelectedCategory(null)} className="text-xl font-bold text-gradient-primary">
                MSME Services
              </Link>
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

          {/* Search Bar */}
          {sidebarOpen && (
            <div className="p-4 border-b border-[var(--border)]">
                <div className="flex shadow-lg rounded-xl overflow-hidden border border-[var(--border)]/50">
                  <input
                    type="search"
                    value={serviceSearchQuery}
                    onChange={(e) => setServiceSearchQuery(e.target.value)}
                  placeholder="Search services..."
                  className="flex-1 px-4 py-3 bg-[var(--surface)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 text-sm"
                  />
                  <button
                    type="button"
                  className="px-4 py-3 bg-gradient-to-r from-[var(--accent)] to-[#e8b04f] text-[var(--neutral)] hover:from-[#e8b04f] hover:to-[var(--accent)] transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
          )}

          {/* Category Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Back to Home Button */}
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors min-h-[44px] font-semibold border border-[var(--accent)]/30"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
              {sidebarOpen && <span>Back to Home</span>}
            </button>
            
              <button
                type="button"
                onClick={() => setShowServiceFilters(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors min-h-[44px]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              {sidebarOpen && <span className="font-medium">Filters</span>}
              </button>
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedServiceCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
                    selectedServiceCategory === cat.id
                    ? 'bg-[var(--accent)] text-[var(--neutral)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]'
                  }`}
                >
                <span className="text-xl">{cat.icon}</span>
                {sidebarOpen && <span className="font-medium">{cat.name}</span>}
                </button>
              ))}
          </nav>

          {/* User Profile & Actions */}
          <div className="p-4 border-t border-[var(--border)] space-y-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#e8b04f] flex items-center justify-center text-white font-semibold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{user?.email || 'user@example.com'}</p>
          </div>
              )}
            </div>
            <Link
              href="/cart"
              className="relative flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {sidebarOpen && (
                <>
                  <span className="font-medium">Bookings</span>
                  {serviceBookingCount > 0 && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--neutral)]">
                      {serviceBookingCount}
                    </span>
                  )}
                </>
              )}
              {!sidebarOpen && serviceBookingCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--neutral)]">
                  {serviceBookingCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {sidebarOpen && <span className="font-medium">My Account</span>}
            </Link>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('user');
                  router.push('/login');
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {/* Top Bar with Search (if sidebar collapsed) */}
          {!sidebarOpen && (
            <div className="sticky top-0 z-30 bg-[var(--surface)]/95 backdrop-blur-xl border-b border-[var(--border)]/50 shadow-lg p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex shadow-lg rounded-xl overflow-hidden border border-[var(--border)]/50">
                  <input
                    type="search"
                    value={serviceSearchQuery}
                    onChange={(e) => setServiceSearchQuery(e.target.value)}
                    placeholder="Search services, categories and more..."
                    className="flex-1 px-6 py-4 bg-[var(--surface-light)]/80 backdrop-blur-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 min-h-[48px] text-base"
                  />
                  <button
                    type="button"
                    className="px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[#e8b04f] text-[var(--neutral)] hover:from-[#e8b04f] hover:to-[var(--accent)] transition-all duration-300 min-h-[48px] font-semibold shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

        {/* Main Content - Enhanced */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Breadcrumbs - Enhanced */}
          <div className="flex items-center gap-3 text-sm mb-6">
            <button 
              type="button" 
              onClick={() => setSelectedCategory(null)} 
              className="px-3 py-1.5 rounded-lg hover:bg-[var(--surface-light)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all duration-300 font-medium"
            >
              Home
            </button>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-primary)] font-semibold">Services</span>
            {selectedServiceCategory !== 'all' && (
              <>
                <span className="text-[var(--text-muted)]">/</span>
                <span className="text-[var(--accent)] font-bold">
                  {serviceCategories.find((c) => c.id === selectedServiceCategory)?.name}
                </span>
              </>
            )}
          </div>

          {/* Sort and Results Count - Enhanced */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 rounded-xl bg-gradient-to-r from-[var(--surface-light)]/50 to-transparent border border-[var(--border)]/30">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[var(--text-primary)]">{filteredServices.length}</span>
              <span className="text-sm text-[var(--text-secondary)]">services found</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[var(--text-secondary)]">Sort by:</span>
              <select
                value={serviceSortBy}
                onChange={(e) => setServiceSortBy(e.target.value as typeof serviceSortBy)}
                className="px-5 py-3 rounded-xl bg-[var(--surface-light)]/80 backdrop-blur-sm border-2 border-[var(--border)]/50 text-[var(--text-primary)] min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service) => {
              if (!service || !service.id) return null;
              return (
              <Card key={service.id} variant="elevated" className="relative p-0 hover-lift group overflow-hidden border-2 border-[var(--border)]/50 hover:border-[var(--accent)]/50 transition-all duration-500 bg-gradient-to-br from-[var(--surface)] to-[var(--surface-light)]">
                {/* Image Container - Enhanced */}
                <div className="relative aspect-video bg-gradient-to-br from-[var(--accent)]/30 via-[var(--primary)]/20 to-[var(--accent)]/30 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/0 to-transparent group-hover:from-[var(--accent)]/20 group-hover:to-[var(--primary)]/20 transition-all duration-500" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,195,106,0.1),transparent)]" />
                  <span className="text-7xl relative z-10 flex items-center justify-center h-full">{service.image}</span>
                  {service.discount && (
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--success)] to-[#059669] text-white text-sm font-bold shadow-xl animate-pulse">
                      {service.discount}% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-6">

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30">
                      {service.category}
                    </span>
                    {service.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold text-[var(--text-primary)]">{service.rating}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {service.provider && (
                  <div className="flex items-center gap-3 mb-4 p-4 rounded-xl bg-gradient-to-r from-[var(--surface-light)]/80 to-[var(--surface)] border border-[var(--border)]/50 backdrop-blur-sm">
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] flex items-center justify-center text-white text-base font-bold shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                      <span className="relative z-10">{service.provider?.name?.[0] || 'P'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--text-primary)] truncate">{service.provider?.name || 'Provider'}</p>
                      <p className="text-xs text-[var(--text-secondary)] truncate">{service.provider?.specialization || 'Service Provider'}</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[var(--accent)]/20">
                      <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-bold text-[var(--text-primary)]">{service.provider?.rating || 0}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4 p-4 rounded-xl bg-gradient-to-r from-[var(--surface-light)]/50 to-transparent border border-[var(--border)]/30">
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-extrabold text-gradient-accent">₹{service.price}</span>
                      {service.originalPrice && (
                        <span className="text-base text-[var(--text-muted)] line-through">
                          ₹{service.originalPrice}
                        </span>
                      )}
                    </div>
                    {service.duration > 0 && (
                      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{service.duration} minutes</span>
                      </div>
                    )}
                    {service.duration === 0 && service.pricingModel === 'subscription' && (
                      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Subscription-based</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(service.rating || 0) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]/30'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-[var(--text-secondary)]">({service.reviews || 0} reviews)</span>
                  </div>
                </div>

                {/* Business Details - Enhanced */}
                {(service.businessType || service.serviceType || service.customerType || service.pricingModel || service.bookingType) && (
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-[var(--surface-light)]/80 to-[var(--surface)] border-2 border-[var(--border)]/50 backdrop-blur-sm space-y-3 shadow-inner">
                    <div className="flex flex-wrap gap-2">
                      {service.businessType && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--info)]/20 text-[var(--info)] border border-[var(--info)]/30">
                          {service.businessType === 'both' ? '📍 At Location / 🏠 Home Visit' : service.businessType === 'at-location' ? '📍 At Location' : '🏠 Home Visit'}
                        </span>
                      )}
                      {service.serviceType && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30">
                          {service.serviceType === 'aggregator' ? '🔗 Aggregator' : '🏢 Independent'}
                        </span>
                      )}
                      {service.customerType && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30">
                          {service.customerType}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1.5">
                      {service.bookingType && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-[var(--text-primary)]">Booking:</span>
                          <span className="text-[var(--text-secondary)]">
                            {service.bookingType === 'appointment-focused' && '📅 Appointment-focused'}
                            {service.bookingType === 'website-booking' && '🌐 Website & Booking Requests'}
                            {service.bookingType === 'on-demand' && '⚡ On-demand'}
                          </span>
                        </div>
                      )}
                      
                      {service.pricingModel && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-[var(--text-primary)]">Pricing:</span>
                          <span className="text-[var(--text-secondary)]">
                            {service.pricingModel === 'duration-based' && '⏱️ Duration-based'}
                            {service.pricingModel === 'subscription' && '📅 Subscription (Monthly OR Pay-per-session)'}
                            {service.pricingModel === 'distance-time' && '📏 Distance + Time'}
                            {service.pricingModel === 'pay-per-session' && '💳 Pay-per-session'}
                            {service.distanceFee && ' + Distance Fee (out-call)'}
                            {service.surgePricing && ' + Surge Pricing'}
                            {service.driverPay && ' + Driver Pay per Ride'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {service.features && Array.isArray(service.features) && service.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs font-medium bg-[var(--surface-light)] text-[var(--text-secondary)]"
                      >
                        {feature || 'Feature'}
                      </span>
                    ))}
                  </div>
                )}

                {/* Subscription Plans */}
                {service.subscriptionPlans && Array.isArray(service.subscriptionPlans) && service.subscriptionPlans.length > 0 && (
                  <div className="mb-4 p-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)]">
                    <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">Subscription Plans:</p>
                    <div className="space-y-2">
                      {service.subscriptionPlans.map((plan, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-[var(--text-secondary)]">{plan?.name || 'Plan'} ({plan?.duration || 'N/A'})</span>
                          <span className="font-semibold text-[var(--primary)]">₹{plan?.price || 0}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                   onClick={(e) => {
                     e.preventDefault();
                     handleAddServiceToCart(service.id);
                   }}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[var(--accent)] via-[#e8b04f] to-[var(--accent)] text-[var(--neutral)] font-bold text-lg hover:shadow-2xl hover:shadow-[var(--accent)]/50 transition-all duration-300 min-h-[52px] flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <svg className="w-6 h-6 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                   <span className="relative z-10">Add to Cart</span>
                </button>
                </div>
              </Card>
            );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-[var(--text-secondary)] mb-4">No services found</p>
              <button
                type="button"
                onClick={() => {
                  setServiceSearchQuery('');
                  setSelectedServiceCategory('all');
                  setServicePriceRange([0, 10000]);
                }}
                className="px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--neutral)] font-semibold hover:bg-[var(--accent-hover)] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Service Filters Drawer */}
        {showServiceFilters && (
          <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setShowServiceFilters(false)}>
            <div
              className="absolute right-0 top-0 bottom-0 w-80 bg-[var(--surface)] p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Filters</h2>
                <button
                  type="button"
                  onClick={() => setShowServiceFilters(false)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={servicePriceRange[1]}
                      onChange={(e) => setServicePriceRange([servicePriceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                      <span>₹{servicePriceRange[0].toLocaleString()}</span>
                      <span>₹{servicePriceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">Categories</h3>
                  <div className="space-y-2">
                    {serviceCategories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--surface-light)] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="serviceCategory"
                          checked={selectedServiceCategory === cat.id}
                          onChange={() => setSelectedServiceCategory(cat.id)}
                          className="h-4 w-4"
                        />
                        <span className="text-[var(--text-primary)]">{cat.icon} {cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slot Selection Modal - Enhanced Design */}
        {selectedServiceForBooking && (() => {
          const service = services.find((s) => s.id === selectedServiceForBooking);
          if (!service) return null;
          
          return (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" onClick={() => setSelectedServiceForBooking(null)}>
              <div
                className="bg-gradient-to-br from-[var(--surface)] to-[var(--surface-light)] rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-[var(--border)]/50 shadow-2xl animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--border)]/50">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gradient-primary mb-2">Select Time Slot</h2>
                    <p className="text-base text-[var(--text-secondary)] font-medium">{service.name}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedServiceForBooking(null)}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-3 rounded-xl hover:bg-[var(--surface-light)] transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[var(--surface-light)]/80 to-[var(--surface)] border-2 border-[var(--border)]/50 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Duration
                    </span>
                    <span className="font-bold text-[var(--text-primary)] text-lg">
                      {service.duration > 0 ? `${service.duration} minutes` : 'Subscription-based'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]/30">
                    <span className="text-sm font-semibold text-[var(--text-secondary)] flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Price
                    </span>
                    <span className="text-3xl font-extrabold text-gradient-accent">₹{service.price}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Available Time Slots
                  </h3>
                  {service.availableSlots && service.availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {service.availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-5 py-4 rounded-xl font-bold text-base transition-all duration-300 min-h-[56px] border-2 ${
                            selectedSlot === slot
                              ? 'bg-gradient-to-r from-[var(--accent)] to-[#e8b04f] text-[var(--neutral)] shadow-2xl scale-105 border-[var(--accent)]'
                              : 'bg-[var(--surface-light)] text-[var(--text-primary)] hover:bg-[var(--border)]/50 border-[var(--border)]/50 hover:border-[var(--accent)]/50 hover:scale-105'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[var(--text-secondary)] bg-[var(--surface-light)] rounded-2xl border-2 border-dashed border-[var(--border)]">
                      <svg className="w-16 h-16 mx-auto mb-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg font-semibold mb-2">No slots available</p>
                      <p className="text-sm">Please contact for availability</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedServiceForBooking(null);
                      setSelectedSlot(null);
                    }}
                    className="flex-1 px-6 py-4 rounded-xl bg-[var(--surface-light)] text-[var(--text-primary)] font-bold hover:bg-[var(--border)] transition-all duration-300 min-h-[52px] border-2 border-[var(--border)]/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedSlot) {
                        setServiceBookingCount((prev) => prev + 1);
                        setSelectedServiceForBooking(null);
                        setSelectedSlot(null);
                        // TODO: Add to booking cart logic with selected slot
                      }
                    }}
                    disabled={!selectedSlot}
                    className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-[var(--accent)] via-[#e8b04f] to-[var(--accent)] text-[var(--neutral)] font-bold hover:shadow-2xl transition-all duration-300 min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          );
        })(        )}
      </div>
      </div>
      </>
    );
  }

  // Show Space interface
  if (selectedCategory === 'space') {
    return (
      <>
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />
        <div className="min-h-screen bg-[var(--surface)] flex">
        <OfflineBanner isOffline={isOffline} />

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } bg-[var(--surface-light)] border-r border-[var(--border)] transition-all duration-300 flex flex-col fixed left-0 top-0 bottom-0 z-40 overflow-y-auto`}
        >
          {/* Logo */}
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between sticky top-0 bg-[var(--surface-light)] z-10">
            {sidebarOpen && (
              <Link href="/user" onClick={() => setSelectedCategory(null)} className="text-xl font-bold text-gradient-primary">
                MSME Spaces
              </Link>
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
              
              {/* Search Bar */}
          {sidebarOpen && (
            <div className="p-4 border-b border-[var(--border)]">
                <div className="flex shadow-lg rounded-xl overflow-hidden border border-[var(--border)]/50">
                  <input
                    type="search"
                    value={spaceSearchQuery}
                    onChange={(e) => setSpaceSearchQuery(e.target.value)}
                  placeholder="Search spaces..."
                  className="flex-1 px-4 py-3 bg-[var(--surface)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--info)]/50 text-sm"
                  />
                  <button
                    type="button"
                  className="px-4 py-3 bg-gradient-to-r from-[var(--info)] to-[#2563eb] text-white hover:from-[#2563eb] hover:to-[var(--info)] transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
          )}

          {/* Category Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Back to Home Button */}
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--info)]/10 text-[var(--info)] hover:bg-[var(--info)]/20 transition-colors min-h-[44px] font-semibold border border-[var(--info)]/30"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
              {sidebarOpen && <span>Back to Home</span>}
            </button>
            
              <button
                type="button"
                onClick={() => setShowSpaceFilters(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors min-h-[44px]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              {sidebarOpen && <span className="font-medium">Filters</span>}
              </button>
              {spaceCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedSpaceCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
                    selectedSpaceCategory === cat.id
                    ? 'bg-[var(--info)] text-white font-semibold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]'
                  }`}
                >
                <span className="text-xl">{cat.icon}</span>
                {sidebarOpen && <span className="font-medium">{cat.name}</span>}
                </button>
              ))}
          </nav>

          {/* User Profile & Actions */}
          <div className="p-4 border-t border-[var(--border)] space-y-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--info)] to-[#2563eb] flex items-center justify-center text-white font-semibold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{user?.email || 'user@example.com'}</p>
          </div>
              )}
            </div>
            <Link
              href="/cart"
              className="relative flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              {sidebarOpen && (
                <>
                  <span className="font-medium">Bookings</span>
                  {spaceBookingCount > 0 && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[var(--info)] text-xs font-bold text-white">
                      {spaceBookingCount}
                    </span>
                  )}
                </>
              )}
              {!sidebarOpen && spaceBookingCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--info)] text-xs font-bold text-white">
                  {spaceBookingCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {sidebarOpen && <span className="font-medium">My Account</span>}
            </Link>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('user');
                  router.push('/login');
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--error)]/20 text-[var(--error)] hover:bg-[var(--error)]/30 transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {/* Top Bar with Search (if sidebar collapsed) */}
          {!sidebarOpen && (
            <div className="sticky top-0 z-30 bg-[var(--surface)]/95 backdrop-blur-xl border-b border-[var(--border)]/50 shadow-lg p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex shadow-lg rounded-xl overflow-hidden border border-[var(--border)]/50">
                  <input
                    type="search"
                    value={spaceSearchQuery}
                    onChange={(e) => setSpaceSearchQuery(e.target.value)}
                    placeholder="Search movies, hotels, venues and more..."
                    className="flex-1 px-6 py-4 bg-[var(--surface-light)]/80 backdrop-blur-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--info)]/50 min-h-[48px] text-base"
                  />
                  <button
                    type="button"
                    className="px-8 py-4 bg-gradient-to-r from-[var(--info)] to-[#2563eb] text-white hover:from-[#2563eb] hover:to-[var(--info)] transition-all duration-300 min-h-[48px] font-semibold shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

        {/* Main Content - Enhanced */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Breadcrumbs - Enhanced */}
          <div className="flex items-center gap-3 text-sm mb-6">
            <button 
              type="button" 
              onClick={() => setSelectedCategory(null)} 
              className="px-3 py-1.5 rounded-lg hover:bg-[var(--surface-light)] text-[var(--text-secondary)] hover:text-[var(--info)] transition-all duration-300 font-medium"
            >
              Home
            </button>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-primary)] font-semibold">Spaces</span>
            {selectedSpaceCategory !== 'all' && (
              <>
                <span className="text-[var(--text-muted)]">/</span>
                <span className="text-[var(--info)] font-bold">
                  {spaceCategories.find((c) => c.id === selectedSpaceCategory)?.name}
                </span>
              </>
            )}
          </div>

          {/* Sort and Results Count - Enhanced */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 rounded-xl bg-gradient-to-r from-[var(--surface-light)]/50 to-transparent border border-[var(--border)]/30">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[var(--text-primary)]">{filteredSpaces.length}</span>
              <span className="text-sm text-[var(--text-secondary)]">spaces found</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[var(--text-secondary)]">Sort by:</span>
              <select
                value={spaceSortBy}
                onChange={(e) => setSpaceSortBy(e.target.value as typeof spaceSortBy)}
                className="px-5 py-3 rounded-xl bg-[var(--surface-light)]/80 backdrop-blur-sm border-2 border-[var(--border)]/50 text-[var(--text-primary)] min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[var(--info)]/50 font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredSpaces.map((space) => {
              if (!space || !space.id) return null;
              return (
              <Card key={space.id} variant="elevated" className="relative p-0 hover-lift group overflow-hidden border-2 border-[var(--border)]/50 hover:border-[var(--info)]/50 transition-all duration-500 bg-gradient-to-br from-[var(--surface)] to-[var(--surface-light)]">
                {/* Image Container - Enhanced */}
                <div className="relative aspect-video bg-gradient-to-br from-[var(--info)]/30 via-[var(--primary)]/20 to-[var(--info)]/30 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--info)]/0 to-transparent group-hover:from-[var(--info)]/20 group-hover:to-[var(--primary)]/20 transition-all duration-500" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />
                  <span className="text-7xl relative z-10 flex items-center justify-center h-full">{space.image}</span>
                  {space.discount && (
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--success)] to-[#059669] text-white text-sm font-bold shadow-xl animate-pulse">
                      {space.discount}% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-6">

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--info)]/20 text-[var(--info)] border border-[var(--info)]/30">
                      {space.category}
                    </span>
                    {space.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold text-[var(--text-primary)]">{space.rating}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--info)] transition-colors duration-300 leading-tight">
                    {space.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-sm text-[var(--text-secondary)]">
                    <svg className="w-5 h-5 text-[var(--info)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{space.location}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2 leading-relaxed">
                    {space.description}
                  </p>
                </div>

                {space.capacity && (
                  <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-[var(--surface-light)]/50 border border-[var(--border)]/30">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--info)]/20 to-[var(--primary)]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--info)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Capacity</p>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{space.capacity} {space.type === 'hotel' ? 'guests' : 'people'}</p>
                    </div>
                  </div>
                )}

                {/* Business Details - Enhanced */}
                {(space.businessType || space.customerType || space.seatMapRequired || space.promoterTools || space.artistIntegration || space.pricingModel) && (
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-[var(--surface-light)]/80 to-[var(--surface)] border-2 border-[var(--border)]/50 backdrop-blur-sm space-y-3 shadow-inner">
                    <div className="flex flex-wrap gap-2">
                      {space.businessType && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--info)]/20 text-[var(--info)] border border-[var(--info)]/30">
                          {space.businessType === 'seat-sale' ? '🎫 Seat Sale' : '🏛️ Space Rental'}
                        </span>
                      )}
                      {space.customerType && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30">
                          {space.customerType}
                        </span>
                      )}
                      {space.seatMapRequired && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30">
                          🗺️ Seat Maps Required
                        </span>
                      )}
                      {space.promoterTools && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--success)]/20 text-[var(--success)] border border-[var(--success)]/30">
                          🎯 Promoter Tools
                        </span>
                      )}
                      {space.artistIntegration && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--warning)]/20 text-[var(--warning)] border border-[var(--warning)]/30">
                          🎤 Artist Integration
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1.5">
                      {space.pricingModel && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-[var(--text-primary)]">Pricing:</span>
                          <span className="text-[var(--text-secondary)]">
                            {space.pricingModel === 'hourly' && '⏱️ Hourly Rate'}
                            {space.pricingModel === 'daily' && '📅 Daily Rate'}
                            {space.pricingModel === 'per-seat' && '🎫 Per Seat'}
                            {space.pricingModel === 'package' && '📦 Package Deal'}
                          </span>
                        </div>
                      )}
                      
                      {space.type === 'movie-theater' && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-[var(--text-primary)]">Booking:</span>
                          <span className="text-[var(--text-secondary)]">🌐 Website & Online Tickets</span>
                        </div>
                      )}
                      
                      {space.type === 'convention-hall' && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-[var(--text-primary)]">Use Case:</span>
                          <span className="text-[var(--text-secondary)]">🏢 Corporate Events, Conferences, Exhibitions</span>
                        </div>
                      )}
                      
                      {space.type === 'function-hall' && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-[var(--text-primary)]">Use Case:</span>
                          <span className="text-[var(--text-secondary)]">💒 Weddings, Parties, Celebrations</span>
                        </div>
                      )}
                      
                      {space.type === 'concert-venue' && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-[var(--text-primary)]">Features:</span>
                          <span className="text-[var(--text-secondary)]">🎵 Ticketing, Promoter Tools, Artist Integration</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {space.amenities && Array.isArray(space.amenities) && space.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {space.amenities.slice(0, 4).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs font-medium bg-[var(--surface-light)] text-[var(--text-secondary)]"
                      >
                        {amenity || 'Amenity'}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gradient-primary">₹{space.price.toLocaleString()}</span>
                      {space.originalPrice && (
                        <span className="text-sm text-[var(--text-muted)] line-through">
                          ₹{space.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {space.seller && (
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        by {space.seller}
                        {space.sellerRating && (
                          <span className="ml-1 text-[var(--accent)]">⭐ {space.sellerRating}</span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(space.rating || 0) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-[var(--text-secondary)] ml-1">({space.reviews || 0})</span>
                  </div>
                </div>

                {/* Add-ons */}
                {space.addOns && Array.isArray(space.addOns) && space.addOns.length > 0 && (
                  <div className="mb-4 p-3 rounded-lg bg-[var(--surface-light)] border border-[var(--border)]">
                    <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">Available Add-ons:</p>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {space.addOns.slice(0, 3).map((addon, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-[var(--text-secondary)]">{addon?.name || 'Add-on'}</span>
                          <span className="font-semibold text-[var(--primary)]">₹{addon?.price || 0}</span>
                        </div>
                      ))}
                      {space.addOns.length > 3 && (
                        <p className="text-xs text-[var(--text-muted)]">+{space.addOns.length - 3} more</p>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                   onClick={(e) => {
                     e.preventDefault();
                     handleAddSpaceToCart(space.id);
                  }}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[var(--info)] via-[#2563eb] to-[var(--info)] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[var(--info)]/50 transition-all duration-300 min-h-[52px] flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <svg className="w-6 h-6 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                   <span className="relative z-10">Add to Cart</span>
                </button>
                </div>
              </Card>
            );
            })}
          </div>

          {filteredSpaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-[var(--text-secondary)] mb-4">No spaces found</p>
              <button
                type="button"
                onClick={() => {
                  setSpaceSearchQuery('');
                  setSelectedSpaceCategory('all');
                  setSpacePriceRange([0, 200000]);
                }}
                className="px-6 py-3 rounded-lg bg-[var(--info)] text-white font-semibold hover:bg-[var(--info)]/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Space Filters Drawer */}
        {showSpaceFilters && (
          <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setShowSpaceFilters(false)}>
            <div
              className="absolute right-0 top-0 bottom-0 w-80 bg-[var(--surface)] p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Filters</h2>
                <button
                  type="button"
                  onClick={() => setShowSpaceFilters(false)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      value={spacePriceRange[1]}
                      onChange={(e) => setSpacePriceRange([spacePriceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                      <span>₹{spacePriceRange[0].toLocaleString()}</span>
                      <span>₹{spacePriceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">Space Types</h3>
                  <div className="space-y-2">
                    {spaceCategories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--surface-light)] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="spaceCategory"
                          checked={selectedSpaceCategory === cat.id}
                          onChange={() => setSelectedSpaceCategory(cat.id)}
                          className="h-4 w-4"
                        />
                        <span className="text-[var(--text-primary)]">{cat.icon} {cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
      </div>
      </>
  );
  }

  return null;
}
