export type FlavorId = "lime" | "strawberry";

export type Product = {
  id: string;
  slug: string;
  name: string;
  flavor: FlavorId;
  volumeMl: number;
  priceCents: number;
  shortDescription: string;
  description: string;
  image: string;
  ingredientImage: string;
  accent: string;
  softBackground: string;
  featured?: boolean;
};

export type Kit = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image: string;
  items: Array<{ productId: string; quantity: number }>;
};

export type CartLine = {
  product: Product;
  quantity: number;
};

export type LeadKind = "B2B_RESELL" | "SPECIAL_ORDER";

export type Permission =
  | "orders.read"
  | "orders.write"
  | "customers.read"
  | "customers.export"
  | "catalog.read"
  | "catalog.write"
  | "crm.read"
  | "crm.write"
  | "finance.read"
  | "users.manage"
  | "settings.manage";
