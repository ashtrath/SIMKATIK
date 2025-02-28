import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "~/lib/utils";

const Avatar = React.forwardRef<
    React.ComponentRef<typeof AvatarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
    />
));

const AvatarImage = React.forwardRef<
    React.ComponentRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square size-full", className)}
        {...props}
    />
));

const AvatarFallback = React.forwardRef<
    React.ComponentRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
            "flex size-full items-center justify-center rounded-full bg-muted",
            className,
        )}
        {...props}
    />
));

export { Avatar, AvatarImage, AvatarFallback };
