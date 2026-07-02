import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductsSection } from "@/components/sections/ProductsSection";

describe("ProductsSection", () => {
  it("renders product grid and discover button", () => {
    render(<ProductsSection />);
    expect(screen.getByRole("heading", { name: "Our Products" })).toBeInTheDocument();
    expect(screen.getByText("Emily bag")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-product-1")).toHaveAttribute("href", "/products/catalog-1");
    expect(screen.getByTestId("product-card-product-4")).toHaveAttribute("href", "/products/catalog-4");
    expect(screen.getByRole("link", { name: "Discover the collection" })).toHaveAttribute(
      "href",
      "/products",
    );
  });
});
