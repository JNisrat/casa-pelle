"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { formatPrice, parsePrice } from "@/lib/cart";

export function CartSection() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <section className="mx-auto max-w-[var(--max-width)] px-6 pb-20 pt-40 md:px-16 lg:px-28">
      <h1 className="text-center font-display text-[45px] font-medium">Your Cart</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center font-body text-[18px] text-[var(--color-muted)]">
        Review your selected handbags before checkout
      </p>
      <div className="mx-auto mt-8 h-px w-full max-w-[1531px] bg-black" />

      {items.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="font-body text-[18px]">Your cart is empty.</p>
          <ButtonLink href="/products" variant="outlined" className="mt-8">
            Browse the collection
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-12">
          <ul className="space-y-8">
            {items.map((item) => (
              <li
                key={item.id}
                className="grid gap-6 border-b border-black/10 pb-8 sm:grid-cols-[160px_1fr_auto] sm:items-center"
                data-testid={`cart-item-${item.id}`}
              >
                <Link
                  href={`/products/${item.id}`}
                  className="relative aspect-[388/450] w-full max-w-[160px] overflow-hidden bg-neutral-100"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </Link>

                <div>
                  <Link
                    href={`/products/${item.id}`}
                    className="font-body text-[20px] font-medium transition-colors hover:text-[var(--color-primary)]"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-2 font-body text-[18px] font-bold">{item.price}</p>
                  <p className="mt-2 font-body text-[16px] text-[var(--color-muted)]">
                    Line total: {formatPrice(parsePrice(item.price) * item.quantity)}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 sm:items-end">
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outlined"
                      className="!rounded-full !px-4 !py-2 !text-[16px]"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </Button>
                    <span className="min-w-8 text-center font-body text-[18px]" data-testid={`cart-qty-${item.id}`}>
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outlined"
                      className="!rounded-full !px-4 !py-2 !text-[16px]"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>

                  <button
                    type="button"
                    className="font-body text-[16px] text-[var(--color-muted)] underline transition-colors hover:text-black"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex w-full flex-col items-stretch gap-6 border-t border-black pt-8 sm:items-end">
            <p
              className="font-body text-[20px] font-bold sm:text-[24px]"
              data-testid="cart-subtotal"
            >
              Subtotal: {formatPrice(subtotal)}
            </p>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <ButtonLink
                href="/products"
                variant="outlined"
                className="w-full !rounded-[46px] !px-8 !py-4 sm:w-auto"
              >
                Continue shopping
              </ButtonLink>
              <ButtonLink href="/checkout" className="w-full sm:w-auto">
                Proceed to checkout
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
