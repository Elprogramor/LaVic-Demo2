import { z } from "zod";

export const b2bLeadSchema = z.object({
  contactName: z.string().min(2),
  businessName: z.string().min(2),
  whatsapp: z.string().min(8),
  city: z.string().min(2),
  businessType: z.string().min(2),
  message: z.string().max(800).optional()
});

export const specialOrderSchema = z.object({
  contactName: z.string().min(2),
  whatsapp: z.string().min(8),
  eventDate: z.string().optional(),
  estimatedQuantity: z.coerce.number().int().positive().optional(),
  occasion: z.string().min(2),
  message: z.string().max(800).optional()
});
