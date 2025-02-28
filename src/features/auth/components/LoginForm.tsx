import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "~/components/ui/Button";
import useAuth from "../hooks/useAuth";
import { type LoginSchema, loginSchema } from "../validator";
import AuthInput from "./AuthInput";

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { login, isLoading } = useAuth();
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        await login(data);

        const origin = location.state?.from?.pathname || "/";
        navigate(origin);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col justify-between">
            <div className="mb-4 space-y-2.5 text-center">
                <h2 className="font-bold text-5xl">Sign in</h2>
                <p className="text-muted-foreground">
                    Selamat datang kembali! Masuk untuk melanjutkan aktivitas Anda.
                </p>
            </div>
            <div className="space-y-4">
                <AuthInput {...register("email")} type="email" icon={User} placeholder="Email" />
                <AuthInput
                    {...register("password")}
                    type="password"
                    icon={KeyRound}
                    placeholder="Password"
                />
                <Link to="" className="block w-full text-right font-medium text-secondary text-sm">
                    Lupa Password?
                </Link>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                Log in
            </Button>
        </form>
    );
};

export default LoginForm;
