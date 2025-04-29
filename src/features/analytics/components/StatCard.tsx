import type { LucideIcon } from "lucide-react";
import { cn, formatCurrency } from "~/lib/utils";

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: number | undefined | null;
    isCurrency?: boolean;
    className?: string;
}

const StatCard = ({ icon: Icon, title, value, isCurrency = true, className }: StatCardProps) => {
    return (
        <div
            className={cn(
                "flex min-w-[180px] items-center gap-4 rounded-xl bg-background fill-secondary p-6 text-secondary shadow",
                className,
            )}
        >
            <Icon className="f size-12" />
            <div className="space-y-1">
                <h3 className="whitespace-nowrap font-medium text-muted-foreground">{title}</h3>
                <p className="whitespace-nowrap font-semibold text-2xl text-foreground">
                    {isCurrency ? formatCurrency(value as number) : value}
                </p>
            </div>
        </div>
    );
};

export default StatCard;
