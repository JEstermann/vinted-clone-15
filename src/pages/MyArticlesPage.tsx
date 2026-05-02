import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMyArticle } from "../hooks/useMyArticle";
import { EmptyState } from "../components/EmptyState";
import { ArticleCard } from "../components/ArticleCard";
import { articlesService } from "../services/articlesService";
import type { Article } from "../types/article";
import "./MyArticlesPage.css";

export default function MyArticlesPage() {
  const queryClient = useQueryClient();

  const { data: articles = [], isLoading, isError, error } = useMyArticle();

  const deleteMutation = useMutation<unknown, Error, string>({
    mutationFn: (articleId: string) => articlesService.delete(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-articles"] });
    },
  });

  const handleDelete = useCallback(
    (articleId: string) => {
      if (!articleId) return;
      const ok = window.confirm(
        "Êtes-vous sûr de vouloir supprimer cet article ?",
      );
      if (!ok) return;
      deleteMutation.mutate(articleId);
    },
    [deleteMutation],
  );

  return (
    <div className="my-articles">
      <h1 className="my-articles-title">Mes annonces</h1>

      {isLoading && <div className="loading">Chargement...</div>}

      {isError && (
        <div className="form-error-message">
          Erreur: {error?.message ?? "Impossible de charger"}
        </div>
      )}

      {!isLoading && articles.length === 0 && (
        <EmptyState message="Aucune annonce pour le moment." />
      )}

      {!isLoading && articles.length > 0 && (
        <div className="articles-grid">
          {articles.map((article: Article) => (
            <div key={article.id} className="article-card-wrapper">
              <ArticleCard
                article={article}
                isDisabled={isLoading || deleteMutation.isPending}
              />
              <button
                onClick={() => handleDelete(article.id)}
                className="btn btn-error"
                disabled={isLoading || deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
