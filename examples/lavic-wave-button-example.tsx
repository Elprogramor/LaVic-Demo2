import { ArrowUpRight } from "lucide-react";

import { LavicWaveButton } from "@/components/ui/lavic-wave-button";

export function LavicWaveButtonExample() {
  return (
    <LavicWaveButton href="/produtos">
      Conheça os sabores
      <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
    </LavicWaveButton>
  );
}
