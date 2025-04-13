import type * as React from "react";

import { cn } from "~/lib/utils";

const Card = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
                className,
            )}
            {...props}
        />
    );
};

const CardHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
    return <div className={cn("flex flex-col gap-1.5 px-6", className)} {...props} />;
};

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
    return <div className={cn("font-semibold leading-none", className)} {...props} />;
};

const CardDescription = ({ className, ...props }: React.ComponentProps<"div">) => {
    return <div className={cn("text-muted-foreground text-sm", className)} {...props} />;
};

const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => {
    return <div className={cn("px-6", className)} {...props} />;
};

const CardFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
    return <div className={cn("flex items-center px-6", className)} {...props} />;
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
