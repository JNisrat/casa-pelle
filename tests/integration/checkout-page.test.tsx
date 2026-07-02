import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import CheckoutPage from "@/app/checkout/page";
import { CART_STORAGE_KEY } from "@/lib/cart";
import { renderWithProviders } from "@/tests/test-utils";

describe("Checkout page integration", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([
        {
          id: "catalog-5",
          name: "Chocolate shoulder bag",
          price: "$ 200",
          image: "/images/product-emily.png",
          quantity: 1,
        },
      ]),
    );
  });

  it("renders checkout with cart items", async () => {
    renderWithProviders(<CheckoutPage />);
    expect(await screen.findByRole("heading", { name: "Checkout" })).toBeInTheDocument();
    expect(screen.getByTestId("checkout-item-catalog-5")).toBeInTheDocument();
    expect(screen.getByText("luxora@gmail.com")).toBeInTheDocument();
  });
});
