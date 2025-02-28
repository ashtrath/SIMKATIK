import { Plus } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/Button";
import { DataTable, DataTableToolbar } from "~/components/ui/DataTable";
import { useDataTable } from "~/hooks/useDataTable";
import type { DataTableFilterField, DataTableRowAction } from "~/lib/types";
import useCategory from "../hooks/useCategory";
import type { Category } from "../types";
import { getColumns } from "./CategoryTableColumn";
import CreateCategorySheet from "./CreateCategorySheet";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import UpdateCategorySheet from "./UpdateCategorySheet";

const CategoryDataTable = () => {
    const { categories } = useCategory();

    const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);
    const [rowAction, setRowAction] = React.useState<DataTableRowAction<Category> | null>(null);

    const columns = React.useMemo(() => getColumns({ setRowAction }), []);

    const filterFields: DataTableFilterField<Category>[] = [
        {
            id: "nama_kategori",
            label: "Kategori",
            placeholder: "Cari kategori...",
        },
    ];

    const { table } = useDataTable({
        data: categories,
        columns,
        initialState: {
            sorting: [{ id: "created_at", desc: true }],
            columnPinning: { right: ["actions"] },
        },
    });

    return (
        <>
            <DataTable table={table}>
                <DataTableToolbar table={table} filterFields={filterFields}>
                    <Button onClick={() => setIsCreateOpen(true)}>
                        <Plus className="mr-2" />
                        Tambah Kategori
                    </Button>
                </DataTableToolbar>
            </DataTable>
            <CreateCategorySheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />
            <UpdateCategorySheet
                open={rowAction?.type === "update"}
                onOpenChange={() => setRowAction(null)}
                category={rowAction?.row.original ?? null}
            />
            <DeleteCategoryDialog
                open={rowAction?.type === "delete"}
                onOpenChange={() => setRowAction(null)}
                category={rowAction?.row.original}
                onSuccess={() => rowAction?.row.toggleSelected(false)}
            />
        </>
    );
};

export default CategoryDataTable;
