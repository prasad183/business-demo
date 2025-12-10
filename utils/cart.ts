// Cart utility functions for managing cart state in localStorage

export interface CartItem {
  id: string;
  type: 'product' | 'service' | 'space';
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  quantity: number;
  image: string;
  // Product specific
  brand?: string;
  seller?: string;
  // Service specific
  duration?: number;
  provider?: {
    id: string;
    name: string;
    specialization: string;
  };
  // Space specific
  location?: string;
  capacity?: number;
  // Metadata
  addedAt: string;
}

const CART_STORAGE_KEY = 'msme_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage:', e);
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event for cart updates with total quantity
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: totalQuantity } }));
  } catch (e) {
    console.error('Error saving cart to localStorage:', e);
  }
}

export function addToCart(item: Omit<CartItem, 'addedAt' | 'quantity'> & { quantity?: number }): void {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id && cartItem.type === item.type
  );

  if (existingItemIndex >= 0) {
    // Item already exists, increment quantity
    cart[existingItemIndex].quantity += item.quantity || 1;
  } else {
    // New item
    cart.push({
      ...item,
      quantity: item.quantity || 1,
      addedAt: new Date().toISOString(),
    });
  }

  saveCart(cart);
}

export function removeFromCart(itemId: string, itemType: 'product' | 'service' | 'space'): void {
  const cart = getCart();
  const filteredCart = cart.filter(
    (item) => !(item.id === itemId && item.type === itemType)
  );
  saveCart(filteredCart);
}

export function updateCartItemQuantity(
  itemId: string,
  itemType: 'product' | 'service' | 'space',
  quantity: number
): void {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    (item) => item.id === itemId && item.type === itemType
  );

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    saveCart(cart);
  }
}

export function getCartCount(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function clearCart(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: 0 } }));
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

