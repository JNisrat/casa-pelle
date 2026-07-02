import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/Header";
import { renderWithProviders } from "@/tests/test-utils";

describe("Header", () => {
  it("renders all navigation links", () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reviews" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("marks Home as active with underline", () => {
    renderWithProviders(<Header />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink.className).toContain("border-b-2");
  });
});
