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

interface BlogListResponse {
  success: true;
  data: Blog[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface BlogDetailResponse {
  success: true;
  data: Blog;
}

interface BlogMutationResponse {
  success: true;
  data: Blog;
}

interface DeleteResponse {
  success: true;
  data: { message: string };
}

interface FetchBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  published?: boolean;
  include?: string;
}

// ==========================================
// API Functions
// ==========================================

export function fetchBlogs(
  params?: FetchBlogsParams
): Promise<BlogListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.published !== undefined)
    searchParams.set("published", String(params.published));
  if (params?.include) searchParams.set("include", params.include);

  const qs = searchParams.toString();
  return httpGet<BlogListResponse>(`/api/blogs${qs ? `?${qs}` : ""}`);
}

export function fetchBlogBySlug(
  slug: string,
  include?: string
): Promise<BlogDetailResponse> {
  const qs = include ? `?include=${include}` : "";
  return httpGet<BlogDetailResponse>(`/api/blogs/${slug}${qs}`);
}

export function fetchBlogById(id: string): Promise<BlogDetailResponse> {
  return httpGet<BlogDetailResponse>(`/api/admin/blogs/${id}`);
}

export function createBlog(
  payload: Partial<Blog>
): Promise<BlogMutationResponse> {
  return httpPost<BlogMutationResponse>("/api/admin/blogs", payload);
}

export function updateBlog(
  id: string,
  payload: Partial<Blog>
): Promise<BlogMutationResponse> {
  return httpPut<BlogMutationResponse>(`/api/admin/blogs/${id}`, payload);
}

export function deleteBlog(id: string): Promise<DeleteResponse> {
  return httpDelete<DeleteResponse>(`/api/admin/blogs/${id}`);
}
