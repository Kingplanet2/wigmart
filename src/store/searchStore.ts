import { create } from "zustand";

interface SearchStore {
  query: string;
  setQuery: (q: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  setQuery: (q) => set({ query: q }),
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));