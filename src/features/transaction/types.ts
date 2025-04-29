import type { User } from "../auth/types";
import type { Product } from "../product/types";

export interface Transaction {
    id: number;
    users_id: number;
    total_harga: number;
    metode_pembayaran_id: number;
    items: TransactionItem[];
    user: User;
    metode_pembayaran: {
        id: number;
        nama: string;
    };
    created_at: string;
    updated_at: string;
}

export interface TransactionItem {
    id: number;
    transaksi_id: number;
    produk_id: number;
    jumlah: number;
    subtotal: number;
    produk: Product;
    created_at: string;
    updated_at: string;
}
