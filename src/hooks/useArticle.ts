import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Article } from "../types/article";

export function useArticle(id: string | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => api.get<Article>(`/api/articles/${id}`),
    enabled: !!id,
  });

  return {
    article: data,
    isLoading,
    error,
  };
}
