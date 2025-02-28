import { Plus } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/Button";
import { DataTable, DataTableToolbar } from "~/components/ui/DataTable";
import { useDataTable } from "~/hooks/useDataTable";
import type { DataTableFilterField, DataTableRowAction } from "~/lib/types";
import useEmployee from "../hooks/useEmployee";
import type { Employee } from "../types";
import CreateEmployeeSheet from "./CreateEmployeeSheet";
import DeleteEmployeeDialog from "./DeleteEmployeeDialog";
import { getColumns } from "./EmployeeTableColumn";
import UpdateEmployeeSheet from "./UpdateEmployeeSheet";

const EmployeeDataTable = () => {
    const { employees } = useEmployee();

    const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);
    const [rowAction, setRowAction] = React.useState<DataTableRowAction<Employee> | null>(null);

    const columns = React.useMemo(() => getColumns({ setRowAction }), []);

    const filterFields: DataTableFilterField<Employee>[] = [
        {
            id: "nama_lengkap",
            label: "Karyawan",
            placeholder: "Cari karyawan...",
        },
    ];

    const { table } = useDataTable({
        data: employees,
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
                        Tambah Karyawan
                    </Button>
                </DataTableToolbar>
            </DataTable>
            <CreateEmployeeSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />
            <UpdateEmployeeSheet
                open={rowAction?.type === "update"}
                onOpenChange={() => setRowAction(null)}
                employee={rowAction?.row.original ?? null}
            />
            <DeleteEmployeeDialog
                open={rowAction?.type === "delete"}
                onOpenChange={() => setRowAction(null)}
                employee={rowAction?.row.original}
                onSuccess={() => rowAction?.row.toggleSelected(false)}
            />
        </>
    );
};

export default EmployeeDataTable;
