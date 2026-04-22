import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { ArticleCard } from "../components/ArticleCard";
import { EmptyState } from "../components/EmptyState";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const { favorites, isLoading, error, removeFavorite } = useFavorites();

  if (isLoading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="error">Erreur lors du chargement de vos favoris</div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h1>Mes favoris</h1>
        <EmptyState
          message="Vous n'avez pas encore d'articles en favoris."
          action={
            <Link to="/" className="btn btn-primary">
              Découvrir le catalogue
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="favorites">
      <h1>Mes favoris</h1>
      <p className="favorites-count">
        {favorites.length} article{favorites.length > 1 ? "s" : ""}
      </p>

      <div className="favorites-grid">
        {favorites.map((article) => (
          <div key={article.id} className="favorite-card-wrapper">
            <ArticleCard article={article} />
            <button
              onClick={() => removeFavorite(article.id)}
              className="favorite-remove-btn"
            >
              ♡ Retirer des favoris
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
