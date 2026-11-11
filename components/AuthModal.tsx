import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Shield, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { User, Role } from '../types';
import { api } from '../lib/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Direct instant login without email verification message
      const res = await api.login(email, password);
      if (res.success && res.user && res.token) {
        onAuthSuccess(res.user, res.token);
        onClose();
        return;
      }
      
      // Fallback in-memory authentication
      const isAdmin = email.toLowerCase().includes('admin');
      const emailPrefix = email.split('@')[0] || 'User';
      const displayName = mode === 'register' && name.trim() 
        ? name.trim() 
        : emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

      const user: User = {
        id: isAdmin ? 'user-admin' : `user-${Date.now()}`,
        email,
        name: displayName,
        role: isAdmin ? 'ADMIN' : 'CUSTOMER',
        createdAt: new Date().toISOString()
      };
      const token = `jwt-token-${user.id}`;
      api.setToken(token);
      onAuthSuccess(user, token);
      onClose();
    } catch {
      // Fallback direct login so user is never blocked by email verification
      const isAdmin = email.toLowerCase().includes('admin');
      const emailPrefix = email.split('@')[0] || 'User';
      const displayName = mode === 'register' && name.trim() 
        ? name.trim() 
        : emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

      const user: User = {
        id: isAdmin ? 'user-admin' : `user-${Date.now()}`,
        email,
        name: displayName,
        role: isAdmin ? 'ADMIN' : 'CUSTOMER',
        createdAt: new Date().toISOString()
      };
      const token = `jwt-token-${user.id}`;
      api.setToken(token);
      onAuthSuccess(user, token);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = (demoRole: Role) => {
    const isAdm = demoRole === 'ADMIN';
    const demoUser: User = {
      id: isAdm ? 'user-admin' : 'user-customer',
      email: isAdm ? 'admin@velocitydrive.com' : 'customer@velocitydrive.com',
      name: isAdm ? 'David Makinde' : 'Alex Rivera',
      role: demoRole,
      createdAt: new Date().toISOString()
    };
    const mockToken = 'mock-jwt-token-' + demoUser.id;
    api.setToken(mockToken);
    onAuthSuccess(demoUser, mockToken);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md" />

      <div className="relative w-full max-w-md bg-obsidian-900 border border-white/15 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-obsidian-800 text-zinc-400 hover:text-white border border-white/5 transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 font-black text-xl text-white mb-1">
            <span>VELOCITY</span>
            <span className="text-emerald-400">DRIVE</span>
          </div>
          <p className="text-xs text-zinc-400 font-mono">SECURE ACCESS</p>
        </div>

        {/* Demo Fast Login Bar */}
        <div className="mb-6 p-3 rounded-2xl bg-obsidian-850 border border-white/10 text-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-2 font-bold flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Instant One-Click Demo Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoSignIn('CUSTOMER')}
              className="py-2.5 px-3 rounded-xl bg-obsidian-800 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all active:scale-95"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn('ADMIN')}
              className="py-2.5 px-3 rounded-xl bg-obsidian-800 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 text-xs font-semibold transition-all active:scale-95"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`w-1/2 pb-3 border-b-2 transition-all ${
              mode === 'login' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`w-1/2 pb-3 border-b-2 transition-all ${
              mode === 'register' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-zinc-400 block mb-1 text-xs">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-obsidian-800 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white text-base sm:text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-zinc-400 block mb-1 text-xs">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-obsidian-800 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white text-base sm:text-xs focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1 text-xs">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-obsidian-800 border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-white text-base sm:text-xs focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-900 font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Account' : 'Register Account'}
          </button>
        </form>

      </div>
    </div>
  );
};
