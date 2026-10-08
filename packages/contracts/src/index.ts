import type { Product } from "@lavic/domain";

export type CatalogResponse = { products: Product[] };
export type ProductResponse = { product: Product };

export type CreateB2BLeadRequest = {
  contactName: string;
  businessName: string;
  whatsapp: string;
  city: string;
  businessType: string;
  message?: string;
};

export type CreateSpecialOrderRequest = {
  contactName: string;
  whatsapp: string;
  eventDate?: string;
  estimatedQuantity?: number;
  occasion: string;
  message?: string;
};
