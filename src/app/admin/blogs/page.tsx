"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminHeader } from "@/components/admin-header";
import { useBlogs, useDeleteBlog, type Blog } from "@/features/blog/blog.hooks";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AdminSearchInput } from "@/components/admin/search-input";
import { AdminStatusFilter } from "@/components/admin/status-filter";
import { AdminPagination } from "@/components/admin/pagination";
import { BlogListTable } from "@/features/blog/components/blog-list-table";

const LIMIT = 10;

function buildUrl(params: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) sp.set(key, value);
  }
  const qs = sp.toString();
  return `/admin/blogs${qs ? `?${qs}` : ""}`;
}

export default function AdminBlogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial state from URL
  const urlPage = Number(searchParams.get("page[number]")) || 1;
  const urlSearch = searchParams.get("filter[search]") || "";
  const urlStatus = searchParams.get("filter[published]");
  const statusFilter = urlStatus === "true" ? "published" : urlStatus === "false" ? "draft" : "all";

  // Build params for useBlogs
  const published =
    statusFilter === "published" ? true : statusFilter === "draft" ? false : undefined;

  const { blogs, totalPages, loading, error, refetch } = useBlogs({
    page: urlPage,
    limit: LIMIT,
    search: urlSearch || undefined, // use urlSearch directly, debounce is handled in component
    published,
    include: "author",
  });

  const { deleteBlogById, loading: deleteLoading } = useDeleteBlog();
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);

  // Handlers
  const handleSearchChange = useCallback((value: string) => {
    // Reset to page 1 & update URL
    const published = statusFilter === "published" ? "true" : statusFilter === "draft" ? "false" : undefined;
    router.replace(buildUrl({
      "page[number]": "1",
      "filter[search]": value || undefined,
      "filter[published]": published,
    }));
  }, [router, statusFilter]);

  const handleStatusChange = useCallback((value: string) => {
    const published = value === "published" ? "true" : value === "draft" ? "false" : undefined;
    router.replace(buildUrl({
      "page[number]": "1",
      "filter[search]": urlSearch || undefined,
      "filter[published]": published,
    }));
  }, [router, urlSearch]);

  const handlePageChange = useCallback((newPage: number) => {
    const published = statusFilter === "published" ? "true" : statusFilter === "draft" ? "false" : undefined;
    router.replace(buildUrl({
      "page[number]": String(newPage),
      "filter[search]": urlSearch || undefined,
      "filter[published]": published,
    }));
  }, [router, urlSearch, statusFilter]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteBlogById(deleteTarget.id);
      toast.success("Blog berhasil dihapus");
      refetch();
    } catch {
      toast.error("Gagal menghapus blog");
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, deleteBlogById, refetch]);

  return (
    <>
      <AdminHeader
        items={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Blogs" }]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Manajemen Blog</h1>
          <Button asChild>
            <Link href="/admin/blogs/create">
              <Plus className="mr-2 h-4 w-4" />
              Buat Blog Baru
            </Link>
          </Button>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <AdminSearchInput
            value={urlSearch}
            onChange={handleSearchChange}
          />
          <AdminStatusFilter
            value={statusFilter}
            onChange={handleStatusChange}
          />
        </div>

        <BlogListTable
          blogs={blogs}
          loading={loading}
          onDelete={setDeleteTarget}
        />

        <AdminPagination
          currentPage={urlPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Blog</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus blog &quot;{deleteTarget?.title}&quot;? Tindakan ini tidak
              dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteLoading}
            >
              {deleteLoading ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
