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
import useEmployee from "../hooks/useEmployee";
import type { Employee } from "../types";

interface DeleteEmployeeDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
    employee?: Row<Employee>["original"];
    onSuccess?: () => void;
}

const DeleteEmployeeDialog = ({ employee, onSuccess, ...props }: DeleteEmployeeDialogProps) => {
    const { deleteEmployee, isLoading } = useEmployee();

    if (!employee) return;

    const handleDelete = () => {
        deleteEmployee(employee.id);
        props.onOpenChange?.(false);
        onSuccess?.();
    };

    return (
        <Dialog {...props}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Karyawan?</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus{" "}
                        <span className="font-medium">{employee.nama_lengkap}</span>? Tindakan ini
                        tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button
                        aria-label="Delete employee"
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

export default DeleteEmployeeDialog;
