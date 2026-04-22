export type Article = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  size: string;
  condition: string;
  imageUrl: string;
  userName: string;
  userId: string;
  createdAt: string;
};

export type ArticleFormData = Omit<
  Article,
  "id" | "userId" | "userName" | "createdAt"
>;

export type Category = {
  id: string;
  label: string;
};

export type Condition = {
  value: string;
  label: string;
};

export type SortOption = "date_desc" | "price_asc" | "price_desc";

export interface CatalogueFilters {
  search?: string;
  category?: string;
  condition?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: SortOption;
}

export type ValidationError = {
  field: string;
  message: string;
};

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  perPage?: number;
}

export interface FormValidationState {
  [key: string]: string;
}

export const CATEGORIES: Category[] = [
  { id: "tops", label: "Hauts" },
  { id: "bottoms", label: "Bas" },
  { id: "shoes", label: "Chaussures" },
  { id: "coats", label: "Manteaux" },
  { id: "accessories", label: "Accessoires" },
  { id: "sportswear", label: "Sportswear" },
];

export const CONDITIONS: Condition[] = [
  { value: "neuf_avec_etiquette", label: "Neuf avec étiquette" },
  { value: "neuf_sans_etiquette", label: "Neuf sans étiquette" },
  { value: "tres_bon_etat", label: "Très bon état" },
  { value: "bon_etat", label: "Bon état" },
  { value: "satisfaisant", label: "Satisfaisant" },
];
