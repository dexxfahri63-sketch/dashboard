import React from 'react';
import {
  DollarSign,
  Clock,
  CheckCircle,
  Users,
  ArrowRight,
  Printer,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { Order, OrderStatus, LaundryConfig } from '../types/laundry';
import { formatCurrency, getStatusLabel, getNextStatus } from '../utils/laundry-calc';

interface DashboardViewProps {
  orders: Order[];
  config: LaundryConfig;
  onOpenPos: () => void;
  onOpenCustomers: () => void;
  onOpenSecretAdmin: () => void;
  onAdvanceStatus: (orderId: string) => void;
  onPrintReceipt: (order: Order) => void;
  onOpenWhatsApp: (order: Order) => void;
  onViewAllOrders: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  config,
  onOpenPos,
  onOpenCustomers,
  onOpenSecretAdmin,
  onAdvanceStatus,
  onPrintReceipt,
  onOpenWhatsApp,
  onViewAllOrders,
}) => {
  // Metric calculations
  const totalPaidRevenue = orders
    .filter((o) => o.paymentStatus === 'LUNAS')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const activeOrders = orders.filter(
    (o) => o.status !== 'SELESAI' && o.status !== 'BATAL'
  );

  const readyOrders = orders.filter((o) => o.status === 'SIAP');
  const uniqueCustomersCount = new Set(orders.map((o) => o.customerPhone)).size;

  // Workflow pipeline counts
  const countMasuk = orders.filter((o) => o.status === 'MASUK').length;
  const countCuci = orders.filter((o) => o.status === 'CUCI').length;
  const countKering = orders.filter((o) => o.status === 'KERING').length;
  const countSetrika = orders.filter((o) => o.status === 'SETRIKA').length;
  const countSiap = orders.filter((o) => o.status === 'SIAP').length;

  const recentOrders = orders.slice(0, 7);

  const renderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'MASUK':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            Antrian Masuk
          </span>
        );
      case 'CUCI':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            Sedang Dicuci
          </span>
        );
      case 'KERING':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
            Pengeringan
          </span>
        );
      case 'SETRIKA':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            Setrika Uap
          </span>
        );
      case 'SIAP':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Siap Diambil
          </span>
        );
      case 'SELESAI':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-500/20 text-slate-400 border border-slate-500/30">
            Selesai
          </span>
        );
      case 'BATAL':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            Batal
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div
          className="p-5 rounded-2xl border transition-all hover:-translate-y-0.5 shadow-md"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(13, 148, 136, 0.15)',
                color: 'var(--accent-primary, #0D9488)',
              }}
            >
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+24% MoM</span>
            </span>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {formatCurrency(totalPaidRevenue, config.currency)}
          </div>
          <div className="text-xs font-bold text-slate-300 mt-1">
            Total Pendapatan Terbayar
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Akumulasi transaksi status Lunas
          </p>
        </div>

        {/* Card 2: Active Orders */}
        <div
          className="p-5 rounded-2xl border transition-all hover:-translate-y-0.5 shadow-md"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-500/15 text-cyan-400">
              <Clock className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
              Proses Aktif
            </span>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {activeOrders.length}{' '}
            <span className="text-sm font-normal text-slate-400">Nota</span>
          </div>
          <div className="text-xs font-bold text-slate-300 mt-1">
            Dalam Antrian & Pengerjaan
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Cuci, pengeringan, atau setrika
          </p>
        </div>

        {/* Card 3: Ready Orders */}
        <div
          className="p-5 rounded-2xl border transition-all hover:-translate-y-0.5 shadow-md"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/15 text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              Ready
            </span>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {readyOrders.length}{' '}
            <span className="text-sm font-normal text-slate-400">Cucian</span>
          </div>
          <div className="text-xs font-bold text-slate-300 mt-1">
            Siap Diambil Pelanggan
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Sudah di-packing rapi & wangi
          </p>
        </div>

        {/* Card 4: Customers */}
        <div
          className="p-5 rounded-2xl border transition-all hover:-translate-y-0.5 shadow-md"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-500/15 text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
              Database
            </span>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {uniqueCustomersCount + 28}
          </div>
          <div className="text-xs font-bold text-slate-300 mt-1">
            Pelanggan Terdaftar
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Database loyalitas & riwayat order
          </p>
        </div>
      </div>

      {/* Main Grid: Orders on Left & Quick Actions / Workflow on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2): Recent Orders Table / Card List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Pesanan Laundry Terbaru</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300">
                  {orders.length} Total
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pantau status cucian, cetak struk kasir, atau kirim nota WA
              </p>
            </div>
            <button
              onClick={onViewAllOrders}
              className="text-xs font-bold flex items-center gap-1 hover:underline transition-all"
              style={{ color: 'var(--accent-primary, #0D9488)' }}
            >
              <span>Lihat Semua Antrian</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => {
              const nextStatus = getNextStatus(order.status);
              const initials = order.customerName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={order.id}
                  className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-slate-600 shadow-sm"
                  style={{
                    backgroundColor: 'var(--bg-card, #131C31)',
                    borderColor: 'var(--border-color, #1E293B)',
                  }}
                >
                  {/* Left: Avatar & Customer info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-sm font-bold text-slate-200 flex-shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white truncate">
                          {order.customerName}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {order.orderNumber}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {order.items
                          .map((i) => `${i.serviceName} (${i.qty} ${i.unit})`)
                          .join(', ')}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                        <span>🕒 {order.createdAt}</span>
                        <span>•</span>
                        <span>📍 {order.outlet}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & Status actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-white">
                        {formatCurrency(order.totalPrice, config.currency)}
                      </div>
                      <div className="mt-0.5">{renderStatusBadge(order.status)}</div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* WhatsApp trigger */}
                      <button
                        onClick={() => onOpenWhatsApp(order)}
                        title="Kirim Nota via WhatsApp Otomatis"
                        className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      {/* Print Receipt trigger */}
                      <button
                        onClick={() => onPrintReceipt(order)}
                        title="Cetak Struk Thermal Kasir"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      {/* Next Status button */}
                      {nextStatus && (
                        <button
                          onClick={() => onAdvanceStatus(order.id)}
                          title={`Lanjutkan proses ke: ${getStatusLabel(nextStatus)}`}
                          className="px-2.5 py-2 rounded-lg text-xs font-bold text-white flex items-center gap-1 shadow-sm transition-all hover:opacity-90"
                          style={{
                            backgroundColor: 'var(--accent-primary, #0D9488)',
                          }}
                        >
                          <span>{getStatusLabel(nextStatus).split(' ')[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (Span 1): Quick Actions & Workflow Stages */}
        <div className="space-y-6">
          {/* Aksi Cepat 4-Grid */}
          <div
            className="p-5 rounded-2xl border"
            style={{
              backgroundColor: 'var(--bg-card, #131C31)',
              borderColor: 'var(--border-color, #1E293B)',
            }}
          >
            <h3 className="text-sm font-bold text-white mb-3">Aksi Cepat Kasir</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={onOpenPos}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/60 flex flex-col items-center justify-center gap-2 text-center text-xs font-bold text-slate-200 transition-all hover:bg-slate-800"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
                >
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span>+ Buat Order</span>
              </button>

              <button
                onClick={onOpenCustomers}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/60 flex flex-col items-center justify-center gap-2 text-center text-xs font-bold text-slate-200 transition-all hover:bg-slate-800"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span>Pelanggan</span>
              </button>

              <button
                onClick={onOpenSecretAdmin}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/60 flex flex-col items-center justify-center gap-2 text-center text-xs font-bold text-slate-200 transition-all hover:bg-slate-800"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Panel Rahasia</span>
              </button>

              <button
                onClick={() => {
                  if (orders.length > 0) onPrintReceipt(orders[0]);
                }}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/60 flex flex-col items-center justify-center gap-2 text-center text-xs font-bold text-slate-200 transition-all hover:bg-slate-800"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Printer className="w-4 h-4" />
                </div>
                <span>Cetak Terakhir</span>
              </button>
            </div>
          </div>

          {/* Alur Proses Laundry */}
          <div
            className="p-5 rounded-2xl border"
            style={{
              backgroundColor: 'var(--bg-card, #131C31)',
              borderColor: 'var(--border-color, #1E293B)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">Alur Pengerjaan Laundry</h3>
              <span className="text-[11px] text-teal-400 font-bold">Live Status</span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[11px] font-bold">
                    {countMasuk}
                  </span>
                  <span className="font-semibold text-slate-200">1. Antrian Masuk</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-400">
                  Pending
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[11px] font-bold">
                    {countCuci}
                  </span>
                  <span className="font-semibold text-slate-200">2. Sedang Dicuci (Wash)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400">
                  Mesin Cuci
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[11px] font-bold">
                    {countKering}
                  </span>
                  <span className="font-semibold text-slate-200">3. Pengeringan (Dryer)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/15 text-orange-400">
                  Dryer
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-bold">
                    {countSetrika}
                  </span>
                  <span className="font-semibold text-slate-200">4. Setrika & Packing</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-400">
                  Setrika Uap
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px] font-bold">
                    {countSiap}
                  </span>
                  <span className="font-semibold text-slate-200">5. Siap Diambil</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                  Ready!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
