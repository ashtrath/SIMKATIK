import apiClient from "~/lib/apiClient";
import type { Product } from "../types";
import type { UpdateProductSchema } from "../validator";

const ProductService = {
    getAllProducts: async (): Promise<Product[]> => {
        const { data } = await apiClient.get("/admin/produk");
        return data;
    },
    updateProduct: async (id: number, { ...input }: UpdateProductSchema): Promise<Product> => {
        const { data } = await apiClient.put(`/admin/produk/${id}`, { ...input });
        return data;
    },
    deleteProduct: async (id: number): Promise<void> => {
        await apiClient.delete<void>(`/admin/produk/${id}`);
    },
};

export default ProductService;
