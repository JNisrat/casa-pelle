import { describe, expect, it } from "vitest";
import { formatPrice, getCartItemCount, getCartSubtotal, parsePrice } from "@/lib/cart";
import type { CartItem } from "@/lib/types";

const items: CartItem[] = [
  {
    id: "catalog-1",
    name: "Emily bag",
    price: "$ 200",
    image: "/images/product-1.jpg",
    quantity: 2,
  },
  {
    id: "catalog-5",
    name: "Chocolate shoulder bag",
    price: "$ 200",
    image: "/images/product-emily.png",
    quantity: 1,
  },
];

describe("cart helpers", () => {
  it("parses and formats prices", () => {
    expect(parsePrice("$ 200")).toBe(200);
    expect(formatPrice(420)).toBe("$ 420");
  });

  it("calculates subtotal and item count", () => {
    expect(getCartSubtotal(items)).toBe(600);
    expect(getCartItemCount(items)).toBe(3);
  });
});
