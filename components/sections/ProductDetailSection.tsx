import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import type { Product } from "@/lib/types";

type ProductDetailSectionProps = {
  product: Product;
};

export function ProductDetailSection({ product }: ProductDetailSectionProps) {
  const details = [
    { label: "Material", value: product.material },
    { label: "Dimensions", value: product.dimensions },
    { label: "Lining", value: product.lining },
  ].filter((detail): detail is { label: string; value: string } => Boolean(detail.value));

  return (
    <section className="mx-auto max-w-[var(--max-width)] px-6 pb-20 pt-40 md:px-16 lg:px-28">
      <Link
        href="/products"
        className="font-body text-[18px] text-[var(--color-muted)] transition-colors hover:text-black"
      >
        ← Back to collection
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[388/450] overflow-hidden bg-neutral-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-display text-[45px] font-medium">{product.name}</h1>
          <p className="mt-4 font-body text-[28px] font-bold">{product.price}</p>
          <div className="mx-auto mt-8 h-px w-full bg-black lg:mx-0" />
          <p className="mt-8 font-body text-[18px] leading-relaxed">{product.description}</p>

          {details.length > 0 && (
            <dl className="mt-8 space-y-4">
              {details.map((detail) => (
                <div key={detail.label} className="grid gap-1 sm:grid-cols-[140px_1fr]">
                  <dt className="font-body text-[18px] font-bold">{detail.label}</dt>
                  <dd className="font-body text-[18px] text-[var(--color-muted)]">{detail.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            }}
          />
        </div>
      </div>
    </section>
  );
}
