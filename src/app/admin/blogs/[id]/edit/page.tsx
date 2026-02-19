"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin-header";
import {
  useBlogById,
  useUpdateBlog,
  type Blog,
  type CreateBlogPayload,
} from "@/features/blog/blog.hooks";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { BlogForm } from "@/features/blog/components/blog-form";

const breadcrumbItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Edit Blog" },
];

// Extracted form component — initialises state from props, no useEffect needed
function EditBlogForm({ blog }: { blog: Blog }) {
  const router = useRouter();
  const { update, loading, error } = useUpdateBlog();

  async function handleSubmit(data: CreateBlogPayload) {
    try {
      await update(blog.id, data);
      toast.success("Blog berhasil diupdate");
      router.push("/admin/blogs");
    } catch {
      toast.error("Gagal mengupdate blog");
    }
  }

  return (
    <BlogForm
      title="Edit Blog"
      initialData={blog}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      onCancel={() => router.push("/admin/blogs")}
    />
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
