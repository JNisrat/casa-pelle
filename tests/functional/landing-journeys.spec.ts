import { test, expect } from "@playwright/test";

test.describe("Landing page functional journeys @functional", () => {
  test("visitor browses products and clicks discover the collection", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Our Products" }).scrollIntoViewIfNeeded();
    await expect(page.getByText("Emily bag").first()).toBeVisible();
    const discoverLink = page.getByRole("link", { name: "Discover the collection" });
    await discoverLink.scrollIntoViewIfNeeded();
    await discoverLink.click();
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole("heading", { name: "The Collection" })).toBeVisible();
    await expect(page.getByTestId("product-card-catalog-1")).toBeVisible();
  });

  test("visitor navigates reviews carousel", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Reviews" }).scrollIntoViewIfNeeded();
    await expect(page.getByTestId("review-counter")).toHaveText("1/10");
    await page.getByRole("button", { name: "Next review" }).click();
    await expect(page.getByTestId("review-counter")).toHaveText("2/10");
    await expect(page.getByText("Emma")).toBeVisible();
  });

  test("visitor submits contact form and receives confirmation", async ({ page }) => {
    await page.route("**/formsubmit.co/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: "true", message: "Form submitted successfully" }),
      });
    });

    await page.goto("/");
    await page.getByRole("heading", { name: "Want to Customise" }).scrollIntoViewIfNeeded();
    await page.getByPlaceholder("Name").fill("Jane Doe");
    await page.getByPlaceholder("Email").fill("jane@example.com");
    await page.getByPlaceholder("Message").fill("I would like a custom burgundy bag.");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByRole("status")).toContainText("Thank you, your email has been sent");
  });
});
