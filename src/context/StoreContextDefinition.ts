import { createContext } from 'react';
import type { Product, Category, AdminUser, CartItem } from '../types';

export interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface StoreContextType {
  products: Product[];
  categories: Category[];
  currentUser: AdminUser;
  toast: ToastState | null;
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => boolean;
  deleteProduct: (id: string) => boolean;
  getProductById: (id: string) => Product | undefined;
  addCategory: (category: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, category: Partial<Category>) => boolean;
  deleteCategory: (id: string) => boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  resetToDefaults: () => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

