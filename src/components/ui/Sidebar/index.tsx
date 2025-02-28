import { PanelLeft } from "lucide-react";
import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { Sheet, SheetContent } from "~/components/ui/Sheet";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { cn } from "~/lib/utils";
import { useSidebarStore } from "~/stores/use-sidebar-store";
import { Button } from "../Button";

const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarProvider = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        defaultOpen?: boolean;
        open?: boolean;
        onOpenChange?: (open: boolean) => void;
    }
>(
    (
        {
            defaultOpen = true,
            open: openProp,
            onOpenChange: setOpenProp,
            className,
            style,
            children,
            ...props
        },
        ref,
    ) => {
        const { toggleSidebar, setIsMobile } = useSidebarStore();
        const isMobile = useMediaQuery("(max-width: 768px)");

        React.useEffect(() => {
            setIsMobile(isMobile);
        }, [isMobile, setIsMobile]);

        React.useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                    event.preventDefault();
                    toggleSidebar();
                }
            };
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }, [toggleSidebar]);

        return (
            <div
                className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    },
);

const Sidebar = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        side?: "left" | "right";
        collapsible?: "offcanvas" | "icon";
    }
>(({ side = "left", collapsible = "offcanvas", className, children, ...props }, ref) => {
    const { isMobile, openMobile, setOpenMobile, open } = useSidebarStore();
    const state = open ? "expanded" : "collapsed";

    if (isMobile) {
        return (
            <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
                <SheetContent
                    data-sidebar="sidebar"
                    data-mobile="true"
                    className="w-(--sidebar-width-mobile) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                    side={side}
                >
                    <div className="flex size-full flex-col">{children}</div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div
            ref={ref}
            className="group peer hidden text-sidebar-foreground md:block"
            data-state={state}
            data-collapsible={state === "collapsed" ? collapsible : ""}
            data-side={side}
        >
            <div
                className={cn(
                    "relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
                    "group-data-[collapsible=offcanvas]:w-0",
                    "group-data-[side=right]:rotate-180",
                    "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
                )}
            />
            <div
                className={cn(
                    "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
                    "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
                    side === "left"
                        ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                        : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                    className,
                )}
                {...props}
            >
                <div data-sidebar="sidebar" className="flex h-full w-full flex-col bg-sidebar">
                    {children}
                </div>
            </div>
        </div>
    );
});

const SidebarTrigger = React.forwardRef<
    React.ComponentRef<typeof Button>,
    React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebarStore();

    return (
        <Button
            ref={ref}
            data-sidebar="trigger"
            variant="ghost"
            size="icon"
            className={cn("size-8", className)}
            onClick={(event) => {
                onClick?.(event);
                toggleSidebar();
            }}
            {...props}
        >
            <PanelLeft />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
});

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(
    ({ className, ...props }, ref) => {
        return (
            <main
                ref={ref}
                className={cn("relative flex min-h-svh flex-1 flex-col bg-background", className)}
                {...props}
            />
        );
    },
);

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                data-sidebar="header"
                className={cn("flex flex-col gap-2 p-2", className)}
                {...props}
            />
        );
    },
);

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                data-sidebar="footer"
                className={cn("flex flex-col gap-2 p-2", className)}
                {...props}
            />
        );
    },
);

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                data-sidebar="content"
                className={cn(
                    "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
                    className,
                )}
                {...props}
            />
        );
    },
);

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                data-sidebar="group"
                className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
                {...props}
            />
        );
    },
);

const SidebarGroupLabel = ({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : "div";

    return (
        <Comp
            data-sidebar="group-label"
            className={cn(
                "flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs outline-hidden ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
                className,
            )}
            {...props}
        />
    );
};

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
    ({ className, ...props }, ref) => (
        <ul
            ref={ref}
            data-sidebar="menu"
            className={cn("flex w-full min-w-0 flex-col gap-1", className)}
            {...props}
        />
    ),
);

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
    ({ className, ...props }, ref) => (
        <li
            ref={ref}
            data-sidebar="menu-item"
            className={cn("group/menu-item relative", className)}
            {...props}
        />
    ),
);

const sidebarMenuButtonVariants = cva(
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left font-medium text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:bg-primary/15 aria-[current=page]:font-semibold aria-[current=page]:text-primary data-[active=true]:bg-primary/15 data-[active=true]:font-semibold data-[active=true]:text-primary data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                outline:
                    "bg-background shadow-[0_0_0_1px_var(--color-sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--color-sidebar-accent)]",
            },
            size: {
                default: "h-8 text-sm",
                sm: "h-7 text-xs",
                lg: "h-12 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

const SidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button"> & {
        asChild?: boolean;
        isActive?: boolean;
    } & VariantProps<typeof sidebarMenuButtonVariants>
>(
    (
        {
            asChild = false,
            isActive = false,
            variant = "default",
            size = "default",
            className,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                ref={ref}
                data-sidebar="menu-button"
                data-size={size}
                data-active={isActive}
                className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
                {...props}
            />
        );
    },
);

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
};
