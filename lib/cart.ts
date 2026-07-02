import type { CartItem } from "./types";

export const CART_STORAGE_KEY = "casa-pelle-cart";

export function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export function formatPrice(amount: number): string {
  return `$ ${amount.toFixed(0)}`;
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCartToStorage(items: CartItem[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}
