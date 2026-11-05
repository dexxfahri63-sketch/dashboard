import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  Printer,
  MessageCircle,
  Trash2,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { Order, OrderStatus, LaundryConfig, PaymentStatus } from '../types/laundry';
import { formatCurrency, getStatusLabel, getNextStatus } from '../utils/laundry-calc';

interface OrdersViewProps {
  orders: Order[];
  config: LaundryConfig;
  onOpenPos: () => void;
  onAdvanceStatus: (orderId: string) => void;
  onUpdatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
  onDeleteOrder: (orderId: string) => void;
  onPrintReceipt: (order: Order) => void;
  onOpenWhatsApp: (order: Order) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  config,
  onOpenPos,
  onAdvanceStatus,
  onUpdatePaymentStatus,
  onDeleteOrder,
  onPrintReceipt,
  onOpenWhatsApp,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('SEMUA');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filterTabs = [
    { id: 'SEMUA', label: 'Semua Antrian' },
    { id: 'MASUK', label: 'Masuk' },
    { id: 'CUCI', label: 'Dicuci' },
    { id: 'KERING', label: 'Kering' },
    { id: 'SETRIKA', label: 'Setrika' },
    { id: 'SIAP', label: 'Siap Ambil' },
    { id: 'SELESAI', label: 'Selesai' },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === 'SEMUA' ? true : order.status === statusFilter;
    const matchesSearch =
      searchTerm.trim() === '' ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header with Title and Create Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Manajemen Order & Antrian Cucian</h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracking alur pengerjaan cucian dari penerimaan hingga diambil pelanggan
          </p>
        </div>
        <button
          onClick={onOpenPos}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95"
          style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Transaksi Baru</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {filterTabs.map((tab) => {
            const count =
              tab.id === 'SEMUA'
                ? orders.length
                : orders.filter((o) => o.status === tab.id).length;
            const isActive = statusFilter === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white shadow'
                    : 'text-slate-400 bg-slate-900/60 hover:text-white border border-slate-800'
                }`}
                style={{
                  backgroundColor: isActive
                    ? 'var(--accent-primary, #0D9488)'
                    : undefined,
                }}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-black/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nota atau nama customer..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div
            className="p-12 text-center rounded-2xl border"
            style={{
              backgroundColor: 'var(--bg-card, #131C31)',
              borderColor: 'var(--border-color, #1E293B)',
            }}
          >
            <Clock className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-300">Tidak ada pesanan ditemukan</p>
            <p className="text-xs text-slate-500 mt-1">
              Coba sesuaikan filter status atau buat order baru lewat kasir POS.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const nextStatus = getNextStatus(order.status);
            const isLunas = order.paymentStatus === 'LUNAS';

            return (
              <div
                key={order.id}
                className="p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-slate-600 shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-card, #131C31)',
                  borderColor: 'var(--border-color, #1E293B)',
                }}
              >
                {/* Left: Customer & Details */}
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-sm font-extrabold text-slate-200 flex-shrink-0">
                    {order.customerName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white">
                        {order.customerName}
                      </span>
                      <span className="text-xs font-mono text-teal-400">
                        {order.orderNumber}
                      </span>
                      <button
                        onClick={() =>
                          onUpdatePaymentStatus(
                            order.id,
                            isLunas ? 'BELUM_LUNAS' : 'LUNAS'
                          )
                        }
                        title="Klik untuk ubah status pembayaran"
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold border transition-colors ${
                          isLunas
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {isLunas ? 'Lunas ✅' : 'Belum Lunas ⏳'}
                      </button>
                    </div>

                    <div className="text-xs text-slate-300 mt-1">
                      {order.items
                        .map((i) => `${i.serviceName} (${i.qty} ${i.unit})`)
                        .join(' + ')}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1.5 flex-wrap">
                      <span>📞 {order.customerPhone}</span>
                      <span>•</span>
                      <span>🗓️ Masuk: {order.createdAt}</span>
                      <span>•</span>
                      <span className="text-amber-400/80">
                        ⏳ Estimasi: {order.estimatedReady}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Price & Workflow Action Buttons */}
                <div className="flex items-center justify-between md:justify-end gap-3 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="text-left md:text-right">
                    <div className="text-base font-black text-white">
                      {formatCurrency(order.totalPrice, config.currency)}
                    </div>
                    <div className="text-[11px] font-bold text-slate-400">
                      {getStatusLabel(order.status)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* WhatsApp */}
                    <button
                      onClick={() => onOpenWhatsApp(order)}
                      title="Kirim Nota via WhatsApp Otomatis"
                      className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>

                    {/* Print Receipt */}
                    <button
                      onClick={() => onPrintReceipt(order)}
                      title="Cetak Struk Kasir Thermal"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    >
                      <Printer className="w-4 h-4" />
                    </button>

                    {/* Next Workflow Stage */}
                    {nextStatus && (
                      <button
                        onClick={() => onAdvanceStatus(order.id)}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-white flex items-center gap-1 shadow-sm transition-all hover:opacity-90"
                        style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
                      >
                        <span>{getStatusLabel(nextStatus).split(' ')[0]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (confirm(`Hapus transaksi ${order.orderNumber}?`)) {
                          onDeleteOrder(order.id);
                        }
                      }}
                      title="Hapus Transaksi"
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
