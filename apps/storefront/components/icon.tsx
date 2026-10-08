type IconProps = { name: string; label?: string; className?: string };

export function Icon({ name, label, className = "" }: IconProps) {
  return <i className={`fi fi-tr-${name} ${className}`.trim()} aria-hidden={label ? undefined : true} aria-label={label} />;
}
