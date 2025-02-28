export interface User {
    id: number;
    nama_lengkap: string;
    username: string;
    email: string;
    profile_picture: string;
    email_verified_at?: string;
    role: "Admin" | "Karyawan";
    created_at: string;
    updated_at: string;
}

export interface ProfileResponse {
    user: User;
    profile_picture_url: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}
