"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/Button";
import { EMPTY_CHECKOUT_DETAILS, validateCheckoutDetails } from "@/lib/checkout";
import { formatPrice, parsePrice } from "@/lib/cart";
import type { CheckoutDetails } from "@/lib/types";

const inputClassName =
  "h-[75px] w-full bg-[var(--color-input-bg)] px-5 font-body text-[18px] outline-none";

export function CheckoutSection() {
  const router = useRouter();
  const { items, subtotal, isReady, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutDetails>(EMPTY_CHECKOUT_DETAILS);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutDetails, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isReady && items.length === 0 && !submitted) {
      router.replace("/cart");
    }
  }, [isReady, items.length, submitted, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateCheckoutDetails(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
    clearCart();
  };

  if (!isReady || (items.length === 0 && !submitted)) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[var(--max-width)] px-6 pb-20 pt-40 md:px-16 lg:px-28">
      <h1 className="text-center font-display text-[45px] font-medium">Checkout</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center font-body text-[18px] text-[var(--color-muted)]">
        Enter your details to complete your order
      </p>
      <div className="mx-auto mt-8 h-px w-full max-w-[1531px] bg-black" />

      {submitted ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          role="presentation"
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white px-8 py-10 text-center shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-success-title"
          >
            <div className="mx-auto mb-6 flex size-16 items-center justify-center text-[48px]" aria-hidden="true">
              🎉
            </div>
            <h2
              id="checkout-success-title"
              className="font-display text-[32px] font-medium text-black"
            >
              Your order is complete!
            </h2>
            <p
              className="mx-auto mt-4 max-w-sm font-body text-[18px] text-[var(--color-muted)]"
              role="status"
            >
              Thank you, {form.name}! You will receive a confirmation email at {form.email} with your
              order details.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-[var(--color-primary)] px-8 py-3 font-body text-[18px] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
            >
              Explore the collection
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <h2 className="font-display text-[28px] font-medium">Customer details</h2>

            <div>
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className={inputClassName}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className={inputClassName}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                className={inputClassName}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <input
                type="text"
                name="address"
                placeholder="Street address"
                value={form.address}
                onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                className={inputClassName}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
                  className={inputClassName}
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="postcode"
                  placeholder="Postcode"
                  value={form.postcode}
                  onChange={(event) => setForm((prev) => ({ ...prev, postcode: event.target.value }))}
                  className={inputClassName}
                />
                {errors.postcode && <p className="mt-1 text-sm text-red-600">{errors.postcode}</p>}
              </div>
            </div>

            <div>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={(event) => setForm((prev) => ({ ...prev, country: event.target.value }))}
                className={inputClassName}
              />
              {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
            </div>

            <div>
              <textarea
                name="notes"
                placeholder="Delivery notes (optional)"
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                className="min-h-[123px] w-full resize-none bg-[var(--color-input-bg)] px-5 py-4 font-body text-[18px] outline-none"
              />
            </div>

            <Button type="submit" variant="send" className="w-full sm:w-auto">
              Proceed to payment
            </Button>
          </form>

          <aside className="h-fit border border-black/10 p-6">
            <h2 className="font-display text-[28px] font-medium">Order summary</h2>
            <ul className="mt-6 space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4" data-testid={`checkout-item-${item.id}`}>
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-[16px] font-medium">{item.name}</p>
                    <p className="font-body text-[14px] text-[var(--color-muted)]">Qty: {item.quantity}</p>
                    <p className="mt-1 font-body text-[16px] font-bold">
                      {formatPrice(parsePrice(item.price) * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-black/10 pt-4">
              <p className="font-body text-[20px] font-bold" data-testid="checkout-total">
                Total: {formatPrice(subtotal)}
              </p>
            </div>
            <Link
              href="/cart"
              className="mt-6 inline-block font-body text-[16px] text-[var(--color-muted)] underline transition-colors hover:text-black"
            >
              ← Back to cart
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
