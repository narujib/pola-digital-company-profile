"use client";

import { useState, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin-header";
import { useBlogById, useUpdateBlog, type Blog } from "@/features/blog/blog.hooks";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes";
import { generateSlug } from "@/utils/slug";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Loader2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

const breadcrumbItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Edit Blog" },
];

// Extracted form component — initialises state from props, no useEffect needed
function EditBlogForm({ blog }: { blog: Blog }) {
  const router = useRouter();
  const { update, loading, error } = useUpdateBlog();

  const [title, setTitle] = useState(blog.title);
  const [customSlug, setCustomSlug] = useState<string | null>(null);
  const [content, setContent] = useState(blog.content);
  const [excerpt, setExcerpt] = useState(blog.excerpt);
  const [thumbnail, setThumbnail] = useState(blog.thumbnail || "");
  const [isPublished, setIsPublished] = useState(blog.isPublished);
  const [saved, setSaved] = useState(false);

  // Slug is either manually entered or auto-derived from title
  const slug = customSlug ?? generateSlug(title);

  // Track unsaved changes
  const hasChanges = useMemo(
    () =>
      !saved &&
      (title !== blog.title ||
        slug !== blog.slug ||
        content !== blog.content ||
        excerpt !== blog.excerpt ||
        thumbnail !== (blog.thumbnail || "") ||
        isPublished !== blog.isPublished),
    [saved, title, slug, content, excerpt, thumbnail, isPublished, blog]
  );
  useUnsavedChanges(hasChanges);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await update(blog.id, {
        title,
        slug: slug || undefined,
        content,
        excerpt,
        thumbnail: thumbnail || undefined,
        isPublished,
      });
      setSaved(true);
      toast.success("Blog berhasil diupdate");
      router.push("/admin/blogs");
    } catch {
      toast.error("Gagal mengupdate blog");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="title">Judul</FieldLabel>
              <Input
                id="title"
                placeholder="Judul blog"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="slug">Slug</FieldLabel>
              <div className="relative">
                <LinkIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="slug"
                  placeholder="url-slug-blog"
                  value={slug}
                  onChange={(e) => {
                    setCustomSlug(e.target.value);
                  }}
                  className="pl-9"
                />
              </div>
              {slug && (
                <p className="text-xs text-muted-foreground mt-1">
                  Preview: <span className="font-mono text-foreground">/blog/{slug}</span>
                </p>
              )}
              {customSlug !== null && (
                <button
                  type="button"
                  className="text-xs text-primary hover:underline mt-0.5"
                  onClick={() => setCustomSlug(null)}
                >
                  Reset ke auto-generate
                </button>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
              <Textarea
                id="excerpt"
                placeholder="Ringkasan singkat blog..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="content">Konten</FieldLabel>
              <Textarea
                id="content"
                placeholder="Tulis konten blog di sini..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="font-mono text-sm"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="thumbnail">Thumbnail URL (opsional)</FieldLabel>
              <Input
                id="thumbnail"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </Field>

            <Field>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="size-4 rounded border-input accent-primary"
                />
                <span className="text-sm font-medium">Publish sekarang</span>
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Jika tidak dicentang, blog akan disimpan sebagai draft.
              </p>
            </Field>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? "Menyimpan..." : "Update Blog"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/blogs")}
                disabled={loading}
              >
                Batal
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export default function AdminEditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { blog, loading, error } = useBlogById(id);

  return (
    <>
      <AdminHeader items={breadcrumbItems} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {loading && (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {blog && <EditBlogForm key={blog.id} blog={blog} />}
      </div>
    </>
  );
}
