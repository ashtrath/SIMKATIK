import { Filter, Search } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/Popover";
import { ScrollArea } from "~/components/ui/ScrollArea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/Select";
import useCategory from "~/features/category/hooks/useCategory";
import ProductCard from "~/features/product/components/ProductCard";
import useProduct from "~/features/product/hooks/useProduct";
import { useCartStore } from "../stores/use-cart-store";

const SORT_OPTIONS = {
    NONE: "none",
    STOCK_ASC: "stock_asc",
    STOCK_DESC: "stock_desc",
    PRICE_ASC: "price_asc",
    PRICE_DESC: "price_desc",
} as const;

const CashierProductGrid = () => {
    const { products } = useProduct();
    const { categories } = useCategory();
    const { addProduct } = useCartStore();

    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
    const [sortBy, setSortBy] =
        React.useState<(typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]>("none");

    const filteredProducts = React.useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        let filtered = products.filter((product) => {
            const nameMatch = product.nama_produk.toLowerCase().includes(query);
            const categoryMatch =
                selectedCategory === "all"
                    ? true
                    : String(product.kategori_id) === selectedCategory;
            return nameMatch && categoryMatch;
        });

        if (sortBy !== SORT_OPTIONS.NONE) {
            filtered = [...filtered].sort((a, b) => {
                switch (sortBy) {
                    case SORT_OPTIONS.STOCK_ASC:
                        return a.stok - b.stok;
                    case SORT_OPTIONS.STOCK_DESC:
                        return b.stok - a.stok;
                    case SORT_OPTIONS.PRICE_ASC:
                        return (a.harga_jual ?? 0) - (b.harga_jual ?? 0);
                    case SORT_OPTIONS.PRICE_DESC:
                        return (b.harga_jual ?? 0) - (a.harga_jual ?? 0);
                    default:
                        return 0;
                }
            });
        }

        return filtered;
    }, [products, searchQuery, selectedCategory, sortBy]);

    return (
        <>
            <div className="flex w-full items-center justify-between gap-2">
                <div className="group relative max-w-sm">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2.5">
                        <Search
                            className="size-5 text-muted-foreground group-focus-within:text-foreground"
                            strokeWidth={1.666}
                            aria-hidden="true"
                        />
                    </div>
                    <Input
                        type="search"
                        placeholder="Cari produk..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-background ps-10"
                    />
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            <Filter />
                            Filter
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <h4 className="font-semibold leading-none">Filter</h4>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="category">Kategori</Label>
                                    <Select
                                        name="category"
                                        value={selectedCategory}
                                        onValueChange={setSelectedCategory}
                                    >
                                        <SelectTrigger className="col-span-2">
                                            <SelectValue placeholder="Semua Kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Kategori</SelectItem>
                                            {categories.map((value) => (
                                                <SelectItem key={value.id} value={String(value.id)}>
                                                    {value.nama_kategori}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="sort">Urutkan Berdasarkan</Label>
                                    <Select
                                        name="sort"
                                        value={sortBy}
                                        onValueChange={(value) =>
                                            setSortBy(value as "none" | "stock_asc" | "stock_desc")
                                        }
                                    >
                                        <SelectTrigger className="col-span-2">
                                            <SelectValue placeholder="Tidak Diurutkan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Tidak diurutkan</SelectItem>
                                            <SelectItem value="stock_asc">
                                                Stok: Rendah ke Tinggi
                                            </SelectItem>
                                            <SelectItem value="stock_desc">
                                                Stok: Tinggi ke Rendah
                                            </SelectItem>
                                            <SelectItem value="price_asc">
                                                Harga: Rendah ke Tinggi
                                            </SelectItem>
                                            <SelectItem value="price_desc">
                                                Harga: Tinggi ke Rendah
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <ScrollArea type="auto" className="h-full flex-1 overflow-hidden">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] gap-4 pr-3 pb-1">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                onClick={() => addProduct(product)}
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 flex h-full flex-col items-center justify-center text-center">
                        <Search className="size-12 text-muted-foreground" />
                        <p className="mt-4 font-medium text-lg text-muted-foreground">
                            Tidak dapat menemukan produk "{searchQuery}".
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Cobalah mencari sesuatu yang lain.
                        </p>
                    </div>
                )}
            </ScrollArea>
        </>
    );
};

export default CashierProductGrid;
