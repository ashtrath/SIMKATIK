import { Outlet } from "react-router";
import DashboardBreadcrumb from "../composites/DashboardBreadcrumb";
import DashboardSidebar from "../composites/DashboardSidebar";
import Separator from "../ui/Separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/Sidebar";

const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset className="bg-accent">
                <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4! bg-muted-foreground" />
                    <DashboardBreadcrumb />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Outlet />
                </main>
                <footer className="p-4 pt-0">
                    <small className="font-medium text-sm">
                        &copy; Copyright 2025, SIMKATIK. All rights reserved.
                    </small>
                </footer>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardLayout;
