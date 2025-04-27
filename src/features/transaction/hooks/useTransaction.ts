import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import TransactionService from "../services/TransactionService";
import type { Transaction } from "../types";
import type { CreateTransactionSchema } from "../validator";

const useTransaction = () => {
    const queryClient = useQueryClient();

    const {
        data: transactions,
        isLoading: isFetching,
        error: fetchError,
    } = useSuspenseQuery<Transaction[]>({
        queryKey: ["transactions"],
        queryFn: TransactionService.getAllTransactions,
    });

    const {
        mutateAsync: createTransaction,
        isPending: isCreating,
        error: createError,
    } = useMutation({
        mutationFn: (input: CreateTransactionSchema) => TransactionService.createTransaction(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Berhasil mencatat transaksi penjualan!");
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat mencatat transaksi penjualan.");
        },
    });

    return {
        transactions,
        createTransaction,
        isLoading: isFetching || isCreating,
        error: {
            transactions: fetchError,
            createTransaction: createError,
        },
    };
};

export default useTransaction;
