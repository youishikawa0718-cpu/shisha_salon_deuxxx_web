import { z } from 'zod';

export const createReservationSchema = z.object({
  customerName: z.string().min(1).max(255),
  customerPhone: z.string().min(1).max(20),
  customerEmail: z.string().email().max(255).optional().nullable(),
  seatId: z.number().int().positive(),
  reservationDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  partySize: z.number().int().min(1).max(10),
  specialRequests: z.string().max(1000).optional().nullable(),
  depositAmount: z.number().min(0).optional().nullable(),
});

export const updateReservationSchema = z.object({
  customerName: z.string().min(1).max(255).optional(),
  customerPhone: z.string().min(1).max(20).optional(),
  customerEmail: z.string().email().max(255).optional().nullable(),
  seatId: z.number().int().positive().optional(),
  reservationDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  partySize: z.number().int().min(1).max(10).optional(),
  specialRequests: z.string().max(1000).optional().nullable(),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
  depositAmount: z.number().min(0).optional().nullable(),
  depositPaid: z.boolean().optional(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
export type UpdateReservationInput = z.infer<typeof updateReservationSchema>;
