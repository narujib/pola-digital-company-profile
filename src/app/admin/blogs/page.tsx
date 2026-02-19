"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminHeader } from "@/components/admin-header";
import { useBlogs, useDeleteBlog, type Blog } from "@/features/blog/blog.hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Plus, Pencil, Trash2, Loader2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";

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

  const [search, setSearch] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);

  // Debounce search → then sync to URL
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      // Reset to page 1 & update URL
      const published = statusFilter === "published" ? "true" : statusFilter === "draft" ? "false" : undefined;
      router.replace(buildUrl({
        "page[number]": "1",
        "filter[search]": search || undefined,
        "filter[published]": published,
      }));
    }, 400);
    return () => clearTimeout(timer);
  }, [search, statusFilter, router]);

  // Handle filter change → sync to URL
  const handleStatusChange = useCallback((value: string) => {
    const published = value === "published" ? "true" : value === "draft" ? "false" : undefined;
    router.replace(buildUrl({
      "page[number]": "1",
      "filter[search]": debouncedSearch || undefined,
      "filter[published]": published,
    }));
  }, [debouncedSearch, router]);

  // Handle page change → sync to URL
  const handlePageChange = useCallback((newPage: number) => {
    const published = statusFilter === "published" ? "true" : statusFilter === "draft" ? "false" : undefined;
    router.replace(buildUrl({
      "page[number]": String(newPage),
      "filter[search]": debouncedSearch || undefined,
      "filter[published]": published,
    }));
  }, [debouncedSearch, statusFilter, router]);

  // Build params for useBlogs
  const published =
    statusFilter === "published" ? true : statusFilter === "draft" ? false : undefined;

  const { blogs, total, totalPages, loading, error, refetch } = useBlogs({
    page: urlPage,
    limit: LIMIT,
    search: debouncedSearch || undefined,
    published,
    include: "author",
  });

  const { deleteBlogById, loading: deleteLoading } = useDeleteBlog();
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteBlogById(deleteTarget.id);
      setDeleteTarget(null);
      toast.success("Blog berhasil dihapus");
      refetch();
    } catch {
      toast.error("Gagal menghapus blog");
    }
  }

  return (
    <>
      <AdminHeader items={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Blog Posts" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search & Filter */}
          <div className="flex flex-1 items-center gap-3">
            <div className="relative max-w-sm flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari blog..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button asChild>
            <Link href="/admin/blogs/create">
              <Plus className="size-4" />
              Tulis Blog
            </Link>
          </Button>
        </div>

        {/* Info */}
        <p className="text-sm text-muted-foreground">
          {loading ? "Memuat..." : `${total} blog ditemukan`}
        </p>

        {/* Error */}
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                <TableHead className="w-[100px] text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : blogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    {debouncedSearch
                      ? `Tidak ada blog dengan kata kunci "${debouncedSearch}"`
                      : "Belum ada blog. Mulai tulis blog pertama!"}
                  </TableCell>
                </TableRow>
              ) : (
                blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div className="font-medium">{blog.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[300px]">
                        {blog.excerpt}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {blog.isPublished ? (
                        <Badge variant="default">Published</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/blogs/${blog.id}/edit`}>
                            <Pencil className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(blog)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Halaman {urlPage} dari {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={urlPage <= 1 || loading}
                onClick={() => handlePageChange(urlPage - 1)}
              >
                <ChevronLeft className="size-4" />
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={urlPage >= totalPages || loading}
                onClick={() => handlePageChange(urlPage + 1)}
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Blog</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah kamu yakin ingin menghapus <strong>&quot;{deleteTarget?.title}&quot;</strong>?
              Tindakan ini tidak bisa dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLoading && <Loader2 className="size-4 animate-spin" />}
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
