import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import PurchaseService from "../services/PurchaseService";
import type { Purchase } from "../types";
import type { PurchaseProductSchema, PurchaseStockSchema } from "../validator";

const usePurchase = () => {
    const queryClient = useQueryClient();

    const {
        data: purchases,
        isLoading: isFetching,
        error: fetchError,
    } = useSuspenseQuery<Purchase[]>({
        queryKey: ["purchases"],
        queryFn: PurchaseService.getAllPurchases,
    });

    const {
        mutateAsync: purchaseProduct,
        isPending: isPurchasingProduct,
        error: productError,
    } = useMutation({
        mutationFn: (input: PurchaseProductSchema) => PurchaseService.createPurchaseProduct(input),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["purchases"] });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success(
                `Berhasil menambahkan catatan pembelian produk ${data.produk.nama_produk}!`,
            );
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat menambahkan catatan pembelian produk.");
        },
    });

    const {
        mutateAsync: purchaseStock,
        isPending: isPurchasingStock,
        error: stockError,
    } = useMutation({
        mutationFn: (input: PurchaseStockSchema) => PurchaseService.createPurchaseStock(input),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["purchases"] });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success(
                `Berhasil menambahkan catatan pembelian stok untuk ${data.produk.nama_produk}!`,
            );
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat menambahkan catatan pembelian stok.");
        },
    });

    return {
        purchases,
        purchaseProduct,
        purchaseStock,
        isLoading: isFetching || isPurchasingProduct || isPurchasingStock,
        error: {
            purchases: fetchError,
            createCategory: productError,
            updateCategory: stockError,
        },
    };
};

export default usePurchase;
