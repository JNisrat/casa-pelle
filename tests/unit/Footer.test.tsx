import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { CONTACT } from "@/lib/constants";

describe("Footer", () => {
  it("renders contact details", () => {
    render(<Footer />);
    expect(screen.getByText(CONTACT.email)).toBeInTheDocument();
    expect(screen.getByText(CONTACT.phone)).toBeInTheDocument();
  });

  it("renders menu links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: "Reviews" })).toHaveAttribute("href", "/reviews");
  });
});
