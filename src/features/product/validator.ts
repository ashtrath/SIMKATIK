import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "~/constants/validatorRules";

export const updateProductSchema = z.object({
    nama_produk: z.string().optional(),
    kategori_id: z.coerce.number().int().positive().optional(),
    harga_jual: z.coerce.number().min(0).optional(),
    diskon: z.coerce.number().min(0).optional(),
    gambar_produk: z
        .custom<File | undefined>()
        .refine(
            (file) => {
                if (!file) return true; // Allow no file
                return file.size <= MAX_FILE_SIZE;
            },
            {
                message: "Max image size is 2MB.",
            },
        )
        .refine((file) => {
            if (!file) return true; // Allow no file
            return ACCEPTED_IMAGE_TYPES.includes(file?.type);
        }, ".jpg, .jpeg, .png, files are accepted only"),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
