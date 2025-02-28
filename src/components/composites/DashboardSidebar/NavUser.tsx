import { ChevronsUpDown, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/Sidebar";

import useAuth from "~/features/auth/hooks/useAuth";
import { getInitials } from "~/lib/utils";
import { useSidebarStore } from "~/stores/use-sidebar-store";

const NavUser = () => {
    const { user, logout } = useAuth();
    const { isMobile } = useSidebarStore();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:p-0!"
                        >
                            <Avatar className="rounded-lg">
                                <AvatarImage src={user?.profile_picture} alt={user?.nama_lengkap} />
                                <AvatarFallback className="rounded-lg">
                                    {user && getInitials(user?.nama_lengkap)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user?.nama_lengkap}</span>
                                <span className="truncate text-xs">{user?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "top"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user?.profile_picture}
                                        alt={user?.nama_lengkap}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {user && getInitials(user?.nama_lengkap)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user?.nama_lengkap}
                                    </span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive" onClick={() => logout()}>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default NavUser;
