'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: string;
  brand: string;
  name: string;
  price: number;
  storage: string;
  color: string;
  imageUrl: string;
}

function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const sync = useCallback(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    sync();

    const handleStorage = () => sync();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [sync]);

  const removeItem = useCallback((index: number) => {
    const current = getCart();
    current.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(current));
    setCart(current);
    window.dispatchEvent(new Event('storage'));
  }, []);

  const itemCount = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return { cart, itemCount, total, removeItem };
}
