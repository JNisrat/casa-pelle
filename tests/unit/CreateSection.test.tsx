import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CreateSection } from "@/components/sections/CreateSection";

describe("CreateSection", () => {
  it("renders workshop section heading", () => {
    render(<CreateSection />);
    expect(screen.getByRole("heading", { name: "How we create our bags" })).toBeInTheDocument();
    expect(screen.getByLabelText("Craftsman creating leather bags")).toHaveAttribute(
      "src",
      "/images/Video%20Project%2016.mp4",
    );
  });
});
