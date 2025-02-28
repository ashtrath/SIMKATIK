import type { Product } from "../product/types";

export interface Purchase {
    id: number;
    jumlah: number;
    satuan: "Pcs" | "Box";
    isi_perbox: number;
    harga_beli: number;
    total_harga: number;
    created_at: string;
    updated_at: string;
    produk: Product;
}
