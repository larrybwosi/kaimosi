import { z } from "zod";
import { ImageSchema, LocationSchema } from "./common.js";

// Property types
export const PropertyTypeSchema = z.enum([
  "APARTMENT",
  "HOUSE",
  "VILLA",
  "LAND",
  "COMMERCIAL",
]);

export const PropertyStatusSchema = z.enum([
  "AVAILABLE",
  "SOLD",
  "RENTED",
  "PENDING",
]);

export const PropertySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: PropertyTypeSchema,
  status: PropertyStatusSchema,
  price: z.number().positive(),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  area: z.number().positive(),
  location: LocationSchema,
  images: z.array(ImageSchema),
  amenities: z.array(z.string()),
  ownerId: z.string(),
  featured: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Property = z.infer<typeof PropertySchema>;
export type PropertyType = z.infer<typeof PropertyTypeSchema>;
export type PropertyStatus = z.infer<typeof PropertyStatusSchema>;

// Booking types
export const BookingSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  userId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  totalPrice: z.number().positive(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]),
  createdAt: z.date(),
});

export type Booking = z.infer<typeof BookingSchema>;
