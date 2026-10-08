export const homeV06Media = {
  hero: "/home-v06/hero/hero-lime-minimal.png",
  editorial: "/home-v06/editorial/strawberry-feature.webp",
  brandTexture: "/home-v06/brand/brand-texture.webp",
  lifestyle: [
    "/home-v06/lifestyle/lifestyle-01.webp",
    "/home-v06/lifestyle/lifestyle-02.webp",
    "/home-v06/lifestyle/lifestyle-03.webp"
  ],
  kits: {
    discovery: "/home-v06/kits/discovery.webp",
    summer: "/home-v06/kits/summer.webp"
  }
} as const;

export const homeV06Flavors = [
  {
    id: "lime",
    name: "Limão",
    image: "/home-v06/flavors/lime.webp",
    href: "/produto/limao-1l",
    tone: "#eef1d7",
    demo: false
  },
  {
    id: "strawberry",
    name: "Morango",
    image: "/home-v06/flavors/strawberry.webp",
    href: "/produto/morango-1l",
    tone: "#f5dfdb",
    demo: false
  },
  {
    id: "passion-fruit",
    name: "Maracujá",
    image: "/home-v06/flavors/passion-fruit.webp",
    href: "/sabores",
    tone: "#f7e8bd",
    demo: true
  },
  {
    id: "red-fruits",
    name: "Frutas Vermelhas",
    image: "/home-v06/flavors/red-fruits.webp",
    href: "/sabores",
    tone: "#f2d9de",
    demo: true
  },
  {
    id: "ginger-lime",
    name: "Gengibre & Limão",
    image: "/home-v06/flavors/ginger-lime.webp",
    href: "/sabores",
    tone: "#efe9cf",
    demo: true
  },
  {
    id: "green-grape",
    name: "Uva Verde",
    image: "/home-v06/flavors/green-grape.webp",
    href: "/sabores",
    tone: "#e6efd0",
    demo: true
  }
] as const;

export const homeV06Picks = [
  {
    eyebrow: "MAIS PEDIDO",
    title: "LaVic Limão",
    copy: "Cítrica, leve e uma boa porta de entrada para conhecer a marca.",
    href: "/produto/limao-1l",
    cta: "Ver produto",
    image: "/home-v06/picks/lime.webp",
    tone: "#eef1d7"
  },
  {
    eyebrow: "PARA CONHECER",
    title: "Kit Descubra LaVic",
    copy: "Uma seleção para experimentar mais de um perfil de sabor.",
    href: "/kits",
    cta: "Ver kits",
    image: "/home-v06/picks/discovery.webp",
    tone: "#f5efe2"
  },
  {
    eyebrow: "PARA CELEBRAR",
    title: "Espumante LaVic",
    copy: "Uma proposta especial para momentos que pedem outra experiência.",
    href: "/sabores#espumante",
    cta: "Conhecer",
    image: "/home-v06/picks/sparkling.webp",
    tone: "#f1e9e5"
  }
] as const;

export const homeV06Values = [
  { title: "Ingredientes", copy: "Informações claras e uma apresentação cuidadosa." },
  { title: "Fermentação", copy: "A essência da categoria traduzida de forma simples." },
  { title: "Sabor", copy: "Perfis diferentes para descobrir a sua LaVic." },
  { title: "Momentos", copy: "Do almoço ao encontro, sempre bem gelada." }
] as const;
