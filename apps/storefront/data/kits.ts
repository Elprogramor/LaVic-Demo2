export type Kit = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  priceCents: number;
};

export const kits: Kit[] = [
  {
    id: "kit_discovery",
    slug: "descoberta",
    name: "Kit Descoberta",
    description: "Uma seleção demonstrativa para conhecer diferentes expressões da LaVic.",
    image: "/kits/discovery.webp",
    priceCents: 5490,
  },
  {
    id: "kit_summer",
    slug: "verao",
    name: "Kit Verão",
    description: "Uma composição leve e refrescante para compartilhar em momentos especiais.",
    image: "/kits/summer.webp",
    priceCents: 7490,
  }
];
