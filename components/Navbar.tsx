import React, { useState } from 'react';
import { Car, Shield, User as UserIcon, Calendar, LogOut, ChevronDown, Sparkles, Menu, X, HelpCircle, ShieldCheck } from 'lucide-react';
import { User, Role } from '../types';

interface NavbarProps {
  currentUser: User | null;
  activeView: 'home' | 'my-bookings' | 'admin-dashboard';
  setActiveView: (view: 'home' | 'my-bookings' | 'admin-dashboard') => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onSwitchRole: (role: Role) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeView,
  setActiveView,
  onOpenAuth,
  onLogout,
  onSwitchRole
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-obsidian-900/80 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => {
            setActiveView('home');
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
            <div className="w-full h-full bg-obsidian-900 rounded-[10px] flex items-center justify-center">
              <Car className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">VELOCITY</span>
              <span className="font-extrabold text-xl tracking-tight text-emerald-400">DRIVE</span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block -mt-1">PREMIUM FLEET</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => setActiveView('home')}
            className={`transition-colors hover:text-emerald-400 ${activeView === 'home' ? 'text-emerald-400 font-semibold' : 'text-zinc-300'}`}
          >
            Fleet Catalog
          </button>
          <a href="#how-it-works" className="text-zinc-300 hover:text-emerald-400 transition-colors">
            How It Works
          </a>
          <a href="#why-us" className="text-zinc-300 hover:text-emerald-400 transition-colors">
            Why Velocity
          </a>
          {currentUser && (
            <button
              onClick={() => setActiveView('my-bookings')}
              className={`flex items-center gap-2 transition-colors hover:text-emerald-400 ${activeView === 'my-bookings' ? 'text-emerald-400 font-semibold' : 'text-zinc-300'}`}
            >
              <Calendar className="w-4 h-4" />
              My Bookings
            </button>
          )}
          {currentUser?.role === 'ADMIN' && (
            <button
              onClick={() => setActiveView('admin-dashboard')}
              className={`flex items-center gap-2 transition-colors hover:text-emerald-400 ${activeView === 'admin-dashboard' ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}
            >
              <Shield className="w-4 h-4" />
              Admin Command
            </button>
          )}
        </nav>

        {/* Action Controls & Auth */}
        <div className="flex items-center gap-3">
          
          {/* Quick Demo Role Switcher (Desktop) */}
          <div className="hidden lg:flex items-center bg-obsidian-800 border border-white/10 rounded-full p-1 text-xs">
            <span className="px-2.5 py-1 text-zinc-400 text-[11px] font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              DEMO:
            </span>
            <button
              onClick={() => onSwitchRole('CUSTOMER')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${currentUser?.role === 'CUSTOMER' ? 'bg-emerald-500 text-obsidian-900 font-semibold shadow-sm' : 'text-zinc-300 hover:text-white'}`}
            >
              Customer
            </button>
            <button
              onClick={() => onSwitchRole('ADMIN')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${currentUser?.role === 'ADMIN' ? 'bg-amber-400 text-obsidian-900 font-semibold shadow-sm' : 'text-zinc-300 hover:text-white'}`}
            >
              Admin
            </button>
          </div>

          {/* User Profile or Sign In */}
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 bg-obsidian-800 border border-white/10 rounded-xl px-3 py-1.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <div className="font-semibold text-white leading-tight">{currentUser.name}</div>
                  <div className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">{currentUser.role}</div>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 text-zinc-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all active:scale-95 flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              Sign In
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-obsidian-800 text-zinc-300 hover:text-white border border-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-obsidian-900/98 backdrop-blur-2xl px-4 py-5 space-y-4">
          <div className="space-y-1 text-sm font-medium">
            <button
              onClick={() => {
                setActiveView('home');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
            >
              <Car className="w-4 h-4" />
              <span>Fleet Catalog</span>
            </button>
            <a
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-zinc-300 hover:text-white hover:bg-white/5"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>How It Works</span>
            </a>
            <a
              href="#why-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-zinc-300 hover:text-white hover:bg-white/5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Why Velocity</span>
            </a>
            {currentUser && (
              <button
                onClick={() => {
                  setActiveView('my-bookings');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-zinc-300 hover:text-white hover:bg-white/5"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>My Bookings</span>
              </button>
            )}
            {currentUser?.role === 'ADMIN' && (
              <button
                onClick={() => {
                  setActiveView('admin-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-amber-400 hover:bg-amber-400/10"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Command Center</span>
              </button>
            )}
          </div>

          {/* Mobile Demo Role Switcher */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2 font-bold">Switch Demo Perspective:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onSwitchRole('CUSTOMER');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-xl bg-emerald-500 text-obsidian-900 font-bold text-center"
              >
                Customer
              </button>
              <button
                onClick={() => {
                  onSwitchRole('ADMIN');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-xl bg-obsidian-800 border border-white/10 text-amber-400 font-bold text-center"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
  );
};

