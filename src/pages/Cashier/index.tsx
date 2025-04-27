import { ShoppingCart } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";

import CashierCheckoutSheet from "~/features/cashier/components/CashierCheckoutSheet";
import CashierProductGrid from "~/features/cashier/components/CashierProductGrid";
import { useCartStore } from "~/features/cashier/stores/use-cart-store";

const CashierPage = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const { products, actionFeedback } = useCartStore();

    const totalQuantity = React.useMemo(
        () => Object.values(products).reduce((total, item) => total + item.quantity, 0),
        [products],
    );

    React.useEffect(() => {
        if (actionFeedback) {
            switch (actionFeedback.type) {
                case "error":
                    toast.error(actionFeedback.message);
                    break;
                case "warning":
                    toast.warning(actionFeedback.message);
                    break;
                case "success":
                    toast.success(actionFeedback.message);
                    break;
                case "info":
                    toast.info(actionFeedback.message);
                    break;
                default:
                    toast(actionFeedback.message);
            }
        }
    }, [actionFeedback]);

    return (
        <div className="flex h-[calc(100svh-64px-40px-16px)] gap-4 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100svh-64px-40px)]">
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-3xl">Catat Penjualan</h2>
                    <Button onClick={() => setIsOpen(!isOpen)} className="relative md:hidden">
                        <ShoppingCart />
                        Cart
                        {totalQuantity > 0 && (
                            <Badge
                                variant="secondary"
                                className="-right-2 -top-2 absolute size-5 p-0"
                            >
                                {totalQuantity}
                            </Badge>
                        )}
                    </Button>
                </div>
                <CashierProductGrid />
            </div>
            <CashierCheckoutSheet open={isOpen !== false} onOpenChange={() => setIsOpen(false)} />
        </div>
    );
};

export default CashierPage;
