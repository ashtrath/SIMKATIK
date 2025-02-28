import { type Table as TanstackTable, flexRender } from "@tanstack/react-table";
import { FileQuestion, Search, X } from "lucide-react";
import type { DataTableFilterField } from "~/lib/types";
import { cn } from "~/lib/utils";
import { Button } from "../Button";
import { Input } from "../Input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Table";

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
    table: TanstackTable<TData>;
}

const DataTable = <TData,>({ table, className, children, ...props }: DataTableProps<TData>) => {
    return (
        <div className={cn("w-full space-y-4 overflow-auto", className)} {...props}>
            {children}
            <div className="overflow-hidden rounded-md shadow">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllColumns().length}
                                    className="h-[283px] text-center"
                                >
                                    <FileQuestion
                                        className="mx-auto mb-4 size-12"
                                        strokeWidth={1.666}
                                    />
                                    Tidak ada data yang tersedia.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex w-full items-center justify-between gap-2 overflow-auto">
                <div className="flex shrink-0 items-center gap-2 font-medium text-muted-foreground text-sm ">
                    Menampilkan
                    <Select
                        value={String(table.getState().pagination.pageSize)}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="w-16 bg-background text-foreground">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                            {[5, 10, 15, 20].map((pageSize) => (
                                <SelectItem key={pageSize} value={String(pageSize)}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    dari {table.getFilteredRowModel().rows.length} data.
                </div>
                <DataTablePagination
                    currentPage={table.getState().pagination.pageIndex + 1}
                    totalPages={table.getPageCount()}
                    onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
                    className="justify-end"
                />
            </div>
        </div>
    );
};

export const generatePaginationLinks = (
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
) => {
    const pages: React.JSX.Element[] = [];
    if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
    } else {
        for (let i = 1; i <= 2; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
        if (2 < currentPage && currentPage < totalPages - 1) {
            pages.push(<PaginationEllipsis key="ellipsis-before" />);
            pages.push(
                <PaginationItem key={currentPage}>
                    <PaginationLink onClick={() => onPageChange(currentPage)} isActive={true}>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
        pages.push(<PaginationEllipsis key="ellipsis-after" />);
        for (let i = totalPages - 1; i <= totalPages; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
    }
    return pages;
};

interface DataTablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    className?: string;
}

const DataTablePagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className,
}: DataTablePaginationProps) => (
    <Pagination className={className}>
        <PaginationContent>
            {totalPages ? (
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage - 1 < 1}
                    />
                </PaginationItem>
            ) : null}
            {generatePaginationLinks(currentPage, totalPages, onPageChange)}
            {totalPages ? (
                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage > totalPages - 1}
                    />
                </PaginationItem>
            ) : null}
        </PaginationContent>
    </Pagination>
);

interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
    table: TanstackTable<TData>;
    filterFields?: DataTableFilterField<TData>[];
}

const DataTableToolbar = <TData,>({
    table,
    filterFields = [],
    children,
    className,
    ...props
}: DataTableToolbarProps<TData>) => {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div
            className={cn(
                "flex w-full items-center justify-between gap-2 overflow-auto",
                className,
            )}
            {...props}
        >
            <div className="flex flex-1 items-center gap-2">
                {filterFields.length > 0 &&
                    filterFields.map((field) => {
                        const column = table.getColumn(field.id);
                        if (!column) return null;

                        return (
                            <div key={field.id} className="group relative max-w-[250px]">
                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2.5">
                                    <Search
                                        className="size-5 text-muted-foreground group-focus-within:text-foreground"
                                        strokeWidth={1.666}
                                        aria-hidden="true"
                                    />
                                </div>
                                <Input
                                    type="text"
                                    placeholder={field.placeholder ?? `Filter ${field.label}...`}
                                    value={(column.getFilterValue() as string) ?? ""}
                                    onChange={(e) => column.setFilterValue(e.target.value)}
                                    className="border-foreground ps-10"
                                />
                            </div>
                        );
                    })}
                {isFiltered && (
                    <Button
                        aria-label="Reset filters"
                        variant="ghost"
                        className="h-8 px-2 lg:px-3"
                        onClick={() => table.resetColumnFilters()}
                    >
                        Reset
                        <X className="ml-2" aria-hidden="true" />
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">{children}</div>
        </div>
    );
};

export { DataTable, DataTableToolbar };
