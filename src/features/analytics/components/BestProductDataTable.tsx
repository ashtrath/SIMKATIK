import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/Table";
import type { MostPurchasedProduct } from "../types";

interface BestProductDataTableProps {
    data: MostPurchasedProduct[];
}

const BestProductDataTable = ({ data }: BestProductDataTableProps) => {
    return (
        <div className="w-full space-y-4 overflow-auto">
            <div className="overflow-hidden rounded-md shadow">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Produk</TableHead>
                            <TableHead>Total Terjual</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.nama_produk}</TableCell>
                                <TableCell>{item.total_terjual}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BestProductDataTable;
