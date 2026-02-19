import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

// ==========================================
// Create
// ==========================================

export async function createCategory(data: Prisma.CategoryCreateInput) {
  return prisma.category.create({ data });
}

// ==========================================
// Update
// ==========================================

export async function updateCategory(id: string, data: Prisma.CategoryUpdateInput) {
  return prisma.category.update({
    where: { id },
    data,
  });
}

// ==========================================
// Delete
// ==========================================

export async function deleteCategory(id: string) {
  return prisma.category.delete({
    where: { id },
  });
}

// ==========================================
// Find by Slug
// ==========================================

export async function findBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
  });
}

// ==========================================
// Find by Name
// ==========================================

export async function findByName(name: string) {
  return prisma.category.findUnique({
    where: { name },
  });
}

// ==========================================
// Find by ID
// ==========================================

export async function findById(id: string) {
  return prisma.category.findUnique({
    where: { id },
  });
}

// ==========================================
// Find All (with filters, pagination, include)
// ==========================================

interface FindAllOptions {
  where?: Prisma.CategoryWhereInput;
  skip?: number;
  take?: number;
  orderBy?: Prisma.CategoryOrderByWithRelationInput;
}

export async function findAll(options: FindAllOptions) {
  const { where, skip, take, orderBy } = options;

  return prisma.category.findMany({
    where,
    skip,
    take,
    orderBy: orderBy ?? { createdAt: "desc" },
    include: {
      _count: {
        select: { blogs: true },
      },
    },
  });
}

// ==========================================
// Count Total
// ==========================================

export async function countTotal(where?: Prisma.CategoryWhereInput) {
  return prisma.category.count({ where });
}
