export type Product = {
  id: string;
  slug: string;
  name: string;
  flavor: string;
  volumeMl: number;
  priceCents: number;
  description: string;
  shortDescription: string;
  image: string;
  accent: string;
  softBackground: string;
  featured?: boolean;
  available?: boolean;
  badge?: string;
  tastingNotes: string[];
  storageNote: string;
  servingNote: string;
};

export const products: Product[] = [
  {
    id: "prod_lime_1l",
    slug: "limao-1l",
    name: "LaVic Limão",
    flavor: "Limão",
    volumeMl: 1000,
    priceCents: 1890,
    shortDescription: "Cítrica, leve e naturalmente refrescante.",
    description: "Uma kombucha viva, cítrica e refrescante, apresentada aqui em caráter demonstrativo. Ingredientes, claims e informações regulatórias devem ser validados pela LaVic antes da publicação comercial.",
    image: "/products/lavic-limao-cutout.png",
    accent: "#6B824F",
    softBackground: "#EEF0E5",
    featured: true,
    available: true,
    badge: "Destaque",
    tastingNotes: ["cítrico", "leve", "final fresco"],
    storageNote: "Manter refrigerada. Produto vivo.",
    servingNote: "Servir bem gelada."
  },
  {
    id: "prod_strawberry_1l",
    slug: "morango-1l",
    name: "LaVic Morango",
    flavor: "Morango",
    volumeMl: 1000,
    priceCents: 1990,
    shortDescription: "Frutada, viva e delicadamente intensa.",
    description: "Uma leitura frutada da linha LaVic para demonstração visual do catálogo. Conteúdo final sujeito à validação da marca.",
    image: "/flavors/strawberry.webp",
    accent: "#B64D49",
    softBackground: "#F4E8E4",
    featured: true,
    available: true,
    badge: "Frutada",
    tastingNotes: ["morango", "frutado", "equilibrado"],
    storageNote: "Manter refrigerada. Produto vivo.",
    servingNote: "Servir bem gelada."
  },
  {
    id: "prod_passion_1l",
    slug: "maracuja-1l",
    name: "LaVic Maracujá",
    flavor: "Maracujá",
    volumeMl: 1000,
    priceCents: 1990,
    shortDescription: "Tropical, aromática e vibrante.",
    description: "Uma opção tropical para explorar a arquitetura do catálogo LaVic. Formulação e disponibilidade são demonstrativas.",
    image: "/flavors/passion-fruit.webp",
    accent: "#D6A52A",
    softBackground: "#F7F0D8",
    featured: true,
    available: true,
    badge: "Tropical",
    tastingNotes: ["tropical", "aromático", "vivo"],
    storageNote: "Manter refrigerada. Produto vivo.",
    servingNote: "Servir bem gelada."
  },
  {
    id: "prod_ginger_1l",
    slug: "gengibre-limao-1l",
    name: "LaVic Gengibre + Limão",
    flavor: "Gengibre + Limão",
    volumeMl: 1000,
    priceCents: 1990,
    shortDescription: "Fresca, especiada e expressiva.",
    description: "Uma combinação demonstrativa para mostrar variedade de sabores e experiência de navegação da loja.",
    image: "/flavors/ginger-lime.webp",
    accent: "#77945F",
    softBackground: "#EDF1E8",
    featured: true,
    available: true,
    badge: "Intensa",
    tastingNotes: ["gengibre", "cítrico", "especiado"],
    storageNote: "Manter refrigerada. Produto vivo.",
    servingNote: "Servir bem gelada."
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
