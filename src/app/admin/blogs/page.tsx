"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin-header";
import { useBlogs, useDeleteBlog, type Blog } from "@/features/blog/blog.hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

export default function AdminBlogsPage() {
  const { blogs, total, loading, error, refetch } = useBlogs({ limit: 50, include: "author" });
  const { deleteBlogById, loading: deleteLoading } = useDeleteBlog();
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteBlogById(deleteTarget.id);
      setDeleteTarget(null);
      refetch();
    } catch {
      // error handled by hook
    }
  }

  return (
    <>
      <AdminHeader items={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Blog Posts" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {loading ? "Memuat..." : `${total} blog ditemukan`}
          </p>
          <Button asChild>
            <Link href="/admin/blogs/create">
              <Plus className="size-4" />
              Tulis Blog
            </Link>
          </Button>
        </div>

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
                    Belum ada blog. Mulai tulis blog pertama!
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
