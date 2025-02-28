import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import AuthService from "../services/AuthService";
import { useAuthStore } from "../stores/use-auth-store";
import type { LoginPayload } from "../types";

const useAuth = () => {
    const { user, isAuthenticated, login, logout } = useAuthStore();

    const {
        mutateAsync: loginMutation,
        isPending: isLoggingIn,
        error: loginError,
    } = useMutation({
        mutationFn: (credentials: LoginPayload) => AuthService.login(credentials),
        onSuccess: (data) => {
            login(data);
            toast.success(`Login berhasil! Selamat datang kembali ${data.user.nama_lengkap}. 👋`);
        },
        onError: () => {
            toast.error("Login gagal. Periksa kembali email dan kata sandi Anda.");
        },
    });

    const {
        mutateAsync: logoutMutation,
        isPending: isLoggingOut,
        error: logoutError,
    } = useMutation({
        mutationFn: () => AuthService.logout(),
        onSuccess: () => {
            logout();
            toast.success("Logout berhasil! Sampai jumpa lagi. 👋");
        },
    });

    return {
        user,
        isAuthenticated,
        login: loginMutation,
        logout: logoutMutation,
        isLoading: isLoggingIn || isLoggingOut,
        errors: {
            login: loginError,
            logout: logoutError,
        },
    };
};

export default useAuth;
