import type { LucideIcon } from "lucide-react";
import * as React from "react";

interface AuthInputProps extends React.ComponentProps<"input"> {
    icon: LucideIcon;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
    ({ type, icon: Icon, ...props }, ref) => (
        <div className="group relative w-full">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2.5">
                <div className="rounded bg-foreground p-1.5 transition-colors duration-200 group-focus-within:bg-primary">
                    <Icon
                        className="size-6 text-background"
                        strokeWidth={1.666}
                        aria-hidden="true"
                    />
                </div>
            </div>
            <input
                ref={ref}
                type={type}
                className="block w-full rounded-lg border-2 border-foreground bg-background p-4 ps-13 font-medium text-foreground text-sm placeholder-muted-foreground transition-colors duration-200 focus-visible:outline-none group-focus-within:border-primary"
                {...props}
            />
        </div>
    ),
);

export default AuthInput;
