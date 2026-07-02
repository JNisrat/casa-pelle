import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { CartProvider } from "@/components/providers/CartProvider";

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(<CartProvider>{ui}</CartProvider>, options);
}
