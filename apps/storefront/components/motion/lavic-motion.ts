import type { Variants } from "framer-motion";

export const LAVIC_EASE = [0.22, 1, 0.36, 1] as const;

export const LAVIC_VIEWPORT = {
  once: true,
  amount: 0.2,
} as const;

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

export const sectionContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.03,
      staggerChildren: 0.08,
    },
  },
};

export const cardContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.075,
    },
  },
};

export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: LAVIC_EASE,
    },
  },
};

export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: LAVIC_EASE,
    },
  },
};

export const mediaReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: LAVIC_EASE,
    },
  },
};
