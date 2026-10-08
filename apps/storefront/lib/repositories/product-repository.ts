import { products } from "@/data/mocks/products";

export const productRepository = {
  getAll: () => products,
  getFeatured: () => products.filter((product) => product.featured),
  getBySlug: (slug: string) => products.find((product) => product.slug === slug)
};
