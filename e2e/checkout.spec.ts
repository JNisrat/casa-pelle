import { test, expect } from "@playwright/test";

test.describe("Checkout page E2E", () => {
  test("completes checkout from cart", async ({ page }) => {
    await page.goto("/products/catalog-5");
    await page.getByRole("button", { name: "Add to cart" }).click();
    await page.getByRole("link", { name: "Cart, 1 items" }).click();
    await page.getByRole("link", { name: "Proceed to checkout" }).click();

    await expect(page).toHaveURL(/\/checkout$/);
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
    await expect(page.getByTestId("checkout-item-catalog-5")).toBeVisible();

    await page.getByPlaceholder("Full name").fill("Jane Doe");
    await page.getByPlaceholder("Email").fill("jane@example.com");
    await page.getByPlaceholder("Phone number").fill("+61 400 000 000");
    await page.getByPlaceholder("Street address").fill("12 Leather Lane");
    await page.getByPlaceholder("City").fill("Sydney");
    await page.getByPlaceholder("Postcode").fill("2000");
    await page.getByPlaceholder("Country").fill("Australia");
    await page.getByRole("button", { name: "Proceed to payment" }).click();

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Your order is complete!")).toBeVisible();
    await expect(page.getByRole("status")).toContainText("jane@example.com");
    await expect(page.getByRole("link", { name: "Explore the collection" })).toBeVisible();
  });
});
