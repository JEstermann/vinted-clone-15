import { Link } from "react-router-dom";
import { CATEGORIES, CONDITIONS } from "../types/article";
import type { Article } from "../types/article";
import { formatPrice } from "../utils/format";
import "./ArticleCard.css";

const categoryMap = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));
const conditionMap = Object.fromEntries(
  CONDITIONS.map((c) => [c.value, c.label]),
);

interface ArticleCardProps {
  article: Article;
  isFavorite?: boolean;
  onToggleFavorite?: (articleId: string, isFavorite: boolean) => void;
  isDisabled?: boolean;
}

export function ArticleCard({
  article,
  isFavorite = false,
  onToggleFavorite,
  isDisabled = false,
}: ArticleCardProps) {
  return (
    <div className="article-card">
      <Link to={`/articles/${article.id}`} className="article-card-image-link">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="article-card-image"
        />
      </Link>
      <div className="article-card-content">
        <div className="article-card-header">
          <Link
            to={`/articles/${article.id}`}
            className="article-card-title-link"
          >
            <h3 className="article-card-title">{article.title}</h3>
          </Link>
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(article.id, isFavorite)}
              className="article-card-favorite-btn"
              disabled={isDisabled}
              aria-label={
                isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
              }
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          )}
        </div>
        <p className="article-card-price">{formatPrice(article.price)}</p>
        <p className="article-card-meta">
          {categoryMap[article.category]} • {conditionMap[article.condition]}
        </p>
        <p className="article-card-seller">Par {article.userName}</p>
      </div>
    </div>
  );
}
