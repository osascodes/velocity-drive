import React from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { FilterState } from '../types';

interface CarFiltersProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalCount: number;
}

const CATEGORIES = ['All', 'Sports', 'Luxury', 'Electric', 'SUV', 'Sedan'];

export const CarFilters: React.FC<CarFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalCount
}) => {
  return (
    <div className="bg-obsidian-850/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl mb-10 shadow-xl shadow-black/40">
      
      {/* Top row: Search bar & Sort selector */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search by make or model (e.g., Porsche, Tesla, AMG)..."
            className="w-full bg-obsidian-800 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Counter & Sort By */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs font-mono text-zinc-400">
            SHOWING <strong className="text-emerald-400 font-semibold">{totalCount}</strong> VEHICLES
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono uppercase">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
              className="bg-obsidian-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/10 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange({ ...filters, category: cat })}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              filters.category === cat
                ? 'bg-emerald-500 text-obsidian-900 shadow-md shadow-emerald-500/20'
                : 'bg-obsidian-800 text-zinc-300 hover:bg-obsidian-700 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sub-Filters: Price Slider, Transmission, Fuel Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        
        {/* Price Range */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono uppercase text-zinc-400">Max Daily Rate:</span>
            <span className="text-xs font-bold text-emerald-400">${filters.maxPrice}/day</span>
          </div>
          <input
            type="range"
            min="100"
            max="500"
            step="20"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-emerald-500 bg-obsidian-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Transmission */}
        <div>
          <label className="text-xs font-mono uppercase text-zinc-400 block mb-2">Transmission:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChange({ ...filters, transmission: filters.transmission === 'AUTOMATIC' ? 'ALL' : 'AUTOMATIC' })}
              className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                filters.transmission === 'AUTOMATIC'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-white/10 bg-obsidian-800 text-zinc-400 hover:text-white'
              }`}
            >
              Automatic
            </button>
            <button
              onClick={() => onChange({ ...filters, transmission: filters.transmission === 'MANUAL' ? 'ALL' : 'MANUAL' })}
              className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                filters.transmission === 'MANUAL'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-white/10 bg-obsidian-800 text-zinc-400 hover:text-white'
              }`}
            >
              Manual
            </button>
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="text-xs font-mono uppercase text-zinc-400 block mb-2">Fuel Type:</label>
          <select
            value={filters.fuelType}
            onChange={(e) => onChange({ ...filters, fuelType: e.target.value })}
            className="w-full bg-obsidian-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Fuel Types</option>
            <option value="ELECTRIC">Electric Only</option>
            <option value="HYBRID">Hybrid</option>
            <option value="PETROL">Petrol / Gas</option>
          </select>
        </div>

        {/* Reset Filter Action */}
        <div className="flex justify-end">
          <button
            onClick={onReset}
            className="w-full py-2 px-4 rounded-xl border border-white/10 hover:border-red-400/50 bg-obsidian-800 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 text-xs font-medium flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>

      </div>

    </div>
  );
};

