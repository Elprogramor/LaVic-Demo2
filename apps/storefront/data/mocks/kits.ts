import type { Kit } from "@lavic/domain";

export type StoreKit = Kit & {
  slug: string;
  eyebrow: string;
  availability: number;
  badge?: string;
  channels: Array<"B2C" | "B2B">;
};

export const kits: StoreKit[] = [
  {
    id: "kit_discovery",
    slug: "descubra-lavic",
    eyebrow: "Para experimentar",
    name: "Descubra LaVic",
    description: "Uma seleção de sabores para experimentar a marca em casa.",
    priceCents: 5390,
    image: "/demo/lime-showcase.png",
    availability: 18,
    badge: "Seleção da casa",
    channels: ["B2C"],
    items: [
      { productId: "prod_lime_1l", quantity: 2 },
      { productId: "prod_strawberry_1l", quantity: 1 }
    ]
  },
  {
    id: "kit_week",
    slug: "semana-com-gas",
    eyebrow: "Para a rotina",
    name: "Sua semana com gás",
    description: "Uma composição maior pensada para consumo recorrente e compartilhamento.",
    priceCents: 10990,
    image: "/demo/strawberry-showcase.png",
    availability: 8,
    channels: ["B2C", "B2B"],
    items: [
      { productId: "prod_lime_1l", quantity: 3 },
      { productId: "prod_strawberry_1l", quantity: 3 }
    ]
  }
];
