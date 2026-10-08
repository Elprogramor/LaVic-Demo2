export function OutlineWord({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`outline-word ${className}`.trim()} aria-hidden="true">{children}</span>;
}
