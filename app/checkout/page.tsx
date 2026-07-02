import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CheckoutSection } from "@/components/sections/CheckoutSection";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Checkout | ${SITE_NAME}`,
  description: "Complete your Casa Pelle order with secure checkout.",
};

export default function CheckoutPage() {
  return (
    <main>
      <Header />
      <CheckoutSection />
      <Footer />
    </main>
  );
}
