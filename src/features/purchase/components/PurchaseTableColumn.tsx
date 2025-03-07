import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { formatCurrency } from "~/lib/utils";
import type { Purchase } from "../types";

export const getColumns = (): ColumnDef<Purchase>[] => {
    return [
        {
            accessorKey: "produk.nama_produk",
            id: "produk",
            header: "Nama Produk",
        },
        {
            accessorKey: "jumlah",
            header: () => <div className="text-center">Kuantitas</div>,
            cell: ({ row }) => {
                const record = row.original;

                return (
                    <div className="text-center">
                        {record.satuan === "Box"
                            ? `${record.jumlah} box (${record.jumlah * (record.isi_perbox || 1)} pcs)`
                            : `${record.jumlah} pcs`}
                    </div>
                );
            },
        },
        {
            accessorKey: "harga_beli",
            header: () => <div className="text-end">Harga Beli (pcs)</div>,
            cell: ({ row }) => (
                <div className="text-end">{formatCurrency(row.getValue("harga_beli"))}</div>
            ),
        },
        {
            accessorKey: "total_harga",
            header: () => <div className="text-end">Total Harga</div>,
            cell: ({ row }) => (
                <div className="text-end">{formatCurrency(row.getValue("total_harga"))}</div>
            ),
        },
        {
            accessorKey: "created_at",
            header: () => <div className="text-end">Tanggal Pembelian</div>,
            cell: ({ row }) => (
                <div className="text-end">
                    {dayjs(row.getValue("created_at")).format("DD-MM-YYYY")}
                </div>
            ),
        },
    ];
};
