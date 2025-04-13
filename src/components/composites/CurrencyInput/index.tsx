import * as CurrencyInputPrimitive from "react-currency-input-field";
import { Input } from "~/components/ui/Input";

interface CurrencyInputProps extends CurrencyInputPrimitive.CurrencyInputProps {
    prefix?: string;
}

const CurrencyInput = ({ prefix = "Rp.", ...props }: CurrencyInputProps) => {
    return (
        <div className="group relative w-full">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2.5">
                <span className="font-medium text-muted-foreground text-sm">{prefix}</span>
            </div>
            <CurrencyInputPrimitive.CurrencyInput
                intlConfig={{ locale: "id-ID" }}
                allowNegativeValue={false}
                allowDecimals={false}
                customInput={Input}
                inputMode="decimal"
                autoComplete="off"
                maxLength={10}
                className="ps-10"
                {...props}
            />
        </div>
    );
};

export default CurrencyInput;
