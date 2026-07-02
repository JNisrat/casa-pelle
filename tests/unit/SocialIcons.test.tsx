import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialIcons } from "@/components/ui/SocialIcons";

describe("SocialIcons", () => {
  it("renders instagram, facebook, and twitter links", () => {
    render(<SocialIcons />);
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
  });
});
