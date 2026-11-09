import React, { useState } from 'react';
import { X, Star, Gauge, Zap, Cog, Users, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-obsidian-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black z-10 my-auto max-h-[92vh] flex flex-col">
        
        {/* Floating Close Button - Always visible & prominent on mobile & desktop */}
        <button
          onClick={onClose}
          aria-label="Close details modal"
          className="absolute top-3.5 right-3.5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-obsidian-900/90 hover:bg-white/20 text-zinc-200 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all shadow-lg active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Viewport */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Image Gallery & Description */}
            <div className="lg:col-span-7 p-4 sm:p-6 bg-obsidian-850 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              <div>
                {/* Main Vehicle Image */}
                <div className="relative aspect-[16/10] max-h-56 sm:max-h-80 w-full rounded-2xl overflow-hidden bg-obsidian-900 border border-white/10 mb-3">
                  <img
                    src={images[activeImageIndex]}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-obsidian-900/85 backdrop-blur-md text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                    {car.category}
                  </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-11 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          activeImageIndex === idx ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-4 pt-4 sm:mt-6 sm:pt-6 border-t border-white/10">
                <h4 className="text-xs uppercase font-mono text-zinc-400 mb-1.5 tracking-wider">Overview</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{car.description}</p>
              </div>
            </div>

            {/* Right Column: Specs, Features & Booking CTA */}
            <div className="lg:col-span-5 p-4 sm:p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Title & Rating */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-white">{car.rating}</span>
                    <span className="text-xs text-zinc-400">({car.reviewCount} customer reviews)</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{car.make} {car.model}</h2>
                  <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Available at {car.location}</span>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-obsidian-800 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">Horsepower</span>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{car.horsepower} HP</span>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-obsidian-800 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">0-60 MPH</span>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{car.acceleration}</span>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-obsidian-800 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">Transmission</span>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 capitalize">
                      <Cog className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{car.transmission.toLowerCase()}</span>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-obsidian-800 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-0.5">Capacity</span>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{car.seats} Passengers</span>
                    </div>
                  </div>
                </div>

                {/* Included Amenities */}
                <div className="mb-5">
                  <h4 className="text-xs uppercase font-mono text-zinc-400 mb-2.5 tracking-wider">Features Included</h4>
                  <div className="space-y-1.5">
                    {car.features.map((feat, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Proceed to Book */}
              <div className="pt-4 border-t border-white/10 mt-auto">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-zinc-400">Total Per Day</span>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-white">${car.pricePerDay}</span>
                    <span className="text-xs text-zinc-400 font-mono"> / day</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onBookNow(car);
                  }}
                  disabled={car.status !== 'AVAILABLE'}
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Reserve This Vehicle</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
