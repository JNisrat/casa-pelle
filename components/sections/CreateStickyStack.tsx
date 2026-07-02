import { type ReactNode } from "react";

type CreateStickyStackProps = {
  children: ReactNode;
};

export function CreateStickyStack({ children }: CreateStickyStackProps) {
  return (
    <div
      className="create-sticky-parent relative h-[200svh]"
      data-testid="create-sticky-parent"
    >
      {children}
    </div>
  );
}
