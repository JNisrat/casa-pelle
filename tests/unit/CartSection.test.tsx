import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CartSection } from "@/components/sections/CartSection";
import { CART_STORAGE_KEY } from "@/lib/cart";
import { renderWithProviders } from "@/tests/test-utils";

describe("CartSection", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows empty state when cart has no items", () => {
    renderWithProviders(<CartSection />);
    expect(screen.getByRole("heading", { name: "Your Cart" })).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse the collection" })).toHaveAttribute("href", "/products");
  });

  it("renders cart items from storage", async () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([
        {
          id: "catalog-1",
          name: "Emily bag",
          price: "$ 200",
          image: "/images/product-1.jpg",
          quantity: 1,
        },
      ]),
    );

    renderWithProviders(<CartSection />);

    expect(await screen.findByTestId("cart-item-catalog-1")).toBeInTheDocument();
    expect(screen.getByText("Emily bag")).toBeInTheDocument();
    expect(screen.getByTestId("cart-subtotal")).toHaveTextContent("Subtotal: $ 200");
    expect(screen.getByRole("link", { name: "Proceed to checkout" })).toHaveAttribute("href", "/checkout");
  });

  it("removes an item from the cart", async () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([
        {
          id: "catalog-1",
          name: "Emily bag",
          price: "$ 200",
          image: "/images/product-1.jpg",
          quantity: 1,
        },
      ]),
    );

    const user = userEvent.setup();
    renderWithProviders(<CartSection />);

    await screen.findByTestId("cart-item-catalog-1");
    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});
