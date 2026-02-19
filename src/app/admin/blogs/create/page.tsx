"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin-header";
import { useCreateBlog } from "@/features/blog/blog.hooks";
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
import { Loader2 } from "lucide-react";

export default function AdminCreateBlogPage() {
  const router = useRouter();
  const { create, loading, error } = useCreateBlog();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await create({
        title,
        content,
        excerpt,
        thumbnail: thumbnail || undefined,
        isPublished,
      });
      router.push("/admin/blogs");
    } catch {
      // error handled by hook
    }
  }

  return (
    <>
      <AdminHeader
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Blogs", href: "/admin/blogs" },
          { label: "Create Blog" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Tulis Blog Baru</CardTitle>
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
                    <span className="text-sm font-medium">
                      Publish sekarang
                    </span>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Jika tidak dicentang, blog akan disimpan sebagai draft.
                  </p>
                </Field>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="size-4 animate-spin" />}
                    {loading ? "Menyimpan..." : "Simpan Blog"}
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
      </div>
    </>
  );
}
