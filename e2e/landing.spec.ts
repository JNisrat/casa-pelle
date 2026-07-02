import { test, expect } from "@playwright/test";

test.describe("Landing page E2E", () => {
  test("loads with correct title and hero heading", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Casa Pelle/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Handcrafted");
  });

  test("shop now link navigates to products page", async ({ page }) => {
    await page.goto("/");
    const shopNow = page.getByRole("link", { name: "Shop now" });
    await expect(shopNow).toBeVisible();
    await shopNow.click();
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole("heading", { name: "The Collection" })).toBeVisible();
  });

  test("product grid displays items with prices", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Our Products" })).toBeVisible();
    await expect(page.getByText("Emily bag").first()).toBeVisible();
    await expect(page.getByText("$ 200").first()).toBeVisible();
  });

  test("footer shows contact details", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("luxora@gmail.com")).toBeVisible();
    await expect(page.getByText("+61 493166737")).toBeVisible();
  });
});
