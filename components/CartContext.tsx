import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../constants';

export interface SelectedOptions {
  variant?: string;
  color?: string;
  size?: string;
  modelCode?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedOptions?: SelectedOptions;
  cartKey: string; // unique key = productId + option combo
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: SelectedOptions) => void;
  removeFromCart: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  clearCart: () => void;
}

const makeCartKey = (productId: string, options?: SelectedOptions): string => {
  if (!options) return productId;
  return `${productId}__${options.variant || ''}_${options.color || ''}_${options.size || ''}_${options.modelCode || ''}`;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1, options?: SelectedOptions) => {
    const key = makeCartKey(product.id, options);
    setCart(prev => {
      const existing = prev.find(item => item.cartKey === key);
      if (existing) {
        return prev.map(item => 
          item.cartKey === key
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedOptions: options, cartKey: key }];
    });
  };

  const removeFromCart = (cartKey: string) => {
    setCart(prev => prev.filter(item => item.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cartKey === cartKey ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartTotal, 
      cartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};