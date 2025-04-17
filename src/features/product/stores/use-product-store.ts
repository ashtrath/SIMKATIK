import { create } from "zustand";
import type { Product } from "../types";

interface ProductState {
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;
    clearSelectedProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
    selectedProduct: null,
    setSelectedProduct: (product) => set({ selectedProduct: product }),
    clearSelectedProduct: () => set({ selectedProduct: null }),
}));
