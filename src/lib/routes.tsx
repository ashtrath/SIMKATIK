import type { RouteObject } from "react-router";

import AuthLayout from "~/components/layouts/AuthLayout";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import RootLayout from "~/components/layouts/RootLayout";
import PrivateRoute from "~/features/auth/components/PrivateRoute";
import LoginPage from "~/pages/Auth/LoginPage";
import CategoryPage from "~/pages/Category";
import DashboardPage from "~/pages/DashboardPage";
import EmployeePage from "~/pages/Employee";
import PurchasePage from "~/pages/Purchase";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: <LoginPage />,
                    },
                ],
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        element: <DashboardLayout />,
                        handle: {
                            crumb: "Dashboard",
                        },
                        children: [
                            {
                                index: true,
                                element: <DashboardPage />,
                                handle: {
                                    crumb: "Overview",
                                },
                            },
                            {
                                path: "cashier",
                                handle: {
                                    crumb: "Kasir",
                                },
                            },
                            {
                                path: "purchases",
                                element: <PurchasePage />,
                                handle: {
                                    crumb: "Pembelian",
                                },
                            },
                            {
                                path: "history",
                                handle: {
                                    crumb: "Histori",
                                },
                            },
                            {
                                path: "categories",
                                element: <CategoryPage />,
                                handle: {
                                    crumb: "Data Kategori",
                                },
                            },
                            {
                                path: "products",
                                handle: {
                                    crumb: "Data Produk",
                                },
                            },
                            {
                                path: "employees",
                                element: <EmployeePage />,
                                handle: {
                                    crumb: "Data Karyawan",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export default routes;
