import Image from "next/image";
import { ReviewQuote } from "@/components/ui/ReviewQuote";
import type { Review } from "@/lib/types";

type ReviewCardProps = {
  review: Review;
};

function ReviewImage({ src, alt }: { src: string; alt: string }) {
  if (src.startsWith("data:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- user-uploaded previews are data URLs
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    );
  }

  return <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article
      className="flex h-[500px] flex-col border border-black/10 bg-white"
      data-testid={`review-card-${review.id}`}
    >
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
        <ReviewImage src={review.image} alt="" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5">
        <div className="shrink-0">
          <h3 className="line-clamp-1 font-body text-[22px] font-medium">{review.name}</h3>
          <p className="mt-1 line-clamp-2 font-body text-[16px] leading-snug">{review.title}</p>
          <p className="mt-1 font-body text-[12px] text-[var(--color-muted)]">{review.date}</p>
        </div>

        <ReviewQuote review={review} className="mt-3 min-h-0 flex-1" />
      </div>
    </article>
  );
}
