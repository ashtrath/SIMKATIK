import { House } from "lucide-react";
import { NavLink } from "react-router";
import ApplicationLogo from "~/components/ui/ApplicationLogo";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/Sidebar";
import NavDataManagement from "./NavDataManagement";
import NavTransaction from "./NavTransaction";
import NavUser from "./NavUser";

import { useSidebarStore } from "~/stores/use-sidebar-store";

const DashboardSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const { open: isOpen } = useSidebarStore();

    return (
        <Sidebar collapsible="icon" className="border-0! shadow-black/50 drop-shadow-md" {...props}>
            <SidebarHeader className="flex items-center group-data-[state=expanded]:p-4 ">
                {isOpen ? (
                    <ApplicationLogo variant="horizontal-text" />
                ) : (
                    <ApplicationLogo variant="icon-only" className="max-w-[54px]" />
                )}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="group-data-[state=expanded]:mt-8">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <NavLink to="/">
                                    <House />
                                    <span>Dashboard</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <NavTransaction />
                <NavDataManagement />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
};

export default DashboardSidebar;
