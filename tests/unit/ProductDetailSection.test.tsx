import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductDetailSection } from "@/components/sections/ProductDetailSection";
import { renderWithProviders } from "@/tests/test-utils";

const product = {
  id: "catalog-1",
  name: "Emily bag",
  price: "$ 200",
  image: "/images/product-1.jpg",
  description: "A handcrafted leather handbag made to order.",
  material: "Premium full-grain leather",
  dimensions: "W 30cm × H 25cm × D 12cm",
  lining: "Soft suede interior",
};

describe("ProductDetailSection", () => {
  it("renders product details and add to cart button", () => {
    renderWithProviders(<ProductDetailSection product={product} />);

    expect(screen.getByRole("heading", { name: "Emily bag" })).toBeInTheDocument();
    expect(screen.getByText("$ 200")).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText("Premium full-grain leather")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← Back to collection" })).toHaveAttribute("href", "/products");
  });
});
