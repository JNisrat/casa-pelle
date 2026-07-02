import { test, expect } from "@playwright/test";

test.describe("Cart page E2E", () => {
  test("shows added product in cart", async ({ page }) => {
    await page.goto("/products/catalog-5");
    await page.getByRole("button", { name: "Add to cart" }).click();
    await expect(page.getByRole("status")).toContainText(
      "Chocolate shoulder bag has been added to your cart.",
    );

    await page.getByRole("link", { name: "Cart, 1 items" }).click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByRole("heading", { name: "Your Cart" })).toBeVisible();
    await expect(page.getByTestId("cart-item-catalog-5")).toBeVisible();
    await expect(page.getByText("Chocolate shoulder bag")).toBeVisible();
    await expect(page.getByTestId("cart-subtotal")).toContainText("$ 200");
  });
});
