import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const routes = ["", "/sabores", "/kits", "/revenda", "/sobre", "/carrinho", "/checkout", "/encomendas"];
  return [
    ...routes.map((route) => ({ url: `${base}${route}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : .7 })),
    ...products.map((product) => ({ url: `${base}/produto/${product.slug}`, changeFrequency: "weekly" as const, priority: .8 })),
  ];
}
