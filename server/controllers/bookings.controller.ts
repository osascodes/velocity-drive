import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { bookingsStore, carsStore, checkCarAvailability, usersStore } from '../data/store';
import { Booking, BookingStatus } from '../../types';

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required to book a vehicle.' });
    }

    const {
      carId,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      insuranceTier = 'Standard',
      extras = []
    } = req.body;

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Car, start date, and end date are required.' });
    }

    const car = carsStore.find((c) => c.id === carId);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Requested car does not exist.' });
    }

    // Availability verification
    const isAvailable = checkCarAvailability(carId, startDate, endDate);
    if (!isAvailable) {
      return res.status(409).json({
        success: false,
        message: 'This vehicle is already reserved for the selected dates. Please choose different dates.'
      });
    }

    // Calculate duration in days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Calculate rates
    const basePrice = car.pricePerDay * totalDays;
    
    // Insurance rates
    let insuranceRatePerDay = 0;
    if (insuranceTier === 'Standard') insuranceRatePerDay = 18;
    if (insuranceTier === 'Premium') insuranceRatePerDay = 32;
    const insuranceFee = insuranceRatePerDay * totalDays;

    // Extras rates ($15 per extra per day)
    const extrasFee = extras.length * 15 * totalDays;

    // Tax (10%)
    const subtotal = basePrice + insuranceFee + extrasFee;
    const taxFee = Number((subtotal * 0.10).toFixed(2));
    const totalAmount = Number((subtotal + taxFee).toFixed(2));

    const bookingNumber = `VD-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingNumber,
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      carId: car.id,
      car: car,
      startDate,
      endDate,
      totalDays,
      pricePerDay: car.pricePerDay,
      insuranceFee,
      extrasFee,
      taxFee,
      totalAmount,
      status: 'CONFIRMED',
      pickupLocation: pickupLocation || car.location,
      dropoffLocation: dropoffLocation || pickupLocation || car.location,
      insuranceTier,
      extras,
      createdAt: new Date().toISOString()
    };

    bookingsStore.unshift(newBooking);

    return res.status(201).json({
      success: true,
      message: 'Reservation confirmed successfully!',
      data: newBooking
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to complete reservation.' });
  }
};

export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const userBookings = bookingsStore.filter((b) => b.userId === req.user?.id);

    return res.status(200).json({
      success: true,
      count: userBookings.length,
      data: userBookings
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve your bookings.' });
  }
};

export const getAllBookings = async (req: AuthRequest, res: Response) => {
  try {
    // Admin only
    const totalRevenue = bookingsStore
      .filter((b) => b.status !== 'CANCELLED')
      .reduce((sum, b) => sum + b.totalAmount, 0);

    const activeRentals = bookingsStore.filter((b) => b.status === 'ACTIVE' || b.status === 'CONFIRMED').length;
    const totalCars = carsStore.length;
    const fleetUtilization = totalCars > 0 ? Math.round((activeRentals / totalCars) * 100) : 0;

    return res.status(200).json({
      success: true,
      count: bookingsStore.length,
      stats: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalCars,
        activeRentals,
        totalBookings: bookingsStore.length,
        fleetUtilization
      },
      data: bookingsStore
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch admin bookings.' });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const booking = bookingsStore.find((b) => b.id === id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reservation not found.' });
    }

    // Check ownership or admin
    if (booking.userId !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Unauthorized to cancel this reservation.' });
    }

    booking.status = 'CANCELLED';

    return res.status(200).json({
      success: true,
      message: 'Reservation cancelled successfully.',
      data: booking
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to cancel reservation.' });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = bookingsStore.find((b) => b.id === id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    booking.status = status as BookingStatus;

    return res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}.`,
      data: booking
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update booking status.' });
  }
};

