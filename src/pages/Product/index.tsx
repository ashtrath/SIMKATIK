import ProductCardsGrid from "~/features/product/components/ProductCardsGrid";
import UpdateProductSheet from "~/features/product/components/UpdateProductSheet";

const ProductPage = () => {
    return (
        <div className="flex h-[calc(100svh-64px-40px-16px)] gap-4 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100svh-64px-40px)]">
            <div className="flex flex-1 flex-col gap-4">
                <h2 className="font-bold text-3xl">Data Produk</h2>
                <ProductCardsGrid />
            </div>
            <UpdateProductSheet />
        </div>
    );
};

export default ProductPage;
