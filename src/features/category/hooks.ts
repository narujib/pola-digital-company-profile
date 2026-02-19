import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import * as api from "./api";
import type { FetchCategoriesParams, CreateCategoryPayload, UpdateCategoryPayload } from "./types";

// Keys
export const categoriesKeys = {
  all: (params?: FetchCategoriesParams) => ["categories", params] as const,
  detail: (id: string) => ["categories", id] as const,
};

// Hooks
export function useCategories(params?: FetchCategoriesParams) {
  return useSWR(categoriesKeys.all(params), () => api.getCategories(params), {
    keepPreviousData: true,
  });
}

export function useCategory(id: string) {
  return useSWR(id ? categoriesKeys.detail(id) : null, () => api.getCategoryById(id));
}

export function useCreateCategory() {
  return useSWRMutation(
    categoriesKeys.all(),
    (_, { arg }: { arg: CreateCategoryPayload }) => api.createCategory(arg)
  );
}

export function useUpdateCategory() {
  return useSWRMutation(
    categoriesKeys.all(),
    (_, { arg }: { arg: { id: string; payload: UpdateCategoryPayload } }) =>
      api.updateCategory(arg.id, arg.payload)
  );
}

export function useDeleteCategory() {
  return useSWRMutation(
    categoriesKeys.all(),
    (_, { arg }: { arg: string }) => api.deleteCategory(arg)
  );
}
