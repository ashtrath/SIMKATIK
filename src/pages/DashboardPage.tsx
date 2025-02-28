import { ChevronDown, Printer } from "lucide-react";
import { Button } from "~/components/ui/Button";

const DashboardPage = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-3xl">Dashboard</h2>
                <div className="flex items-center gap-1.5">
                    <Button variant="secondary">
                        <Printer />
                        Print Laporan
                    </Button>
                    <Button variant="outline">
                        Hari
                        <ChevronDown />
                    </Button>
                    <Button variant="outline">
                        12 Desember 2024
                        <ChevronDown />
                    </Button>
                </div>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-[2/1] rounded-xl bg-background shadow" />
                <div className="aspect-[2/1] rounded-xl bg-background shadow" />
                <div className="aspect-[2/1] rounded-xl bg-background shadow" />
                <div className="aspect-[2/1] rounded-xl bg-background shadow" />
                <div className="aspect-[2/1] rounded-xl bg-background shadow" />
                <div className="aspect-[2/1] rounded-xl bg-background shadow" />
            </div>
            <div className="min-h-[500px] flex-1 rounded-xl bg-background shadow" />
            <div className="min-h-[500px] flex-1 rounded-xl bg-background shadow" />
        </>
    );
};

export default DashboardPage;
