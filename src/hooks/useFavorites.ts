import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Article } from "../types/article";

export function useFavorites() {
  const queryClient = useQueryClient();

  const {
    data: favorites,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => api.get<Article[]>("/api/favorites"),
  });

  const removeMutation = useMutation({
    mutationFn: async (articleId: string) => {
      return api.delete(`/api/favorites/${articleId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeFavorite = async (articleId: string) => {
    await removeMutation.mutateAsync(articleId);
  };

  return {
    favorites: favorites || [],
    isLoading,
    error,
    removeFavorite,
    isRemoving: removeMutation.isPending,
  };
}
