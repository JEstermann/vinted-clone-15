export function formatPrice(price: number): string {
  return `${price.toFixed(2).replace(".", ",")} €`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
