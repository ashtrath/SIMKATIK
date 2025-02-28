import {
    type ColumnFiltersState,
    type PaginationState,
    type SortingState,
    type TableOptions,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

interface DataTableProps<TData>
    extends Omit<
        TableOptions<TData>,
        "state" | "getCoreRowModel" | "manualFiltering" | "manualPagination" | "manualSorting"
    > {}

export const useDataTable = <TData>({ ...props }: DataTableProps<TData>) => {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        ...props,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualSorting: false,
        manualFiltering: false,
    });

    return { table };
};
