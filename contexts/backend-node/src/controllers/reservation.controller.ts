import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { CreateReservationInput, UpdateReservationInput } from '../validators/reservation.validator';
import { TypedRequest } from '../types';

export class ReservationController {
  async index(req: Request, res: Response) {
    try {
      const reservations = await prisma.reservation.findMany({
        include: {
          seat: true,
        },
      });
      return res.json(reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async store(req: TypedRequest<CreateReservationInput>, res: Response) {
    try {
      const { seatId, ...data } = req.body;

      // Check if seat exists
      const seat = await prisma.seat.findUnique({ where: { id: seatId } });
      if (!seat) {
        return res.status(404).json({ message: 'Seat not found' });
      }

      const reservation = await prisma.reservation.create({
        data: {
          ...data,
          seatId,
          reservationDate: new Date(data.reservationDate),
          startTime: new Date(`1970-01-01T${data.startTime}:00Z`),
          endTime: new Date(`1970-01-01T${data.endTime}:00Z`),
        },
        include: {
          seat: true,
        },
      });

      return res.status(201).json(reservation);
    } catch (error) {
      console.error('Error creating reservation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const reservation = await prisma.reservation.findUnique({
        where: { id },
        include: {
          seat: true,
        },
      });

      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      return res.json(reservation);
    } catch (error) {
      console.error('Error fetching reservation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: TypedRequest<UpdateReservationInput>, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const existing = await prisma.reservation.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      const { seatId, reservationDate, startTime, endTime, ...otherData } = req.body;

      const updateData: any = { ...otherData };
      if (seatId !== undefined) updateData.seatId = seatId;
      if (reservationDate) updateData.reservationDate = new Date(reservationDate);
      if (startTime) updateData.startTime = new Date(`1970-01-01T${startTime}:00Z`);
      if (endTime) updateData.endTime = new Date(`1970-01-01T${endTime}:00Z`);

      const reservation = await prisma.reservation.update({
        where: { id },
        data: updateData,
        include: {
          seat: true,
        },
      });

      return res.json(reservation);
    } catch (error) {
      console.error('Error updating reservation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }

      const existing = await prisma.reservation.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ message: 'Reservation not found' });
      }

      await prisma.reservation.delete({ where: { id } });
      return res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      console.error('Error deleting reservation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
