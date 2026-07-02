"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { REVIEWS } from "@/lib/constants";

const AUTO_ADVANCE_MS = 4000;
const SLIDE_MS = 700;

function getDisplayIndex(trackIndex: number, total: number) {
  if (trackIndex === 0) {
    return total - 1;
  }
  if (trackIndex === total + 1) {
    return 0;
  }
  return trackIndex - 1;
}

export function ReviewsSection() {
  const total = REVIEWS.length;
  const loopedReviews = useMemo(
    () => [REVIEWS[total - 1], ...REVIEWS, REVIEWS[0]],
    [total],
  );

  const [trackIndex, setTrackIndex] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);
  const [slideWidth, setSlideWidth] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const displayIndex = getDisplayIndex(trackIndex, total);

  const goNext = useCallback(() => {
    setEnableTransition(true);
    setTrackIndex((current) => current + 1);
  }, []);

  const goPrev = useCallback(() => {
    setEnableTransition(true);
    setTrackIndex((current) => current - 1);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (slideRef.current) {
        setSlideWidth(slideRef.current.offsetWidth);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (trackIndex !== total + 1 && trackIndex !== 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setEnableTransition(false);
      setTrackIndex(trackIndex === total + 1 ? 1 : total);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEnableTransition(true));
      });
    }, SLIDE_MS);

    return () => window.clearTimeout(timer);
  }, [trackIndex, total]);

  useEffect(() => {
    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [goNext, trackIndex]);

  const trackStyle = {
    transform: slideWidth ? `translateX(-${trackIndex * slideWidth}px)` : undefined,
    transition: enableTransition ? `transform ${SLIDE_MS}ms ease-in-out` : "none",
    willChange: "transform",
  } as const;

  return (
    <section
      id="reviews"
      className="relative z-30 mx-auto max-w-[var(--max-width)] overflow-hidden bg-white px-6 py-20 md:px-16 lg:px-28"
    >
      <div className="mb-12 flex items-center justify-between">
        <h2 className="font-display text-[45px] font-medium">Reviews</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous review"
            onClick={goPrev}
            className="flex size-[54px] items-center justify-center rounded-full border border-black font-display text-[28px] leading-none"
          >
            &lt;
          </button>
          <span className="min-w-[48px] text-center font-display text-[28px]" data-testid="review-counter">
            {displayIndex + 1}/{total}
          </span>
          <button
            type="button"
            aria-label="Next review"
            onClick={goNext}
            className="flex size-[54px] items-center justify-center rounded-full border border-black font-display text-[28px] leading-none"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="overflow-hidden" data-testid="review-slide-viewport">
        <div className="flex items-start" style={trackStyle}>
          {loopedReviews.map((item, itemIndex) => (
            <div
              key={`${item.id}-${itemIndex}`}
              ref={itemIndex === 1 ? slideRef : undefined}
              className="flex w-full shrink-0 flex-col gap-8 lg:w-auto lg:flex-row lg:items-start lg:gap-0"
              data-testid="review-slide"
              aria-hidden={itemIndex !== trackIndex}
            >
              <div
                className="relative h-[320px] w-full shrink-0 overflow-hidden lg:h-[398px] lg:w-[558px]"
                data-testid="review-image-viewport"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 558px"
                />
              </div>

              <article
                className="mt-[60px] w-full max-w-[448px] shrink-0 py-[30px] pr-[30px] pl-0 lg:ml-16"
                data-testid={itemIndex === trackIndex ? "review-content" : undefined}
              >
                <h3 className="font-body text-[30px] font-medium leading-tight text-black">{item.name}</h3>
                <p className="mt-2 font-body text-[20px] leading-snug text-black">{item.title}</p>
                <p className="mt-2 font-body text-[12px] text-[var(--color-muted)]">{item.date}</p>
                <p className="mt-6 font-body text-[14px] leading-relaxed text-[var(--color-muted)]">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
