import { CATEGORIES, CONDITIONS } from "../types/article";
import "./CatalogueFilters.css";

interface CatalogueFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  condition: string;
  onConditionChange: (value: string) => void;
  priceMin: string;
  onPriceMinChange: (value: string) => void;
  priceMax: string;
  onPriceMaxChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

export function CatalogueFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  condition,
  onConditionChange,
  priceMin,
  onPriceMinChange,
  priceMax,
  onPriceMaxChange,
  sort,
  onSortChange,
}: CatalogueFiltersProps) {
  return (
    <div className="catalogue-filters">
      <div className="filters-row">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Rechercher un article"
        />
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
          aria-label="Filtrer par catégorie"
        >
          <option value="">Toutes les catégories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
        <select
          value={condition}
          onChange={(e) => onConditionChange(e.target.value)}
          className="filter-select"
          aria-label="Filtrer par condition"
        >
          <option value="">Tous les états</option>
          {CONDITIONS.map((cond) => (
            <option key={cond.value} value={cond.value}>
              {cond.label}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
          aria-label="Trier les articles"
        >
          <option value="date_desc">Plus récent</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>
      </div>
      <div className="price-filters">
        <input
          type="number"
          placeholder="Prix min"
          value={priceMin}
          onChange={(e) => onPriceMinChange(e.target.value)}
          className="price-input"
          aria-label="Prix minimum"
        />
        <input
          type="number"
          placeholder="Prix max"
          value={priceMax}
          onChange={(e) => onPriceMaxChange(e.target.value)}
          className="price-input"
          aria-label="Prix maximum"
        />
      </div>
    </div>
  );
}
