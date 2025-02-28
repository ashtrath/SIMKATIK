import { useSuspenseQuery } from "@tanstack/react-query";
import ProductService from "../services/ProductService";
import type { Product } from "../types";

const useProduct = () => {
    const {
        data: products,
        isLoading: isFetching,
        error: fetchError,
    } = useSuspenseQuery<Product[]>({
        queryKey: ["products"],
        queryFn: ProductService.getAllProducts,
    });

    return {
        products,
        isLoading: isFetching,
        error: {
            categories: fetchError,
            // createCategory: createError,
            // updateCategory: updateError,
            // deleteCategory: deleteError,
        },
    };
};

export default useProduct;
