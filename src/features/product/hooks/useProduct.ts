import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import ProductService from "../services/ProductService";
import type { Product } from "../types";
import type { UpdateProductSchema } from "../validator";

const useProduct = () => {
    const queryClient = useQueryClient();

    const {
        data: products,
        isLoading: isFetching,
        error: fetchError,
    } = useSuspenseQuery<Product[]>({
        queryKey: ["products"],
        queryFn: ProductService.getAllProducts,
    });

    const {
        mutateAsync: updateProduct,
        isPending: isUpdating,
        error: updateError,
    } = useMutation({
        mutationFn: ({ id, input }: { id: number; input: UpdateProductSchema }) =>
            ProductService.updateProduct(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Berhasil memperbarui produk!");
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat memperbarui produk.");
        },
    });

    const {
        mutateAsync: deleteProduct,
        isPending: isDeleting,
        error: deleteError,
    } = useMutation({
        mutationFn: (id: number) => ProductService.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Berhasil menghapus produk!");
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat menghapus produk.");
        },
    });

    return {
        products,
        deleteProduct,
        updateProduct,
        isLoading: isFetching || isUpdating || isDeleting,
        error: {
            categories: fetchError,
            updateCategory: updateError,
            deleteProduct: deleteError,
        },
    };
};

export default useProduct;
