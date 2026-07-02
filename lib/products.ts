import { CATALOG_PRODUCTS } from "./constants";
import type { Product } from "./types";

const LANDING_PRODUCT_CATALOG_IDS: Record<string, string> = {
  "product-1": "catalog-1",
  "product-2": "catalog-2",
  "product-3": "catalog-3",
  "product-4": "catalog-4",
};

export function getProductById(id: string): Product | undefined {
  return CATALOG_PRODUCTS.find((product) => product.id === id);
}

export function getAllProductIds(): string[] {
  return CATALOG_PRODUCTS.map((product) => product.id);
}

export function getLandingProductDetailPath(productId: string): string | undefined {
  const catalogId = LANDING_PRODUCT_CATALOG_IDS[productId];
  return catalogId ? `/products/${catalogId}` : undefined;
}
