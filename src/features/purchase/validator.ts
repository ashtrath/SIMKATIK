import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "~/constants/validatorRules";

export const purchaseProductSchema = z.object({
    nama_produk: z.string(),
    kategori_id: z.coerce.number().int().positive(),
    jumlah: z.coerce.number().int().min(1),
    satuan: z.enum(["Pcs", "Box"]),
    isi_perbox: z.coerce.number().int().min(1).optional().nullable(),
    harga_beli: z.coerce.number().min(0),
    harga_jual: z.coerce.number().min(0),
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

export const purchaseStockSchema = z.object({
    produk_id: z.coerce.number().int().positive(),
    jumlah: z.coerce.number().int().min(1),
    satuan: z.enum(["Pcs", "Box"]),
    isi_perbox: z.coerce.number().int().min(1).optional().nullable(),
    harga_beli: z.coerce.number().min(0),
});

export type PurchaseProductSchema = z.infer<typeof purchaseProductSchema>;

export type PurchaseStockSchema = z.infer<typeof purchaseStockSchema>;
