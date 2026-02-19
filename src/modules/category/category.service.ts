import { generateSlug } from "@/utils/slug";
import * as categoryRepo from "./category.repository";
import type { CreateCategoryInput, UpdateCategoryInput, QueryInput } from "./category.validation";
import type { Prisma } from "@/generated/prisma/client";

// ==========================================
// Custom Error
// ==========================================

export class CategoryError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "CategoryError";
  }
}

// ==========================================
// Create Category
// ==========================================

export async function createCategory(input: CreateCategoryInput) {
  const slug = input.slug?.trim() || generateSlug(input.name);

  // Check unique name
  const existingName = await categoryRepo.findByName(input.name);
  if (existingName) {
    throw new CategoryError("NAME_EXISTS", "Kategori dengan nama tersebut sudah ada");
  }

  // Check unique slug
  const existingSlug = await categoryRepo.findBySlug(slug);
  if (existingSlug) {
    throw new CategoryError("SLUG_EXISTS", "Kategori dengan slug tersebut sudah ada");
  }

  return categoryRepo.createCategory({
    name: input.name,
    slug,
  });
}

// ==========================================
// Update Category
// ==========================================

export async function updateCategory(id: string, input: UpdateCategoryInput) {
  const existing = await categoryRepo.findById(id);
  if (!existing) {
    throw new CategoryError("NOT_FOUND", "Kategori tidak ditemukan");
  }

  const data: Prisma.CategoryUpdateInput = { ...input };

  // Handle Name Uniqueness if changed
  if (input.name && input.name !== existing.name) {
    const nameExists = await categoryRepo.findByName(input.name);
    if (nameExists && nameExists.id !== id) {
      throw new CategoryError("NAME_EXISTS", "Kategori dengan nama tersebut sudah ada");
    }
  }

  // Handle Slug Uniqueness if changed
  if (input.slug?.trim()) {
    const newSlug = input.slug.trim();
    const slugExists = await categoryRepo.findBySlug(newSlug);
    if (slugExists && slugExists.id !== id) {
      throw new CategoryError("SLUG_EXISTS", "Kategori dengan slug tersebut sudah ada");
    }
    data.slug = newSlug;
  } else if (input.name && input.name !== existing.name) {
    // If name changes but slug not provided, auto-generate new slug
    const newSlug = generateSlug(input.name);
    const slugExists = await categoryRepo.findBySlug(newSlug);
    if (slugExists && slugExists.id !== id) {
       // If auto-generated slug exists, append random string or throw error?
       // For now, throw error to let user decide
      throw new CategoryError("SLUG_EXISTS", "Kategori dengan slug tersebut sudah ada");
    }
    data.slug = newSlug;
  }

  return categoryRepo.updateCategory(id, data);
}

// ==========================================
// Delete Category
// ==========================================

export async function deleteCategory(id: string) {
  const existing = await categoryRepo.findById(id);
  if (!existing) {
    throw new CategoryError("NOT_FOUND", "Kategori tidak ditemukan");
  }

  return categoryRepo.deleteCategory(id);
}

// ==========================================
// Get Category by ID
// ==========================================

export async function getCategoryById(id: string) {
  const category = await categoryRepo.findById(id);
  if (!category) {
    throw new CategoryError("NOT_FOUND", "Kategori tidak ditemukan");
  }
  return category;
}

// ==========================================
// Get All Categories
// ==========================================

export async function getAllCategories(query: QueryInput) {
  const { page, limit, search, sort } = query;

  const where: Prisma.CategoryWhereInput = {};

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  // Handle sorting
  let orderBy: Prisma.CategoryOrderByWithRelationInput = { createdAt: "desc" };
  if (sort) {
    const isDesc = sort.startsWith("-");
    const field = isDesc ? sort.substring(1) : sort;
    if (["name", "slug", "createdAt", "updatedAt"].includes(field)) {
      orderBy = { [field]: isDesc ? "desc" : "asc" };
    }
  }

  const skip = (page - 1) * limit;

  const [categories, total] = await Promise.all([
    categoryRepo.findAll({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    categoryRepo.countTotal(where),
  ]);

  return {
    categories,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
