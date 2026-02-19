import { z } from "zod/v4";

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title wajib diisi")
    .max(200, "Title maksimal 200 karakter"),
  slug: z
    .string()
    .max(255, "Slug maksimal 255 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)")
    .optional(),
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
  slug: z
    .string()
    .max(255, "Slug maksimal 255 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)")
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

// JSON:API query parameter schema
// e.g. ?filter[published]=true&filter[search]=keyword&page[number]=1&page[size]=10&include=author
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

/**
 * Parse JSON:API bracket-notation query params into flat object.
 *
 * Converts:
 *   filter[published]=true  → published=true
 *   filter[search]=keyword  → search=keyword
 *   page[number]=1          → page=1
 *   page[size]=10           → limit=10
 *   include=author          → include=author (no change)
 */
export function parseJsonApiQuery(searchParams: URLSearchParams): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    if (key === "filter[published]") {
      result.published = value;
    } else if (key === "filter[search]") {
      result.search = value;
    } else if (key === "page[number]") {
      result.page = value;
    } else if (key === "page[size]") {
      result.limit = value;
    } else if (key === "include") {
      result.include = value;
    }
  }

  return result;
}
