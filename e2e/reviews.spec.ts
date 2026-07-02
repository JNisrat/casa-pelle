import { test, expect } from "@playwright/test";

test.describe("Reviews page E2E", () => {
  test("navigates from header and submits a review", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Reviews" }).click();
    await expect(page).toHaveURL(/\/reviews$/);
    await expect(page.getByRole("heading", { name: "Reviews", exact: true })).toBeVisible();
    await expect(page.getByTestId("review-card-review-1")).toBeVisible();

    await expect(page.getByRole("button", { name: "Next reviews" })).toBeVisible();
    await page.getByRole("button", { name: "Next reviews" }).click();
    await expect(page.getByTestId("reviews-carousel-counter")).toHaveText("2/4");

    await page.getByPlaceholder("Name").fill("Jane Doe");
    await page.getByPlaceholder(/Review title/).fill("Ordered a bespoke clutch");
    await page.getByPlaceholder("Your review").fill("The leather quality is exceptional.");
    await page.getByRole("button", { name: "Submit review" }).click();

    await expect(page.getByRole("status")).toContainText("Thank you! Your review has been added.");
    await expect(page.getByText("Jane Doe").first()).toBeVisible();
  });
});
