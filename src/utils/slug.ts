/**
 * Generate URL-friendly slug dari title.
 *
 * - Lowercase
 * - Replace spaces dan special chars dengan dash
 * - Remove duplicate dashes
 * - Trim dashes dari awal/akhir
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars (except spaces & dashes)
    .replace(/[\s_]+/g, "-") // replace spaces & underscores with dash
    .replace(/-+/g, "-") // replace multiple dashes with single
    .replace(/^-+|-+$/g, ""); // trim dashes from start/end
}
