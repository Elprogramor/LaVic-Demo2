import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./icon";

export function Button({ children, icon, variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; icon?: IconName; variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  return <button className={`button button-${variant} ${className}`.trim()} {...props}>{icon ? <Icon name={icon} size={16}/> : null}<span>{children}</span></button>;
}

export function ButtonLink({ href, children, icon, variant = "primary" }: { href: string; children: ReactNode; icon?: IconName; variant?: "primary" | "secondary" | "ghost" }) {
  return <Link className={`button button-${variant}`} href={href}>{icon ? <Icon name={icon} size={16}/> : null}<span>{children}</span></Link>;
}

export function Panel({ title, action, children, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`.trim()}>{title || action ? <div className="panel-header">{title ? <h2>{title}</h2> : <span/>}{action}</div> : null}{children}</section>;
}
