import type { Product } from "@/data/products";
import { ProductCard } from "@/components/commerce/product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
