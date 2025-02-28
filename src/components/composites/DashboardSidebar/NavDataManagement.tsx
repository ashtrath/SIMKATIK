import { NavLink } from "react-router";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/Sidebar";
import { DATA_MANAGEMENT_LINKS } from "~/constants/sidebarLinks";

const NavDataManagement = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Manajemen Data</SidebarGroupLabel>
            <SidebarMenu>
                {DATA_MANAGEMENT_LINKS.map(({ name, href, icon: Icon }) => (
                    <SidebarMenuItem key={name}>
                        <SidebarMenuButton asChild>
                            <NavLink to={href}>
                                <Icon />
                                <span>{name}</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavDataManagement;
