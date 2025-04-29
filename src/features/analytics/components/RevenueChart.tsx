import {
    CategoryScale,
    Chart as ChartJS,
    type ChartOptions,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    type TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatCurrency } from "~/lib/utils";
import type { ProfitChart } from "../types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

interface RevenueChartProps {
    chartData: ProfitChart | undefined | null;
}

const RevenueChart = ({ chartData }: RevenueChartProps) => {
    if (!chartData || !chartData.labels || !chartData.data) {
        return <div>Loading chart data...</div>;
    }

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
            title: {
                display: true,
                text: "Grafik Pendapatan Harian (7 Hari Terakhir)",
                font: {
                    family: "Montserrat",
                    size: 16,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<"line">) => {
                        let label = context.dataset.label || "";
                        if (label) {
                            label += ": ";
                        }
                        if (context.parsed.y !== null) {
                            label += formatCurrency(context.parsed.y);
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: number | string) => {
                        const numericValue =
                            typeof value === "string" ? Number.parseFloat(value) : value;
                        return formatCurrency(Number(numericValue));
                    },
                },
            },
        },
    };

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: "Pendapatan",
                data: chartData.data,
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                fill: true,
            },
        ],
    };

    return (
        <div className="relative size-full">
            <Line options={options} data={data} />
        </div>
    );
};

export default RevenueChart;
