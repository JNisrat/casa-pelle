import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/constants";
import { getLandingProductDetailPath } from "@/lib/products";

export function ProductsSection() {
  const gridProducts = PRODUCTS.filter((product) => !product.featured);
  const featuredProduct = PRODUCTS.find((product) => product.featured);

  return (
    <section id="products" className="mx-auto min-h-[650px] max-w-[var(--max-width)] px-6 py-20 md:px-16 lg:px-28">
      <h2 className="text-center font-display text-[45px] font-medium">Our Products</h2>
      <div className="mx-auto mt-8 h-px w-full max-w-[1531px] bg-black" />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_666px] lg:gap-12">
        <div className="grid gap-8 sm:grid-cols-2">
          {gridProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              href={getLandingProductDetailPath(product.id)}
            />
          ))}
        </div>

        {featuredProduct && (
          <div className="relative min-h-[320px] overflow-hidden lg:min-h-[400px]">
            <video
              src="/images/product-featured.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              aria-label="Featured product showcase"
            />
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-center">
        <ButtonLink href="/products" variant="outlined">
          Discover the collection
        </ButtonLink>
      </div>
    </section>
  );
}
