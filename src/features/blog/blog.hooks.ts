"use client";

import { useState, useEffect } from "react";
import { fetchBlogs } from "@/features/blog/blog.api";

interface UseBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  published?: boolean;
}

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
