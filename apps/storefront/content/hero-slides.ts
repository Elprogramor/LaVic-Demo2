export type HeroTheme = "lime" | "strawberry" | "sparkling";

export type HeroSlide = {
  id: string;
  index: string;
  theme: HeroTheme;
  name: string;
  descriptor: string;
  body: string;
  ctaLabel: string;
  href: string;
  banner: {
    desktop: string;
    mobile: string;
    alt: string;
    desktopPosition: string;
    mobilePosition: string;
  };
  colors: {
    headline: string;
    control: string;
    surface: string;
  };
};

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "lime",
    index: "01",
    theme: "lime",
    name: "LaVic Limão",
    descriptor: "limão · 1 L",
    body: "Cítrica, leve e refrescante. Uma LaVic para servir bem gelada.",
    ctaLabel: "Ver LaVic Limão",
    href: "/produto/limao-1l",
    banner: {
      desktop: "/hero/banners/lime-desktop.webp",
      mobile: "/hero/banners/lime-mobile.webp",
      alt: "Composição publicitária da LaVic Limão com garrafa, limões, folhas e splash",
      desktopPosition: "center center",
      mobilePosition: "center center"
    },
    colors: {
      headline: "#0b4829",
      control: "#0b4829",
      surface: "rgba(247, 247, 226, 0.94)"
    }
  },
  {
    id: "strawberry",
    index: "02",
    theme: "strawberry",
    name: "LaVic Morango",
    descriptor: "morango · 1 L",
    body: "Frutada, vibrante e refrescante, com presença marcante de morango.",
    ctaLabel: "Ver LaVic Morango",
    href: "/produto/morango-1l",
    banner: {
      desktop: "/hero/banners/strawberry-desktop.webp",
      mobile: "/hero/banners/strawberry-mobile.webp",
      alt: "Composição publicitária da LaVic Morango com garrafa, morangos, folhas e splash",
      desktopPosition: "center center",
      mobilePosition: "center center"
    },
    colors: {
      headline: "#a91f31",
      control: "#a91f31",
      surface: "rgba(255, 239, 233, 0.94)"
    }
  },
  {
    id: "sparkling",
    index: "03",
    theme: "sparkling",
    name: "LaVic Espumante",
    descriptor: "pitaya · uva verde · 750 ml",
    body: "Pitaya e uva verde em 750 ml, com uma apresentação pensada para momentos especiais.",
    ctaLabel: "Conhecer o Espumante",
    href: "/sabores#espumante",
    banner: {
      desktop: "/hero/banners/sparkling-desktop.webp",
      mobile: "/hero/banners/sparkling-mobile.webp",
      alt: "Composição publicitária da LaVic Espumante com pitaya, uva verde e garrafa rosé",
      desktopPosition: "center center",
      mobilePosition: "center center"
    },
    colors: {
      headline: "#8f3f59",
      control: "#8f3f59",
      surface: "rgba(255, 241, 237, 0.95)"
    }
  }
] as const;
