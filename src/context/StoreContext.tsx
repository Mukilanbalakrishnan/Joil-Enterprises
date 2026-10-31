import { useState, useEffect, type ReactNode } from 'react';
import type { Product, Category, AdminUser, CartItem } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/mockData';
import { StoreContext, type ToastState } from './StoreContextDefinition';

const STORAGE_KEYS = {
  PRODUCTS: 'joli_products_v3',
  CATEGORIES: 'joli_categories_v5',
  AUTH: 'joli_auth_v1',
  CART: 'joli_cart_v1',
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read products from localStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.some((c: Category) => c.name.includes('Architectural') || c.name.includes('Hardware') || c.name.includes('Fittings'))) {
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
          return INITIAL_CATEGORIES;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read categories from localStorage:', e);
    }
    return INITIAL_CATEGORIES;
  });

  const [currentUser, setCurrentUser] = useState<AdminUser>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read auth from localStorage:', e);
    }
    return {
      email: '',
      name: '',
      role: 'guest',
      isAuthenticated: false,
    };
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read cart from localStorage:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Failed saving products to localStorage:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.warn('Failed saving categories to localStorage:', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(currentUser));
    } catch (e) {
      console.warn('Failed saving auth to localStorage:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed saving cart to localStorage:', e);
    }
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.referenceId === item.referenceId && ci.type === item.type
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      const newCartItem: CartItem = {
        ...item,
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      };
      return [...prev, newCartItem];
    });
    showToast(`Added "${item.name}" to wholesale cart.`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared.', 'info');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  const addProduct = (newProdData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const id = `prod-${Date.now().toString().slice(-6)}`;
    const newProduct: Product = {
      ...newProdData,
      id,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added successfully.`);
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>): boolean => {
    let updated = false;
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          updated = true;
          return { ...p, ...updatedFields };
        }
        return p;
      })
    );
    if (updated) {
      showToast('Product updated successfully.');
    }
    return updated;
  };

  const deleteProduct = (id: string): boolean => {
    const found = products.find((p) => p.id === id);
    if (!found) return false;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product "${found.name}" removed from local catalogue.`, 'info');
    return true;
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const addCategory = (catData: Omit<Category, 'id'>): Category => {
    const id = `cat-${Date.now().toString().slice(-4)}`;
    const newCategory: Category = {
      ...catData,
      id,
    };
    setCategories((prev) => [...prev, newCategory]);
    showToast(`Category "${newCategory.name}" created.`);
    return newCategory;
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>): boolean => {
    let updated = false;
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          updated = true;
          return { ...c, ...updatedFields };
        }
        return c;
      })
    );
    if (updated) {
      showToast('Category updated.');
    }
    return updated;
  };

  const deleteCategory = (id: string): boolean => {
    const found = categories.find((c) => c.id === id);
    if (!found) return false;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast(`Category "${found.name}" removed.`, 'info');
    return true;
  };

  const login = (email: string, pass: string): boolean => {
    if (email.trim() && pass.trim().length >= 4) {
      const user: AdminUser = {
        email: email.trim(),
        name: email.split('@')[0] || 'Admin Manager',
        role: 'Administrator',
        isAuthenticated: true,
      };
      setCurrentUser(user);
      showToast('Logged into Administrator Demonstration Session');
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser({
      email: '',
      name: '',
      role: 'guest',
      isAuthenticated: false,
    });
    showToast('Signed out from Administrator Session', 'info');
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    showToast('Reset local catalogue to factory demonstration data.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        currentUser,
        toast,
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        openCart,
        closeCart,
        cartTotal,
        cartItemCount,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        addCategory,
        updateCategory,
        deleteCategory,
        login,
        logout,
        showToast,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// oxlint-disable-next-line react/only-export-components
export { useStore } from './useStore';
