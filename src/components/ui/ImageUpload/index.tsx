import { Upload } from "lucide-react";
import * as React from "react";

interface ImageUploadProps extends Omit<React.ComponentProps<"input">, "value" | "defaultValue"> {
    onImageChange?: (file: File | null) => void;
    defaultValue?: string;
}

const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
    ({ onImageChange, defaultValue, ...props }, ref) => {
        const [imagePreview, setImagePreview] = React.useState<string | null>(defaultValue || null);

        React.useEffect(() => {
            setImagePreview(defaultValue || null);
        }, [defaultValue]);

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                onImageChange?.(file);
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }

            props.onChange?.(e);
        };

        return (
            <div className="flex w-full items-center justify-center">
                <label
                    htmlFor={`image-upload-${props.name}`}
                    className="flex h-38 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-input border-dashed bg-transparent transition-colors hover:bg-muted"
                >
                    {imagePreview ? (
                        <div className="relative size-full">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="size-full object-contain p-4"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="mb-4 size-8 text-muted-foreground" />
                            <p className="mb-2 font-medium text-muted-foreground text-sm">
                                Klik untuk upload gambar
                            </p>
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={`image-upload-${props.name}`}
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg"
                        {...props}
                        onChange={handleImageChange}
                    />
                </label>
            </div>
        );
    },
);

export default ImageUpload;
