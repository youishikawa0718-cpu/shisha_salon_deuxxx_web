import { Router } from 'express';
import { ReservationController } from '../controllers/reservation.controller';
import { validate } from '../middleware/validate';
import { createReservationSchema, updateReservationSchema } from '../validators/reservation.validator';

const router = Router();
const controller = new ReservationController();

router.get('/', controller.index);
router.post('/', validate(createReservationSchema), controller.store);
router.get('/:id', controller.show);
router.put('/:id', validate(updateReservationSchema), controller.update);
router.patch('/:id', validate(updateReservationSchema), controller.update);
router.delete('/:id', controller.destroy);

export default router;
