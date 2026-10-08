import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./lavic-wave-button.module.css";

type LavicWaveButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children" | "className">;

export function LavicWaveButton({
  href,
  children,
  className,
  ...props
}: LavicWaveButtonProps) {
  const classes = className
    ? `${styles.button} ${className}`
    : styles.button;

  return (
    <Link href={href} className={classes} {...props}>
      <span className={styles.content}>{children}</span>
    </Link>
  );
}
