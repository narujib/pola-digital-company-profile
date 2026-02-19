import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Nama kategori wajib diisi")
    .max(100, "Nama kategori maksimal 100 karakter"),
  slug: z
    .string()
    .max(150, "Slug maksimal 150 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)")
    .optional(),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Nama kategori wajib diisi")
    .max(100, "Nama kategori maksimal 100 karakter")
    .optional(),
  slug: z
    .string()
    .max(150, "Slug maksimal 150 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)")
    .optional(),
});

// JSON:API query parameter schema
export const querySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  sort: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type QueryInput = z.infer<typeof querySchema>;

/**
 * Parse JSON:API bracket-notation query params into flat object.
 */
export function parseJsonApiQuery(searchParams: URLSearchParams): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    if (key === "filter[search]") {
      result.search = value;
    } else if (key === "page[number]") {
      result.page = value;
    } else if (key === "page[size]") {
      result.limit = value;
    } else if (key === "sort") {
      result.sort = value;
    }
  }

  return result;
}
