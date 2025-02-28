import { z } from "zod";

export const createCategorySchema = z.object({
    nama_kategori: z.string(),
});

export const updateCategorySchema = z.object({
    nama_kategori: z.string().optional(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
