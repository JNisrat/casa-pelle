import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders primary variant with burgundy styling", () => {
    render(<Button variant="primary">Shop now</Button>);
    const button = screen.getByRole("button", { name: "Shop now" });
    expect(button).toHaveClass("bg-[var(--color-primary)]");
    expect(button).toHaveClass("rounded-[46px]");
  });

  it("renders outlined variant", () => {
    render(<Button variant="outlined">Discover the collection</Button>);
    const button = screen.getByRole("button", { name: "Discover the collection" });
    expect(button).toHaveClass("border");
    expect(button).toHaveClass("rounded-[86px]");
  });

  it("renders send variant", () => {
    render(<Button variant="send">Send</Button>);
    const button = screen.getByRole("button", { name: "Send" });
    expect(button).toHaveClass("bg-[var(--color-primary)]");
  });
});
