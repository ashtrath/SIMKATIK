import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "~/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) => (
    <SelectPrimitive.Trigger
        className={cn(
            "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 font-medium text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
            className,
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className="size-4 opacity-50" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
);

const SelectContent = ({
    className,
    children,
    position = "popper",
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) => {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                className={cn(
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
                    position === "popper" &&
                        "data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1",
                    className,
                )}
                position={position}
                {...props}
            >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport
                    className={cn(
                        "p-1",
                        position === "popper" &&
                            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
                    )}
                >
                    {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
};

const SelectLabel = ({
    className,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) => {
    return (
        <SelectPrimitive.Label
            className={cn("px-2 py-1.5 font-medium text-sm", className)}
            {...props}
        />
    );
};

const SelectItem = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) => {
    return (
        <SelectPrimitive.Item
            className={cn(
                "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
                className,
            )}
            {...props}
        >
            <span className="absolute right-2 flex size-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
};

const SelectSeparator = ({
    className,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) => {
    return (
        <SelectPrimitive.Separator
            className={cn("-mx-1 pointer-events-none my-1 h-px bg-border", className)}
            {...props}
        />
    );
};

const SelectScrollUpButton = ({
    className,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => {
    return (
        <SelectPrimitive.ScrollUpButton
            className={cn("flex cursor-default items-center justify-center py-1", className)}
            {...props}
        >
            <ChevronUpIcon className="size-4" />
        </SelectPrimitive.ScrollUpButton>
    );
};

const SelectScrollDownButton = ({
    className,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => {
    return (
        <SelectPrimitive.ScrollDownButton
            className={cn("flex cursor-default items-center justify-center py-1", className)}
            {...props}
        >
            <ChevronDownIcon className="size-4" />
        </SelectPrimitive.ScrollDownButton>
    );
};

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
};
