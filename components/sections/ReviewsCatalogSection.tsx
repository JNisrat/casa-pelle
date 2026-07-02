"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ReviewsCarousel } from "@/components/ui/ReviewsCarousel";
import {
  createReviewFromForm,
  getAllReviews,
  readUserReviewsFromStorage,
  validateReviewForm,
  writeUserReviewsToStorage,
  type ReviewFormInput,
} from "@/lib/reviews";
import type { Review } from "@/lib/types";

const EMPTY_FORM: ReviewFormInput = {
  name: "",
  title: "",
  quote: "",
  image: undefined,
};

const inputClassName =
  "h-[75px] w-full bg-[var(--color-input-bg)] px-5 font-body text-[18px] outline-none";

export function ReviewsCatalogSection() {
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [form, setForm] = useState<ReviewFormInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormInput, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);

  useEffect(() => {
    setUserReviews(readUserReviewsFromStorage());
    setIsReady(true);
  }, []);

  const allReviews = getAllReviews(userReviews);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setForm((prev) => ({ ...prev, image: undefined }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: typeof reader.result === "string" ? reader.result : undefined }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateReviewForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const newReview = createReviewFromForm(form, userReviews.length);
    const updatedReviews = [newReview, ...userReviews];
    setUserReviews(updatedReviews);
    writeUserReviewsToStorage(updatedReviews);
    setForm(EMPTY_FORM);
    setSubmitted(true);
    setCarouselKey((current) => current + 1);
  };

  return (
    <section className="mx-auto max-w-[var(--max-width)] px-6 pb-20 pt-40 md:px-16 lg:px-28">
      <h1 className="text-center font-display text-[45px] font-medium">Reviews</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center font-body text-[18px] text-[var(--color-muted)]">
        Hear from our customers and share your own Casa Pelle experience
      </p>
      <div className="mx-auto mt-8 h-px w-full max-w-[1531px] bg-black" />

      {isReady ? (
        <div className="mt-12">
          <ReviewsCarousel key={carouselKey} reviews={allReviews} />
        </div>
      ) : (
        <p className="mt-12 text-center font-body text-[18px] text-[var(--color-muted)]">Loading reviews…</p>
      )}

      <div className="mx-auto mt-16 max-w-2xl">
        <h2 className="text-center font-display text-[28px] font-medium">Write a review</h2>
        <p className="mt-4 text-center font-body text-[18px] text-[var(--color-muted)]">
          Tell us about your handcrafted bag
        </p>

        {submitted && (
          <p className="mt-6 text-center font-body text-[18px] text-[var(--color-primary)]" role="status">
            Thank you! Your review has been added.
          </p>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className={inputClassName}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Review title (e.g. Ordered a leather tote)"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className={inputClassName}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          <div>
            <textarea
              name="quote"
              placeholder="Your review"
              value={form.quote}
              onChange={(event) => setForm((prev) => ({ ...prev, quote: event.target.value }))}
              className="min-h-[160px] w-full resize-none bg-[var(--color-input-bg)] px-5 py-4 font-body text-[18px] outline-none"
            />
            {errors.quote && <p className="mt-1 text-sm text-red-600">{errors.quote}</p>}
          </div>
          <div>
            <label className="block font-body text-[18px]" htmlFor="review-photo">
              Photo (optional)
            </label>
            <input
              id="review-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-2 w-full font-body text-[16px] file:mr-4 file:rounded file:border-0 file:bg-[var(--color-input-bg)] file:px-4 file:py-3 file:font-body file:text-[16px]"
            />
            {form.image && (
              <div className="relative mt-4 h-[180px] w-full max-w-[240px] overflow-hidden bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt="Selected review" className="h-full w-full object-cover" />
              </div>
            )}
          </div>
          <Button type="submit" variant="send" className="w-full">
            Submit review
          </Button>
        </form>
      </div>
    </section>
  );
}
