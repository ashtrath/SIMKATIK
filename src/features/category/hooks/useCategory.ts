import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import CategoryService from "../services/CategoryService";
import type { Category } from "../types";
import type { CreateCategorySchema, UpdateCategorySchema } from "../validator";

const useCategory = () => {
    const queryClient = useQueryClient();

    const {
        data: categories,
        isLoading: isFetching,
        error: fetchError,
    } = useSuspenseQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: CategoryService.getAllCategories,
    });

    const {
        mutateAsync: createCategory,
        isPending: isCreating,
        error: createError,
    } = useMutation({
        mutationFn: (input: CreateCategorySchema) => CategoryService.createCategory(input),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success(`Berhasil menambahkan kategori ${data.nama_kategori}!`);
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat menambahkan kategori.");
        },
    });

    const {
        mutateAsync: updateCategory,
        isPending: isUpdating,
        error: updateError,
    } = useMutation({
        mutationFn: ({ id, input }: { id: number; input: UpdateCategorySchema }) =>
            CategoryService.updateCategory(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Berhasil memperbarui kategori!");
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat memperbarui kategori.");
        },
    });

    const {
        mutateAsync: deleteCategory,
        isPending: isDeleting,
        error: deleteError,
    } = useMutation({
        mutationFn: (id: number) => CategoryService.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Berhasil menghapus kategori!");
        },
        onError: () => {
            toast.error("Terjadi kesalahan saat menghapus kategori.");
        },
    });

    return {
        categories,
        createCategory,
        updateCategory,
        deleteCategory,
        isLoading: isFetching || isCreating || isUpdating || isDeleting,
        error: {
            categories: fetchError,
            createCategory: createError,
            updateCategory: updateError,
            deleteCategory: deleteError,
        },
    };
};

export default useCategory;
