import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ReviewsCarousel } from "@/components/ui/ReviewsCarousel";

const reviews = Array.from({ length: 7 }, (_, index) => ({
  id: `review-${index + 1}`,
  name: `Customer ${index + 1}`,
  title: "Ordered a bag",
  date: "01/01/2026",
  quote: "Great bag",
  image: "/images/review-left.jpg",
}));

describe("ReviewsCarousel", () => {
  it("shows three reviews per page", () => {
    render(<ReviewsCarousel reviews={reviews} />);
    expect(screen.getAllByTestId(/review-card-/)).toHaveLength(3);
    expect(screen.getByTestId("reviews-carousel-counter")).toHaveTextContent("1/3");
  });

  it("navigates to the next page of reviews", async () => {
    const user = userEvent.setup();
    render(<ReviewsCarousel reviews={reviews} />);

    await user.click(screen.getByRole("button", { name: "Next reviews" }));
    expect(screen.getByTestId("reviews-carousel-counter")).toHaveTextContent("2/3");
    expect(screen.getByText("Customer 4")).toBeInTheDocument();
  });
});
