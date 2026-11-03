import React from 'react';
import { Car, Shield, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian-900 border-t border-white/10 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white">VELOCITY DRIVE</span>
            </div>
            <p className="text-zinc-500 leading-relaxed mb-4">
              Premium automotive rentals with instant confirmation, doorstep delivery, and zero hidden fees.
            </p>
            <div className="text-[11px] font-mono text-emerald-400">
              © {new Date().getFullYear()} VelocityDrive Inc. All rights reserved.
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono uppercase text-white font-bold mb-4">Fleet Categories</h4>
            <ul className="space-y-2">
              <li><a href="#fleet-catalog" className="hover:text-emerald-400 transition-colors">Sports & Supercars</a></li>
              <li><a href="#fleet-catalog" className="hover:text-emerald-400 transition-colors">High-End Luxury Sedans</a></li>
              <li><a href="#fleet-catalog" className="hover:text-emerald-400 transition-colors">Executive SUVs</a></li>
              <li><a href="#fleet-catalog" className="hover:text-emerald-400 transition-colors">Electric & Hybrids</a></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xs font-mono uppercase text-white font-bold mb-4">Hub Locations</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Beverly Hills & LAX</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> San Francisco & SFO</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Miami South Beach & MIA</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Manhattan & JFK</li>
            </ul>
          </div>

          {/* Concierge Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase text-white font-bold mb-4">24/7 Concierge</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+1 (800) 555-VELOCITY</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>concierge@velocitydrive.com</span>
              </li>
              <li className="pt-2 text-zinc-500 font-mono text-[10px]">
                Available 24 hours a day, 7 days a week.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

