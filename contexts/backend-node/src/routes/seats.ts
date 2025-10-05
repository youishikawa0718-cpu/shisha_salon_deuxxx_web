import { Router } from 'express';
import { SeatController } from '../controllers/seat.controller';
import { validate } from '../middleware/validate';
import { createSeatSchema, updateSeatSchema } from '../validators/seat.validator';

const router = Router();
const controller = new SeatController();

router.get('/available', controller.available);
router.get('/', controller.index);
router.post('/', validate(createSeatSchema), controller.store);
router.get('/:id', controller.show);
router.put('/:id', validate(updateSeatSchema), controller.update);
router.patch('/:id', validate(updateSeatSchema), controller.update);
router.delete('/:id', controller.destroy);

export default router;
