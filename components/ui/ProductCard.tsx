import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  className?: string;
  href?: string;
};

export function ProductCard({ product, className = "", href }: ProductCardProps) {
  const content = (
    <>
      <div className="relative w-full aspect-[388/450] overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 388px"
        />
      </div>
      <h3 className="font-body font-medium text-[20px]">{product.name}</h3>
      <p className="font-body font-bold text-[20px]">{product.price}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group flex flex-col gap-3 ${className}`}
        data-testid={`product-card-${product.id}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <article className={`flex flex-col gap-3 ${className}`} data-testid={`product-card-${product.id}`}>
      {content}
    </article>
  );
}
