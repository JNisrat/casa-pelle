import { REVIEWS } from "./constants";
import type { Review } from "./types";

export const USER_REVIEWS_STORAGE_KEY = "casa-pelle-user-reviews";

export type ReviewFormInput = {
  name: string;
  title: string;
  quote: string;
  image?: string;
};

export function formatReviewDate(date = new Date()): string {
  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function validateReviewForm(
  input: ReviewFormInput,
): Partial<Record<keyof ReviewFormInput, string>> {
  const errors: Partial<Record<keyof ReviewFormInput, string>> = {};

  if (!input.name.trim()) {
    errors.name = "Name is required";
  }

  if (!input.title.trim()) {
    errors.title = "Title is required";
  }

  if (!input.quote.trim()) {
    errors.quote = "Review is required";
  }

  return errors;
}

export function readUserReviewsFromStorage(): Review[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(USER_REVIEWS_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as Review[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeUserReviewsToStorage(reviews: Review[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USER_REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
}

export function createReviewFromForm(input: ReviewFormInput, index: number): Review {
  const fallbackImage = index % 2 === 0 ? "/images/review-left.jpg" : "/images/review-right.jpg";

  return {
    id: `user-review-${Date.now()}`,
    name: input.name.trim(),
    title: input.title.trim(),
    quote: input.quote.trim(),
    date: formatReviewDate(),
    image: input.image || fallbackImage,
  };
}

export function getAllReviews(userReviews: Review[] = []): Review[] {
  return [...userReviews, ...REVIEWS];
}
