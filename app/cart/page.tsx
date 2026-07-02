import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartSection } from "@/components/sections/CartSection";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Cart | ${SITE_NAME}`,
  description: "Review the handcrafted leather handbags in your Casa Pelle cart.",
};

export default function CartPage() {
  return (
    <main>
      <Header />
      <CartSection />
      <Footer />
    </main>
  );
}
