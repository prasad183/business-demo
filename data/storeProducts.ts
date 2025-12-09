// Physical products for Store (Amazon/Flipkart style)
export interface StoreProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  subCategory?: string;
  inStock: boolean;
  fastDelivery?: boolean;
  description: string;
  specifications?: Record<string, string>;
  seller?: string;
  sellerRating?: number;
}

export const storeProducts: StoreProduct[] = [
  {
    id: 'p1',
    name: 'Wireless Bluetooth Headphones',
    brand: 'SoundMax',
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 4.5,
    reviews: 1234,
    image: '🎧',
    category: 'Electronics',
    subCategory: 'Audio',
    inStock: true,
    fastDelivery: true,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life',
    specifications: {
      'Battery': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
    },
    seller: 'ElectroMart',
    sellerRating: 4.8,
  },
  {
    id: 'p2',
    name: 'Smartphone 128GB',
    brand: 'TechPhone',
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    rating: 4.7,
    reviews: 5678,
    image: '📱',
    category: 'Electronics',
    subCategory: 'Mobile',
    inStock: true,
    fastDelivery: true,
    description: 'Latest smartphone with 48MP camera, 6GB RAM, and fast charging',
    specifications: {
      'RAM': '6GB',
      'Storage': '128GB',
      'Camera': '48MP',
      'Battery': '5000mAh',
    },
    seller: 'MobileHub',
    sellerRating: 4.9,
  },
  {
    id: 'p3',
    name: 'Running Shoes',
    brand: 'FitRun',
    price: 2999,
    originalPrice: 4499,
    discount: 33,
    rating: 4.6,
    reviews: 2345,
    image: '👟',
    category: 'Fashion',
    subCategory: 'Footwear',
    inStock: true,
    fastDelivery: false,
    description: 'Comfortable running shoes with cushioned sole and breathable mesh',
    specifications: {
      'Size': 'Available in 6-11',
      'Material': 'Mesh & Synthetic',
      'Color': 'Black/White',
    },
    seller: 'ShoeStore',
    sellerRating: 4.7,
  },
  {
    id: 'p4',
    name: 'Laptop Backpack',
    brand: 'TravelPro',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.4,
    reviews: 987,
    image: '🎒',
    category: 'Fashion',
    subCategory: 'Bags',
    inStock: true,
    fastDelivery: true,
    description: 'Waterproof laptop backpack with multiple compartments and USB charging port',
    specifications: {
      'Capacity': '30L',
      'Laptop Size': 'Up to 15.6"',
      'Material': 'Polyester',
    },
    seller: 'BagWorld',
    sellerRating: 4.6,
  },
  {
    id: 'p5',
    name: 'Wireless Mouse',
    brand: 'ClickTech',
    price: 599,
    originalPrice: 999,
    discount: 40,
    rating: 4.3,
    reviews: 3456,
    image: '🖱️',
    category: 'Electronics',
    subCategory: 'Computer Accessories',
    inStock: true,
    fastDelivery: true,
    description: 'Ergonomic wireless mouse with 2.4GHz connectivity and 12-month battery',
    specifications: {
      'Connectivity': '2.4GHz Wireless',
      'DPI': '1600',
      'Battery': '12 months',
    },
    seller: 'TechAccessories',
    sellerRating: 4.5,
  },
  {
    id: 'p6',
    name: 'Cotton T-Shirt',
    brand: 'ComfortWear',
    price: 499,
    originalPrice: 799,
    discount: 38,
    rating: 4.2,
    reviews: 4567,
    image: '👕',
    category: 'Fashion',
    subCategory: 'Clothing',
    inStock: true,
    fastDelivery: true,
    description: '100% cotton t-shirt, comfortable fit, available in multiple colors',
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Regular',
      'Colors': 'Multiple',
    },
    seller: 'FashionHub',
    sellerRating: 4.4,
  },
  {
    id: 'p7',
    name: 'Smart Watch',
    brand: 'TimeTech',
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    rating: 4.8,
    reviews: 6789,
    image: '⌚',
    category: 'Electronics',
    subCategory: 'Wearables',
    inStock: true,
    fastDelivery: true,
    description: 'Fitness tracker with heart rate monitor, sleep tracking, and smartphone notifications',
    specifications: {
      'Battery': '7 days',
      'Display': '1.4" AMOLED',
      'Waterproof': 'IP68',
    },
    seller: 'WearableTech',
    sellerRating: 4.9,
  },
  {
    id: 'p8',
    name: 'Coffee Maker',
    brand: 'BrewMaster',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.5,
    reviews: 1234,
    image: '☕',
    category: 'Home & Kitchen',
    subCategory: 'Appliances',
    inStock: true,
    fastDelivery: false,
    description: 'Programmable coffee maker with thermal carafe and auto shut-off',
    specifications: {
      'Capacity': '12 cups',
      'Type': 'Drip Coffee Maker',
      'Warranty': '1 year',
    },
    seller: 'HomeEssentials',
    sellerRating: 4.6,
  },
];

export const categories = [
  { id: 'all', name: 'All Categories', icon: '📦' },
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'fashion', name: 'Fashion', icon: '👔' },
  { id: 'home', name: 'Home & Kitchen', icon: '🏠' },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽' },
  { id: 'books', name: 'Books', icon: '📚' },
];

