import { api } from "./api";
import type { Article } from "../types/article";

export const favoritesService = {
  getAll: async () => {
    return api.get<Article[]>("/api/favorites");
  },

  add: async (articleId: string) => {
    return api.post<void>(`/api/favorites/${articleId}`, {});
  },

  remove: async (articleId: string) => {
    return api.delete<void>(`/api/favorites/${articleId}`);
  },

  isFavorite: async (articleId: string) => {
    const favorites = await favoritesService.getAll();
    return favorites.some((article) => article.id === articleId);
  },
};
