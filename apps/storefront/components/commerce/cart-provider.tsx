"use client";

import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import type { Product } from "@/data/products";
import { products } from "@/data/products";

export type CartLine = { product: Product; quantity: number };
type PersistedLine = { productId: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  totalCents: number;
  isOpen: boolean;
  hydrated: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "lavic.cart.v3";
const MAX_QUANTITY = 99;

function normalizeQuantity(value: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.trunc(Number.isFinite(value) ? value : 1)));
}

function restore(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry): CartLine[] => {
      if (!entry || typeof entry !== "object") return [];
      const candidate = entry as Partial<PersistedLine>;
      if (typeof candidate.productId !== "string" || typeof candidate.quantity !== "number") return [];
      const product = products.find((item) => item.id === candidate.productId);
      return product ? [{ product, quantity: normalizeQuantity(candidate.quantity) }] : [];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: PropsWithChildren) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try { setLines(restore(window.localStorage.getItem(STORAGE_KEY))); } catch { setLines([]); }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: PersistedLine[] = lines.map((line) => ({ productId: line.product.id, quantity: line.quantity }));
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch { /* storage opcional */ }
  }, [hydrated, lines]);

  function add(product: Product, quantity = 1) {
    const safeQuantity = normalizeQuantity(quantity);
    setLines((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (!existing) return [...current, { product, quantity: safeQuantity }];
      return current.map((line) => line.product.id === product.id
        ? { ...line, quantity: normalizeQuantity(line.quantity + safeQuantity) }
        : line);
    });
    setOpen(true);
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) return remove(productId);
    setLines((current) => current.map((line) => line.product.id === productId ? { ...line, quantity: normalizeQuantity(quantity) } : line));
  }

  function remove(productId: string) { setLines((current) => current.filter((line) => line.product.id !== productId)); }
  function clear() { setLines([]); setOpen(false); }

  const value = useMemo<CartContextValue>(() => ({
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    totalCents: lines.reduce((sum, line) => sum + line.product.priceCents * line.quantity, 0),
    isOpen,
    hydrated,
    setOpen,
    add,
    updateQuantity,
    remove,
    clear,
  }), [lines, isOpen, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
