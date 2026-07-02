import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductPage from "@/app/products/[id]/page";
import { renderWithProviders } from "@/tests/test-utils";

describe("Product detail page integration", () => {
  it("renders product details for a valid id", async () => {
    const page = await ProductPage({ params: Promise.resolve({ id: "catalog-5" }) });
    renderWithProviders(page);

    expect(screen.getByRole("heading", { name: "Chocolate shoulder bag" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
  });
});
