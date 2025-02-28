import { create } from "zustand";

interface SidebarState {
    open: boolean;
    openMobile: boolean;
    isMobile: boolean;
    setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
    setOpenMobile: (open: boolean | ((prev: boolean) => boolean)) => void;
    toggleSidebar: () => void;
    setIsMobile: (isMobile: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
    open: true,
    openMobile: false,
    isMobile: false,
    setOpen: (open) => {
        const newOpen = typeof open === "function" ? open(get().open) : open;
        set({ open: newOpen });
    },
    setOpenMobile: (open) => {
        const newOpen = typeof open === "function" ? open(get().openMobile) : open;
        set({ openMobile: newOpen });
    },
    toggleSidebar: () => {
        const { isMobile } = get();
        isMobile ? get().setOpenMobile(!get().openMobile) : get().setOpen(!get().open);
    },
    setIsMobile: (isMobile) => set({ isMobile }),
}));
