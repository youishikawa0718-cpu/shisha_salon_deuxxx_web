import { Router } from 'express';
import reservationsRouter from './reservations';
import seatsRouter from './seats';

const router = Router();

router.use('/reservations', reservationsRouter);
router.use('/seats', seatsRouter);

export default router;
