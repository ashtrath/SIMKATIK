import { TriangleAlert } from "lucide-react";
import type React from "react";
import { Badge } from "~/components/ui/Badge";
import { cn, formatCurrency } from "~/lib/utils";
import type { Product } from "../types";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product;
}

const ProductCard = ({ product, className, ...props }: ProductCardProps) => {
    return (
        <div
            className={cn(
                "group relative w-full cursor-pointer space-y-4 rounded-xl border bg-card p-4 text-card-foreground shadow",
                className,
            )}
            {...props}
        >
            <figure className="relative group-hover:opacity-90">
                <img
                    src={`http://localhost:8000/storage/${product.gambar_produk}`}
                    alt={product.nama_produk}
                    width={215}
                    height={215}
                    className="aspect-square w-full rounded-lg bg-muted object-cover text-transparent"
                />
                <Badge className="absolute top-3 right-3 bg-primary">
                    {product.kategori.nama_kategori}
                </Badge>
            </figure>
            <div>
                <h3 className="truncate font-semibold">{product.nama_produk}</h3>
                <p className="font-medium text-muted-foreground text-sm">
                    {formatCurrency(
                        product.diskon
                            ? product.harga_jual - product.harga_jual * (product.diskon / 100)
                            : product.harga_jual,
                    )}
                    {product.diskon ? (
                        <span className="ml-1 text-xs line-through">
                            {formatCurrency(product.harga_jual)}
                        </span>
                    ) : null}
                </p>
            </div>
            <div className="mt-4 flex gap-4 font-medium text-muted-foreground text-xs">
                <p>
                    Stok{" "}
                    <span
                        className={cn(
                            "ml-1.5 font-semibold text-foreground",
                            product.stok <= 50 && "text-yellow-600",
                            product.stok <= 20 && "text-destructive",
                        )}
                    >
                        {product.stok}
                        {product.stok <= 50 && (
                            <TriangleAlert className="mb-0.5 ml-1 inline size-4 text-inherit" />
                        )}
                    </span>
                </p>
                <p>
                    Terjual <span className="ml-1.5 font-semibold text-foreground">100</span>
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
