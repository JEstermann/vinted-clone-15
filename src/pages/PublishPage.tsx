import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, CONDITIONS } from "../types/article";
import { articlesService } from "../services/articlesService";
import type { ArticleFormData } from "../types/article";
import "./PublishPage.css";

interface FormData extends ArticleFormData {
  imageUrl: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function PublishPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: 0,
    category: "",
    size: "",
    condition: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);

  useEffect(() => {
    const savedDraft = localStorage.getItem("draft");
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setFormData(draftData);
      } catch (error) {
        console.warn("Erreur lors du chargement du brouillon:", error);
      }
    }
    setIsDraftLoaded(true);
  }, []);

  useEffect(() => {
    if (isDraftLoaded) {
      localStorage.setItem("draft", JSON.stringify(formData));
    }
  }, [formData, isDraftLoaded]);

  const mutation = useMutation({
    mutationFn: (data: ArticleFormData) => articlesService.create(data),
    onSuccess: () => {
      localStorage.removeItem("draft");
      navigate("/my-articles");
      queryClient.invalidateQueries({ queryKey: ["my-articles"] });
    },
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Le titre est requis";
    }
    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
    }
    if (formData.price <= 0) {
      newErrors.price = "Le prix doit être supérieur à 0";
    }
    if (!formData.category) {
      newErrors.category = "La catégorie est requise";
    }
    if (!formData.size.trim()) {
      newErrors.size = "La taille est requise";
    }
    if (!formData.condition) {
      newErrors.condition = "L'état est requis";
    }
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "L'URL de l'image est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    mutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData((prev) => ({
      ...prev,
      imageUrl: url,
    }));
    if (url && !errors.imageUrl) {
      const img = new Image();
      img.onload = () => {};
      img.onerror = () => {
        setErrors((prev) => ({
          ...prev,
          imageUrl: "L'URL de l'image n'est pas valide",
        }));
      };
      img.src = url;
    }
  };

  return (
    <div className="publish-page max-w-2xl mx-auto px-4 py-8">
      <h1 className="publish-title">Publier une annonce</h1>

      <form onSubmit={handleSubmit} className="publish-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Titre *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Robe noire"
            className={`form-input ${errors.title ? "error" : ""}`}
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez votre article en détail..."
            rows={5}
            className={`form-input form-textarea ${errors.description ? "error" : ""}`}
          />
          {errors.description && (
            <span className="form-error">{errors.description}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Prix (€) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`form-input ${errors.price ? "error" : ""}`}
            />
            {errors.price && <span className="form-error">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Catégorie *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-input ${errors.category ? "error" : ""}`}
            >
              <option value="">-- Sélectionner une catégorie --</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="form-error">{errors.category}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="size" className="form-label">
              Taille *
            </label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="Ex: M, L, 38, 40"
              className={`form-input ${errors.size ? "error" : ""}`}
            />
            {errors.size && <span className="form-error">{errors.size}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="condition" className="form-label">
              État *
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className={`form-input ${errors.condition ? "error" : ""}`}
            >
              <option value="">-- Sélectionner un état --</option>
              {CONDITIONS.map((cond) => (
                <option key={cond.value} value={cond.value}>
                  {cond.label}
                </option>
              ))}
            </select>
            {errors.condition && (
              <span className="form-error">{errors.condition}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">
            URL de l'image *
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleImageUrlChange}
            placeholder="https://exemple.com/image.jpg"
            className={`form-input ${errors.imageUrl ? "error" : ""}`}
          />
          {errors.imageUrl && (
            <span className="form-error">{errors.imageUrl}</span>
          )}

          {formData.imageUrl && !errors.imageUrl && (
            <div className="image-preview">
              <img src={formData.imageUrl} alt="Aperçu" />
            </div>
          )}
        </div>

        {mutation.isError && (
          <div className="form-error-message">
            Erreur:{" "}
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Une erreur est survenue"}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-secondary"
            disabled={mutation.isPending}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Publication en cours..."
              : "Publier l'annonce"}
          </button>
        </div>
      </form>
    </div>
  );
}
