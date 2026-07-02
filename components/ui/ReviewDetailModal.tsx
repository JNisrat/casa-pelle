"use client";

import Image from "next/image";
import type { Review } from "@/lib/types";

type ReviewDetailModalProps = {
  review: Review;
  onClose: () => void;
};

function ReviewModalImage({ src, alt }: { src: string; alt: string }) {
  if (src.startsWith("data:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- user-uploaded previews are data URLs
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    );
  }

  return <Image src={src} alt={alt} fill className="object-cover" sizes="400px" />;
}

export function ReviewDetailModal({ review, onClose }: ReviewDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white px-8 py-10 shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`review-modal-title-${review.id}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center font-body text-[24px] leading-none text-black transition-opacity hover:opacity-60"
          onClick={onClose}
        >
          ×
        </button>

        <div className="relative mx-auto h-[220px] w-full max-w-[400px] overflow-hidden">
          <ReviewModalImage src={review.image} alt="" />
        </div>

        <div className="mt-6 text-center">
          <h3
            id={`review-modal-title-${review.id}`}
            className="font-body text-[30px] font-medium text-black"
          >
            {review.name}
          </h3>
          <p className="mt-2 font-body text-[20px] text-black">{review.title}</p>
          <p className="mt-2 font-body text-[12px] text-[var(--color-muted)]">{review.date}</p>
          <p className="mt-6 text-left font-body text-[16px] leading-relaxed text-[var(--color-muted)]">
            &ldquo;{review.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
