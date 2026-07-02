import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckoutSection } from "@/components/sections/CheckoutSection";
import { CART_STORAGE_KEY } from "@/lib/cart";
import { renderWithProviders } from "@/tests/test-utils";

describe("CheckoutSection", () => {
  beforeEach(() => {
    window.localStorage.clear();
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
  });

  it("renders customer form and order summary", async () => {
    renderWithProviders(<CheckoutSection />);

    expect(await screen.findByRole("heading", { name: "Checkout" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByTestId("checkout-item-catalog-1")).toBeInTheDocument();
    expect(screen.getByTestId("checkout-total")).toHaveTextContent("Total: $ 200");
    expect(screen.getByRole("button", { name: "Proceed to payment" })).toBeInTheDocument();
  });

  it("submits checkout with customer details", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CheckoutSection />);

    await screen.findByTestId("checkout-item-catalog-1");
    await user.type(screen.getByPlaceholderText("Full name"), "Jane Doe");
    await user.type(screen.getByPlaceholderText("Email"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("Phone number"), "+61 400 000 000");
    await user.type(screen.getByPlaceholderText("Street address"), "12 Leather Lane");
    await user.type(screen.getByPlaceholderText("City"), "Sydney");
    await user.type(screen.getByPlaceholderText("Postcode"), "2000");
    await user.type(screen.getByPlaceholderText("Country"), "Australia");
    await user.click(screen.getByRole("button", { name: "Proceed to payment" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Your order is complete!")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("jane@example.com");
    expect(screen.getByRole("link", { name: "Explore the collection" })).toHaveAttribute(
      "href",
      "/products",
    );
  });
});
