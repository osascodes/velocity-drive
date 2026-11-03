import React from 'react';
import { Star, Zap, Gauge, Users, Cog, MapPin, ArrowUpRight } from 'lucide-react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
  onBookNow: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onSelect, onBookNow }) => {
  return (
    <div className="group bg-obsidian-850 border border-white/10 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 flex flex-col justify-between">
      
      {/* Image & Badges */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-900">
          <img
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-transparent to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase font-bold tracking-wider bg-obsidian-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
              {car.category}
            </span>
            {car.fuelType === 'ELECTRIC' && (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase font-bold tracking-wider bg-blue-500/20 backdrop-blur-md text-blue-400 border border-blue-500/30 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                EV
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-obsidian-900/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-white flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{car.rating}</span>
            <span className="text-zinc-400 text-[10px]">({car.reviewCount})</span>
          </div>

          {/* Location watermark */}
          <div className="absolute bottom-3 left-3 text-xs text-zinc-300 flex items-center gap-1 font-medium drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{car.location}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          
          {/* Title */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              {car.make} {car.model}
            </h3>
            <span className="text-xs text-zinc-400 font-mono">{car.year} Edition</span>
          </div>

          {/* Performance Specs Grid */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-obsidian-800/60 rounded-xl border border-white/5 mb-5 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              <span>{car.horsepower} HP</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>{car.acceleration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cog className="w-3.5 h-3.5 text-emerald-400" />
              <span className="capitalize">{car.transmission.toLowerCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>{car.seats} Seats</span>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Pricing & CTA */}
      <div className="p-5 pt-0 border-t border-white/5 mt-auto">
        <div className="flex items-center justify-between mb-4 pt-4">
          <div>
            <span className="text-xs text-zinc-400 block font-mono">Daily Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">${car.pricePerDay}</span>
              <span className="text-xs text-zinc-400 font-mono">/ day</span>
            </div>
          </div>
          <button
            onClick={() => onSelect(car)}
            className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 flex items-center gap-1 transition-colors"
          >
            <span>Specs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onBookNow(car)}
          disabled={car.status !== 'AVAILABLE'}
          className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md ${
            car.status === 'AVAILABLE'
              ? 'bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 shadow-emerald-500/20 active:scale-95'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
          }`}
        >
          {car.status === 'AVAILABLE' ? 'Instant Book' : 'Currently Rented'}
        </button>
      </div>

    </div>
  );
};

