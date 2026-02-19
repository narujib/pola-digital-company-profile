import { httpGet, httpPost, httpPut, httpDelete } from "@/lib/http";

// ==========================================
// Types
// ==========================================

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail: string | null;
  isPublished: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

// JSON:API response shapes
interface JsonApiResource<A = Record<string, unknown>> {
  type: string;
  id: string;
  attributes: A;
  relationships?: Record<
    string,
    { data: { type: string; id: string } }
  >;
}

interface JsonApiSingleResponse<A = Record<string, unknown>> {
  data: JsonApiResource<A>;
  included?: JsonApiResource[];
  meta?: Record<string, unknown>;
}

interface JsonApiListResponse<A = Record<string, unknown>> {
  data: JsonApiResource<A>[];
  included?: JsonApiResource[];
  meta?: Record<string, unknown>;
}

interface JsonApiMetaResponse {
  meta: Record<string, unknown>;
}

// Flat response shapes (consumed by hooks)
interface BlogListResponse {
  data: Blog[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface BlogDetailResponse {
  data: Blog;
}

interface FetchBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  published?: boolean;
  include?: string;
}

// ==========================================
// Deserialization
// ==========================================

type BlogAttributes = Omit<Blog, "id" | "author">;

function deserializeBlog(
  resource: JsonApiResource<BlogAttributes>,
  included?: JsonApiResource[]
): Blog {
  const blog: Blog = {
    id: resource.id,
    ...resource.attributes,
  };

  // Resolve author from included
  if (included && resource.relationships?.author) {
    const authorRef = resource.relationships.author.data;
    const authorResource = included.find(
      (r) => r.type === authorRef.type && r.id === authorRef.id
    );
    if (authorResource) {
      blog.author = {
        id: authorResource.id,
        ...(authorResource.attributes as { name: string; email: string }),
      };
    }
  }

  return blog;
}

// ==========================================
// API Functions
// ==========================================

export async function fetchBlogs(
  params?: FetchBlogsParams
): Promise<BlogListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page[number]", String(params.page));
  if (params?.limit) searchParams.set("page[size]", String(params.limit));
  if (params?.search) searchParams.set("filter[search]", params.search);
  if (params?.published !== undefined)
    searchParams.set("filter[published]", String(params.published));
  if (params?.include) searchParams.set("include", params.include);

  const qs = searchParams.toString();
  const raw = await httpGet<JsonApiListResponse<BlogAttributes>>(
    `/api/blogs${qs ? `?${qs}` : ""}`
  );

  return {
    data: raw.data.map((r) => deserializeBlog(r, raw.included)),
    meta: raw.meta as BlogListResponse["meta"],
  };
}

export async function fetchBlogBySlug(
  slug: string,
  include?: string
): Promise<BlogDetailResponse> {
  const qs = include ? `?include=${include}` : "";
  const raw = await httpGet<JsonApiSingleResponse<BlogAttributes>>(
    `/api/blogs/${slug}${qs}`
  );

  return { data: deserializeBlog(raw.data, raw.included) };
}

export async function fetchBlogById(id: string): Promise<BlogDetailResponse> {
  const raw = await httpGet<JsonApiSingleResponse<BlogAttributes>>(
    `/api/admin/blogs/${id}`
  );

  return { data: deserializeBlog(raw.data, raw.included) };
}

export async function createBlog(
  payload: Partial<Blog>
): Promise<BlogDetailResponse> {
  const raw = await httpPost<JsonApiSingleResponse<BlogAttributes>>(
    "/api/admin/blogs",
    payload
  );

  return { data: deserializeBlog(raw.data) };
}

export async function updateBlog(
  id: string,
  payload: Partial<Blog>
): Promise<BlogDetailResponse> {
  const raw = await httpPut<JsonApiSingleResponse<BlogAttributes>>(
    `/api/admin/blogs/${id}`,
    payload
  );

  return { data: deserializeBlog(raw.data) };
}

export async function deleteBlog(id: string): Promise<{ meta: { message: string } }> {
  return httpDelete<JsonApiMetaResponse>(`/api/admin/blogs/${id}`) as Promise<{ meta: { message: string } }>;
}
