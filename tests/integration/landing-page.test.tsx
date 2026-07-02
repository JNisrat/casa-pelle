import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { renderWithProviders } from "@/tests/test-utils";

describe("Landing page integration", () => {
  it("renders all sections in order", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Handcrafted");
    expect(screen.getByRole("heading", { name: "Our Products" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Our advantages" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "How we create our bags" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Reviews" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Want to Customise" })).toBeInTheDocument();
  });

  it("has nav links pointing to section anchors", () => {
    renderWithProviders(<HomePage />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav.querySelector('a[href="/products"]')).toBeInTheDocument();
    expect(nav.querySelector('a[href="/#footer"]')).toBeInTheDocument();
  });

  it("submits contact form successfully", async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);
    await user.type(screen.getByPlaceholderText("Name"), "Test User");
    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Message"), "Custom bag request");
    await user.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  it("reviews carousel wraps at boundaries", async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);
    const nextButton = screen.getByRole("button", { name: "Next review" });
    for (let i = 0; i < 9; i += 1) {
      await user.click(nextButton);
    }
    expect(screen.getByTestId("review-counter")).toHaveTextContent("10/10");
    await user.click(nextButton);
    expect(screen.getByTestId("review-counter")).toHaveTextContent("1/10");
  });
});
