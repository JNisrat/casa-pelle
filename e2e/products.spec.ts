import { test, expect } from "@playwright/test";

test.describe("Products page E2E", () => {
  test("loads collection page with all handbags", async ({ page }) => {
    await page.goto("/products");
    await expect(page).toHaveTitle(/Collection.*Casa Pelle/);
    await expect(page.getByRole("heading", { name: "The Collection" })).toBeVisible();
    await expect(page.getByTestId("product-card-catalog-1")).toBeVisible();
    await expect(page.getByTestId("product-card-catalog-5")).toBeVisible();
  });

  test("navigates from landing page via discover link", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Discover the collection" }).click();
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole("heading", { name: "The Collection" })).toBeVisible();
  });

  test("opens product detail page from collection", async ({ page }) => {
    await page.goto("/products");
    await page.getByTestId("product-card-catalog-5").click();
    await expect(page).toHaveURL(/\/products\/catalog-5$/);
    await expect(page.getByRole("heading", { name: "Chocolate shoulder bag" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Add to cart" })).toBeVisible();
    await page.getByRole("button", { name: "Add to cart" }).click();
    await expect(page.getByRole("status")).toContainText(
      "Chocolate shoulder bag has been added to your cart.",
    );
    await page.getByRole("link", { name: "View cart" }).click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByTestId("cart-item-catalog-5")).toBeVisible();
  });
});
