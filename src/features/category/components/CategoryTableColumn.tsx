import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Edit, Trash2 } from "lucide-react";

import { Button } from "~/components/ui/Button";
import type { DataTableRowAction } from "~/lib/types";
import type { Category } from "../types";

interface GetColumnsProps {
    setRowAction: React.Dispatch<React.SetStateAction<DataTableRowAction<Category> | null>>;
}

export const getColumns = ({ setRowAction }: GetColumnsProps): ColumnDef<Category>[] => {
    return [
        {
            accessorKey: "nama_kategori",
            header: "Nama Kategori",
        },
        {
            accessorKey: "created_at",
            header: () => <div className="text-center">Tanggal Dibuat</div>,
            cell: ({ row }) => (
                <div className="text-center">
                    {dayjs(row.getValue("created_at")).format("DD-MM-YYYY")}
                </div>
            ),
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
