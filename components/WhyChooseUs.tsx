import React from 'react';
import { ShieldCheck, Zap, Headphones, Sparkles, Key, DollarSign } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const perks = [
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      title: 'Pristine Exotic Fleet',
      desc: 'Every vehicle undergoes a 120-point mechanical and aesthetic inspection before delivery.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-400" />,
      title: 'Zero Hidden Fees',
      desc: 'Transparent pricing with all taxes, standard insurance, and mileage clearly stated upfront.'
    },
    {
      icon: <Key className="w-6 h-6 text-emerald-400" />,
      title: 'Doorstep Concierge Delivery',
      desc: 'Have your vehicle delivered directly to your home, office, hotel, or private airport hangar.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Comprehensive Coverage',
      desc: 'Premium zero-excess protection tiers giving you absolute peace of mind on every journey.'
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: 'Instant Reservation & Keyless',
      desc: 'Book in 60 seconds with instant digital confirmation and optional app-based keyless entry.'
    },
    {
      icon: <Headphones className="w-6 h-6 text-emerald-400" />,
      title: '24/7 Roadside Concierge',
      desc: 'Dedicated round-the-clock roadside assistance and concierge support anywhere in the country.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-obsidian-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-2">
            WHY VELOCITY DRIVE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Redefining the Luxury Rental Experience
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            Crafted for enthusiasts and professionals who demand automotive perfection and effortless booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-obsidian-850 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

