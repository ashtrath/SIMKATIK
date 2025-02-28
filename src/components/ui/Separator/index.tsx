import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type * as React from "react";
import { cn } from "~/lib/utils";

const Separator = ({
    orientation = "horizontal",
    decorative = true,
    className,
    ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) => (
    <SeparatorPrimitive.Root
        orientation={orientation}
        decorative={decorative}
        className={cn(
            "shrink-0 bg-muted data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
            className,
        )}
        {...props}
    />
);

export default Separator;
