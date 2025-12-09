// Sample data for static pages
// TODO: Replace with API calls when backend is ready

export interface CatalogueItem {
  id: string;
  name: string;
  nameHi: string; // Hindi translation placeholder
  description: string;
  descriptionHi: string;
  price: number;
  duration?: number; // in minutes
  category: string;
  categoryHi: string;
  image?: string;
  tags: string[];
  variants?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  addOns?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

export interface Provider {
  id: string;
  name: string;
  specialization?: string;
  rating: number;
  image?: string;
  availableSlots?: string[];
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  amount: number;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'refund';
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
  invoiceId?: string;
  gst?: number;
  irn?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export const catalogueItems: CatalogueItem[] = [
  {
    id: '1',
    name: 'Haircut & Styling',
    nameHi: 'हेयरकट और स्टाइलिंग',
    description: 'Professional haircut with styling and finishing',
    descriptionHi: 'पेशेवर हेयरकट स्टाइलिंग और फिनिशिंग के साथ',
    price: 500,
    duration: 45,
    category: 'Hair Services',
    categoryHi: 'हेयर सेवाएं',
    tags: ['hair', 'styling', 'popular'],
    variants: [
      { id: 'v1', name: 'Standard', price: 500 },
      { id: 'v2', name: 'Premium', price: 800 },
    ],
    addOns: [
      { id: 'a1', name: 'Hair Wash', price: 100 },
      { id: 'a2', name: 'Hair Spa', price: 300 },
    ],
  },
  {
    id: '2',
    name: 'Facial Treatment',
    nameHi: 'फेशियल ट्रीटमेंट',
    description: 'Deep cleansing facial with moisturizing',
    descriptionHi: 'मॉइस्चराइजिंग के साथ गहरी सफाई फेशियल',
    price: 1200,
    duration: 60,
    category: 'Skincare',
    categoryHi: 'त्वचा देखभाल',
    tags: ['facial', 'skincare', 'premium'],
  },
  {
    id: '3',
    name: 'Manicure & Pedicure',
    nameHi: 'मैनीक्योर और पेडीक्योर',
    description: 'Complete nail care and polish',
    descriptionHi: 'पूर्ण नाखून देखभाल और पॉलिश',
    price: 800,
    duration: 90,
    category: 'Nail Care',
    categoryHi: 'नाखून देखभाल',
    tags: ['nail', 'care'],
  },
];

export const providers: Provider[] = [
  {
    id: 'p1',
    name: 'Rajesh Kumar',
    specialization: 'Hair Specialist',
    rating: 4.8,
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
  },
  {
    id: 'p2',
    name: 'Priya Sharma',
    specialization: 'Skincare Expert',
    rating: 4.9,
    availableSlots: ['10:00', '11:00', '13:00', '14:00', '16:00'],
  },
  {
    id: 'p3',
    name: 'Amit Patel',
    specialization: 'Nail Art',
    rating: 4.7,
    availableSlots: ['09:00', '12:00', '13:00', '15:00', '17:00'],
  },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    serviceId: '1',
    serviceName: 'Haircut & Styling',
    providerId: 'p1',
    providerName: 'Rajesh Kumar',
    date: '2024-01-15',
    time: '10:00',
    status: 'upcoming',
    amount: 500,
  },
  {
    id: 'b2',
    serviceId: '2',
    serviceName: 'Facial Treatment',
    providerId: 'p2',
    providerName: 'Priya Sharma',
    date: '2024-01-10',
    time: '14:00',
    status: 'completed',
    amount: 1200,
  },
];

export const transactions: Transaction[] = [
  {
    id: 't1',
    type: 'payment',
    amount: 500,
    date: '2024-01-10',
    status: 'success',
    invoiceId: 'INV-001',
    gst: 90,
    irn: 'IRN123456789',
  },
  {
    id: 't2',
    type: 'payment',
    amount: 1200,
    date: '2024-01-08',
    status: 'success',
    invoiceId: 'INV-002',
    gst: 216,
  },
];

export const employees: Employee[] = [
  {
    id: 'e1',
    name: 'Rajesh Kumar',
    role: 'Hair Specialist',
    email: 'rajesh@example.com',
    phone: '+91 98765 43210',
    status: 'active',
  },
  {
    id: 'e2',
    name: 'Priya Sharma',
    role: 'Skincare Expert',
    email: 'priya@example.com',
    phone: '+91 98765 43211',
    status: 'active',
  },
];

// i18n keys placeholder
export const i18n = {
  en: {
    'common.book': 'Book',
    'common.shop': 'Shop',
    'common.addToCart': 'Add to Cart',
    'common.checkout': 'Checkout',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.loading': 'Loading...',
    'common.empty': 'No items found',
  },
  hi: {
    'common.book': 'बुक करें',
    'common.shop': 'खरीदें',
    'common.addToCart': 'कार्ट में जोड़ें',
    'common.checkout': 'चेकआउट',
    'common.cancel': 'रद्द करें',
    'common.confirm': 'पुष्टि करें',
    'common.loading': 'लोड हो रहा है...',
    'common.empty': 'कोई आइटम नहीं मिला',
  },
};

