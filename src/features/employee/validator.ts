import { z } from "zod";

export const createEmployeeSchema = z.object({
    nama_lengkap: z.string().max(255),
    username: z
        .string()
        .trim()
        .min(3, { message: "Username harus terdiri dari minimal 3 karakter" })
        .max(20, { message: "Username tidak boleh melebihi 20 karakter" })
        .regex(/^[a-z0-9_]+$/),
    email: z.string().email(),
    password: z.string().min(8),
});

export const updateEmployeeSchema = z.object({
    nama_lengkap: z.string().max(255).optional(),
    username: z
        .string()
        .trim()
        .min(3, { message: "Username harus terdiri dari minimal 3 karakter" })
        .max(20, { message: "Username tidak boleh melebihi 20 karakter" })
        .regex(/^[a-z0-9_]+$/)
        .optional(),
    email: z.string().email().optional(),
    password: z.string().min(8, "Password harus terdiri dari minimal 8 karakter").optional(),
});

export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeSchema = z.infer<typeof updateEmployeeSchema>;
