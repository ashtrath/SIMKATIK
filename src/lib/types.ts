import type { Row } from "@tanstack/react-table";

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type StringKeyOf<TData> = Extract<keyof TData, string>;

export interface DataTableFilterField<TData> {
    id: StringKeyOf<TData>;
    label: string;
    placeholder?: string;
}

export interface DataTableRowAction<TData> {
    row: Row<TData>;
    type: "update" | "delete";
}
