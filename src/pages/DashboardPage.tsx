import {
    BaggageClaim,
    Boxes,
    ChartNoAxesCombined,
    ChevronDown,
    Printer,
    Receipt,
    TrendingDown,
    TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/Button";
import BestProductDataTable from "~/features/analytics/components/BestProductDataTable";
import RevenueChart from "~/features/analytics/components/RevenueChart";
import StatCard from "~/features/analytics/components/StatCard";
import useAnalytics from "~/features/analytics/hooks/useAnalytics";

const DashboardPage = () => {
    const { analytics } = useAnalytics();

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-3xl">Dashboard</h2>
                <div className="flex items-center gap-1.5">
                    <Button
                        variant="secondary"
                        onClick={() => toast.info("Fitur Laporan belum di implementasi.")}
                    >
                        <Printer />
                        Print Pdf
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
                <StatCard
                    title="Laba Bersih"
                    icon={ChartNoAxesCombined}
                    value={analytics.laba_bersih}
                />
                <StatCard
                    title="Pemasukan"
                    icon={TrendingUp}
                    value={analytics.pemasukan}
                    className="text-primary"
                />
                <StatCard
                    title="Pengeluaran"
                    icon={TrendingDown}
                    value={analytics.pengeluaran}
                    className="text-destructive"
                />
                <StatCard
                    title="Total Transaksi"
                    icon={Receipt}
                    value={analytics.total_transaksi}
                    isCurrency={false}
                    className="text-orange-600"
                />
                <StatCard
                    title="Total Produk Terjual"
                    icon={BaggageClaim}
                    value={analytics.total_produk_terjual}
                    isCurrency={false}
                    className="text-purple-600"
                />
                <StatCard
                    title="Total Produk"
                    icon={Boxes}
                    value={analytics.total_produk}
                    isCurrency={false}
                    className="text-yellow-600"
                />
            </div>
            <div className="min-h-[500px] w-full rounded-xl bg-background p-4 shadow">
                <RevenueChart chartData={analytics.grafik_pendapatan} />
            </div>
            <div className="mt-4 w-full space-y-4">
                <h3 className="font-bold text-2xl">Produk Terlaris</h3>
                <BestProductDataTable data={analytics.produk_terlaris} />
            </div>
        </>
    );
};

export default DashboardPage;
