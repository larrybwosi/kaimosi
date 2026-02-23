import { z } from 'zod';
import { ImageSchema, LocationSchema } from './common';

// Attraction types
export const AttractionCategorySchema = z.enum([
  'HISTORICAL',
  'NATURAL',
  'CULTURAL',
  'RECREATIONAL',
  'RELIGIOUS',
  'EDUCATIONAL',
]);

export const AttractionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: AttractionCategorySchema,
  location: LocationSchema,
  images: z.array(ImageSchema),
  entryFee: z.number().nonnegative().optional(),
  openingHours: z.string().optional(),
  contactInfo: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  featured: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Attraction = z.infer<typeof AttractionSchema>;
export type AttractionCategory = z.infer<typeof AttractionCategorySchema>;

// Event types
export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  attractionId: z.string().optional(),
  location: LocationSchema,
  images: z.array(ImageSchema),
  startDate: z.date(),
  endDate: z.date(),
  ticketPrice: z.number().nonnegative().optional(),
  capacity: z.number().int().positive().optional(),
  organizer: z.string(),
  createdAt: z.date(),
});

export type Event = z.infer<typeof EventSchema>;
