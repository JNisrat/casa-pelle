"use client";

import { useState } from "react";
import { ReviewCard } from "@/components/ui/ReviewCard";
import type { Review } from "@/lib/types";

const REVIEWS_PER_PAGE = 3;

type ReviewsCarouselProps = {
  reviews: Review[];
};

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const totalPages = Math.max(1, Math.ceil(reviews.length / REVIEWS_PER_PAGE));
  const [page, setPage] = useState(0);
  const safePage = Math.min(page, totalPages - 1);
  const visibleReviews = reviews.slice(
    safePage * REVIEWS_PER_PAGE,
    safePage * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE,
  );

  const goPrev = () => setPage((current) => (current === 0 ? totalPages - 1 : current - 1));
  const goNext = () => setPage((current) => (current === totalPages - 1 ? 0 : current + 1));

  return (
    <div>
      <div className="mb-8 flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Previous reviews"
          onClick={goPrev}
          className="flex size-[54px] items-center justify-center rounded-full border border-black font-display text-[28px] leading-none"
        >
          &lt;
        </button>
        <span className="min-w-[48px] text-center font-display text-[28px]" data-testid="reviews-carousel-counter">
          {safePage + 1}/{totalPages}
        </span>
        <button
          type="button"
          aria-label="Next reviews"
          onClick={goNext}
          className="flex size-[54px] items-center justify-center rounded-full border border-black font-display text-[28px] leading-none"
        >
          &gt;
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-3" data-testid="reviews-carousel">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
