import type { CheckoutDetails } from "./types";

export const EMPTY_CHECKOUT_DETAILS: CheckoutDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postcode: "",
  country: "",
  notes: "",
};

export function validateCheckoutDetails(
  details: CheckoutDetails,
): Partial<Record<keyof CheckoutDetails, string>> {
  const errors: Partial<Record<keyof CheckoutDetails, string>> = {};

  if (!details.name.trim()) {
    errors.name = "Name is required";
  }

  if (!details.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
    errors.email = "Enter a valid email";
  }

  if (!details.phone.trim()) {
    errors.phone = "Phone number is required";
  }

  if (!details.address.trim()) {
    errors.address = "Address is required";
  }

  if (!details.city.trim()) {
    errors.city = "City is required";
  }

  if (!details.postcode.trim()) {
    errors.postcode = "Postcode is required";
  }

  if (!details.country.trim()) {
    errors.country = "Country is required";
  }

  return errors;
}
