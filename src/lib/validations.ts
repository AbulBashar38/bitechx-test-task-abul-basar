import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0")
    .max(999999, "Price must be less than 1,000,000"),
  categoryId: z.string().min(1, "Category is required"),
  imageUrl: z
    .string()
    .url("Must be a valid URL")
    .min(1, "Image URL is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;
