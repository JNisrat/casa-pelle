import { describe, expect, it } from "vitest";
import { EMPTY_CHECKOUT_DETAILS, validateCheckoutDetails } from "@/lib/checkout";

describe("checkout validation", () => {
  it("requires customer and delivery fields", () => {
    const errors = validateCheckoutDetails(EMPTY_CHECKOUT_DETAILS);
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeDefined();
    expect(errors.address).toBeDefined();
    expect(errors.city).toBeDefined();
    expect(errors.postcode).toBeDefined();
    expect(errors.country).toBeDefined();
    expect(errors.notes).toBeUndefined();
  });

  it("accepts valid checkout details", () => {
    const errors = validateCheckoutDetails({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+61 400 000 000",
      address: "12 Leather Lane",
      city: "Sydney",
      postcode: "2000",
      country: "Australia",
      notes: "",
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
