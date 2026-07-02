"use client";

import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { CartItem } from "@/lib/types";

type AddToCartButtonProps = {
  product: Omit<CartItem, "quantity">;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mt-10">
        <Button
          type="button"
          className="w-full sm:w-auto"
          onClick={() => {
            addItem(product);
            setShowModal(true);
          }}
        >
          Add to cart
        </Button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          role="presentation"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-white px-8 py-10 text-center shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-to-cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 flex size-8 items-center justify-center font-body text-[24px] leading-none text-black transition-opacity hover:opacity-60"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <p id="add-to-cart-title" className="font-body text-[18px] text-black" role="status">
              {product.name} has been added to your cart.
            </p>
            <ButtonLink href="/cart" variant="send" className="mt-8">
              View cart
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
}
