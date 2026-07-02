"use client";

import { useEffect, useRef, useState } from "react";
import { ReviewDetailModal } from "@/components/ui/ReviewDetailModal";
import type { Review } from "@/lib/types";

type ReviewQuoteProps = {
  review: Review;
  className?: string;
};

const SHOW_READ_MORE_MIN_CHARS = 140;

export function ReviewQuote({ review, className = "" }: ReviewQuoteProps) {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const quote = quoteRef.current;
    if (!quote) {
      return;
    }

    const checkOverflow = () => {
      const measuredOverflow = quote.scrollHeight > quote.clientHeight + 1;
      setIsOverflowing(measuredOverflow || review.quote.length > SHOW_READ_MORE_MIN_CHARS);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [review.quote]);

  return (
    <>
      <div className={`flex min-h-0 flex-col ${className}`}>
        <p
          ref={quoteRef}
          className="min-h-0 flex-1 overflow-hidden font-body text-[14px] leading-relaxed text-[var(--color-muted)] line-clamp-4"
        >
          &ldquo;{review.quote}&rdquo;
        </p>
        {isOverflowing && (
          <button
            type="button"
            className="mt-2 shrink-0 self-start font-body text-[14px] font-medium text-[var(--color-primary)] underline transition-opacity hover:opacity-80"
            onClick={() => setShowModal(true)}
          >
            Read more
          </button>
        )}
      </div>

      {showModal && <ReviewDetailModal review={review} onClose={() => setShowModal(false)} />}
    </>
  );
}
