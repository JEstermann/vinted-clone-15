import { useCatalogueFilters } from "../hooks/useCatalogueFilters";
import { useArticleFavorites } from "../hooks/useArticleFavorites";
import { ArticleCard } from "../components/ArticleCard";
import { CatalogueFilters } from "../components/CatalogueFilters";
import { EmptyState } from "../components/EmptyState";
import "./CataloguePage.css";

export default function CataloguePage() {
  const {
    search,
    setSearch,
    category,
    setCategory,
    condition,
    setCondition,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    sort,
    setSort,
    articles,
    isLoading,
    error,
  } = useCatalogueFilters();

  const { favoriteIds, toggle, isPending } = useArticleFavorites();

  if (isLoading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error.message}</div>;

  return (
    <div className="catalogue">
      <h1 className="catalogue-title">Catalogue</h1>

      <CatalogueFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        condition={condition}
        onConditionChange={setCondition}
        priceMin={priceMin}
        onPriceMinChange={setPriceMin}
        priceMax={priceMax}
        onPriceMaxChange={setPriceMax}
        sort={sort}
        onSortChange={setSort}
      />

      {articles.length === 0 ? (
        <EmptyState message="Aucun article ne correspond à vos critères." />
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isFavorite={favoriteIds.has(article.id)}
              onToggleFavorite={toggle}
              isDisabled={isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}
