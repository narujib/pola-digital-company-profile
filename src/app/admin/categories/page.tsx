"use client";

import { useCallback, useState, useMemo } from "react";
import { PlusIcon } from "lucide-react";
import { useCategories } from "@/features/category/hooks";
import { type Category } from "@/features/category/types";
import { Button } from "@/components/ui/button";
import { AdminSearchInput } from "@/components/admin/search-input";
import { AdminPagination } from "@/components/admin/pagination";
import { AdminSortSelect } from "@/components/admin/sort-select";
import { AdminHeader } from "@/components/admin-header";
import { CategoryListTable } from "@/features/category/components/category-list-table";
import { CategoryDialog } from "@/features/category/components/category-dialog";
import { CategoryDeleteDialog } from "@/features/category/components/category-delete-dialog";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function AdminCategoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // URL Params
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "-createdAt";

  // Data Fetching
  const queryParams = useMemo(() => ({
    page,
    limit: 10,
    search,
    sort,
  }), [page, search, sort]);

  const { data, isLoading, mutate } = useCategories(queryParams);

  // Local State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Handlers
  const handleSearchChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to page 1
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const handleSortChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const handlePageChange = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };



  return (
    <>
      <AdminHeader
        items={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Categories" }]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Manajemen Kategori</h1>
          <Button onClick={handleCreate}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Tambah Kategori
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <AdminSearchInput
            placeholder="Cari kategori..."
            value={search}
            onChange={handleSearchChange}
          />
          <div className="flex items-center gap-2">
            <AdminSortSelect
              value={sort}
              onChange={handleSortChange}
              options={[
                { label: "Terbaru", value: "-createdAt" },
                { label: "Terlama", value: "createdAt" },
                { label: "Nama (A-Z)", value: "name" },
                { label: "Nama (Z-A)", value: "-name" },
              ]}
            />
          </div>
        </div>

        <CategoryListTable
          categories={data?.data || []}
          loading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        <AdminPagination
          currentPage={data?.meta?.page ?? 1}
          totalPages={data?.meta?.totalPages ?? 1}
          onPageChange={handlePageChange}
          loading={isLoading}
        />
      </div>

      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        category={selectedCategory}
        onSuccess={() => mutate()}
      />

      <CategoryDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        category={data?.data.find((c) => c.id === deleteId) || null}
        onSuccess={() => {
          mutate();
          setDeleteId(null);
        }}
      />
    </>
  );
}
