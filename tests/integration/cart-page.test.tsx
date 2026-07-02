import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CartPage from "@/app/cart/page";
import { renderWithProviders } from "@/tests/test-utils";

describe("Cart page integration", () => {
  it("renders cart section and footer", () => {
    renderWithProviders(<CartPage />);
    expect(screen.getByRole("heading", { name: "Your Cart" })).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(screen.getByText("luxora@gmail.com")).toBeInTheDocument();
  });
});
