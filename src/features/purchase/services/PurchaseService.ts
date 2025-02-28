import apiClient from "~/lib/apiClient";
import type { Purchase } from "../types";
import type { PurchaseProductSchema, PurchaseStockSchema } from "../validator";

const PurchaseService = {
    getAllPurchases: async (): Promise<Purchase[]> => {
        const { data } = await apiClient.get("/admin/pembelian");
        return data;
    },
    createPurchaseProduct: async ({ ...input }: PurchaseProductSchema): Promise<Purchase> => {
        const formData = new FormData();
        if (input.gambar_produk) {
            formData.append("gambar_produk", input.gambar_produk);
        }

        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.entries(input).forEach(([key, value]) => {
            if (key !== "gambar_produk" && value !== undefined) {
                formData.append(key, value as string | Blob);
            }
        });

        const { data } = await apiClient.post("/admin/pembelian", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    },
    createPurchaseStock: async ({ ...input }: PurchaseStockSchema): Promise<Purchase> => {
        const { data } = await apiClient.post("/admin/pembelian/tambah-stok", { ...input });
        return data;
    },
};

export default PurchaseService;
