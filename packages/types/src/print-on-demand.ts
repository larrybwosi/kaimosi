import { z } from "zod";
import { ImageSchema } from "./common.js";

// Design types
export const DesignSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().url(),
  userId: z.string(),
  isPublic: z.boolean().default(false),
  createdAt: z.date(),
});

export type Design = z.infer<typeof DesignSchema>;

// Product template types
export const ProductTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["T_SHIRT", "MUG", "POSTER", "STICKER", "TOTE_BAG"]),
  basePrice: z.number().positive(),
  image: ImageSchema,
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
});

export type ProductTemplate = z.infer<typeof ProductTemplateSchema>;

// Custom order types
export const CustomOrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  templateId: z.string(),
  designId: z.string(),
  quantity: z.number().int().positive(),
  size: z.string().optional(),
  color: z.string().optional(),
  totalPrice: z.number().positive(),
  status: z.enum(["PENDING", "PROCESSING", "PRINTING", "SHIPPED", "DELIVERED"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CustomOrder = z.infer<typeof CustomOrderSchema>;
