import { z } from 'zod';

// User types
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().optional(),
  role: z.enum(['USER', 'ADMIN', 'VENDOR']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// Pagination
export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  total: z.number().optional(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

// API Response
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
});

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
};

// Image types
export const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export type Image = z.infer<typeof ImageSchema>;

// Location types
export const LocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
  city: z.string(),
  county: z.string(),
  country: z.string().default('Kenya'),
});

export type Location = z.infer<typeof LocationSchema>;
