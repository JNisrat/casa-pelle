"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  CONTACT_SUCCESS_MESSAGE,
  sendContactForm,
  validateContactForm,
  type ContactFormInput,
} from "@/lib/contact";

const initialState: ContactFormInput = { name: "", email: "", message: "" };

export function ContactSection() {
  const [form, setForm] = useState<ContactFormInput>(initialState);
  const [errors, setErrors] = useState<Partial<ContactFormInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await sendContactForm(form);
      setForm(initialState);
      setShowSuccessPopup(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to send your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact" className="mx-auto max-w-[var(--max-width)] px-6 py-20 md:px-16 lg:px-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[400px] lg:min-h-[668px]">
            <Image
              src="/images/contact-bag.png"
              alt="Customisable leather bag"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 914px"
            />
          </div>

          <div>
            <h2 className="font-display text-[45px] font-medium">Want to Customise</h2>
            <p className="mt-6 font-body text-[18px]">
              Please leave your contact information and a message,
              <br />
              we will get back to you within 24 hours
            </p>

            <form className="mt-10 space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="h-[75px] w-full bg-[var(--color-input-bg)] px-5 font-body text-[18px] outline-none"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="h-[75px] w-full bg-[var(--color-input-bg)] px-5 font-body text-[18px] outline-none"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  className="min-h-[123px] w-full resize-none bg-[var(--color-input-bg)] px-5 py-4 font-body text-[18px] outline-none"
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>
              {submitError && (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              )}
              <Button type="submit" variant="send" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          role="presentation"
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            className="w-full max-w-md bg-white px-8 py-10 text-center shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p
              id="contact-success-title"
              className="font-body text-[18px] text-black"
              role="status"
            >
              {CONTACT_SUCCESS_MESSAGE}
            </p>
            <Button
              type="button"
              variant="send"
              className="mt-8"
              onClick={() => setShowSuccessPopup(false)}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
