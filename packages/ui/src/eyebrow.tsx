import type { PropsWithChildren } from "react";

export function Eyebrow({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <p className={`eyebrow ${className}`.trim()}>{children}</p>;
}
