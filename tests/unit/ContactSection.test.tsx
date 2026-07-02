import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactSection } from "@/components/sections/ContactSection";
import { CONTACT_SUCCESS_MESSAGE } from "@/lib/contact";

describe("ContactSection", () => {
  it("shows validation errors for empty form", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Message is required")).toBeInTheDocument();
  });

  it("submits successfully with valid data", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.type(screen.getByPlaceholderText("Name"), "Jane Doe");
    await user.type(screen.getByPlaceholderText("Email"), "jane@example.com");
    await user.type(screen.getByPlaceholderText("Message"), "I want a custom bag");
    await user.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(CONTACT_SUCCESS_MESSAGE);
    });
  });
});
