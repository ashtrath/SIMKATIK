import apiClient from "~/lib/apiClient";
import type { AuthResponse, LoginPayload } from "../types";

const AuthService = {
    login: async (credentials: LoginPayload): Promise<AuthResponse> => {
        const { data } = await apiClient.post<AuthResponse>("/auth/login", credentials);
        localStorage.setItem("token", data.token);
        return data;
    },
    logout: async (): Promise<void> => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                await apiClient.post("/auth/logout");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            localStorage.removeItem("token");
        }
    },
};

export default AuthService;
