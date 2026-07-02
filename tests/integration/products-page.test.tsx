import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductsPage from "@/app/products/page";
import { CATALOG_PRODUCTS } from "@/lib/constants";
import { renderWithProviders } from "@/tests/test-utils";

describe("Products page integration", () => {
  it("renders header, catalog grid, and footer", () => {
    renderWithProviders(<ProductsPage />);
    expect(screen.getByRole("heading", { name: "The Collection" })).toBeInTheDocument();
    expect(screen.getAllByTestId(/product-card-catalog-/)).toHaveLength(CATALOG_PRODUCTS.length);
    expect(screen.getByText("luxora@gmail.com")).toBeInTheDocument();
  });
});
