import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "~/components/ui/Button";
import ImageUpload from "~/components/ui/ImageUpload";
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
import useCategory from "~/features/category/hooks/useCategory";
import { cn } from "~/lib/utils";
import usePurchase from "../hooks/usePurchase";
import { type PurchaseProductSchema, purchaseProductSchema } from "../validator";

const PurchaseProductSheet = ({ ...props }: React.ComponentProps<typeof Sheet>) => {
    const { categories } = useCategory();
    const { purchaseProduct, isLoading } = usePurchase();

    const form = useForm<PurchaseProductSchema>({
        resolver: zodResolver(purchaseProductSchema),
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

    const onSubmit = (input: PurchaseProductSchema) => {
        purchaseProduct(input);
        form.reset();
        props.onOpenChange?.(false);
    };

    return (
        <Sheet {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Buat Catatan Pembelian Produk</SheetTitle>
                    <SheetDescription>
                        Silakan isi data pembelian produk di bawah ini dan klik "Simpan" untuk
                        memperbarui informasi.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4">
                    <div className="grid grid-cols-2 gap-x-2.5 gap-y-4">
                        <div className="col-span-2 grid gap-2.5">
                            <Label htmlFor="nama_produk">Nama Produk</Label>
                            <Input {...form.register("nama_produk")} />
                        </div>
                        <div className="col-span-2 grid gap-2.5">
                            <Label htmlFor="kategori_id">Kategori Produk</Label>
                            <Controller
                                name="kategori_id"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kategori Produk" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((value) => (
                                                <SelectItem key={value.id} value={String(value.id)}>
                                                    {value.nama_kategori}
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
                        <div className="grid gap-2.5">
                            <Label htmlFor="nama_kategori">Harga Beli</Label>
                            <Input {...form.register("harga_beli")} type="number" />
                        </div>
                        <div className="grid gap-2.5">
                            <Label htmlFor="nama_kategori">Harga Jual</Label>
                            <Input {...form.register("harga_jual")} type="number" />
                        </div>
                        <div className="col-span-2 grid gap-2.5">
                            <Label htmlFor="gambar_produk">Gambar Produk</Label>
                            <Controller
                                name="gambar_produk"
                                control={form.control}
                                render={({ field }) => (
                                    <ImageUpload onImageChange={field.onChange} />
                                )}
                            />
                        </div>
                    </div>
                    <SheetFooter className="col-span-2 grid gap-x-2 gap-y-4 pt-2 sm:grid-cols-2">
                        <div className="col-span-2">
                            <div className="font-semibold text-sm">Total Harga</div>
                            <div className="5 flex items-end gap-2">
                                <span className="font-bold text-xl">
                                    Rp. {(purchasePrice * quantity).toLocaleString()}
                                </span>
                                {isBox && (
                                    <span className="font-medium text-sm">
                                        Rp. {(purchasePrice / pcsPerBox).toLocaleString()} / pcs
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

export default PurchaseProductSheet;
