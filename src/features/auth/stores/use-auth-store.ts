import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponse, User } from "../types";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (data: AuthResponse) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (data) => {
                set({ user: data.user, isAuthenticated: true });
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: "auth-storage",
        },
    ),
);
