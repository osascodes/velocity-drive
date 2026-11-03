import { Router } from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  updateBookingStatus
} from '../controllers/bookings.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Customer bookings (protected)
router.post('/', authenticateToken, createBooking);
router.get('/my', authenticateToken, getUserBookings);
router.patch('/:id/cancel', authenticateToken, cancelBooking);

// Admin bookings management (protected)
router.get('/all', authenticateToken, requireAdmin, getAllBookings);
router.patch('/:id/status', authenticateToken, requireAdmin, updateBookingStatus);

export default router;

