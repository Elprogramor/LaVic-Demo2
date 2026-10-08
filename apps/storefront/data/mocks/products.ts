import type { Product } from "@lavic/domain";

export type StoreProduct = Product & {
  category: "classic";
  status: "available" | "unavailable";
  badge?: string;
  tastingNotes: string[];
  gallery: string[];
  servingNote: string;
  storageNote: string;
  ingredientsNote: string;
};

export const products: StoreProduct[] = [
  {
    id: "prod_lime_1l",
    slug: "limao-1l",
    name: "Limão",
    flavor: "lime",
    volumeMl: 1000,
    priceCents: 1890,
    shortDescription: "Cítrica, leve e naturalmente refrescante.",
    description: "Uma interpretação demonstrativa da LaVic de limão, criada para apresentar a experiência digital. Formulação, claims e texto final devem ser validados com a marca antes da publicação comercial.",
    image: "/demo/lime-hero.png",
    ingredientImage: "/demo/lime-ingredient.png",
    accent: "#6B824F",
    softBackground: "#EEF0E5",
    featured: true,
    category: "classic",
    status: "available",
    badge: "Mais refrescante",
    tastingNotes: ["cítrico", "leve", "final fresco"],
    gallery: ["/demo/lime-hero.png", "/demo/lime-showcase.png", "/demo/lime-ingredient.png"],
    servingNote: "Servir bem gelada.",
    storageNote: "Manter refrigerada. Produto vivo.",
    ingredientsNote: "Ingredientes e informações regulatórias finais devem ser validados pela marca."
  },
  {
    id: "prod_strawberry_1l",
    slug: "morango-1l",
    name: "Morango",
    flavor: "strawberry",
    volumeMl: 1000,
    priceCents: 1990,
    shortDescription: "Frutada, viva e delicadamente intensa.",
    description: "Uma interpretação demonstrativa da LaVic de morango para a demo inicial. Formulação, claims e texto final devem ser validados com a marca antes da publicação comercial.",
    image: "/demo/strawberry-showcase.png",
    ingredientImage: "/demo/strawberry-ingredient.png",
    accent: "#B64D49",
    softBackground: "#F4E8E4",
    featured: true,
    category: "classic",
    status: "available",
    badge: "Frutada",
    tastingNotes: ["morango", "frutado", "equilibrado"],
    gallery: ["/demo/strawberry-showcase.png", "/demo/strawberry-ingredient.png"],
    servingNote: "Servir bem gelada.",
    storageNote: "Manter refrigerada. Produto vivo.",
    ingredientsNote: "Ingredientes e informações regulatórias finais devem ser validados pela marca."
  }
];
