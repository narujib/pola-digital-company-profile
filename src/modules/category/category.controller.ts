import { NextRequest } from "next/server";
import * as categoryService from "./category.service";
import { createCategorySchema, updateCategorySchema, querySchema, parseJsonApiQuery } from "./category.validation";
import { jsonApiSingle, jsonApiList, jsonApiMeta, jsonApiError } from "@/utils/response";
import { withErrorHandler } from "@/utils/error-handler";

// ==========================================
// Serialization Helpers
// ==========================================

interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: { blogs: number };
  blogs?: { id: string; title: string; slug: string }[];
}

function serializeCategoryAttributes(category: CategoryRecord) {
  return {
    name: category.name,
    slug: category.slug,
    blogCount: category._count?.blogs ?? 0,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  };
}

function serializeCategoryRelationships(category: CategoryRecord) {
  return {
    blogs: {
      data: category.blogs?.map((b) => ({ type: "blogs", id: b.id })) || [],
    },
  };
}

function serializeBlogIncluded(category: CategoryRecord) {
  if (!category.blogs) return [];
  return category.blogs.map((b) => ({
    type: "blogs",
    id: b.id,
    attributes: {
      title: b.title,
      slug: b.slug,
    },
  }));
}

// ==========================================
// GET /api/admin/categories
// ==========================================

export const getCategories = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const query = parseJsonApiQuery(searchParams);
  
  // Validate query params
  const result = querySchema.safeParse(query);
  if (!result.success) {
    return jsonApiError({
      code: "VALIDATION_ERROR",
      detail: result.error.issues[0].message,
      status: 400,
    });
  }

  const { categories, meta } = await categoryService.getAllCategories(result.data);
  const categoryRecords = categories as CategoryRecord[];

  const items = categoryRecords.map((c) => ({
    id: c.id,
    attributes: serializeCategoryAttributes(c),
    relationships: serializeCategoryRelationships(c),
  }));

  return jsonApiList({
    type: "categories",
    items,
    meta,
  });
});

// ==========================================
// POST /api/admin/categories
// ==========================================

export const createCategory = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const result = createCategorySchema.safeParse(body);

  if (!result.success) {
    return jsonApiError({
      code: "VALIDATION_ERROR",
      detail: result.error.issues[0].message,
      status: 400,
    });
  }

  const category = await categoryService.createCategory(result.data) as CategoryRecord;

  return jsonApiSingle({
    type: "categories",
    id: category.id,
    attributes: serializeCategoryAttributes(category),
    status: 201,
  });
});

// ==========================================
// GET /api/admin/categories/:id
// ==========================================

export async function getCategoryById(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    const { id } = await params;
    const category = await categoryService.getCategoryById(id) as CategoryRecord;

    return jsonApiSingle({
      type: "categories",
      id: category.id,
      attributes: serializeCategoryAttributes(category),
      relationships: serializeCategoryRelationships(category),
      included: serializeBlogIncluded(category),
    });
  })(request);
}

// ==========================================
// PUT /api/admin/categories/:id
// ==========================================

export async function updateCategory(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    const { id } = await params;
    const body = await request.json();
    const result = updateCategorySchema.safeParse(body);

    if (!result.success) {
      return jsonApiError({
        code: "VALIDATION_ERROR",
        detail: result.error.issues[0].message,
        status: 400,
      });
    }

    const category = await categoryService.updateCategory(id, result.data) as CategoryRecord;

    return jsonApiSingle({
      type: "categories",
      id: category.id,
      attributes: serializeCategoryAttributes(category),
    });
  })(request);
}

// ==========================================
// DELETE /api/admin/categories/:id
// ==========================================

export async function deleteCategory(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    const { id } = await params;
    await categoryService.deleteCategory(id);

    return jsonApiMeta({
      meta: { message: "Kategori berhasil dihapus" },
    });
  })(request);
}

