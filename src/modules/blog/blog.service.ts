import { generateSlug } from "@/utils/slug";
import * as blogRepo from "./blog.repository";
import type { CreateBlogInput, UpdateBlogInput, QueryInput } from "./blog.validation";
import type { Prisma } from "@/generated/prisma/client";

// ==========================================
// Custom Error
// ==========================================

export class BlogError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "BlogError";
  }
}

// ==========================================
// Create Blog
// ==========================================

export async function createBlog(input: CreateBlogInput, authorId: string) {
  const slug = input.slug?.trim() || generateSlug(input.title);

  // Cek slug sudah ada atau belum
  const existing = await blogRepo.findBySlug(slug);
  if (existing) {
    throw new BlogError("SLUG_EXISTS", "Blog dengan slug serupa sudah ada");
  }

  return blogRepo.createBlog({
    title: input.title,
    slug,
    content: input.content,
    excerpt: input.excerpt,
    thumbnail: input.thumbnail,
    isPublished: input.isPublished,
    author: { connect: { id: authorId } },
  });
}

// ==========================================
// Update Blog
// ==========================================

export async function updateBlog(id: string, input: UpdateBlogInput) {
  // Cek blog ada atau tidak
  const existing = await blogRepo.findById(id);
  if (!existing) {
    throw new BlogError("NOT_FOUND", "Blog tidak ditemukan");
  }

  // Jika slug diberikan dari client, gunakan itu; jika title berubah, generate slug baru
  const data: Prisma.BlogUpdateInput = { ...input };

  if (input.slug?.trim()) {
    const newSlug = input.slug.trim();
    const slugExists = await blogRepo.findBySlug(newSlug);
    if (slugExists && slugExists.id !== id) {
      throw new BlogError("SLUG_EXISTS", "Blog dengan slug serupa sudah ada");
    }
    data.slug = newSlug;
  } else if (input.title && input.title !== existing.title) {
    const newSlug = generateSlug(input.title);
    const slugExists = await blogRepo.findBySlug(newSlug);
    if (slugExists && slugExists.id !== id) {
      throw new BlogError("SLUG_EXISTS", "Blog dengan slug serupa sudah ada");
    }
    data.slug = newSlug;
  }

  return blogRepo.updateBlog(id, data);
}

// ==========================================
// Delete Blog
// ==========================================

export async function deleteBlog(id: string) {
  const existing = await blogRepo.findById(id);
  if (!existing) {
    throw new BlogError("NOT_FOUND", "Blog tidak ditemukan");
  }

  return blogRepo.deleteBlog(id);
}

// ==========================================
// Get Blog by ID (Admin)
// ==========================================

export async function getBlogById(id: string) {
  const blog = await blogRepo.findById(id);
  if (!blog) {
    throw new BlogError("NOT_FOUND", "Blog tidak ditemukan");
  }
  return blog;
}

// ==========================================
// Get Blog by Slug
// ==========================================

export async function getBlogBySlug(slug: string, include?: string) {
  const includeAuthor = include?.includes("author") ?? false;
  const blog = await blogRepo.findBySlug(slug, includeAuthor);

  if (!blog) {
    throw new BlogError("NOT_FOUND", "Blog tidak ditemukan");
  }

  return blog;
}

// ==========================================
// Get All Blogs (with filtering, pagination, search)
// ==========================================

export async function getAllBlogs(query: QueryInput) {
  const { page, limit, search, published, include } = query;

  // Build where clause
  const where: Prisma.BlogWhereInput = {};

  if (published !== undefined) {
    where.isPublished = published === "true";
  }

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  const includeAuthor = include?.includes("author") ?? false;
  const skip = (page - 1) * limit;

  // Execute queries
  const [blogs, total] = await Promise.all([
    blogRepo.findAll({
      where,
      skip,
      take: limit,
      includeAuthor,
    }),
    blogRepo.countTotal(where),
  ]);

  return {
    blogs,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
