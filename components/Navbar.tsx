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
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveView('home')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-400 ${activeView === 'home' ? 'text-emerald-400 font-semibold' : 'text-zinc-300'}`}
          >
            Fleet
          </button>
          <a href="#how-it-works" className="whitespace-nowrap text-zinc-300 hover:text-emerald-400 transition-colors">
            How It Works
          </a>
          <a href="#why-us" className="whitespace-nowrap text-zinc-300 hover:text-emerald-400 transition-colors">
            Why Us
          </a>
          {currentUser && (
            <button
              onClick={() => setActiveView('my-bookings')}
              className={`whitespace-nowrap flex items-center gap-2 transition-colors hover:text-emerald-400 ${activeView === 'my-bookings' ? 'text-emerald-400 font-semibold' : 'text-zinc-300'}`}
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>My Bookings</span>
            </button>
          )}
          {currentUser?.role === 'ADMIN' && (
            <button
              onClick={() => setActiveView('admin-dashboard')}
              className={`whitespace-nowrap flex items-center gap-2 transition-colors hover:text-emerald-400 ${activeView === 'admin-dashboard' ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin Command</span>
            </button>
          )}
        </nav>

        {/* Action Controls & Auth */}
        <div className="flex items-center gap-3.5">

          {/* Subtle Vertical Divider for Breathing Room */}
          <div className="hidden lg:block h-5 w-px bg-white/10" />

          {/* Sleek Minimalist Segmented Role Switcher */}
          <div className="hidden lg:inline-flex items-center bg-white/[0.03] border border-white/10 rounded-full p-0.5 text-xs">
            <button
              onClick={() => onSwitchRole('CUSTOMER')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                currentUser?.role === 'CUSTOMER'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${currentUser?.role === 'CUSTOMER' ? 'bg-emerald-400' : 'bg-transparent'}`} />
              Customer
            </button>
            <button
              onClick={() => onSwitchRole('ADMIN')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                currentUser?.role === 'ADMIN'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${currentUser?.role === 'ADMIN' ? 'bg-amber-400' : 'bg-transparent'}`} />
              Admin
            </button>
          </div>

          {/* User Profile or Sign In - Unified Interactive Card */}
          {currentUser ? (
            <button
              onClick={onOpenAuth}
              title="Account Settings / Switch Demo User"
              className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 border border-white/10 rounded-xl px-3 py-1.5 h-9 transition-all active:scale-95 group"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-semibold text-white whitespace-nowrap block">
                  {currentUser.name.replace(/\s*\(Admin\)/i, '')}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="h-9 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all active:scale-95 flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              Sign In
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] text-zinc-300 hover:text-white border border-white/10 transition-colors active:scale-95"
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

