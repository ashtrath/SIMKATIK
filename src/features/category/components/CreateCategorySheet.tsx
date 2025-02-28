import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import type * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "~/components/ui/Sheet";
import useCategory from "../hooks/useCategory";
import { type CreateCategorySchema, createCategorySchema } from "../validator";

const CreateCategorySheet = ({ ...props }: React.ComponentProps<typeof Sheet>) => {
    const { createCategory, isLoading } = useCategory();

    const form = useForm<CreateCategorySchema>({
        resolver: zodResolver(createCategorySchema),
    });

    const onSubmit = (input: CreateCategorySchema) => {
        createCategory(input);
        form.reset();
        props.onOpenChange?.(false);
    };

    return (
        <Sheet {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Tambah Kategori Baru</SheetTitle>
                    <SheetDescription>
                        Silakan isi data kategori baru di bawah ini dan klik "Simpan" untuk
                        memperbarui informasi.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4">
                    <div className="grid gap-2.5">
                        <Label htmlFor="nama_kategori">Nama Kategori</Label>
                        <Input {...form.register("nama_kategori")} />
                    </div>
                    <SheetFooter className="gap-2 pt-2 sm:space-x-0">
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

export default CreateCategorySheet;
