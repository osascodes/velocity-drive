export type Role = 'CUSTOMER' | 'ADMIN';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export type CarStatus = 'AVAILABLE' | 'RENTED' | 'MAINTENANCE';

export type FuelType = 'PETROL' | 'DIESEL' | 'HYBRID' | 'ELECTRIC' | 'ALL';

export type Transmission = 'AUTOMATIC' | 'MANUAL' | 'ALL';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  password?: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  pricePerDay: number;
  status: CarStatus | string;
  transmission: 'AUTOMATIC' | 'MANUAL' | string;
  fuelType: 'PETROL' | 'DIESEL' | 'HYBRID' | 'ELECTRIC' | string;
  seats: number;
  horsepower: number;
  acceleration: string;
  mileageLimit: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  images?: string[];
  features: string[];
  description: string;
  location: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  carId: string;
  car?: Car;
  startDate: string;
  endDate: string;
  totalDays: number;
  pricePerDay: number;
  insuranceFee: number;
  extrasFee: number;
  taxFee: number;
  totalAmount: number;
  status: BookingStatus | string;
  pickupLocation: string;
  dropoffLocation: string;
  insuranceTier: string;
  extras: string[];
  createdAt?: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  maxPrice: number;
  transmission: 'AUTOMATIC' | 'MANUAL' | 'ALL' | string;
  fuelType: 'PETROL' | 'DIESEL' | 'HYBRID' | 'ELECTRIC' | 'ALL' | string;
  seats?: number;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'recommended' | string;
}

export interface AdminStats {
  totalRevenue: number;
  totalCars: number;
  activeRentals: number;
  totalBookings: number;
  fleetUtilization: number;
}

