import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { CreateSeatInput, UpdateSeatInput } from '../validators/seat.validator';
import { TypedRequest } from '../types';

export class SeatController {
  async index(req: Request, res: Response) {
    try {
      const seats = await prisma.seat.findMany({
        where: {
          isActive: true,
        },
      });
      return res.json(seats);
    } catch (error) {
      console.error('Error fetching seats:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async store(req: TypedRequest<CreateSeatInput>, res: Response) {
    try {
      const seat = await prisma.seat.create({
        data: req.body,
      });
      return res.status(201).json(seat);
    } catch (error) {
      console.error('Error creating seat:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const seat = await prisma.seat.findUnique({
        where: { id },
      });

      if (!seat) {
        return res.status(404).json({ message: 'Seat not found' });
      }

      return res.json(seat);
    } catch (error) {
      console.error('Error fetching seat:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: TypedRequest<UpdateSeatInput>, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const existing = await prisma.seat.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ message: 'Seat not found' });
      }

      const seat = await prisma.seat.update({
        where: { id },
        data: req.body,
      });

      return res.json(seat);
    } catch (error) {
      console.error('Error updating seat:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const existing = await prisma.seat.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ message: 'Seat not found' });
      }

      await prisma.seat.delete({ where: { id } });
      return res.json({ message: 'Seat deleted successfully' });
    } catch (error) {
      console.error('Error deleting seat:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async available(req: Request, res: Response) {
    try {
      const { date, start_time, end_time } = req.query;

      if (!date || !start_time || !end_time) {
        return res.status(400).json({
          message: 'Missing required query parameters: date, start_time, end_time',
        });
      }

      const reservationDate = new Date(date as string);
      const startTime = `1970-01-01T${start_time}:00Z`;
      const endTime = `1970-01-01T${end_time}:00Z`;

      // Find all active seats
      const allSeats = await prisma.seat.findMany({
        where: { isActive: true },
      });

      // Find reservations that overlap with the requested time
      const conflictingReservations = await prisma.reservation.findMany({
        where: {
          reservationDate: reservationDate,
          OR: [
            {
              AND: [
                { startTime: { lte: new Date(startTime) } },
                { endTime: { gte: new Date(startTime) } },
              ],
            },
            {
              AND: [
                { startTime: { lte: new Date(endTime) } },
                { endTime: { gte: new Date(endTime) } },
              ],
            },
            {
              AND: [
                { startTime: { gte: new Date(startTime) } },
                { endTime: { lte: new Date(endTime) } },
              ],
            },
          ],
        },
        select: {
          seatId: true,
        },
      });

      const bookedSeatIds = new Set(conflictingReservations.map((r) => r.seatId));
      const availableSeats = allSeats.filter((seat) => !bookedSeatIds.has(seat.id));

      return res.json(availableSeats);
    } catch (error) {
      console.error('Error fetching available seats:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
