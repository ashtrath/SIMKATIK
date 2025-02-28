import { Outlet } from "react-router";
import ApplicationLogo from "../ui/ApplicationLogo";

const AuthLayout = () => {
    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-[#114E39] px-6">
            <div
                className="-translate-x-1/3 -translate-y-1/3 absolute top-0 left-0 z-0 size-[600px] md:size-[1000px]"
                aria-hidden={true}
            >
                <ApplicationLogo variant="icon-only" className="size-full opacity-20" />
            </div>
            <main className="z-1 rounded-2xl bg-background p-8 shadow-md">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;
