import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

import { Button } from "~/components/ui/Button";
import type { DataTableRowAction } from "~/lib/types";
import type { Employee } from "../types";

interface GetColumnsProps {
    setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<Employee> | null>>;
}

export const getColumns = ({ setRowAction }: GetColumnsProps): ColumnDef<Employee>[] => {
    return [
        {
            accessorKey: "nama_lengkap",
            header: "Nama Karyawan",
        },
        {
            accessorKey: "username",
            header: "Username",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: () => <div className="text-center">Peran</div>,
            cell: ({ row }) => <div className="text-center">{row.getValue("role")}</div>,
        },
        {
            id: "actions",
            header: () => <div className="text-right">Action</div>,
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => setRowAction({ row, type: "update" })}
                    >
                        <Edit />
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setRowAction({ row, type: "delete" })}
                    >
                        <Trash2 />
                    </Button>
                </div>
            ),
        },
    ];
};
