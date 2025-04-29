export interface MostPurchasedProduct {
    nama_produk: string;
    total_terjual: number;
}

export interface ProfitChart {
    labels: string[];
    data: number[];
}

export interface AnalyticsData {
    laba_bersih: number;
    pemasukan: number;
    pengeluaran: number;
    total_transaksi: number;
    total_produk_terjual: number;
    total_produk: number;
    grafik_pendapatan: ProfitChart;
    produk_terlaris: MostPurchasedProduct[];
}
