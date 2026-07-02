import { describe, expect, it } from "vitest";
import { getAllProductIds, getLandingProductDetailPath, getProductById } from "@/lib/products";

describe("products helpers", () => {
  it("returns a product by id", () => {
    const product = getProductById("catalog-1");
    expect(product?.name).toBe("Emily bag");
  });

  it("returns all catalog product ids", () => {
    expect(getAllProductIds()).toContain("catalog-5");
    expect(getAllProductIds().length).toBe(5);
  });

  it("maps landing product ids to detail page paths", () => {
    expect(getLandingProductDetailPath("product-1")).toBe("/products/catalog-1");
    expect(getLandingProductDetailPath("product-4")).toBe("/products/catalog-4");
    expect(getLandingProductDetailPath("product-featured")).toBeUndefined();
  });
});
