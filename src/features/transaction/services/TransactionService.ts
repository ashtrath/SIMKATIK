import apiClient from "~/lib/apiClient";
import type { Transaction } from "../types";
import type { CreateTransactionSchema } from "../validator";

const TransactionService = {
    getAllTransactions: async (): Promise<Transaction[]> => {
        const { data } = await apiClient.get("/admin/transaksi");
        return data;
    },
    createTransaction: async ({ ...input }: CreateTransactionSchema): Promise<Transaction> => {
        const { data } = await apiClient.post("/admin/transaksi/", { ...input });
        return data;
    },
};

export default TransactionService;
