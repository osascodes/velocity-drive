import React, { useState, useRef, useEffect } from 'react';
import { Car, Shield, User as UserIcon, Calendar, LogOut, ChevronDown, Menu, X, HelpCircle, ShieldCheck, ArrowRightLeft } from 'lucide-react';
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          <button
            onClick={() => setActiveView('home')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-400 ${activeView === 'home' ? 'text-emerald-400 font-semibold' : 'text-zinc-300'}`}
          >
            Fleet Catalog
          </button>
          <a href="#how-it-works" className="whitespace-nowrap text-zinc-300 hover:text-emerald-400 transition-colors">
            How It Works
          </a>
          <a href="#why-us" className="whitespace-nowrap text-zinc-300 hover:text-emerald-400 transition-colors">
            Why Velocity
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

          {/* Logged Out: Clean "Sign In" Button */}
          {!currentUser ? (
            <button
              onClick={onOpenAuth}
              className="h-10 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all active:scale-95 flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          ) : (
            /* Logged In: Sleek Avatar with Dropdown for Account Actions */
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                title="Account Actions"
                className="flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 border border-white/10 rounded-xl px-3 py-1.5 h-10 transition-all active:scale-95 group"
              >
                <div className={`w-6 h-6 rounded-lg ${
                  currentUser.role === 'ADMIN' ? 'bg-amber-400/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                } flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform`}>
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <span className="font-semibold text-white whitespace-nowrap block">
                    {currentUser.name.replace(/\s*\(Admin\)/i, '')}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform duration-200 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Avatar Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-obsidian-900 border border-white/15 p-2 shadow-2xl shadow-black z-50 animate-in fade-in zoom-in-95 backdrop-blur-xl">
                  {/* User Profile Info */}
                  <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                    <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                    <div className="text-[11px] text-zinc-400 truncate">{currentUser.email}</div>
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        currentUser.role === 'ADMIN'
                          ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {currentUser.role === 'ADMIN' ? 'Administrator' : 'Customer'}
                      </span>
                    </div>
                  </div>

                  {/* Switch Role Action */}
                  <button
                    onClick={() => {
                      const targetRole: Role = currentUser.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
                      onSwitchRole(targetRole);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
                    <span>Switch to {currentUser.role === 'ADMIN' ? 'Customer' : 'Admin'}</span>
                  </button>

                  <div className="h-px bg-white/10 my-1" />

                  {/* Sign Out Action */}
                  <button
                    onClick={() => {
                      onLogout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
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

      {/* Mobile Drawer Menu (Simplified: Purely Focused on Page Links) */}
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
            <button
              onClick={() => {
                if (!currentUser) {
                  onOpenAuth();
                } else {
                  setActiveView('my-bookings');
                }
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-zinc-300 hover:text-white hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>My Bookings</span>
              </div>
              {currentUser && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">2</span>
              )}
            </button>
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

          {/* Account Actions Section (Clean, without noisy demo perspective buttons) */}
          <div className="pt-3 border-t border-white/10">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.03] rounded-xl border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg ${
                      currentUser.role === 'ADMIN' ? 'bg-amber-400/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                    } flex items-center justify-center font-bold text-xs`}>
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{currentUser.name}</div>
                      <div className="text-[10px] text-zinc-400">{currentUser.role === 'ADMIN' ? 'Administrator' : 'Customer'}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newRole: Role = currentUser.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
                      onSwitchRole(newRole);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Switch to {currentUser.role === 'ADMIN' ? 'Customer' : 'Admin'}</span>
                  </button>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
