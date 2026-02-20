"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchBlogs, fetchBlogById, deleteBlog, createBlog, updateBlog, fetchCategories, fetchBlogBySlug } from "@/features/blog/blog.api";



interface UseBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  published?: boolean;

  include?: string;
  sort?: string;
}

export interface Blog {
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
  categories?: {
    id: string;
    name: string;
    slug: string;
  }[];
}

interface UseBlogsResult {
  blogs: Blog[];
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBlogs(params?: UseBlogsParams): UseBlogsResult {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const key = JSON.stringify(params);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchBlogs(params);
      setBlogs(result.data);
      setTotal(result.meta.total);
      setTotalPages(result.meta.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat blog");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { blogs, total, totalPages, loading, error, refetch: load };
}

// ==========================================
// useDeleteBlog
// ==========================================

interface UseDeleteBlogResult {
  deleteBlogById: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useDeleteBlog(): UseDeleteBlogResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBlogById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteBlog(id);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus blog";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteBlogById, loading, error };
}

// ==========================================
// useCreateBlog
// ==========================================

export interface CreateBlogPayload {
  title: string;
  slug?: string;
  content: string;
  excerpt: string;
  thumbnail?: string;
  isPublished: boolean;
  categoryIds?: string[];
}

interface UseCreateBlogResult {
  create: (payload: CreateBlogPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useCreateBlog(): UseCreateBlogResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (payload: CreateBlogPayload) => {
    setLoading(true);
    setError(null);
    try {
      await createBlog(payload);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal membuat blog";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

// ==========================================
// useBlogBySlug
// ==========================================

interface UseBlogBySlugResult {
  blog: Blog | null;
  loading: boolean;
  error: string | null;
}

export function useBlogBySlug(slug: string, include?: string): UseBlogBySlugResult {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      try {
        const result = await fetchBlogBySlug(slug, include);
        setBlog(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat blog");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, include]);

  return { blog, loading, error };
}

// ==========================================
// useBlogById
// ==========================================


interface UseBlogByIdResult {
  blog: Blog | null;
  loading: boolean;
  error: string | null;
}

export function useBlogById(id: string): UseBlogByIdResult {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchBlogById(id);
        setBlog(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat blog");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return { blog, loading, error };
}

// ==========================================
// useUpdateBlog
// ==========================================

interface UseUpdateBlogResult {
  update: (id: string, payload: Partial<CreateBlogPayload>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useUpdateBlog(): UseUpdateBlogResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, payload: Partial<CreateBlogPayload>) => {
    setLoading(true);
    setError(null);
    try {
      await updateBlog(id, payload);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal mengupdate blog";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}
// ==========================================
// Categories
// ==========================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  blogCount: number;
}

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchCategories();
        setCategories(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat kategori");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { categories, loading, error };
}
