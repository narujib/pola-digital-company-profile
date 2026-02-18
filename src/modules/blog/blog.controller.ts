import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/utils/response";
import { createBlogSchema, updateBlogSchema, querySchema } from "./blog.validation";
import * as blogService from "./blog.service";
import { BlogError } from "./blog.service";

// ==========================================
// Get All Blogs (Public)
// ==========================================

export async function getAllBlogsController(req: NextRequest) {
  try {
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
  } catch (error) {
    console.error("Get all blogs error:", error);
    return errorResponse({
      code: "INTERNAL_ERROR",
      message: "Terjadi kesalahan internal",
      status: 500,
    });
  }
}

// ==========================================
// Get Blog by Slug (Public)
// ==========================================

export async function getBlogBySlugController(
  req: NextRequest,
  slug: string
) {
  try {
    const include = new URL(req.url).searchParams.get("include") ?? undefined;
    const blog = await blogService.getBlogBySlug(slug, include);

    return successResponse({ data: blog });
  } catch (error) {
    if (error instanceof BlogError) {
      return errorResponse({
        code: error.code,
        message: error.message,
        status: error.code === "NOT_FOUND" ? 404 : 400,
      });
    }

    console.error("Get blog by slug error:", error);
    return errorResponse({
      code: "INTERNAL_ERROR",
      message: "Terjadi kesalahan internal",
      status: 500,
    });
  }
}

// ==========================================
// Create Blog (Admin)
// ==========================================

export async function createBlogController(
  req: NextRequest,
  authorId: string
) {
  try {
    const body = await req.json();
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
  } catch (error) {
    if (error instanceof BlogError) {
      return errorResponse({
        code: error.code,
        message: error.message,
        status: 400,
      });
    }

    console.error("Create blog error:", error);
    return errorResponse({
      code: "INTERNAL_ERROR",
      message: "Terjadi kesalahan internal",
      status: 500,
    });
  }
}

// ==========================================
// Update Blog (Admin)
// ==========================================

export async function updateBlogController(
  req: NextRequest,
  id: string
) {
  try {
    const body = await req.json();
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
  } catch (error) {
    if (error instanceof BlogError) {
      return errorResponse({
        code: error.code,
        message: error.message,
        status: error.code === "NOT_FOUND" ? 404 : 400,
      });
    }

    console.error("Update blog error:", error);
    return errorResponse({
      code: "INTERNAL_ERROR",
      message: "Terjadi kesalahan internal",
      status: 500,
    });
  }
}

// ==========================================
// Delete Blog (Admin)
// ==========================================

export async function deleteBlogController(id: string) {
  try {
    await blogService.deleteBlog(id);

    return successResponse({ data: { message: "Blog berhasil dihapus" } });
  } catch (error) {
    if (error instanceof BlogError) {
      return errorResponse({
        code: error.code,
        message: error.message,
        status: error.code === "NOT_FOUND" ? 404 : 400,
      });
    }

    console.error("Delete blog error:", error);
    return errorResponse({
      code: "INTERNAL_ERROR",
      message: "Terjadi kesalahan internal",
      status: 500,
    });
  }
}
