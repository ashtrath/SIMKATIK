import type * as React from "react";

import { Card, CardHeader } from "~/components/ui/Card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "~/components/ui/Sheet";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import CashierCheckoutForm from "./CashierCheckoutForm";

interface CashierCheckoutSheet extends React.ComponentProps<typeof Sheet> {}

const CashierCheckoutSheet = ({ ...props }: CashierCheckoutSheet) => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return isMobile ? (
        <Sheet open {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Keranjang</SheetTitle>
                </SheetHeader>
                <CashierCheckoutForm isMobile={isMobile} />
            </SheetContent>
        </Sheet>
    ) : (
        <Card className="w-[20rem]">
            <CardHeader>
                <h3 className="font-semibold text-lg">Keranjang</h3>
            </CardHeader>
            <CashierCheckoutForm isMobile={isMobile} />
        </Card>
    );
};

export default CashierCheckoutSheet;
