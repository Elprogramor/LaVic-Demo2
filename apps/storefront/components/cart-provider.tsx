"use client";

import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import type { CartLine, Product } from "@lavic/domain";
import { products } from "@/data/mocks/products";

const MAX_QUANTITY = 99;
const CART_STORAGE_KEY = "lavic.cart.v1";

type PersistedLine = { productId: string; quantity: number };

function normalizeQuantity(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(MAX_QUANTITY, Math.max(1, Math.trunc(value)));
}

function restoreCart(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((value): CartLine[] => {
      if (!value || typeof value !== "object") return [];
      const candidate = value as Partial<PersistedLine>;
      if (typeof candidate.productId !== "string" || typeof candidate.quantity !== "number") return [];
      const product = products.find((item) => item.id === candidate.productId);
      if (!product) return [];
      return [{ product, quantity: normalizeQuantity(candidate.quantity) }];
    });
  } catch {
    return [];
  }
}

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  totalCents: number;
  isOpen: boolean;
  hydrated: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product, quantity?: number) => void;
  addMany: (items: Array<{ product: Product; quantity: number }>) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setLines(restoreCart(window.localStorage.getItem(CART_STORAGE_KEY)));
    } catch {
      setLines([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const safeLines: PersistedLine[] = lines.map((line) => ({ productId: line.product.id, quantity: line.quantity }));
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(safeLines));
    } catch {
      // O carrinho continua funcional em memória quando o navegador bloqueia storage.
    }
  }, [hydrated, lines]);

  function mergeItems(current: CartLine[], items: Array<{ product: Product; quantity: number }>) {
    const next = [...current];
    for (const item of items) {
      const safeQuantity = normalizeQuantity(item.quantity);
      const index = next.findIndex((line) => line.product.id === item.product.id);
      if (index >= 0) {
        next[index] = { ...next[index], quantity: normalizeQuantity(next[index].quantity + safeQuantity) };
      } else {
        next.push({ product: item.product, quantity: safeQuantity });
      }
    }
    return next;
  }

  function add(product: Product, quantity = 1) {
    setLines((current) => mergeItems(current, [{ product, quantity }]));
    setOpen(true);
  }

  function addMany(items: Array<{ product: Product; quantity: number }>) {
    setLines((current) => mergeItems(current, items));
    setOpen(true);
  }

  function updateQuantity(productId: string, quantity: number) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      remove(productId);
      return;
    }
    setLines((current) => current.map((line) => line.product.id === productId
      ? { ...line, quantity: normalizeQuantity(quantity) }
      : line));
  }

  function remove(productId: string) {
    setLines((current) => current.filter((line) => line.product.id !== productId));
  }

  function clear() {
    setLines([]);
    setOpen(false);
  }

  const value = useMemo(() => ({
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    totalCents: lines.reduce((sum, line) => sum + line.product.priceCents * line.quantity, 0),
    isOpen,
    hydrated,
    setOpen,
    add,
    addMany,
    updateQuantity,
    remove,
    clear
  }), [lines, isOpen, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
