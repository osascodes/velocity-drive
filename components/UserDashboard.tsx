import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Shield, AlertTriangle, ArrowLeft, RefreshCw, XCircle } from 'lucide-react';
import { Booking, BookingStatus } from '../types';
import { api } from '../lib/api';

interface UserDashboardProps {
  onBackToFleet: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onBackToFleet,
  bookings,
  onCancelBooking
}) => {
  const [filter, setFilter] = useState<'ALL' | BookingStatus>('ALL');

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'ALL') return true;
    return b.status === filter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <button
            onClick={onBackToFleet}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-emerald-300 mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Fleet
          </button>
          <h1 className="text-3xl font-black text-white">My Reservations</h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">Manage your active and upcoming vehicle rentals</p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto bg-obsidian-850 p-1.5 rounded-xl border border-white/10 text-xs">
          {(['ALL', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === status
                  ? 'bg-emerald-500 text-obsidian-900 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-obsidian-850 border border-white/10 rounded-3xl p-12 text-center max-w-lg mx-auto">
          <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Bookings Found</h3>
          <p className="text-xs text-zinc-400 mb-6">You don't have any reservations matching this status filter.</p>
          <button
            onClick={onBackToFleet}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Explore Available Cars
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-obsidian-850 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/20 transition-all"
            >
              {/* Car Info & Image */}
              <div className="flex items-center gap-4">
                {b.car?.imageUrl && (
                  <img
                    src={b.car.imageUrl}
                    alt={b.car.model}
                    className="w-24 h-16 rounded-xl object-cover bg-obsidian-900 border border-white/10 shrink-0"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {b.bookingNumber}
                    </span>
                    <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                      b.status === 'CONFIRMED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      b.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {b.car ? `${b.car.make} ${b.car.model}` : 'Reserved Vehicle'}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {b.startDate} → {b.endDate} ({b.totalDays} days)
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {b.pickupLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Total Charged</span>
                  <span className="text-xl font-black text-white">${b.totalAmount}</span>
                </div>

                {b.status === 'CONFIRMED' && (
                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

