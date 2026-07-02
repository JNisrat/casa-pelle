import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductsCatalogSection } from "@/components/sections/ProductsCatalogSection";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Collection | ${SITE_NAME}`,
  description:
    "Browse our full collection of handcrafted and personalised leather handbags by Casa Pelle.",
};

export default function ProductsPage() {
  return (
    <main>
      <Header />
      <ProductsCatalogSection />
      <Footer />
    </main>
  );
}
