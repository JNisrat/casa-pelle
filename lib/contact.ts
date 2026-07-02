export type ContactFormInput = {
  name: string;
  email: string;
  message: string;
};

export const CONTACT_FORM_TO_EMAIL = "luxora@gmail.com";

export const CONTACT_SUCCESS_MESSAGE = "Thank you, your email has been sent";

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

function isSuccessfulResponse(success: boolean | string | undefined): boolean {
  return success === true || success === "true";
}

async function sendViaWeb3Forms(form: ContactFormInput, accessKey: string): Promise<void> {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      subject: `Casa Pelle contact form — ${form.name.trim()}`,
    }),
  });

  const data = (await response.json()) as Web3FormsResponse;
  if (!data.success) {
    throw new Error(data.message ?? "Unable to send your message. Please try again.");
  }
}

async function sendViaFormSubmit(form: ContactFormInput): Promise<void> {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_FORM_TO_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        _subject: `Casa Pelle contact form — ${form.name.trim()}`,
        _captcha: "false",
        _template: "table",
      }),
    },
  );

  const data = (await response.json()) as FormSubmitResponse;
  if (!isSuccessfulResponse(data.success)) {
    throw new Error(data.message ?? "Unable to send your message. Please try again.");
  }
}

export async function sendContactForm(form: ContactFormInput): Promise<void> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (accessKey) {
    await sendViaWeb3Forms(form, accessKey);
    return;
  }

  await sendViaFormSubmit(form);
}

export function validateContactForm(input: ContactFormInput): Partial<ContactFormInput> {
  const errors: Partial<ContactFormInput> = {};

  if (!input.name.trim()) {
    errors.name = "Name is required";
  }

  if (!input.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = "Enter a valid email";
  }

  if (!input.message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
}

export function isContactFormValid(input: ContactFormInput): boolean {
  return Object.keys(validateContactForm(input)).length === 0;
}
