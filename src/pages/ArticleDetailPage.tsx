import { useParams, Link } from "react-router-dom";
import { CATEGORIES, CONDITIONS } from "../types/article";
import { useArticleFavorites } from "../hooks/useArticleFavorites";
import { useArticle } from "../hooks/useArticle";
import { formatPrice, formatDate } from "../utils/format";
import "./ArticleDetailPage.css";

const categoryMap = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));
const conditionMap = Object.fromEntries(
  CONDITIONS.map((c) => [c.value, c.label]),
);

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { favoriteIds, toggle, isPending } = useArticleFavorites();
  const { article, isLoading, error } = useArticle(id);

  if (isLoading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error || !article) {
    return (
      <div className="error">
        <p>Article non trouvé</p>
        <Link to="/" className="back-link">
          ← Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="article-detail">
      <Link to="/" className="back-link">
        ← Retour au catalogue
      </Link>

      <div className="detail-container">
        <div className="detail-image">
          <img src={article.imageUrl} alt={article.title} />
        </div>

        <div className="detail-content">
          <div className="detail-header">
            <div>
              <h1>{article.title}</h1>
              <p className="detail-seller">Vendu par {article.userName}</p>
            </div>
            <button
              onClick={() => toggle(article.id, favoriteIds.has(article.id))}
              className={`favorite-btn-large ${favoriteIds.has(article.id) ? "active" : ""}`}
              disabled={isPending}
            >
              {favoriteIds.has(article.id) ? "♥" : "♡"}
            </button>
          </div>

          <div className="detail-price">
            <span className="price-label">Prix</span>
            <span className="price-value">{formatPrice(article.price)}</span>
          </div>

          <div className="detail-info">
            <div className="info-item">
              <span className="info-label">Catégorie</span>
              <span className="info-value">
                {categoryMap[article.category]}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">État</span>
              <span className="info-value">
                {conditionMap[article.condition]}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Taille</span>
              <span className="info-value">{article.size}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Publié le</span>
              <span className="info-value">
                {formatDate(article.createdAt)}
              </span>
            </div>
          </div>

          <div className="detail-description">
            <h2>Description</h2>
            <p>{article.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
