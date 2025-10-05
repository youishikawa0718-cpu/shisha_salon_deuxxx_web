import { z } from 'zod';

export const createSeatSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.string().min(1).max(255),
  capacity: z.number().int().min(1).max(20),
  description: z.string().max(1000).optional().nullable(),
  hourlyRate: z.number().min(0),
});

export const updateSeatSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  type: z.string().min(1).max(255).optional(),
  capacity: z.number().int().min(1).max(20).optional(),
  description: z.string().max(1000).optional().nullable(),
  isActive: z.boolean().optional(),
  hourlyRate: z.number().min(0).optional(),
});

export type CreateSeatInput = z.infer<typeof createSeatSchema>;
export type UpdateSeatInput = z.infer<typeof updateSeatSchema>;
