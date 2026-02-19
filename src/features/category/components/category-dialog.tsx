"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategory, useUpdateCategory } from "../hooks";
import type { Category } from "../types";
import { generateSlug } from "@/utils/slug";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi").max(100),
  slug: z.string().max(150).optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  onSuccess?: () => void;
}

export function CategoryDialog({ open, onOpenChange, category, onSuccess }: CategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
          <DialogDescription>
            {category
              ? "Ubah detail kategori di sini. Klik simpan setelah selesai."
              : "Buat kategori baru untuk mengelompokkan blog Anda."}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm 
          category={category} 
          onSuccess={onSuccess} 
          onClose={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}

interface CategoryFormProps {
  category?: Category | null;
  onSuccess?: () => void;
  onClose: () => void;
}

function CategoryForm({ category, onSuccess, onClose }: CategoryFormProps) {
  const isEditing = !!category;
  const { trigger: createCategory, isMutating: isCreating } = useCreateCategory();
  const { trigger: updateCategory, isMutating: isUpdating } = useUpdateCategory();
  
  // Initial state derived safely because this component remounts on open
  const [customSlug, setCustomSlug] = useState<string | null>(category?.slug ?? null);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
    },
  });

  // Handle auto-slug generation
  const nameValue = useWatch({ control: form.control, name: "name" });
  useEffect(() => {
    // Only auto-generate if user hasn't customized it
    if (customSlug === null && nameValue) {
      const generated = generateSlug(nameValue);
      form.setValue("slug", generated);
    }
  }, [nameValue, customSlug, form]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEditing && category) {
        await updateCategory({ id: category.id, payload: data });
        toast.success("Kategori berhasil diperbarui");
      } else {
        await createCategory(data);
        toast.success("Kategori berhasil dibuat");
      }
      onClose();
      onSuccess?.();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;

      // Handle known API errors
      if (err?.code === "SLUG_EXISTS") {
        form.setError("slug", { message: err.message });
      } else if (err?.code === "NAME_EXISTS") {
        form.setError("name", { message: err.message });
      } else {
        const message = error instanceof Error ? error.message : "Terjadi kesalahan";
        toast.error(message);
      }
    }
  };

  const isSubmitting = isCreating || isUpdating;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nama Kategori</Label>
        <Input
          id="name"
          placeholder="Contoh: Teknologi, Tutorial"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="slug">Slug</Label>
          {customSlug !== null && (
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() => {
                setCustomSlug(null);
                // Trigger auto-gen immediately
                form.setValue("slug", generateSlug(nameValue));
              }}
            >
              Auto-generate
            </button>
          )}
        </div>
        <Input
          id="slug"
          placeholder="url-friendly-slug"
          {...form.register("slug")}
          onChange={(e) => {
            form.register("slug").onChange(e);
            setCustomSlug(e.target.value);
          }}
        />
        <p className="text-xs text-muted-foreground">
          Akan digunakan di URL. Kosongkan untuk generate otomatis dari nama.
        </p>
        {form.formState.errors.slug && (
          <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
        )}
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </DialogFooter>
    </form>
  );
}
