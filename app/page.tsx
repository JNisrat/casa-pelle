import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AdvantagesCreateStickyStack } from "@/components/sections/AdvantagesCreateStickyStack";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <main>
        <Header />
        <HeroSection />
        <ProductsSection />
        <AdvantagesCreateStickyStack />
        <ReviewsSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
