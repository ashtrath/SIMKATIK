import apiClient from "~/lib/apiClient";
import type { Category } from "../types";
import type { CreateCategorySchema, UpdateCategorySchema } from "../validator";

const CategoryService = {
    getAllCategories: async (): Promise<Category[]> => {
        const { data } = await apiClient.get("/admin/kategori");
        return data;
    },
    createCategory: async ({ ...input }: CreateCategorySchema): Promise<Category> => {
        const { data } = await apiClient.post<Category>("/admin/kategori", { ...input });
        return data;
    },
    updateCategory: async (id: number, { ...input }: UpdateCategorySchema): Promise<Category> => {
        const { data } = await apiClient.put<Category>(`/admin/kategori/${id}`, { ...input });
        return data;
    },
    deleteCategory: async (id: number): Promise<void> => {
        await apiClient.delete<void>(`/admin/kategori/${id}`);
    },
};

export default CategoryService;
