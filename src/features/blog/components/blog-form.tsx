import { useState, useMemo } from "react";
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
  FieldError,
} from "@/components/ui/field";
import { Loader2, Link as LinkIcon } from "lucide-react";
import { RichTextEditor } from "@/components/rich-text-editor";
import type { Blog, CreateBlogPayload } from "@/features/blog/blog.hooks";
import { createBlogSchema } from "@/modules/blog/blog.validation";
import { cn } from "@/lib/utils";

interface BlogFormProps {
  initialData?: Blog;
  onSubmit: (data: CreateBlogPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
  onCancel: () => void;
  title?: string;
}

export function BlogForm({
  initialData,
  onSubmit,
  loading,
  error,
  onCancel,
  title: formTitle = "Form Blog",
}: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [customSlug, setCustomSlug] = useState<string | null>(
    initialData?.slug && initialData.slug !== generateSlug(initialData.title)
      ? initialData.slug
      : null
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "");
  const [isPublished, setIsPublished] = useState(initialData?.isPublished || false);
  const [saved, setSaved] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Slug is either manually entered or auto-derived from title
  const slug = customSlug ?? generateSlug(title);

  // Track unsaved changes
  const hasChanges = useMemo(() => {
    if (saved) return false;

    if (initialData) {
      // Editing mode: compare with initial data
      return (
        title !== initialData.title ||
        slug !== initialData.slug ||
        content !== initialData.content ||
        excerpt !== initialData.excerpt ||
        thumbnail !== (initialData.thumbnail || "") ||
        isPublished !== initialData.isPublished
      );
    } else {
      // Create mode: check if any field is filled
      return !!title || !!content || !!excerpt || !!thumbnail;
    }
  }, [saved, title, slug, content, excerpt, thumbnail, isPublished, initialData]);

  useUnsavedChanges(hasChanges);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationErrors({});

    const formData = {
      title,
      slug: slug || undefined,
      content,
      excerpt,
      thumbnail: thumbnail || undefined,
      isPublished,
    };

    // Validate using Zod schema
    const result = createBlogSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setValidationErrors(fieldErrors);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    await onSubmit(formData);
    setSaved(true);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
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
                className={cn(validationErrors.title && "border-destructive focus-visible:ring-destructive")}
              />
              {validationErrors.title && <FieldError>{validationErrors.title}</FieldError>}
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                {customSlug !== null && (
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => setCustomSlug(null)}
                  >
                    Reset ke auto-generate
                  </button>
                )}
              </div>
              <div className="relative">
                <LinkIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="slug"
                  placeholder="url-slug-blog"
                  value={slug}
                  onChange={(e) => {
                    setCustomSlug(e.target.value);
                  }}
                  className={cn("pl-9", validationErrors.slug && "border-destructive focus-visible:ring-destructive")}
                />
              </div>
              {validationErrors.slug && <FieldError>{validationErrors.slug}</FieldError>}

            </Field>

            <Field>
              <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
              <Textarea
                id="excerpt"
                placeholder="Ringkasan singkat blog..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className={cn(validationErrors.excerpt && "border-destructive focus-visible:ring-destructive")}
              />
              {validationErrors.excerpt && <FieldError>{validationErrors.excerpt}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="content">Konten</FieldLabel>
              <div className={validationErrors.content ? "rounded-md border border-destructive" : ""}>
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Tulis konten blog di sini..."
                  className="min-h-[400px]"
                />
              </div>
              {validationErrors.content && <FieldError>{validationErrors.content}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="thumbnail">Thumbnail URL (opsional)</FieldLabel>
              <Input
                id="thumbnail"
                type="text"
                placeholder="https://example.com/image.jpg"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className={cn(validationErrors.thumbnail && "border-destructive focus-visible:ring-destructive")}
              />
              {validationErrors.thumbnail && (
                <FieldError>{validationErrors.thumbnail}</FieldError>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Masukkan URL gambar atau biarkan kosong. Nantinya akan diganti dengan fitur upload.
              </p>
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
                {loading ? "Menyimpan..." : initialData ? "Update Blog" : "Simpan Blog"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
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
