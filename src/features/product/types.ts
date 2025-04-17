import type { Category } from "../category/types";

export interface Product {
    id: number;
    nama_produk: string;
    kategori_id: number;
    stok: number;
    harga_jual: number;
    harga_beli: number;
    diskon: number;
    gambar_produk: string;
    kategori: Category;
    created_at: string;
    updated_at: string;
}
