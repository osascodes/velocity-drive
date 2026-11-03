import React, { useState, useMemo } from 'react';
import { X, Calendar, MapPin, Shield, Check, AlertCircle, Sparkles, CreditCard, ArrowRight } from 'lucide-react';
import { Car, Booking } from '../types';
import { api } from '../lib/api';

interface BookingModalProps {
  car: Car | null;
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
  userEmail?: string;
  userName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  car,
  onClose,
  onSuccess,
  userEmail = 'customer@velocitydrive.com',
  userName = 'Alex Rivera'
}) => {
  if (!car) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const defaultEndStr = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(defaultEndStr);
  const [pickupLocation, setPickupLocation] = useState(car.location || 'Beverly Hills Showroom');
  const [insuranceTier, setInsuranceTier] = useState<'Basic' | 'Standard' | 'Premium'>('Standard');
  const [extras, setExtras] = useState<string[]>(['Additional Driver']);
  const [driverName, setDriverName] = useState(userName);
  const [driverEmail, setDriverEmail] = useState(userEmail);
  const [driverPhone, setDriverPhone] = useState('+1 (555) 234-5678');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Dynamic pricing calculation
  const { totalDays, basePrice, insuranceFee, extrasFee, taxFee, totalAmount } = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const days = isNaN(diffTime) ? 1 : Math.max(1, diffTime);

    const base = car.pricePerDay * days;
    const insuranceRate = insuranceTier === 'Premium' ? 32 : insuranceTier === 'Standard' ? 18 : 0;
    const ins = insuranceRate * days;
    const ext = extras.length * 15 * days;
    const sub = base + ins + ext;
    const tax = Number((sub * 0.10).toFixed(2));
    const total = Number((sub + tax).toFixed(2));

    return {
      totalDays: days,
      basePrice: base,
      insuranceFee: ins,
      extrasFee: ext,
      taxFee: tax,
      totalAmount: total
    };
  }, [startDate, endDate, car.pricePerDay, insuranceTier, extras]);

  const toggleExtra = (item: string) => {
    if (extras.includes(item)) {
      setExtras(extras.filter((e) => e !== item));
    } else {
      setExtras([...extras, item]);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        carId: car.id,
        startDate,
        endDate,
        pickupLocation,
        dropoffLocation: pickupLocation,
        insuranceTier,
        extras,
        totalDays,
        pricePerDay: car.pricePerDay,
        insuranceFee,
        extrasFee,
        taxFee,
        totalAmount
      };

      const res = await api.createBooking(payload);

      if (res.success && res.data) {
        setConfirmedBooking(res.data);
        onSuccess(res.data);
      } else {
        setErrorMessage(res.message || 'Booking conflict or error. Please check dates.');
      }
    } catch (err: any) {
      setErrorMessage('Failed to connect to booking server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-obsidian-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black z-10 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-obsidian-850">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">RESERVATION CHECKOUT</span>
            <h2 className="text-xl font-bold text-white">{car.make} {car.model}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-obsidian-800 text-zinc-400 hover:text-white border border-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: If Booking Confirmed, show Success View */}
        {confirmedBooking ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2">Reservation Confirmed!</h3>
            <p className="text-sm text-zinc-300 max-w-md mx-auto mb-6">
              Your luxury vehicle has been reserved. A confirmation receipt has been dispatched.
            </p>

            <div className="bg-obsidian-850 border border-white/10 rounded-2xl p-5 max-w-md mx-auto text-left mb-6 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400 font-mono">BOOKING REF:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{confirmedBooking.bookingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Vehicle:</span>
                <span className="font-semibold text-white">{car.make} {car.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Dates:</span>
                <span className="text-white">{startDate} → {endDate} ({totalDays} days)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Paid:</span>
                <span className="font-bold text-white">${totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Pick-up Location:</span>
                <span className="text-white">{pickupLocation}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
            >
              Done & View Fleet
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Date Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-obsidian-850 border border-white/10 rounded-xl p-3">
                <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Pick-up Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-transparent text-white font-medium text-sm focus:outline-none"
                  required
                />
              </div>

              <div className="bg-obsidian-850 border border-white/10 rounded-xl p-3">
                <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Return Date
                </label>
                <input
                  type="date"
                  min={startDate || todayStr}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-transparent text-white font-medium text-sm focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="bg-obsidian-850 border border-white/10 rounded-xl p-3">
              <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Pick-up & Return Location
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-transparent text-white font-medium text-sm focus:outline-none cursor-pointer"
              >
                <option value="Beverly Hills Showroom" className="bg-obsidian-900">Beverly Hills Showroom</option>
                <option value="San Francisco Airport Hub" className="bg-obsidian-900">San Francisco Airport Hub</option>
                <option value="Miami South Beach Concierge" className="bg-obsidian-900">Miami South Beach Concierge</option>
                <option value="Manhattan Center" className="bg-obsidian-900">Manhattan Center</option>
              </select>
            </div>

            {/* Protection Plan Selection */}
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-3">Choose Protection Plan</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Basic', label: 'Basic Cover', price: '$0', desc: 'Standard deductible' },
                  { id: 'Standard', label: 'Standard', price: '+$18/day', desc: 'Reduced excess & glass' },
                  { id: 'Premium', label: 'Premium Zero', price: '+$32/day', desc: 'Zero excess & roadside' }
                ].map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setInsuranceTier(tier.id as any)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      insuranceTier === tier.id
                        ? 'border-emerald-500 bg-emerald-500/10 text-white'
                        : 'border-white/10 bg-obsidian-850 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs">{tier.label}</span>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">{tier.price}</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block">{tier.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Extras */}
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-2">Optional Extras (+$15/day each)</label>
              <div className="flex flex-wrap gap-2">
                {['Additional Driver', 'Child Safety Seat', 'Full GPS Navigation'].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleExtra(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                      extras.includes(item)
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400'
                        : 'border-white/10 bg-obsidian-850 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${extras.includes(item) ? 'opacity-100' : 'opacity-0'}`} />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown Card */}
            <div className="p-4 rounded-2xl bg-obsidian-850 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Vehicle Rental ({totalDays} days × ${car.pricePerDay})</span>
                <span className="text-white">${basePrice}</span>
              </div>
              {insuranceFee > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>{insuranceTier} Protection ({totalDays} days)</span>
                  <span className="text-white">+${insuranceFee}</span>
                </div>
              )}
              {extrasFee > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>Extras ({extras.length} add-ons × {totalDays} days)</span>
                  <span className="text-white">+${extrasFee}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Taxes & Fees (10%)</span>
                <span className="text-white">+${taxFee}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline font-bold text-sm">
                <span className="text-white font-mono uppercase">Total Due:</span>
                <span className="text-xl font-black text-emerald-400">${totalAmount}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-obsidian-900 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isSubmitting ? 'Confirming Reservation...' : `Confirm & Pay $${totalAmount}`}</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

