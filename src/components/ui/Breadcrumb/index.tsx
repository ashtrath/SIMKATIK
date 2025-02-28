import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";
import type * as React from "react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";

const Breadcrumb = ({ ...props }: React.ComponentProps<"nav">) => (
    <nav aria-label="breadcrumb" {...props} />
);

const BreadcrumbList = ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol
        className={cn(
            "flex flex-wrap items-center gap-2.5 break-words font-medium text-muted-foreground text-sm",
            className,
        )}
        {...props}
    />
);

const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
);

const BreadcrumbLink = ({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<typeof Link> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : Link;

    return <Comp className={cn("transition-colors hover:text-foreground", className)} {...props} />;
};

const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<"span">) => (
    // biome-ignore lint/a11y/useFocusableInteractive: No need to focus on this element...
    <span
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("text-primary", className)}
        {...props}
    />
);

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
    <li
        role="presentation"
        aria-hidden="true"
        className={cn("[&>svg]:size-3.5", className)}
        {...props}
    >
        {children ?? <ChevronRight />}
    </li>
);

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
};
