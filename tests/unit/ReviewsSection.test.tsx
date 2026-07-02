import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ReviewsSection } from "@/components/sections/ReviewsSection";

describe("ReviewsSection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders carousel counter starting at 1/10", () => {
    render(<ReviewsSection />);
    expect(screen.getByTestId("review-counter")).toHaveTextContent("1/10");
  });

  it("auto-advances to the next review every 4 seconds", () => {
    render(<ReviewsSection />);
    expect(screen.getByTestId("review-counter")).toHaveTextContent("1/10");

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByTestId("review-counter")).toHaveTextContent("2/10");
    expect(screen.getByTestId("review-content")).toHaveTextContent("Emma");
  });

  it("navigates to next review", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<ReviewsSection />);
    await user.click(screen.getByRole("button", { name: "Next review" }));
    expect(screen.getByTestId("review-counter")).toHaveTextContent("2/10");
    expect(screen.getByTestId("review-content")).toHaveTextContent("Emma");
  });

  it("loops from the last review to the first without jumping backwards", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<ReviewsSection />);

    for (let step = 0; step < 9; step += 1) {
      await user.click(screen.getByRole("button", { name: "Next review" }));
    }

    expect(screen.getByTestId("review-counter")).toHaveTextContent("10/10");
    expect(screen.getByTestId("review-content")).toHaveTextContent("Evelyn");

    await user.click(screen.getByRole("button", { name: "Next review" }));

    expect(screen.getByTestId("review-counter")).toHaveTextContent("1/10");
    expect(screen.getByTestId("review-content")).toHaveTextContent("Sophia");
  });

  it("loops from the first review to the last when going previous", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<ReviewsSection />);

    await user.click(screen.getByRole("button", { name: "Previous review" }));

    expect(screen.getByTestId("review-counter")).toHaveTextContent("10/10");
    expect(screen.getByTestId("review-content")).toHaveTextContent("Evelyn");
  });
});
