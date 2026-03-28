import { create } from "zustand";
import type { Product } from "../types";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggle: (product: Product) => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addItem: (product) =>
    set((state) => ({
      items: state.items.find((i) => i.id === product.id)
        ? state.items
        : [...state.items, product],
    })),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== productId),
    })),

  isWishlisted: (productId) =>
    get().items.some((i) => i.id === productId),

  toggle: (product) => {
    const { isWishlisted, addItem, removeItem } = get();
    isWishlisted(product.id) ? removeItem(product.id) : addItem(product);
  },
}));