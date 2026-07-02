import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCard } from "@/components/ui/ProductCard";

describe("ProductCard", () => {
  it("shows product name and price", () => {
    render(
      <ProductCard
        product={{
          id: "test",
          name: "Emily bag",
          price: "$ 200",
          image: "/images/product-1.jpg",
        }}
      />,
    );
    expect(screen.getByText("Emily bag")).toBeInTheDocument();
    expect(screen.getByText("$ 200")).toBeInTheDocument();
  });

  it("links to product detail page when href is provided", () => {
    render(
      <ProductCard
        product={{
          id: "catalog-1",
          name: "Emily bag",
          price: "$ 200",
          image: "/images/product-1.jpg",
        }}
        href="/products/catalog-1"
      />,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/products/catalog-1");
  });
});
