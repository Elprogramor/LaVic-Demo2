import type { PropsWithChildren } from "react";

export function Container({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`site-container ${className}`.trim()}>{children}</div>;
}
