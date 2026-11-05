import React from 'react';
import {
  Plus,
  Search,
  KeyRound,
  Database,
  CheckCircle2,
  AlertCircle,
  Menu,
} from 'lucide-react';
import { LaundryConfig } from '../types/laundry';

interface NavbarProps {
  config: LaundryConfig;
  onOpenSecretAdmin: () => void;
  onOpenPos: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onChangeOutlet: (outlet: string) => void;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenSecretAdmin,
  onOpenPos,
  searchQuery,
  setSearchQuery,
  onChangeOutlet,
  onToggleMobileMenu,
}) => {
  return (
    <header
      className="h-16 px-4 sm:px-6 flex items-center justify-between border-b sticky top-0 z-30 transition-colors"
      style={{
        backgroundColor: 'var(--bg-card, #131C31)',
        borderColor: 'var(--border-color, #1E293B)',
      }}
    >
      {/* Left: Mobile hamburger, Outlet Switcher & Live Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          aria-label="Buka Menu Navigasi"
          className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800 lg:hidden"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="relative">
          <select
            value={config.activeOutlet}
            onChange={(e) => onChangeOutlet(e.target.value)}
            className="appearance-none bg-slate-900/80 border border-slate-700/70 text-slate-200 text-xs font-semibold rounded-full pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
          >
            {config.outlets.map((outlet) => (
              <option key={outlet} value={outlet} className="bg-slate-900 text-white">
                📍 {outlet}
              </option>
            ))}
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
            ▼
          </div>
        </div>

        <div className="relative w-64 md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari no. nota atau nama customer..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900/80 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>
      </div>

      {/* Right: Secret admin pill & Quick POS button */}
      <div className="flex items-center gap-3">
        {/* Supabase status badge */}
        <div
          title={
            config.supabase.url
              ? `Tersambung ke Supabase Project: ${config.supabase.url}`
              : 'Berjalan di LocalStorage (Offline Mode)'
          }
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-slate-900/60 border-slate-800 text-slate-300"
        >
          <Database className="w-3.5 h-3.5 text-teal-400" />
          <span>{config.supabase.url ? 'Supabase Connected' : 'Local Sandbox'}</span>
          {config.supabase.url ? (
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </div>

        {/* Secret admin button with shortcut badge */}
        <button
          onClick={onOpenSecretAdmin}
          title="Buka Panel Konfigurasi Dinamis Klien (Shortcut: Ctrl + Shift + X)"
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all"
          style={{
            borderColor: 'var(--accent-primary, #0D9488)',
            backgroundColor: 'rgba(13, 148, 136, 0.1)',
            color: 'var(--accent-primary, #0D9488)',
          }}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Panel Rahasia</span>
          <kbd className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded font-mono border border-slate-700/60 text-slate-300">
            Ctrl+Shift+X
          </kbd>
        </button>

        {/* Quick + POS Button */}
        <button
          onClick={onOpenPos}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
        >
          <Plus className="w-4 h-4" />
          <span>+ Order Baru</span>
        </button>
      </div>
    </header>
  );
};
