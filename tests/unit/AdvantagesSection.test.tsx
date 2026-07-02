import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";

describe("AdvantagesSection", () => {
  it("renders three advantage columns", () => {
    render(<AdvantagesSection />);
    const section = screen.getByTestId("advantages-section");
    expect(section).toHaveTextContent("High quality");
    expect(section).toHaveTextContent("Gift Box");
    expect(section).toHaveTextContent("Customisation");
  });
});
