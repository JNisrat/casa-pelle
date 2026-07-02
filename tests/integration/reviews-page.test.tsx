import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ReviewsPage from "@/app/reviews/page";
import { renderWithProviders } from "@/tests/test-utils";

describe("Reviews page integration", () => {
  it("renders reviews grid and submission form", async () => {
    renderWithProviders(<ReviewsPage />);
    expect(await screen.findByRole("heading", { name: "Reviews" })).toBeInTheDocument();
    expect(screen.getAllByTestId(/review-card-/)).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Submit review" })).toBeInTheDocument();
    expect(screen.getByText("luxora@gmail.com")).toBeInTheDocument();
  });
});
