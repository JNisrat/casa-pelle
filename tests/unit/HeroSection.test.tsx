import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroSection } from "@/components/sections/HeroSection";

describe("HeroSection", () => {
  it("renders hero heading and CTA", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Handcrafted");
    expect(screen.getByRole("link", { name: "Shop now" })).toHaveAttribute("href", "/products");
    expect(screen.getByText("Your vision, our creation")).toBeInTheDocument();
  });
});
