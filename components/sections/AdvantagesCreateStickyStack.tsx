import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { CreateSection } from "@/components/sections/CreateSection";

export function AdvantagesCreateStickyStack() {
  return (
    <div
      className="advantages-create-sticky-parent relative h-[300svh]"
      data-testid="advantages-create-sticky-parent"
    >
      <div className="advantages-sticky-panel sticky top-0 z-10 h-svh overflow-hidden bg-white">
        <AdvantagesSection />
      </div>

      <div className="create-sticky-panel sticky top-0 z-20 h-svh overflow-hidden bg-white">
        <CreateSection />
      </div>
    </div>
  );
}

