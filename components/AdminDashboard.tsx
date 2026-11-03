import React, { useState } from 'react';
import { Shield, Plus, DollarSign, Car as CarIcon, CheckCircle2, XCircle, Trash2, ArrowLeft, TrendingUp, AlertCircle } from 'lucide-react';
import { Car, Booking, AdminStats } from '../types';

interface AdminDashboardProps {
  cars: Car[];
  bookings: Booking[];
  stats: AdminStats;
  onBackToFleet: () => void;
  onAddCar: (newCar: Partial<Car>) => void;
  onDeleteCar: (carId: string) => void;
  onUpdateCarStatus: (carId: string, status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE') => void;
  onUpdateBookingStatus: (bookingId: string, status: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cars,
  bookings,
  stats,
  onBackToFleet,
  onAddCar,
  onDeleteCar,
  onUpdateCarStatus,
  onUpdateBookingStatus
}) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'bookings'>('fleet');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for new car
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2024);
  const [category, setCategory] = useState('Sports');
  const [pricePerDay, setPricePerDay] = useState(290);
  const [horsepower, setHorsepower] = useState(450);
  const [acceleration, setAcceleration] = useState('3.8s (0-60)');
  const [seats, setSeats] = useState(4);
  const [fuelType, setFuelType] = useState<'PETROL' | 'ELECTRIC' | 'HYBRID'>('PETROL');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCar({
      make,
      model,
      year: Number(year),
      category,
      pricePerDay: Number(pricePerDay),
      horsepower: Number(horsepower),
      acceleration,
      seats: Number(seats),
      fuelType,
      imageUrl,
      status: 'AVAILABLE',
      features: ['Apple CarPlay', 'Leather Interior', 'Sport Mode'],
      description: `Pristine ${year} ${make} ${model} ready for discerning drivers.`
    });
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <button
            onClick={onBackToFleet}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-emerald-300 mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Public View
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white">Admin Command Center</h1>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-bold bg-amber-400/20 text-amber-400 border border-amber-400/30">
              OPERATIONS
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle to Fleet
        </button>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-obsidian-850 border border-white/10 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono uppercase text-zinc-400">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white">${stats.totalRevenue.toLocaleString()}</span>
          <span className="text-[10px] font-mono text-emerald-400 block mt-1">+18.4% from last month</span>
        </div>

        <div className="bg-obsidian-850 border border-white/10 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono uppercase text-zinc-400">Fleet Utilization</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white">{stats.fleetUtilization}%</span>
          <span className="text-[10px] font-mono text-zinc-400 block mt-1">Optimal target: 70%+</span>
        </div>

        <div className="bg-obsidian-850 border border-white/10 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono uppercase text-zinc-400">Total Fleet</span>
            <CarIcon className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white">{cars.length} Cars</span>
          <span className="text-[10px] font-mono text-zinc-400 block mt-1">Across 5 metro hubs</span>
        </div>

        <div className="bg-obsidian-850 border border-white/10 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono uppercase text-zinc-400">Total Bookings</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white">{bookings.length}</span>
          <span className="text-[10px] font-mono text-emerald-400 block mt-1">98.2% customer approval</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 mb-8">
        <button
          onClick={() => setActiveTab('fleet')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'fleet' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          Fleet Management ({cars.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'bookings' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          Master Reservations ({bookings.length})
        </button>
      </div>

      {/* Tab 1: Fleet Management */}
      {activeTab === 'fleet' && (
        <div className="bg-obsidian-850 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-800 text-zinc-400 font-mono uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Rate / Day</th>
                  <th className="p-4">Specs</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={car.imageUrl} alt="" className="w-14 h-10 object-cover rounded-lg bg-obsidian-900 border border-white/10" />
                      <div>
                        <span className="font-bold text-white block">{car.make} {car.model}</span>
                        <span className="text-zinc-500 font-mono text-[10px]">{car.year} • {car.location}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 font-mono text-zinc-300 border border-white/10">
                        {car.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-white">${car.pricePerDay}</td>
                    <td className="p-4 text-zinc-400 font-mono text-[11px]">
                      {car.horsepower} HP • {car.acceleration}
                    </td>
                    <td className="p-4">
                      <select
                        value={car.status}
                        onChange={(e) => onUpdateCarStatus(car.id, e.target.value as any)}
                        className={`px-2 py-1 rounded text-[11px] font-mono font-bold border cursor-pointer focus:outline-none ${
                          car.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          car.status === 'RENTED' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        <option value="AVAILABLE" className="bg-obsidian-900">AVAILABLE</option>
                        <option value="RENTED" className="bg-obsidian-900">RENTED</option>
                        <option value="MAINTENANCE" className="bg-obsidian-900">MAINTENANCE</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onDeleteCar(car.id)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Car"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Master Bookings */}
      {activeTab === 'bookings' && (
        <div className="bg-obsidian-850 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-800 text-zinc-400 font-mono uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Total Paid</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono font-bold text-emerald-400">{b.bookingNumber}</td>
                    <td className="p-4">
                      <span className="font-semibold text-white block">{b.userName || 'Customer'}</span>
                      <span className="text-zinc-500 text-[10px]">{b.userEmail || 'customer@velocitydrive.com'}</span>
                    </td>
                    <td className="p-4 text-white font-medium">{b.car?.make} {b.car?.model}</td>
                    <td className="p-4 text-zinc-400">
                      {b.startDate} → {b.endDate} ({b.totalDays}d)
                    </td>
                    <td className="p-4 font-bold text-white">${b.totalAmount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        b.status === 'CONFIRMED' ? 'bg-blue-500/20 text-blue-400' :
                        b.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onUpdateBookingStatus(b.id, 'COMPLETED')}
                          className="px-2 py-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded text-[10px] font-mono font-semibold"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => onUpdateBookingStatus(b.id, 'CANCELLED')}
                          className="px-2 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded text-[10px] font-mono font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Car Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowAddModal(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-xl bg-obsidian-900 border border-white/15 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Add New Vehicle to Fleet</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Make</label>
                  <input
                    type="text"
                    required
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    placeholder="e.g. Porsche, Ferrari"
                    className="w-full bg-obsidian-800 border border-white/10 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Model</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. Taycan Turbo S"
                    className="w-full bg-obsidian-800 border border-white/10 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-obsidian-800 border border-white/10 rounded-xl p-2.5 text-white"
                  >
                    <option value="Sports">Sports</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Electric">Electric</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Daily Rate ($)</label>
                  <input
                    type="number"
                    required
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(Number(e.target.value))}
                    className="w-full bg-obsidian-800 border border-white/10 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Horsepower</label>
                  <input
                    type="number"
                    value={horsepower}
                    onChange={(e) => setHorsepower(Number(e.target.value))}
                    className="w-full bg-obsidian-800 border border-white/10 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Image URL (Unsplash)</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-obsidian-800 border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-bold"
                >
                  Add Car
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

