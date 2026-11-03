import React, { useState } from 'react';
import { X, Star, Gauge, Zap, Cog, Users, CheckCircle2, MapPin, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { Car } from '../types';

interface CarDetailsModalProps {
  car: Car | null;
  onClose: () => void;
  onBookNow: (car: Car) => void;
}

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, onClose, onBookNow }) => {
  if (!car) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = car.images && car.images.length > 0 ? car.images : [car.imageUrl];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-obsidian-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-obsidian-900/80 text-zinc-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 p-6 bg-obsidian-850 flex flex-col justify-between">
            <div>
              {/* Main Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-obsidian-900 border border-white/10 mb-4">
                <img
                  src={images[activeImageIndex]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-obsidian-900/80 backdrop-blur-md text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  {car.category}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx ? 'border-emerald-500 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-xs uppercase font-mono text-zinc-400 mb-2 tracking-wider">Overview</h4>
              <p className="text-sm text-zinc-300 leading-relaxed">{car.description}</p>
            </div>
          </div>

          {/* Right Column: Specs, Features & Booking CTA */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Title & Rating */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-white">{car.rating}</span>
                  <span className="text-xs text-zinc-400">({car.reviewCount} customer reviews)</span>
                </div>
                <h2 className="text-2xl font-black text-white">{car.make} {car.model}</h2>
                <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Available at {car.location}</span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-obsidian-800 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Power</span>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-emerald-400" />
                    {car.horsepower} HP
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-obsidian-800 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">0-60 MPH</span>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    {car.acceleration}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-obsidian-800 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Transmission</span>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5 capitalize">
                    <Cog className="w-4 h-4 text-emerald-400" />
                    {car.transmission.toLowerCase()}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-obsidian-800 border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Capacity</span>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-400" />
                    {car.seats} Passengers
                  </div>
                </div>
              </div>

              {/* Included Amenities */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-mono text-zinc-400 mb-3 tracking-wider">Features Included</h4>
                <div className="space-y-2">
                  {car.features.map((feat, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing & Proceed to Book */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs font-mono uppercase text-zinc-400">Total Per Day</span>
                <div>
                  <span className="text-3xl font-black text-white">${car.pricePerDay}</span>
                  <span className="text-xs text-zinc-400 font-mono"> / day</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onBookNow(car);
                }}
                disabled={car.status !== 'AVAILABLE'}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Reserve This Vehicle</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

