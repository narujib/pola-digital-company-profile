import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/utils/response";
import { withErrorHandler } from "@/utils/error-handler";
import { createBlogSchema, updateBlogSchema, querySchema } from "./blog.validation";
import * as blogService from "./blog.service";

// ==========================================
// Get Blog by ID (Admin)
// ==========================================

export async function getBlogByIdController(
  req: NextRequest,
  id: string
) {
  return withErrorHandler(async () => {
    const blog = await blogService.getBlogById(id);
    return successResponse({ data: blog });
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
    return errorResponse({
      code: "VALIDATION_ERROR",
      message: result.error.issues[0].message,
      status: 400,
    });
  }

  const { blogs, meta } = await blogService.getAllBlogs(result.data);

  return successResponse({ data: blogs, meta });
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
    const blog = await blogService.getBlogBySlug(slug, include);

    return successResponse({ data: blog });
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
      return errorResponse({
        code: "VALIDATION_ERROR",
        message: result.error.issues[0].message,
        status: 400,
      });
    }

    const blog = await blogService.createBlog(result.data, authorId);

    return successResponse({ data: blog, status: 201 });
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
      return errorResponse({
        code: "VALIDATION_ERROR",
        message: result.error.issues[0].message,
        status: 400,
      });
    }

    const blog = await blogService.updateBlog(id, result.data);

    return successResponse({ data: blog });
  })(req);
}

// ==========================================
// Delete Blog (Admin)
// ==========================================

export async function deleteBlogController(id: string) {
  return withErrorHandler(async () => {
    await blogService.deleteBlog(id);

    return successResponse({ data: { message: "Blog berhasil dihapus" } });
  })({} as NextRequest);
}
