import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import CurrencyInput from "~/components/composites/CurrencyInput";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/Select";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "~/components/ui/Sheet";
import useProduct from "~/features/product/hooks/useProduct";
import { cn, formatCurrency } from "~/lib/utils";
import usePurchase from "../hooks/usePurchase";
import { type PurchaseStockSchema, purchaseStockSchema } from "../validator";

const PurchaseStockSheet = ({ ...props }: React.ComponentProps<typeof Sheet>) => {
    const { products } = useProduct();
    const { purchaseStock, isLoading } = usePurchase();

    const form = useForm<PurchaseStockSchema>({
        resolver: zodResolver(purchaseStockSchema),
        defaultValues: {
            jumlah: 1,
            satuan: "Box",
        },
    });

    const isBox = form.watch("satuan") === "Box";
    const quantity = form.watch("jumlah") || 0;
    const purchasePrice = form.watch("harga_beli") || 0;
    const pcsPerBox = form.watch("isi_perbox") || 1;

    React.useEffect(() => {
        if (isBox) {
            form.register("isi_perbox");
        } else {
            form.unregister("isi_perbox");
        }
    }, [form.register, form.unregister, isBox]);

    const onSubmit = (input: PurchaseStockSchema) => {
        purchaseStock(input);
        form.reset();
        props.onOpenChange?.(false);
    };

    return (
        <Sheet {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Buat Catatan Pembelian Stok</SheetTitle>
                    <SheetDescription>
                        Silakan isi data pembelian stok produk di bawah ini dan klik "Simpan" untuk
                        memperbarui informasi.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4">
                    <div className="grid grid-cols-2 gap-x-2.5 gap-y-4">
                        <div className="col-span-2 grid gap-2.5">
                            <Label htmlFor="produk_id">Nama Produk</Label>
                            <Controller
                                name="produk_id"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Produk" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.map((value) => (
                                                <SelectItem key={value.id} value={String(value.id)}>
                                                    {value.nama_produk}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div
                            className={cn(
                                "col-span-2 grid grid-cols-2 gap-2.5",
                                isBox && "grid-cols-3",
                            )}
                        >
                            <Label htmlFor="jumlah" className="col-span-3">
                                Kuantitas
                            </Label>
                            <div className="grid gap-2.5">
                                <Input {...form.register("jumlah")} type="number" min="1" />
                            </div>
                            <div className="grid gap-2.5">
                                <Controller
                                    name="satuan"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Box" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {["Box", "Pcs"].map((unit) => (
                                                    <SelectItem key={unit} value={unit}>
                                                        {unit}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            {isBox && (
                                <div className="grid gap-2.5">
                                    <Input {...form.register("isi_perbox")} type="number" min="1" />
                                </div>
                            )}
                        </div>
                        <div className="col-span-2 grid gap-2.5">
                            <Label htmlFor="harga_beli">Harga Beli</Label>
                            <Controller
                                name="harga_beli"
                                control={form.control}
                                render={({ field }) => (
                                    <CurrencyInput
                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <SheetFooter className="col-span-2 grid gap-x-2 gap-y-4 pt-2 sm:grid-cols-2">
                        <div className="col-span-2">
                            <div className="font-semibold text-sm">Total Harga</div>
                            <div className="5 flex items-end gap-2">
                                <span className="font-bold text-xl">
                                    {formatCurrency(purchasePrice * quantity)}
                                </span>
                                {isBox && (
                                    <span className="font-medium text-sm">
                                        {formatCurrency(purchasePrice / pcsPerBox)} / pcs
                                    </span>
                                )}
                            </div>
                        </div>
                        <SheetClose asChild>
                            <Button type="button" variant="outline">
                                Batal
                            </Button>
                        </SheetClose>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                            )}
                            Simpan
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default PurchaseStockSheet;
