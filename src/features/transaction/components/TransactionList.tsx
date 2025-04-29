import dayjs from "dayjs";
import "dayjs/locale/id";
import { Filter, MoreHorizontal, Printer, View } from "lucide-react";
import * as React from "react";

import { toast } from "sonner";
import { Button } from "~/components/ui/Button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/Dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { Label } from "~/components/ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/Popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/Select";
import { formatCurrency } from "~/lib/utils";
import useTransaction from "../hooks/useTransaction";
import type { Transaction } from "../types";

const TransactionList = () => {
    const { transactions } = useTransaction();
    const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);

    return (
        <>
            <div className="flex items-center justify-end gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            <Filter />
                            Filter
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <h4 className="font-semibold leading-none">Filter</h4>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="sort">Urutkan Berdasarkan</Label>
                                    <Select name="sort">
                                        <SelectTrigger className="col-span-2">
                                            <SelectValue placeholder="Tidak Diurutkan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Tidak diurutkan</SelectItem>
                                            <SelectItem value="stock_asc">
                                                Stok: Rendah ke Tinggi
                                            </SelectItem>
                                            <SelectItem value="stock_desc">
                                                Stok: Tinggi ke Rendah
                                            </SelectItem>
                                            <SelectItem value="price_asc">
                                                Harga: Rendah ke Tinggi
                                            </SelectItem>
                                            <SelectItem value="price_desc">
                                                Harga: Tinggi ke Rendah
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <Button
                    variant="secondary"
                    onClick={() => toast.info("Fitur Laporan belum di implementasi.")}
                >
                    <Printer />
                    Print Pdf
                </Button>
            </div>
            <ul className="space-y-4">
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        <article className="flex items-center justify-between gap-4 rounded-md bg-white p-4 shadow">
                            <div>
                                <h3 className="font-semibold text-xl">
                                    {dayjs(transaction.created_at)
                                        .locale("id")
                                        .format("dddd - DD-MM-YYYY - HH:mm:ss")}
                                </h3>
                                <p className="font-medium text-muted-foreground text-sm">
                                    Transaksi oleh {transaction.user.username}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="md:hidden"
                                        >
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {/* <DropdownMenuItem>
                                            <Printer />
                                            Cetak Struk
                                        </DropdownMenuItem> */}
                                        <DropdownMenuItem
                                            onClick={() => setSelectedTransaction(transaction)}
                                        >
                                            <View />
                                            Lihat Detail
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {/* <Button className="hidden md:inline-flex">
                                    <Printer />
                                    Cetak Struk
                                </Button> */}
                                <Button
                                    variant="secondary"
                                    className="hidden md:inline-flex"
                                    onClick={() => setSelectedTransaction(transaction)}
                                >
                                    <View />
                                    Lihat Detail
                                </Button>
                            </div>
                        </article>
                    </li>
                ))}

                {transactions.length === 0 && (
                    <li className="py-10 text-center text-muted-foreground">
                        Tidak ada transaksi yang ditemukan.
                    </li>
                )}
            </ul>

            <Dialog
                open={selectedTransaction !== null}
                onOpenChange={() => setSelectedTransaction(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detail Transaksi</DialogTitle>
                    </DialogHeader>
                    <div className="my-6 grid max-h-[70vh] grid-cols-2 overflow-y-auto font-medium text-muted-foreground">
                        <p>Transaksi Oleh</p>
                        <p className="text-right">{selectedTransaction?.user.username}</p>
                        <p>
                            {dayjs(selectedTransaction?.created_at)
                                .locale("id")
                                .format("dddd, DD-MM-YYYY")}
                        </p>
                        <p className="text-right">
                            {dayjs(selectedTransaction?.created_at).locale("id").format("HH:mm:ss")}
                        </p>
                        <div className="col-span-2 my-4 space-y-2 border-y py-4">
                            {selectedTransaction?.items.map((item) => (
                                <div key={item.id} className="grid grid-cols-2">
                                    <p className="col-span-2">{item.produk.nama_produk}</p>
                                    <p className="text-sm">
                                        {item.jumlah} x {formatCurrency(item.produk.harga_jual)}
                                    </p>
                                    <p className="text-right text-sm">
                                        {formatCurrency(item.subtotal)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="col-span-2">
                            Total Quantity:{" "}
                            {new Intl.NumberFormat("id-ID").format(
                                selectedTransaction?.items.reduce(
                                    (total, item) => total + item.jumlah,
                                    0,
                                ) || 0,
                            )}
                        </p>
                        <p>Metode Bayar</p>
                        <p className="text-right">{selectedTransaction?.metode_pembayaran.nama}</p>
                        <p>Total</p>
                        <p className="text-right">
                            {formatCurrency(selectedTransaction?.total_harga || 0)}
                        </p>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary" className="flex-1">
                                Oke
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TransactionList;
