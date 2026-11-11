'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CarFilters } from '../components/CarFilters';
import { CarCard } from '../components/CarCard';
import { CarDetailsModal } from '../components/CarDetailsModal';
import { BookingModal } from '../components/BookingModal';
import { UserDashboard } from '../components/UserDashboard';
import { AdminDashboard } from '../components/AdminDashboard';
import { AuthModal } from '../components/AuthModal';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Footer } from '../components/Footer';
import { Car, Booking, User, Role, FilterState, AdminStats } from '../types';
import { INITIAL_CARS } from '../data/cars';
import { bookingsStore } from '../server/data/store';

const initialFilters: FilterState = {
  searchQuery: '',
  category: 'All',
  maxPrice: 500,
  transmission: 'ALL',
  fuelType: 'ALL',
  seats: 0,
  sortBy: 'recommended'
};

export default function Home() {
  // Current user state (defaulted to logged-out visitor so reviewer can test Sign In flow)
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [activeView, setActiveView] = useState<'home' | 'my-bookings' | 'admin-dashboard'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [bookings, setBookings] = useState<Booking[]>(bookingsStore);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Modals
  const [detailsCar, setDetailsCar] = useState<Car | null>(null);
  const [bookingCar, setBookingCar] = useState<Car | null>(null);

  // Admin KPIs
  const stats: AdminStats = useMemo(() => {
    const activeRentals = bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'ACTIVE').length;
    const totalRev = bookings
      .filter((b) => b.status !== 'CANCELLED')
      .reduce((sum, b) => sum + b.totalAmount, 0);
    const utilization = cars.length > 0 ? Math.round((activeRentals / cars.length) * 100) : 0;

    return {
      totalRevenue: Number(totalRev.toFixed(2)),
      totalCars: cars.length,
      activeRentals,
      totalBookings: bookings.length,
      fleetUtilization: utilization
    };
  }, [bookings, cars]);

  // Live fleet filtering
  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Category
    if (filters.category !== 'All') {
      result = result.filter((c) => c.category.toLowerCase() === filters.category.toLowerCase());
    }

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.make.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          `${c.make} ${c.model}`.toLowerCase().includes(q)
      );
    }

    // Price
    result = result.filter((c) => c.pricePerDay <= filters.maxPrice);

    // Transmission
    if (filters.transmission !== 'ALL') {
      result = result.filter((c) => c.transmission === filters.transmission);
    }

    // Fuel Type
    if (filters.fuelType !== 'ALL') {
      result = result.filter((c) => c.fuelType === filters.fuelType);
    }

    // Sorting
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [cars, filters]);

  // Search from Hero widget
  const handleHeroSearch = (params: { location: string; category: string; startDate: string; endDate: string }) => {
    setFilters((prev) => ({
      ...prev,
      category: params.category || 'All',
      searchQuery: params.location ? params.location.split(',')[0] : ''
    }));
  };

  // Demo Role Switcher
  const handleSwitchRole = (newRole: Role) => {
    if (newRole === 'ADMIN') {
      setCurrentUser({
        id: 'user-admin',
        email: 'admin@velocitydrive.com',
        name: 'David Makinde',
        role: 'ADMIN',
        createdAt: new Date().toISOString()
      });
      setActiveView('admin-dashboard');
    } else {
      setCurrentUser({
        id: 'user-customer',
        email: 'customer@velocitydrive.com',
        name: 'Alex Rivera',
        role: 'CUSTOMER',
        createdAt: new Date().toISOString()
      });
      setActiveView('home');
    }
  };

  // Booking confirmed handler
  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Cancel reservation
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
    );
  };

  // Admin Fleet Actions
  const handleAddCar = (newCarData: Partial<Car>) => {
    const createdCar: Car = {
      id: `car-${Date.now()}`,
      make: newCarData.make || 'Custom',
      model: newCarData.model || 'GT',
      year: newCarData.year || 2024,
      category: newCarData.category || 'Sports',
      pricePerDay: newCarData.pricePerDay || 300,
      status: 'AVAILABLE',
      transmission: 'AUTOMATIC',
      fuelType: newCarData.fuelType || 'PETROL',
      seats: newCarData.seats || 4,
      horsepower: newCarData.horsepower || 450,
      acceleration: newCarData.acceleration || '3.8s (0-60)',
      mileageLimit: 'Unlimited',
      rating: 5.0,
      reviewCount: 0,
      imageUrl: newCarData.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      images: [newCarData.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
      features: ['Apple CarPlay', 'Leather Interior', 'Sport Mode'],
      description: newCarData.description || 'Pristine luxury vehicle.',
      location: 'Beverly Hills, CA'
    };
    setCars((prev) => [createdCar, ...prev]);
  };

  const handleDeleteCar = (carId: string) => {
    setCars((prev) => prev.filter((c) => c.id !== carId));
  };

  const handleUpdateCarStatus = (carId: string, status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE') => {
    setCars((prev) =>
      prev.map((c) => (c.id === carId ? { ...c, status } : c))
    );
  };

  const handleUpdateBookingStatus = (bookingId: string, status: any) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  return (
    <div className="min-h-screen bg-obsidian-900 text-white flex flex-col justify-between">
      
      {/* Navbar */}
      <Navbar
        currentUser={currentUser}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          setCurrentUser(null);
          setActiveView('home');
        }}
        onSwitchRole={handleSwitchRole}
      />

      {/* Main View Router */}
      <main className="grow">
        {activeView === 'home' && (
          <>
            {/* Hero Section */}
            <Hero onSearch={handleHeroSearch} />

            {/* Fleet Catalog Section */}
            <section id="fleet-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              
              <div className="mb-10 text-center sm:text-left">
                <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-2">
                  DISCOVER THE COLLECTION
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  High-Performance Fleet
                </h2>
                <p className="text-sm text-zinc-400 mt-2 font-mono">
                  Select your vehicle for instantaneous booking and concierge doorstep handover
                </p>
              </div>

              {/* Filters */}
              <CarFilters
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(initialFilters)}
                totalCount={filteredCars.length}
              />

              {/* Car Cards Grid */}
              {filteredCars.length === 0 ? (
                <div className="bg-obsidian-850 border border-white/10 rounded-3xl p-16 text-center max-w-lg mx-auto">
                  <h3 className="text-lg font-bold text-white mb-2">No Vehicles Match Criteria</h3>
                  <p className="text-xs text-zinc-400 mb-6">
                    Try loosening your price filters or search terms to see available vehicles.
                  </p>
                  <button
                    onClick={() => setFilters(initialFilters)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 text-obsidian-900 font-bold text-xs uppercase"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      onSelect={(c) => setDetailsCar(c)}
                      onBookNow={(c) => setBookingCar(c)}
                    />
                  ))}
                </div>
              )}

            </section>

            {/* Why Choose Us */}
            <WhyChooseUs />
          </>
        )}

        {/* User Bookings View */}
        {activeView === 'my-bookings' && (
          <UserDashboard
            onBackToFleet={() => setActiveView('home')}
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
          />
        )}

        {/* Admin Command Center View */}
        {activeView === 'admin-dashboard' && (
          <AdminDashboard
            cars={cars}
            bookings={bookings}
            stats={stats}
            onBackToFleet={() => setActiveView('home')}
            onAddCar={handleAddCar}
            onDeleteCar={handleDeleteCar}
            onUpdateCarStatus={handleUpdateCarStatus}
            onUpdateBookingStatus={handleUpdateBookingStatus}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Car Details Modal */}
      <CarDetailsModal
        car={detailsCar}
        onClose={() => setDetailsCar(null)}
        onBookNow={(c) => {
          setDetailsCar(null);
          setBookingCar(c);
        }}
      />

      {/* Booking Modal */}
      <BookingModal
        car={bookingCar}
        onClose={() => setBookingCar(null)}
        onSuccess={handleBookingConfirmed}
        userEmail={currentUser?.email}
        userName={currentUser?.name}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'ADMIN') {
            setActiveView('admin-dashboard');
          }
        }}
      />

    </div>
  );
}

