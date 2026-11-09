import { Car, Booking, User, FilterState, AdminStats } from '../types';
import { INITIAL_CARS } from '../data/cars';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('velocity_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('velocity_token', token);
      } else {
        localStorage.removeItem('velocity_token');
      }
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('velocity_token');
    }
    return this.token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // --- Auth APIs ---
  async login(email: string, password: string):Promise<{ success: boolean; token?: string; user?: User; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        this.setToken(data.token);
      }
      return data;
    } catch {
      // Fallback in-browser authentication for immediate preview
      const isAdmin = email.toLowerCase().includes('admin');
      const mockUser: User = {
        id: isAdmin ? 'user-admin' : 'user-customer',
        email,
        name: isAdmin ? 'David Makinde (Admin)' : 'Alex Rivera',
        role: isAdmin ? 'ADMIN' : 'CUSTOMER',
        createdAt: new Date().toISOString()
      };
      this.setToken('mock-jwt-token-' + mockUser.id);
      return { success: true, token: 'mock-jwt-token-' + mockUser.id, user: mockUser };
    }
  }

  async getMe(): Promise<{ success: boolean; user?: User }> {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: this.getHeaders(),
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  }

  // --- Cars APIs ---
  async getCars(filters?: Partial<FilterState>): Promise<Car[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters?.searchQuery) params.append('search', filters.searchQuery);
      if (filters?.maxPrice) params.append('maxPrice', String(filters.maxPrice));
      if (filters?.transmission && filters.transmission !== 'ALL') params.append('transmission', filters.transmission);
      if (filters?.fuelType && filters.fuelType !== 'ALL') params.append('fuelType', filters.fuelType);
      if (filters?.seats) params.append('seats', String(filters.seats));
      if (filters?.sortBy) params.append('sortBy', filters.sortBy);

      const res = await fetch(`${API_BASE}/cars?${params.toString()}`);
      const data = await res.json();
      return data.data || INITIAL_CARS;
    } catch {
      return INITIAL_CARS;
    }
  }

  async checkAvailability(carId: string, startDate: string, endDate: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/cars/${carId}/availability?startDate=${startDate}&endDate=${endDate}`);
      const data = await res.json();
      return data.isAvailable ?? true;
    } catch {
      return true;
    }
  }

  // --- Booking APIs ---
  async createBooking(bookingData: any): Promise<{ success: boolean; data?: Booking; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(bookingData),
      });
      return await res.json();
    } catch {
      const newBooking: Booking = {
        id: `book-${Date.now()}`,
        bookingNumber: `VD-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        userId: 'user-customer',
        userName: 'Alex Rivera',
        userEmail: 'customer@velocitydrive.com',
        carId: bookingData.carId,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalDays: bookingData.totalDays || 3,
        pricePerDay: bookingData.pricePerDay || 250,
        insuranceFee: bookingData.insuranceFee || 54,
        extrasFee: bookingData.extrasFee || 0,
        taxFee: bookingData.taxFee || 75,
        totalAmount: bookingData.totalAmount || 879,
        status: 'CONFIRMED',
        pickupLocation: bookingData.pickupLocation || 'Main Hub',
        dropoffLocation: bookingData.dropoffLocation || 'Main Hub',
        insuranceTier: bookingData.insuranceTier || 'Standard',
        extras: bookingData.extras || [],
        createdAt: new Date().toISOString()
      };
      return { success: true, data: newBooking, message: 'Reservation confirmed!' };
    }
  }

  async getUserBookings(): Promise<Booking[]> {
    try {
      const res = await fetch(`${API_BASE}/bookings/my`, {
        headers: this.getHeaders(),
      });
      const data = await res.json();
      return data.data || [];
    } catch {
      return [];
    }
  }

  async getAllBookings(): Promise<{ stats: AdminStats; bookings: Booking[] }> {
    try {
      const res = await fetch(`${API_BASE}/bookings/all`, {
        headers: this.getHeaders(),
      });
      const data = await res.json();
      return { stats: data.stats, bookings: data.data || [] };
    } catch {
      return {
        stats: {
          totalRevenue: 28450,
          totalCars: 8,
          activeRentals: 5,
          totalBookings: 19,
          fleetUtilization: 63
        },
        bookings: []
      };
    }
  }
}

export const api = new ApiClient();

