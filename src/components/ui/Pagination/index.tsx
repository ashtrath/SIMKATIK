import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "~/lib/utils";
import { type Button, buttonVariants } from "../Button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => {
    return (
        <nav
            aria-label="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    );
};

const PaginationContent = ({ className, ...props }: React.ComponentProps<"ul">) => {
    return <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />;
};

const PaginationItem = ({ ...props }: React.ComponentProps<"li">) => {
    return <li {...props} />;
};

type PaginationLinkProps = {
    isActive?: boolean;
    disabled?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
    React.ComponentProps<"a">;

const PaginationLink = ({
    className,
    isActive,
    size = "icon",
    disabled = false,
    ...props
}: PaginationLinkProps) => {
    return (
        <a
            aria-current={isActive ? "page" : undefined}
            data-active={isActive}
            className={cn(
                "cursor-pointer",
                buttonVariants({
                    variant: isActive ? "default" : "outline",
                    size,
                }),
                disabled && "pointer-events-none cursor-not-allowed opacity-50",
                className,
            )}
            {...props}
        />
    );
};

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
            {...props}
        >
            <ChevronLeftIcon />
            <span className="hidden sm:block">Previous</span>
        </PaginationLink>
    );
};

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
            {...props}
        >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon />
        </PaginationLink>
    );
};

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => {
    return (
        <span
            aria-hidden
            className={cn("flex size-9 items-center justify-center", className)}
            {...props}
        >
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">More pages</span>
        </span>
    );
};

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
