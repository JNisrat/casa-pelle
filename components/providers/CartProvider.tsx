"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getCartItemCount,
  getCartSubtotal,
  readCartFromStorage,
  writeCartToStorage,
} from "@/lib/cart";
import type { CartItem } from "@/lib/types";

type CartProduct = Omit<CartItem, "quantity">;

type CartContextValue = {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isReady: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCartFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      writeCartToStorage(items);
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: CartProduct) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount: getCartItemCount(items),
      subtotal: getCartSubtotal(items),
      isReady: hydrated,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
