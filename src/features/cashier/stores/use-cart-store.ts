import { produce } from "immer";
import { create } from "zustand";

import type { Product } from "~/features/product/types";
import type { CartItem } from "../types";

interface ActionFeedback {
    id: number;
    type: "success" | "error" | "warning" | "info";
    message: string;
}

interface CartState {
    products: Record<number, CartItem>;
    actionFeedback: ActionFeedback | null;
    addProduct: (product: Product) => void;
    removeProduct: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    setQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    clearActionFeedback: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    products: {},
    actionFeedback: null,

    addProduct: (product) => {
        if (typeof product.stok !== "number" || product.stok < 0) {
            set({
                actionFeedback: {
                    id: Date.now(),
                    type: "error",
                    message: `Data stok produk "${product.nama_produk}" tidak valid.`,
                },
            });
            return;
        }
        set(
            produce((state: CartState) => {
                state.actionFeedback = null;
                const existingItem = state.products[product.id];
                const productName = product.nama_produk;

                if (existingItem) {
                    const currentQuantity = existingItem.quantity;
                    if (currentQuantity < product.stok) {
                        existingItem.quantity += 1;
                    } else {
                        state.actionFeedback = {
                            id: Date.now(),
                            type: "warning",
                            message: `Stok "${productName}" tersisa ${product.stok}. Jumlah tidak bisa ditambah.`,
                        };
                    }
                } else {
                    if (product.stok > 0) {
                        state.products[product.id] = { product, quantity: 1 };
                    } else {
                        state.actionFeedback = {
                            id: Date.now(),
                            type: "error",
                            message: `Stok produk "${productName}" habis.`,
                        };
                    }
                }
            }),
        );
    },

    removeProduct: (productId) =>
        set(
            produce((state: CartState) => {
                state.actionFeedback = null;
                const productName = state.products[productId]?.product?.nama_produk;
                if (state.products[productId]) {
                    delete state.products[productId];
                } else {
                    state.actionFeedback = {
                        id: Date.now(),
                        type: "warning",
                        message: `Produk "${productName}" tidak ditemukan di keranjang.`,
                    };
                }
            }),
        ),

    increaseQuantity: (productId) =>
        set(
            produce((state: CartState) => {
                state.actionFeedback = null;
                const item = state.products[productId];
                if (item) {
                    const productName = item.product.nama_produk;
                    if (item.quantity < item.product.stok) {
                        item.quantity += 1;
                    } else {
                        state.actionFeedback = {
                            id: Date.now(),
                            type: "warning",
                            message: `Stok "${productName}" tersisa ${item.product.stok}. Jumlah tidak bisa ditambah.`,
                        };
                    }
                } else {
                    state.actionFeedback = {
                        id: Date.now(),
                        type: "error",
                        message: `Produk (ID: ${productId}) tidak ditemukan di keranjang.`,
                    };
                }
            }),
        ),

    decreaseQuantity: (productId) =>
        set(
            produce((state: CartState) => {
                state.actionFeedback = null;
                const item = state.products[productId];
                if (item) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        delete state.products[productId];
                    }
                }
            }),
        ),

    setQuantity: (productId, quantity) =>
        set(
            produce((state: CartState) => {
                state.actionFeedback = null;
                const item = state.products[productId];

                if (!item) {
                    state.actionFeedback = {
                        id: Date.now(),
                        type: "error",
                        message: `Produk (ID: ${productId}) tidak ditemukan.`,
                    };
                    return;
                }

                const productName = item.product.nama_produk;
                const stock = item.product.stok;

                if (typeof stock !== "number" || stock < 0) {
                    state.actionFeedback = {
                        id: Date.now(),
                        type: "error",
                        message: `Data stok produk "${productName}" tidak valid.`,
                    };
                    return;
                }

                if (quantity <= 0) {
                    delete state.products[productId];
                } else {
                    const cappedQuantity = Math.min(quantity, stock);

                    if (quantity > cappedQuantity) {
                        state.actionFeedback = {
                            id: Date.now(),
                            type: "warning",
                            message: `Jumlah "${productName}" diubah menjadi ${cappedQuantity} (Stok: ${stock}).`,
                        };
                    }

                    item.quantity = cappedQuantity;

                    if (item.quantity <= 0) {
                        delete state.products[productId];
                        if (stock === 0) {
                            state.actionFeedback = {
                                id: Date.now(),
                                type: "error",
                                message: `Stok produk "${productName}" habis.`,
                            };
                        }
                    }
                }
            }),
        ),

    clearCart: () => set({ products: {}, actionFeedback: null }),

    clearActionFeedback: () => set({ actionFeedback: null }),
}));
