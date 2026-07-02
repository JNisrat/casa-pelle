import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { REVIEWS } from "@/lib/constants";

describe("ReviewCard", () => {
  it("renders review details", () => {
    render(
      <ReviewCard
        review={{
          id: "review-1",
          name: "Sophia",
          title: "Ordered a handmade bag",
          date: "12/02/2025",
          quote: "Beautiful craftsmanship.",
          image: "/images/review-left.jpg",
        }}
      />,
    );

    expect(screen.getByText("Sophia")).toBeInTheDocument();
    expect(screen.getByText("Ordered a handmade bag")).toBeInTheDocument();
    expect(screen.getByText(/Beautiful craftsmanship/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Read more" })).not.toBeInTheDocument();
  });

  it("shows read more and opens modal for long reviews", async () => {
    const user = userEvent.setup();
    render(<ReviewCard review={REVIEWS[0]} />);

    const readMore = await screen.findByRole("button", { name: "Read more" });
    await user.click(readMore);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveTextContent(REVIEWS[0].quote);

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
