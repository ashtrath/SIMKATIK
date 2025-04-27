import {
    ArrowRightSquare,
    Grid2X2Plus,
    HandCoins,
    History,
    type LucideIcon,
    Package2,
    Users,
} from "lucide-react";

type NavLink = {
    name: string;
    href: string;
    icon: LucideIcon;
};

export const POS_LINKS: NavLink[] = [
    {
        name: "Pembelian",
        href: "/purchases",
        icon: ArrowRightSquare,
    },
    {
        name: "Catat Penjualan",
        href: "/cashier",
        icon: HandCoins,
    },
    {
        name: "Histori",
        href: "/history",
        icon: History,
    },
];

export const DATA_MANAGEMENT_LINKS: NavLink[] = [
    {
        name: "Data Produk",
        href: "/products",
        icon: Package2,
    },
    {
        name: "Data Kategori",
        href: "/categories",
        icon: Grid2X2Plus,
    },
    {
        name: "Data Karyawan",
        href: "/employees",
        icon: Users,
    },
];
