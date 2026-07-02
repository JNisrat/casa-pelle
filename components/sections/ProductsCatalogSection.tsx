import { ProductCard } from "@/components/ui/ProductCard";
import { CATALOG_PRODUCTS } from "@/lib/constants";

export function ProductsCatalogSection() {
  return (
    <section className="mx-auto max-w-[var(--max-width)] px-6 pb-20 pt-40 md:px-16 lg:px-28">
      <h1 className="text-center font-display text-[45px] font-medium">The Collection</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center font-body text-[18px] text-[var(--color-muted)]">
        Explore our full range of handcrafted and personalised leather handbags
      </p>
      <div className="mx-auto mt-8 h-px w-full max-w-[1531px] bg-black" />

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CATALOG_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} href={`/products/${product.id}`} />
        ))}
      </div>
    </section>
  );
}
