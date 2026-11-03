import React, { useState } from 'react';
import { MapPin, Calendar, Search, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface HeroProps {
  onSearch: (params: { location: string; category: string; startDate: string; endDate: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('Beverly Hills, CA');
  const [category, setCategory] = useState('All');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, category, startDate, endDate });
    const fleetSection = document.getElementById('fleet-catalog');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden pt-12 pb-24">
      
      {/* Background with Ambient Glows */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Car Hero"
          className="w-full h-full object-cover object-center filter brightness-[0.25] scale-105 transform motion-safe:animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/60 to-transparent" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-semibold">
            PREMIER EXOTIC & ELECTRIC FLEET
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Drive the Extraordinary. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent">
            Uncompromised Freedom.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          From silent electric hyper-acceleration to handcrafted twin-turbo thunder. Experience instant reservations, zero hidden fees, and white-glove doorstep delivery.
        </p>

        {/* Quick Booking Search Engine Widget */}
        <div className="w-full max-w-4xl mx-auto bg-obsidian-850/90 border border-white/15 rounded-2xl p-4 sm:p-6 backdrop-blur-2xl shadow-2xl shadow-black/80">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pick-up Location */}
            <div className="text-left bg-obsidian-800/80 border border-white/10 rounded-xl p-3 focus-within:border-emerald-500 transition-colors">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Pick-up Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-white font-medium text-sm focus:outline-none cursor-pointer"
              >
                <option value="Beverly Hills, CA" className="bg-obsidian-900">Beverly Hills, CA</option>
                <option value="San Francisco, CA" className="bg-obsidian-900">San Francisco, CA</option>
                <option value="Miami, FL" className="bg-obsidian-900">Miami, FL</option>
                <option value="New York, NY" className="bg-obsidian-900">New York, NY</option>
                <option value="Las Vegas, NV" className="bg-obsidian-900">Las Vegas, NV</option>
              </select>
            </div>

            {/* Pick-up Date */}
            <div className="text-left bg-obsidian-800/80 border border-white/10 rounded-xl p-3 focus-within:border-emerald-500 transition-colors">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Pick-up Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-transparent text-white font-medium text-sm focus:outline-none"
              />
            </div>

            {/* Return Date */}
            <div className="text-left bg-obsidian-800/80 border border-white/10 rounded-xl p-3 focus-within:border-emerald-500 transition-colors">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Return Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-transparent text-white font-medium text-sm focus:outline-none"
              />
            </div>

            {/* Vehicle Category & Submit Button */}
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="w-full h-[54px] rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-obsidian-900 font-extrabold text-sm tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <Search className="w-4 h-4 text-obsidian-900" />
                <span>Search Fleet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </form>

          {/* Quick Perks Bar */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-zinc-400 px-2 gap-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Comprehensive Insurance Included
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              Instant Booking Confirmation
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Free Cancellation up to 24 hrs
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

