import { z } from "zod";

const transactionItemSchema = z.object({
    produk_id: z.coerce.number().int().positive(),
    jumlah: z.coerce.number().int().min(1),
});

export const createTransactionSchema = z.object({
    metode_pembayaran_id: z.coerce.number().int().positive(),
    uang_diterima: z.coerce.number().min(0),
    items: z.array(transactionItemSchema).min(1),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
