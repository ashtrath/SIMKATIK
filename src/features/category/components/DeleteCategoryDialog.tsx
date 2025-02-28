import type { Row } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import type * as React from "react";

import { Button } from "~/components/ui/Button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/Dialog";
import useCategory from "../hooks/useCategory";
import type { Category } from "../types";

interface DeleteCategoryDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
    category?: Row<Category>["original"];
    onSuccess?: () => void;
}

const DeleteCategoryDialog = ({ category, onSuccess, ...props }: DeleteCategoryDialogProps) => {
    const { deleteCategory, isLoading } = useCategory();

    if (!category) return;

    const handleDelete = () => {
        deleteCategory(category.id);
        props.onOpenChange?.(false);
        onSuccess?.();
    };

    return (
        <Dialog {...props}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Kategori?</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus{" "}
                        <span className="font-medium">{category.nama_kategori}</span>? Tindakan ini
                        tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button
                        aria-label="Delete category"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                        )}
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteCategoryDialog;
