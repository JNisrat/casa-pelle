import { describe, expect, it } from "vitest";
import { REVIEWS } from "@/lib/constants";
import { getAllReviews, validateReviewForm } from "@/lib/reviews";

describe("reviews helpers", () => {
  it("merges user reviews before catalog reviews", () => {
    const userReview = {
      id: "user-1",
      name: "Test User",
      title: "Great bag",
      date: "01/01/2026",
      quote: "Loved it",
      image: "/images/review-left.jpg",
    };

    const all = getAllReviews([userReview]);
    expect(all[0].id).toBe("user-1");
    expect(all).toHaveLength(REVIEWS.length + 1);
  });

  it("validates review form fields", () => {
    const errors = validateReviewForm({ name: "", title: "", quote: "" });
    expect(errors.name).toBeDefined();
    expect(errors.title).toBeDefined();
    expect(errors.quote).toBeDefined();
  });
});
