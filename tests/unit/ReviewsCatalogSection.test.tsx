import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ReviewsCatalogSection } from "@/components/sections/ReviewsCatalogSection";
import { USER_REVIEWS_STORAGE_KEY } from "@/lib/reviews";
import { renderWithProviders } from "@/tests/test-utils";

describe("ReviewsCatalogSection", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders a carousel with three visible reviews", async () => {
    renderWithProviders(<ReviewsCatalogSection />);
    expect(await screen.findByTestId("reviews-carousel")).toBeInTheDocument();
    expect(screen.getAllByTestId(/review-card-/)).toHaveLength(3);
    expect(screen.getByTestId("reviews-carousel-counter")).toBeInTheDocument();
  });

  it("submits a new review with optional photo", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReviewsCatalogSection />);

    await screen.findByRole("heading", { name: "Write a review" });
    await user.type(screen.getByPlaceholderText("Name"), "Jane Doe");
    await user.type(screen.getByPlaceholderText(/Review title/), "Ordered a mini bag");
    await user.type(screen.getByPlaceholderText("Your review"), "Absolutely stunning quality.");

    const file = new File(["photo"], "bag.jpg", { type: "image/jpeg" });
    await user.upload(screen.getByLabelText("Photo (optional)"), file);

    await user.click(screen.getByRole("button", { name: "Submit review" }));

    expect(screen.getByRole("status")).toHaveTextContent("Thank you! Your review has been added.");
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();

    const stored = JSON.parse(window.localStorage.getItem(USER_REVIEWS_STORAGE_KEY) || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe("Jane Doe");
    expect(stored[0].image).toMatch(/^data:image/);
  });
});
