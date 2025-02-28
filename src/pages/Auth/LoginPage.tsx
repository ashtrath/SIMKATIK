import { Navigate } from "react-router";
import ApplicationLogo from "~/components/ui/ApplicationLogo";
import LoginForm from "~/features/auth/components/LoginForm";
import useAuth from "~/features/auth/hooks/useAuth";

const LoginPage = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) return <Navigate to="/" replace />;

    return (
        <div className="flex items-center gap-6 md:min-w-3xl md:flex-row">
            <div className="hidden aspect-[3/3.5] w-1/2 items-center justify-center rounded-xl bg-primary p-12 md:flex">
                <ApplicationLogo className="h-[75%]" />
            </div>
            <div className="min-w-xs self-stretch md:max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
