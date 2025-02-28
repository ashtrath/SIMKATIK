import * as React from "react";
import { useSidebarStore } from "~/stores/use-sidebar-store";
import { useMediaQuery } from "./useMediaQuery";

const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const useSidebar = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const sidebarState = useSidebarStore();

    // Register keyboard shortcut
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    return {
        ...sidebarState,
        isMobile,
    };
};

export default useSidebar;
