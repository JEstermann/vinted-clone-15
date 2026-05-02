// src/hooks/useMyArticles.ts
import { useQuery } from "@tanstack/react-query";
import { articlesService } from "../services/articlesService";
import { useCurrentUserId } from "./useCurrentUserId";
import type { Article } from "../types/article";

export function useMyArticle() {
  const userId = useCurrentUserId();

  return useQuery<Article[], Error>({
    queryKey: ["my-articles", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await articlesService.getUserArticles(userId);
      return res as Article[];
    },
    enabled: Boolean(userId),
    staleTime: 1000 * 60,
  });
}
