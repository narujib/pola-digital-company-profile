import { z } from "zod/v4";

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title wajib diisi")
    .max(200, "Title maksimal 200 karakter"),
  content: z
    .string()
    .min(1, "Content wajib diisi"),
  excerpt: z
    .string()
    .min(1, "Excerpt wajib diisi"),
  thumbnail: z
    .string()
    .max(255, "Thumbnail URL maksimal 255 karakter")
    .optional(),
  isPublished: z
    .boolean()
    .optional()
    .default(false),
});

export const updateBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title wajib diisi")
    .max(200, "Title maksimal 200 karakter")
    .optional(),
  content: z
    .string()
    .min(1, "Content wajib diisi")
    .optional(),
  excerpt: z
    .string()
    .min(1, "Excerpt wajib diisi")
    .optional(),
  thumbnail: z
    .string()
    .max(255, "Thumbnail URL maksimal 255 karakter")
    .nullable()
    .optional(),
  isPublished: z
    .boolean()
    .optional(),
});

export const querySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  published: z.enum(["true", "false"]).optional(),
  include: z.string().optional(),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type QueryInput = z.infer<typeof querySchema>;
