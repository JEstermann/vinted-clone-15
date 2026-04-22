import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Article } from "../types/article";

export function useArticleFavorites() {
  const queryClient = useQueryClient();

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => api.get<Article[]>("/api/favorites"),
  });

  const favoriteIds = useMemo(
    () => new Set(favorites?.map((f) => f.id) || []),
    [favorites],
  );

  const mutation = useMutation({
    mutationFn: async ({
      articleId,
      isFavorite,
    }: {
      articleId: string;
      isFavorite: boolean;
    }) => {
      if (isFavorite) {
        await api.delete(`/api/favorites/${articleId}`);
      } else {
        await api.post(`/api/favorites/${articleId}`, {});
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const toggle = (articleId: string, isFavorite: boolean) => {
    mutation.mutate({ articleId, isFavorite });
  };

  return { favorites, favoriteIds, toggle, isPending: mutation.isPending };
}
