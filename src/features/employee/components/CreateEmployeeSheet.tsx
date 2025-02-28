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
import useEmployee from "../hooks/useEmployee";
import { type CreateEmployeeSchema, createEmployeeSchema } from "../validator";

const CreateEmployeeSheet = ({ ...props }: React.ComponentProps<typeof Sheet>) => {
    const { createEmployee, isLoading } = useEmployee();

    const form = useForm<CreateEmployeeSchema>({
        resolver: zodResolver(createEmployeeSchema),
    });

    const onSubmit = (input: CreateEmployeeSchema) => {
        createEmployee(input);
        form.reset();
        props.onOpenChange?.(false);
    };

    return (
        <Sheet {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Tambah Karyawan Baru</SheetTitle>
                    <SheetDescription>
                        Silakan isi data karyawan baru di bawah ini dan klik "Simpan" untuk
                        memperbarui informasi.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4">
                    <div className="grid gap-2.5">
                        <Label htmlFor="nama_kategori">Nama Karyawan</Label>
                        <Input {...form.register("nama_lengkap")} />
                    </div>
                    <div className="grid gap-2.5">
                        <Label htmlFor="nama_kategori">Username</Label>
                        <Input {...form.register("username")} />
                    </div>
                    <div className="grid gap-2.5">
                        <Label htmlFor="nama_kategori">Email</Label>
                        <Input {...form.register("email")} type="email" />
                    </div>
                    <div className="grid gap-2.5">
                        <Label htmlFor="nama_kategori">Password</Label>
                        <Input {...form.register("password")} type="password" />
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

export default CreateEmployeeSheet;
