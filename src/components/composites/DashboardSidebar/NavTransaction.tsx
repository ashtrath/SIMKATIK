import { NavLink } from "react-router";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/Sidebar";
import { POS_LINKS } from "~/constants/sidebarLinks";

const NavTransaction = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Transaksi</SidebarGroupLabel>
            <SidebarMenu>
                {POS_LINKS.map(({ name, href, icon: Icon }) => (
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

export default NavTransaction;
