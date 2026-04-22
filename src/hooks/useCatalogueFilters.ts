import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Article } from "../types/article";

export function useCatalogueFilters() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("date_desc");

  const apiParams = useMemo(() => {
    const p = new URLSearchParams();
    if (category) p.set("category", category);
    if (condition) p.set("condition", condition);
    if (sort) p.set("sort", sort);
    return p.toString();
  }, [category, condition, sort]);

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles", apiParams],
    queryFn: () => api.get<Article[]>(`/api/articles?${apiParams}`),
  });

  const filtered = useMemo(() => {
    if (!articles) return [];
    return articles.filter((article) => {
      const matchesSearch =
        !search ||
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.description.toLowerCase().includes(search.toLowerCase());

      const min = priceMin ? parseFloat(priceMin) : 0;
      const max = priceMax ? parseFloat(priceMax) : Infinity;
      const matchesPrice = article.price >= min && article.price <= max;

      return matchesSearch && matchesPrice;
    });
  }, [articles, search, priceMin, priceMax]);

  return {
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
    articles: filtered,
    isLoading,
    error,
  };
}
