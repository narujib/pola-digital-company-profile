"use client";

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
import { useDeleteCategory } from "../hooks";
import { toast } from "sonner";
import { type Category } from "../types";

interface CategoryDeleteDialogProps {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CategoryDeleteDialog({
  category,
  open,
  onOpenChange,
  onSuccess,
}: CategoryDeleteDialogProps) {
  const { trigger: deleteCategory, isMutating } = useDeleteCategory();

  const handleDelete = async () => {
    if (!category) return;

    try {
      await deleteCategory(category.id);
      toast.success("Kategori berhasil dihapus");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus kategori");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Kategori &quot;{category?.name}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Kategori ini akan dihapus permanen dari sistem
            dan mungkin mempengaruhi blog yang menggunakannya.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isMutating}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isMutating}
          >
            {isMutating ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
