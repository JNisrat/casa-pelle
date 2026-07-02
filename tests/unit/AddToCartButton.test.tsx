import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { CART_STORAGE_KEY } from "@/lib/cart";
import { renderWithProviders } from "@/tests/test-utils";

const product = {
  id: "catalog-1",
  name: "Emily bag",
  price: "$ 200",
  image: "/images/product-1.jpg",
};

describe("AddToCartButton", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows confirmation modal after adding to cart", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AddToCartButton product={product} />);

    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Emily bag has been added to your cart.");
    expect(screen.getByRole("link", { name: "View cart" })).toHaveAttribute("href", "/cart");

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const stored = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe("catalog-1");
  });
});
