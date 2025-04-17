import type * as React from "react";
import { Card, CardHeader } from "~/components/ui/Card";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "~/components/ui/Sheet";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import UpdateProductForm from "./UpdateProductForm";

interface UpdateProductSheetProps extends React.ComponentProps<typeof Sheet> {}

const UpdateProductSheet = ({ ...props }: UpdateProductSheetProps) => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return isMobile ? (
        <Sheet open {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Perbarui Data Produk</SheetTitle>
                    <SheetDescription>
                        Ubah data produk Anda dan klik "Simpan" untuk memperbarui informasi.
                    </SheetDescription>
                </SheetHeader>
                <UpdateProductForm isMobile={isMobile} />
            </SheetContent>
        </Sheet>
    ) : (
        <Card className="max-w-[20rem]">
            <CardHeader>
                <h3 className="font-semibold text-lg">Perbarui Data Produk</h3>
            </CardHeader>
            <UpdateProductForm isMobile={isMobile} />
        </Card>
    );
};

export default UpdateProductSheet;
