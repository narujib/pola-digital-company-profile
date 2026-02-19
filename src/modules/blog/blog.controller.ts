import { NextRequest } from "next/server";
import { jsonApiSingle, jsonApiList, jsonApiMeta, jsonApiError } from "@/utils/response";
import { withErrorHandler } from "@/utils/error-handler";
import { createBlogSchema, updateBlogSchema, querySchema } from "./blog.validation";
import * as blogService from "./blog.service";

// ==========================================
// Serialization Helpers
// ==========================================

interface BlogRecord {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail: string | null;
  isPublished: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: { id: string; name: string; email: string };
}

function serializeBlogAttributes(blog: BlogRecord) {
  return {
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    excerpt: blog.excerpt,
    thumbnail: blog.thumbnail,
    isPublished: blog.isPublished,
    authorId: blog.authorId,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  };
}

function serializeBlogRelationships(blog: BlogRecord) {
  return {
    author: {
      data: { type: "users", id: blog.authorId },
    },
  };
}

function serializeAuthorIncluded(blog: BlogRecord) {
  if (!blog.author) return [];
  return [
    {
      type: "users",
      id: blog.author.id,
      attributes: {
        name: blog.author.name,
        email: blog.author.email,
      },
    },
  ];
}

// ==========================================
// Get Blog by ID (Admin)
// ==========================================

export async function getBlogByIdController(
  req: NextRequest,
  id: string
) {
  return withErrorHandler(async () => {
    const blog = await blogService.getBlogById(id) as BlogRecord;
    return jsonApiSingle({
      type: "blogs",
      id: blog.id,
      attributes: serializeBlogAttributes(blog),
      relationships: serializeBlogRelationships(blog),
    });
  })(req);
}

// ==========================================
// Get All Blogs (Public)
// ==========================================

export const getAllBlogsController = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const queryObj = Object.fromEntries(searchParams.entries());

  const result = querySchema.safeParse(queryObj);
  if (!result.success) {
    return jsonApiError({
      code: "VALIDATION_ERROR",
      detail: result.error.issues[0].message,
      status: 400,
    });
  }

  const { blogs, meta } = await blogService.getAllBlogs(result.data);
  const blogRecords = blogs as BlogRecord[];

  // Collect unique included authors
  const includedMap = new Map<string, BlogRecord["author"]>();
  for (const blog of blogRecords) {
    if (blog.author && !includedMap.has(blog.author.id)) {
      includedMap.set(blog.author.id, blog.author);
    }
  }

  const included = Array.from(includedMap.values()).map((author) => ({
    type: "users",
    id: author!.id,
    attributes: {
      name: author!.name,
      email: author!.email,
    },
  }));

  return jsonApiList({
    type: "blogs",
    items: blogRecords.map((blog) => ({
      id: blog.id,
      attributes: serializeBlogAttributes(blog),
      relationships: serializeBlogRelationships(blog),
    })),
    ...(included.length > 0 && { included }),
    meta,
  });
});

// ==========================================
// Get Blog by Slug (Public)
// ==========================================

export async function getBlogBySlugController(
  req: NextRequest,
  slug: string
) {
  return withErrorHandler(async (r: NextRequest) => {
    const include = new URL(r.url).searchParams.get("include") ?? undefined;
    const blog = await blogService.getBlogBySlug(slug, include) as BlogRecord;

    return jsonApiSingle({
      type: "blogs",
      id: blog.id,
      attributes: serializeBlogAttributes(blog),
      relationships: serializeBlogRelationships(blog),
      included: serializeAuthorIncluded(blog),
    });
  })(req);
}

// ==========================================
// Create Blog (Admin)
// ==========================================

export async function createBlogController(
  req: NextRequest,
  authorId: string
) {
  return withErrorHandler(async (r: NextRequest) => {
    const body = await r.json();
    const result = createBlogSchema.safeParse(body);

    if (!result.success) {
      return jsonApiError({
        code: "VALIDATION_ERROR",
        detail: result.error.issues[0].message,
        status: 400,
      });
    }

    const blog = await blogService.createBlog(result.data, authorId) as BlogRecord;

    return jsonApiSingle({
      type: "blogs",
      id: blog.id,
      attributes: serializeBlogAttributes(blog),
      relationships: serializeBlogRelationships(blog),
      status: 201,
    });
  })(req);
}

// ==========================================
// Update Blog (Admin)
// ==========================================

export async function updateBlogController(
  req: NextRequest,
  id: string
) {
  return withErrorHandler(async (r: NextRequest) => {
    const body = await r.json();
    const result = updateBlogSchema.safeParse(body);

    if (!result.success) {
      return jsonApiError({
        code: "VALIDATION_ERROR",
        detail: result.error.issues[0].message,
        status: 400,
      });
    }

    const blog = await blogService.updateBlog(id, result.data) as BlogRecord;

    return jsonApiSingle({
      type: "blogs",
      id: blog.id,
      attributes: serializeBlogAttributes(blog),
      relationships: serializeBlogRelationships(blog),
    });
  })(req);
}

// ==========================================
// Delete Blog (Admin)
// ==========================================

export async function deleteBlogController(id: string) {
  return withErrorHandler(async () => {
    await blogService.deleteBlog(id);

    return jsonApiMeta({ meta: { message: "Blog berhasil dihapus" } });
  })({} as NextRequest);
}
