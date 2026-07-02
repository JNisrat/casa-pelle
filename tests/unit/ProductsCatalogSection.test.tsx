import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductsCatalogSection } from "@/components/sections/ProductsCatalogSection";
import { CATALOG_PRODUCTS } from "@/lib/constants";

describe("ProductsCatalogSection", () => {
  it("renders collection heading and all catalog products", () => {
    render(<ProductsCatalogSection />);
    expect(screen.getByRole("heading", { name: "The Collection" })).toBeInTheDocument();
    expect(screen.getAllByTestId(/product-card-catalog-/)).toHaveLength(CATALOG_PRODUCTS.length);
  });
});
