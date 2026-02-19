"use client";

import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin-header";
import { useCreateBlog, type CreateBlogPayload } from "@/features/blog/blog.hooks";
import { toast } from "sonner";
import { BlogForm } from "@/features/blog/components/blog-form";

export default function AdminCreateBlogPage() {
  const router = useRouter();
  const { create, loading, error } = useCreateBlog();

  async function handleSubmit(data: CreateBlogPayload) {
    try {
      await create(data);
      toast.success("Blog berhasil dibuat");
      router.push("/admin/blogs");
    } catch {
      toast.error("Gagal membuat blog");
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
        <BlogForm
          title="Tulis Blog Baru"
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          onCancel={() => router.push("/admin/blogs")}
        />
      </div>
    </>
  );
}
