import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import CurrencyInput from "~/components/composites/CurrencyInput";
import { Button } from "~/components/ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { Input } from "~/components/ui/Input";
import { ScrollArea } from "~/components/ui/ScrollArea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/Select";
import { useCartStore } from "~/features/cashier/stores/use-cart-store";
import useTransaction from "~/features/transaction/hooks/useTransaction";
import {
    type CreateTransactionSchema,
    createTransactionSchema,
} from "~/features/transaction/validator";
import { cn, formatCurrency } from "~/lib/utils";

interface CashierCheckoutFormProps {
    isMobile: boolean;
}

const CashierCheckoutForm = ({ isMobile }: CashierCheckoutFormProps) => {
    const { createTransaction } = useTransaction();
    const { products, removeProduct, increaseQuantity, decreaseQuantity, clearCart, setQuantity } =
        useCartStore();

    const cartItems = Object.values(products);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.product.harga_jual * item.quantity,
        0,
    );

    const form = useForm<Omit<CreateTransactionSchema, "items">>({
        resolver: zodResolver(createTransactionSchema.omit({ items: true })),
        defaultValues: {
            metode_pembayaran_id: undefined,
            uang_diterima: undefined,
        },
    });

    const moneyReceived = form.watch("uang_diterima") || 0;
    const calculatedChange = moneyReceived - totalPrice;

    const handleQuantityChange = (
        productId: number,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;
        const newQuantity = Number.parseInt(value, 10);

        if (!Number.isNaN(newQuantity) && newQuantity >= 0) {
            if (newQuantity === 0) {
                removeProduct(productId);
            } else {
                setQuantity(productId, newQuantity);
            }
        } else if (value === "") {
            setQuantity(productId, 1);
        }
    };

    const onSubmit = (input: Omit<CreateTransactionSchema, "items">) => {
        const cartItems = Object.values(products);
        console.log("submitted");

        if (cartItems.length === 0) {
            toast.error("Keranjang kosong. Tidak ada produk untuk checkout.");
            return;
        }

        createTransaction({
            ...input,
            items: cartItems.map((item) => ({
                produk_id: item.product.id,
                jumlah: item.quantity,
            })),
        }).then(() => {
            clearCart();
            form.reset();
        });
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
        >
            <ScrollArea type="auto" className={cn("flex-1 overflow-y-auto", isMobile && "pr-4")}>
                <ul className={cn("divide-y divide-border pb-4", !isMobile && "px-6")}>
                    {cartItems.length === 0 ? (
                        <li className="py-10 text-center text-muted-foreground">
                            Keranjang kosong.
                        </li>
                    ) : (
                        cartItems.map((item) => (
                            <li
                                key={item.product.id}
                                className="grid grid-cols-[1fr_auto] items-center gap-x-4 py-2"
                            >
                                <div className="min-w-0 overflow-hidden">
                                    <h3 className="truncate font-semibold text-sm">
                                        {item.product.nama_produk}
                                    </h3>
                                    <p className="font-medium text-muted-foreground text-xs">
                                        {formatCurrency(item.product.harga_jual)}
                                    </p>
                                </div>
                                <div className="flex items-center divide-input divide-x! overflow-hidden rounded-md border border-input">
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="rounded-none shadow-none"
                                        onClick={() => decreaseQuantity(item.product.id)}
                                    >
                                        <Minus />
                                    </Button>
                                    <Input
                                        type="number"
                                        inputMode="numeric"
                                        min={0}
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.product.id, e)}
                                        className="h-9 w-12 rounded-none border-0 text-center shadow-none [appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="default"
                                        className="rounded-none border-0 shadow-none"
                                        onClick={() => increaseQuantity(item.product.id)}
                                    >
                                        <Plus />
                                    </Button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </ScrollArea>
            <div className={cn("space-y-4 border-t pt-4", !isMobile && "px-6")}>
                <div className="space-y-3">
                    <Controller
                        name="metode_pembayaran_id"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                value={field.value ? String(field.value) : undefined}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Metode Pembayaran" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Cash</SelectItem>
                                    <SelectItem value="2">E-Wallet</SelectItem>
                                    <SelectItem value="3">Bank Transfer</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <Controller
                        name="uang_diterima"
                        control={form.control}
                        render={({ field }) => (
                            <CurrencyInput
                                placeholder="Jumlah Uang Diterima"
                                value={field.value}
                                onValueChange={field.onChange}
                            />
                        )}
                    />
                    <p className="flex items-center justify-between text-sm">
                        <span className="font-medium text-muted-foreground">Total Barang</span>
                        <span className="font-semibold text-foreground">{totalQuantity} pcs</span>
                    </p>
                    <p className="flex items-center justify-between text-sm">
                        <span className="font-medium text-muted-foreground">Total Harga</span>
                        <span className="font-semibold text-foreground">
                            {formatCurrency(totalPrice)}
                        </span>
                    </p>
                    <p className="flex items-center justify-between text-sm">
                        <span className="font-medium text-muted-foreground">Kembalian</span>
                        <span
                            className={cn(
                                "font-semibold text-foreground",
                                moneyReceived < totalPrice && "text-destructive",
                            )}
                        >
                            {formatCurrency(calculatedChange)}
                        </span>
                    </p>
                </div>
                <div className="flex gap-x-2.5 border-t pt-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top">
                            <DropdownMenuItem variant="destructive" onClick={() => clearCart()}>
                                <Trash2 />
                                Bersihkan Keranjang
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting || cartItems.length === 0}
                        className="flex-1"
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CashierCheckoutForm;
