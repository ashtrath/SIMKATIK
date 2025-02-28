import apiClient from "~/lib/apiClient";
import type { Product } from "../types";

const ProductService = {
    getAllProducts: async (): Promise<Product[]> => {
        const { data } = await apiClient.get("/admin/produk");
        return data;
    },
};

export default ProductService;
