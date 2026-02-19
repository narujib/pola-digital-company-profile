import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

// ==========================================
// Create
// ==========================================

export async function createBlog(data: Prisma.BlogCreateInput) {
  return prisma.blog.create({
    data,
    include: {
      categories: true,
    },
  });
}

// ==========================================
// Update
// ==========================================

export async function updateBlog(id: string, data: Prisma.BlogUpdateInput) {
  return prisma.blog.update({
    where: { id },
    data,
    include: {
      categories: true,
    },
  });
}

// ==========================================
// Delete
// ==========================================

export async function deleteBlog(id: string) {
  return prisma.blog.delete({
    where: { id },
  });
}

// ==========================================
// Find by Slug
// ==========================================

export async function findBySlug(slug: string, includeAuthor: boolean = false) {
  return prisma.blog.findUnique({
    where: { slug },
    include: includeAuthor
      ? {
          author: {
            select: { id: true, name: true, email: true, createdAt: true },
          },
        }
      : undefined,
  });
}

// ==========================================
// Find by ID
// ==========================================

export async function findById(id: string) {
  return prisma.blog.findUnique({
    where: { id },
    include: {
      categories: {
        select: { id: true, name: true, slug: true },
      },
    },
  });
}

// ==========================================
// Find All (with filters, pagination, include)
// ==========================================

interface FindAllOptions {
  where?: Prisma.BlogWhereInput;
  skip?: number;
  take?: number;
  includeAuthor?: boolean;
  orderBy?: Prisma.BlogOrderByWithRelationInput;
}

export async function findAll(options: FindAllOptions) {
  const { where, skip, take, includeAuthor = false, orderBy } = options;

  return prisma.blog.findMany({
    where,
    skip,
    take,
    include: {
      categories: {
        select: { id: true, name: true, slug: true },
      },
      ...(includeAuthor && {
        author: {
          select: { id: true, name: true, email: true, createdAt: true },
        },
      }),
    },
    orderBy: orderBy ?? { createdAt: "desc" },
  });
}

// ==========================================
// Count Total
// ==========================================

export async function countTotal(where?: Prisma.BlogWhereInput) {
  return prisma.blog.count({ where });
}
