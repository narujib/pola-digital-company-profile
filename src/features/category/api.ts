import { httpGet, httpPost, httpPut, httpDelete } from "@/lib/http";
import type {
  Category,
  CategoriesResponse,
  CategoryResponse,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  FetchCategoriesParams,
} from "./types";

// JSON:API Helper Types
interface JsonApiResource<A> {
  id: string;
  type: string;
  attributes: A;
}

interface JsonApiListResponse<A> {
  data: JsonApiResource<A>[];
  meta: CategoriesResponse["meta"];
}

interface JsonApiSingleResponse<A> {
  data: JsonApiResource<A>;
}

// Deserializer
function deserializeCategory(resource: JsonApiResource<Omit<Category, "id">>): Category {
  return {
    id: resource.id,
    ...resource.attributes,
  };
}

export const getCategories = async (params?: FetchCategoriesParams): Promise<CategoriesResponse> => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append("page[number]", params.page.toString());
  if (params?.limit) searchParams.append("page[size]", params.limit.toString());
  if (params?.search) searchParams.append("filter[search]", params.search);
  if (params?.sort) searchParams.append("sort", params.sort);

  const query = searchParams.toString();
  const url = `/api/admin/categories${query ? `?${query}` : ""}`;

  const response = await httpGet<JsonApiListResponse<Omit<Category, "id">>>(url);

  return {
    data: response.data.map(deserializeCategory),
    meta: response.meta,
  };
};

export const getCategoryById = async (id: string): Promise<CategoryResponse> => {
  const response = await httpGet<JsonApiSingleResponse<Omit<Category, "id">>>(`/api/admin/categories/${id}`);
  return {
    data: deserializeCategory(response.data),
  };
};

export const createCategory = async (payload: CreateCategoryPayload): Promise<CategoryResponse> => {
  const response = await httpPost<JsonApiSingleResponse<Omit<Category, "id">>>("/api/admin/categories", payload);
  return {
    data: deserializeCategory(response.data),
  };
};

export const updateCategory = async (id: string, payload: UpdateCategoryPayload): Promise<CategoryResponse> => {
  const response = await httpPut<JsonApiSingleResponse<Omit<Category, "id">>>(`/api/admin/categories/${id}`, payload);
  return {
    data: deserializeCategory(response.data),
  };
};

export const deleteCategory = async (id: string): Promise<void> => {
  return httpDelete<void>(`/api/admin/categories/${id}`);
};
