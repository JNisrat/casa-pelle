import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ReviewsCatalogSection } from "@/components/sections/ReviewsCatalogSection";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Reviews | ${SITE_NAME}`,
  description: "Read customer reviews and share your experience with Casa Pelle handbags.",
};

export default function ReviewsPage() {
  return (
    <main>
      <Header />
      <ReviewsCatalogSection />
      <Footer />
    </main>
  );
}
