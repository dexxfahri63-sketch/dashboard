import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Calculator,
  Users,
  Tag,
  BarChart3,
  Database,
  Code2,
  KeyRound,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { LaundryConfig } from '../types/laundry';

export type ActiveTab =
  | 'dashboard'
  | 'orders'
  | 'pos'
  | 'customers'
  | 'services'
  | 'reports'
  | 'supabase'
  | 'export';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  config: LaundryConfig;
  onOpenSecretAdmin: () => void;
  pendingOrdersCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  config,
  onOpenSecretAdmin,
  pendingOrdersCount,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const [logoClicks, setLogoClicks] = React.useState(0);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 3) {
      setLogoClicks(0);
      onOpenSecretAdmin();
    }
    setTimeout(() => setLogoClicks(0), 1000);
  };

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }> = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'orders',
      label: 'Order / Antrian',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
    },
    {
      id: 'pos',
      label: 'Kasir / POS Cepat',
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 'pelanggan' as unknown as ActiveTab,
      label: 'Pelanggan',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'layanan' as unknown as ActiveTab,
      label: 'Layanan & Tarif',
      icon: <Tag className="w-4 h-4" />,
    },
    {
      id: 'reports',
      label: 'Laporan Keuangan',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'supabase',
      label: 'Skema Supabase (Optimasi)',
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: 'export',
      label: 'Ekspor File (HTML/CSS/JS)',
      icon: <Code2 className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden animate-fadeIn"
        />
      )}

      <aside
        className={`w-64 flex-shrink-0 flex flex-col h-screen z-50 border-r transition-all duration-300 select-none ${
          isOpenMobile
            ? 'fixed inset-y-0 left-0 translate-x-0 shadow-2xl'
            : 'fixed inset-y-0 left-0 -translate-x-full lg:translate-x-0 lg:sticky lg:top-0'
        }`}
        style={{
          backgroundColor: 'var(--bg-card, #131C31)',
          borderColor: 'var(--border-color, #1E293B)',
        }}
      >
      {/* Brand Header with Triple-Click Secret Trigger */}
      <div
        onClick={handleLogoClick}
        title="Klik 3x atau tekan Ctrl+Shift+X untuk membuka Panel Rahasia Klien"
        className="p-5 border-b flex items-center justify-between cursor-pointer group hover:opacity-95 transition-all"
        style={{ borderColor: 'var(--border-color, #1E293B)' }}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
            style={{ backgroundColor: 'var(--bg-surface, #1E293B)' }}
          >
            {config.logoEmoji || '🧺'}
          </div>
          <div className="truncate">
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1">
              <span>{config.businessName || 'DEXX'}</span>
              <span style={{ color: 'var(--accent-primary, #0D9488)' }}>
                {config.businessNameAccent || 'LAUNDRY'}
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 truncate font-medium">
              {config.tagline || 'Dashboard Kasir & Manajemen'}
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenSecretAdmin();
          }}
          title="Buka Panel Rahasia Klien"
          className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <KeyRound className="w-4 h-4 text-emerald-400/80" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const tabKey = (item.id === 'pelanggan' as unknown as ActiveTab ? 'customers' : item.id === 'layanan' as unknown as ActiveTab ? 'services' : item.id) as ActiveTab;
          const isActive = activeTab === tabKey;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(tabKey)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--accent-primary, #0D9488)' : 'transparent',
              }}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Single-Tenant Mode Indicator & Secret Admin Button */}
      <div
        className="p-3.5 border-t space-y-3 bg-black/20"
        style={{ borderColor: 'var(--border-color, #1E293B)' }}
      >
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 truncate">
            <Building2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
            <span className="text-slate-300 truncate font-semibold">
              {config.activeOutlet}
            </span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            {config.supabase?.isConnected ? 'Cloud' : 'Local'}
          </span>
        </div>

        <button
          onClick={onOpenSecretAdmin}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all"
          style={{
            borderColor: 'var(--accent-primary, #0D9488)',
            backgroundColor: 'rgba(13, 148, 136, 0.12)',
            color: 'var(--accent-primary, #0D9488)',
          }}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Panel Rahasia Klien</span>
        </button>
      </div>
    </aside>
  </>
  );
};
