import { Router } from 'express';
import { getCars, getCarById, checkAvailability, createCar, updateCar, deleteCar } from '../controllers/cars.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getCars);
router.get('/:id', getCarById);
router.get('/:id/availability', checkAvailability);

// Admin protected routes
router.post('/', authenticateToken, requireAdmin, createCar);
router.put('/:id', authenticateToken, requireAdmin, updateCar);
router.delete('/:id', authenticateToken, requireAdmin, deleteCar);

export default router;

