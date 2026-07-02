import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  CONTACT_FORM_TO_EMAIL,
  CONTACT_SUCCESS_MESSAGE,
  isContactFormValid,
  sendContactForm,
  validateContactForm,
} from "@/lib/contact";

describe("contact", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("validates required fields", () => {
    const errors = validateContactForm({ name: "", email: "", message: "" });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it("validates email format", () => {
    const errors = validateContactForm({
      name: "Jane",
      email: "invalid",
      message: "Hello",
    });
    expect(errors.email).toBe("Enter a valid email");
  });

  it("accepts valid form data", () => {
    const input = {
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Custom bag request",
    };
    expect(validateContactForm(input)).toEqual({});
    expect(isContactFormValid(input)).toBe(true);
  });

  it("uses the configured recipient email", () => {
    expect(CONTACT_FORM_TO_EMAIL).toBe("luxora@gmail.com");
  });

  it("uses the success message copy", () => {
    expect(CONTACT_SUCCESS_MESSAGE).toBe("Thank you, your email has been sent");
  });

  it("sends the form via FormSubmit when no Web3Forms key is set", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: "true" }),
    } as Response);

    await sendContactForm({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Custom bag request",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_FORM_TO_EMAIL)}`,
      expect.objectContaining({ method: "POST" }),
    );
  });
});
