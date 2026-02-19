export interface Category {
  id: string;
  name: string;
  slug: string;
  blogCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  slug?: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  slug?: string;
}

export interface FetchCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export interface CategoriesResponse {
  data: Category[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CategoryResponse {
  data: Category;
}
