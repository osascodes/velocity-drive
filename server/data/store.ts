import { Car, Booking, User } from '../../types';
import { INITIAL_CARS } from '../../data/cars';

// Pre-seeded Demo Users
export const usersStore: (User & { passwordHash?: string })[] = [
  {
    id: 'user-admin',
    email: 'admin@velocitydrive.com',
    name: 'David Makinde (Admin)',
    role: 'ADMIN',
    phone: '+1 (555) 019-2834',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-customer',
    email: 'customer@velocitydrive.com',
    name: 'Alex Rivera',
    role: 'CUSTOMER',
    phone: '+1 (555) 839-4021',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    createdAt: new Date().toISOString()
  }
];

// In-Memory Cars Store initialized from high quality seed
export let carsStore: Car[] = [...INITIAL_CARS];

// In-Memory Bookings Store with initial active/upcoming demo reservations
export let bookingsStore: Booking[] = [
  {
    id: 'book-101',
    bookingNumber: 'VD-9102-K',
    userId: 'user-customer',
    userName: 'Alex Rivera',
    userEmail: 'customer@velocitydrive.com',
    carId: 'car-1',
    car: INITIAL_CARS[0],
    startDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    totalDays: 3,
    pricePerDay: 320,
    insuranceFee: 96,
    extrasFee: 30,
    taxFee: 108.6,
    totalAmount: 1194.6,
    status: 'CONFIRMED',
    pickupLocation: 'Beverly Hills Showroom',
    dropoffLocation: 'Beverly Hills Showroom',
    insuranceTier: 'Premium',
    extras: ['Additional Driver', 'Full GPS'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'book-102',
    bookingNumber: 'VD-4821-M',
    userId: 'user-customer',
    userName: 'Alex Rivera',
    userEmail: 'customer@velocitydrive.com',
    carId: 'car-2',
    car: INITIAL_CARS[1],
    startDate: new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
    totalDays: 3,
    pricePerDay: 240,
    insuranceFee: 54,
    extrasFee: 0,
    taxFee: 77.4,
    totalAmount: 851.4,
    status: 'COMPLETED',
    pickupLocation: 'San Francisco International Airport (SFO)',
    dropoffLocation: 'San Francisco International Airport (SFO)',
    insuranceTier: 'Standard',
    extras: [],
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
  }
];

// Helper methods
export const findUserByEmail = (email: string) => {
  return usersStore.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id: string) => {
  return usersStore.find((u) => u.id === id);
};

export const addUser = (user: User & { passwordHash?: string }) => {
  usersStore.push(user);
  return user;
};

export const checkCarAvailability = (carId: string, startDateStr: string, endDateStr: string, excludeBookingId?: string): boolean => {
  const reqStart = new Date(startDateStr).getTime();
  const reqEnd = new Date(endDateStr).getTime();

  // Find overlapping bookings for this car that are CONFIRMED or ACTIVE
  const conflict = bookingsStore.find((b) => {
    if (b.carId !== carId) return false;
    if (excludeBookingId && b.id === excludeBookingId) return false;
    if (b.status === 'CANCELLED' || b.status === 'COMPLETED') return false;

    const bStart = new Date(b.startDate).getTime();
    const bEnd = new Date(b.endDate).getTime();

    // Overlap condition: start of requested is before end of existing AND end of requested is after start of existing
    return reqStart < bEnd && reqEnd > bStart;
  });

  return !conflict;
};

