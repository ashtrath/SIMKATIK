import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import { FileQuestion } from "lucide-react";
import CurrencyInput from "~/components/composites/CurrencyInput";
import { Button } from "~/components/ui/Button";
import ImageUpload from "~/components/ui/ImageUpload";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { ScrollArea } from "~/components/ui/ScrollArea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/Select";
import { SheetClose } from "~/components/ui/Sheet";
import useCategory from "~/features/category/hooks/useCategory";
import { cn } from "~/lib/utils";
import useProduct from "../hooks/useProduct";
import { useProductStore } from "../stores/use-product-store";
import { type UpdateProductSchema, updateProductSchema } from "../validator";

interface UpdateProductFormProps {
    isMobile: boolean;
}

const UpdateProductForm = ({ isMobile }: UpdateProductFormProps) => {
    const { updateProduct } = useProduct();
    const { selectedProduct, clearSelectedProduct } = useProductStore();
    const { categories, isLoading: categoryIsLoading } = useCategory();

    const form = useForm<UpdateProductSchema>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            nama_produk: "",
            kategori_id: undefined,
            harga_jual: undefined,
            diskon: undefined,
        },
    });

    React.useEffect(() => {
        if (selectedProduct) {
            form.reset({
                nama_produk: selectedProduct.nama_produk,
                kategori_id: selectedProduct.kategori_id,
                harga_jual: selectedProduct.harga_jual,
                diskon: selectedProduct.diskon,
            });
        } else {
            form.reset({
                nama_produk: "",
                kategori_id: undefined,
                harga_jual: undefined,
                diskon: undefined,
            });
        }
    }, [selectedProduct, form.reset]);

    const onSubmit = (input: UpdateProductSchema) => {
        if (!selectedProduct) return;

        updateProduct({ id: selectedProduct.id, input });
        clearSelectedProduct();
    };

    const onCancel = () => {
        form.reset();
        clearSelectedProduct();
    };

    if (!selectedProduct)
        return (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <FileQuestion className="size-12 text-muted-foreground" />
                <p className="mt-4 font-semibold text-muted-foreground">
                    Belum ada produk yang dipilih
                </p>
                <p className="mt-1 font-medium text-muted-foreground text-xs">
                    Silakan pilih salah satu produk dari daftar di sebelah kanan untuk melihat
                    detailnya.
                </p>
            </div>
        );

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
        >
            <ScrollArea type="auto" className={cn("flex-1 overflow-y-auto", isMobile && "pr-4")}>
                <div className={cn("space-y-4 pb-4", !isMobile && "px-6")}>
                    <Controller
                        name="gambar_produk"
                        control={form.control}
                        render={({ field }) => (
                            <ImageUpload
                                defaultValue={
                                    selectedProduct?.gambar_produk &&
                                    `http://localhost:8000/storage/${selectedProduct?.gambar_produk}`
                                }
                                onImageChange={field.onChange}
                            />
                        )}
                    />
                    <div className="grid gap-2.5">
                        <Label htmlFor="nama_produk">Nama Produk</Label>
                        <Input {...form.register("nama_produk")} />
                    </div>
                    <div className="grid gap-2.5">
                        <Label htmlFor="kategori_id">Kategori Produk</Label>
                        <Controller
                            name="kategori_id"
                            control={form.control}
                            render={({ field }) => (
                                <Select
                                    value={String(field.value) ?? ""}
                                    onValueChange={field.onChange}
                                    disabled={categoryIsLoading}
                                >
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
                    <div className="grid grid-cols-2 gap-x-2.5">
                        <div className="grid gap-2.5">
                            <Label htmlFor="harga_jual">Harga Jual</Label>
                            <Controller
                                name="harga_jual"
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
                        <div className="grid gap-2.5">
                            <Label htmlFor="diskon">Diskon</Label>
                            <Controller
                                name="diskon"
                                control={form.control}
                                render={({ field }) => (
                                    <CurrencyInput
                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
                                        prefix="%"
                                        maxLength={3}
                                        max={100}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </ScrollArea>
            <div className={cn("grid grid-cols-2 gap-x-2.5 border-t pt-4", !isMobile && "px-6")}>
                {isMobile ? (
                    <SheetClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={form.formState.isSubmitting}
                        >
                            Batal
                        </Button>
                    </SheetClose>
                ) : (
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={form.formState.isSubmitting}
                    >
                        Batal
                    </Button>
                )}
                <Button disabled={form.formState.isSubmitting}>Simpan</Button>
            </div>
        </form>
    );
};

export default UpdateProductForm;
