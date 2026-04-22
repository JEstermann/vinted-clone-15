import { api } from "./api";
import type { Article, ArticleFormData } from "../types/article";

export const articlesService = {
  getAll: async (params?: {
    category?: string;
    condition?: string;
    sort?: string;
  }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append("category", params.category);
    if (params?.condition) query.append("condition", params.condition);
    if (params?.sort) query.append("sort", params.sort);

    const queryString = query.toString();
    const path = queryString ? `/api/articles?${queryString}` : "/api/articles";
    return api.get<Article[]>(path);
  },

  getById: async (id: string) => {
    return api.get<Article>(`/api/articles/${id}`);
  },

  create: async (data: ArticleFormData) => {
    return api.post<Article>("/api/articles", data);
  },

  update: async (id: string, data: Partial<ArticleFormData>) => {
    return api.put<Article>(`/api/articles/${id}`, data);
  },

  delete: async (id: string) => {
    return api.delete<void>(`/api/articles/${id}`);
  },

  getUserArticles: async (userId: string) => {
    return api.get<Article[]>(`/api/users/${userId}/articles`);
  },
};
