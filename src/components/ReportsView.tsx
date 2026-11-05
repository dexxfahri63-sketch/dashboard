import React from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  CreditCard,
  Building2,
} from 'lucide-react';
import { Order, LaundryConfig } from '../types/laundry';
import { formatCurrency } from '../utils/laundry-calc';

interface ReportsViewProps {
  orders: Order[];
  config: LaundryConfig;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ orders, config }) => {
  const totalLunas = orders
    .filter((o) => o.paymentStatus === 'LUNAS')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const totalBelumLunas = orders
    .filter((o) => o.paymentStatus === 'BELUM_LUNAS')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const totalTrx = orders.length;

  // Breakdown by payment method
  const countCash = orders.filter((o) => o.paymentMethod === 'CASH').length;
  const countQris = orders.filter((o) => o.paymentMethod === 'QRIS').length;
  const countTransfer = orders.filter((o) => o.paymentMethod === 'TRANSFER').length;

  const exportCSV = () => {
    const headers = [
      'No. Nota',
      'Tanggal',
      'Pelanggan',
      'No. HP',
      'Cabang',
      'Layanan',
      'Total',
      'Metode Bayar',
      'Status Bayar',
      'Status Pengerjaan',
    ];

    const rows = orders.map((o) => [
      `"${o.orderNumber}"`,
      `"${o.createdAt}"`,
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.outlet}"`,
      `"${o.items.map((i) => `${i.serviceName} (${i.qty} ${i.unit})`).join('; ')}"`,
      o.totalPrice,
      `"${o.paymentMethod}"`,
      `"${o.paymentStatus}"`,
      `"${o.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `laporan_laundry_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Laporan Keuangan & Omset Laundry</h1>
          <p className="text-xs text-slate-400 mt-1">
            Ringkasan omset kas masuk, piutang laundry, performa metode pembayaran, dan ekspor CSV
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Laporan (Excel / CSV)</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="p-5 rounded-2xl border"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Omset Bersih (Lunas)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {formatCurrency(totalLunas, config.currency)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Kas riil sudah diterima kasir</p>
        </div>

        <div
          className="p-5 rounded-2xl border"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Piutang (Belum Bayar)</span>
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">
            {formatCurrency(totalBelumLunas, config.currency)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Dibayar saat pelanggan ambil cucian</p>
        </div>

        <div
          className="p-5 rounded-2xl border"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Transaksi</span>
            <span className="w-2 h-2 rounded-full bg-teal-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalTrx} Nota</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Rata-rata {formatCurrency(totalTrx ? Math.round((totalLunas + totalBelumLunas) / totalTrx) : 0, config.currency)} / nota
          </p>
        </div>
      </div>

      {/* Payment Methods & Outlet Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="p-5 rounded-2xl border space-y-4"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-teal-400" />
            <span>Distribusi Metode Pembayaran</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>QRIS Dinamis</span>
                <span>{countQris} Trx ({totalTrx ? Math.round((countQris / totalTrx) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${totalTrx ? (countQris / totalTrx) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Tunai / Cash</span>
                <span>{countCash} Trx ({totalTrx ? Math.round((countCash / totalTrx) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${totalTrx ? (countCash / totalTrx) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Transfer Bank</span>
                <span>{countTransfer} Trx ({totalTrx ? Math.round((countTransfer / totalTrx) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${totalTrx ? (countTransfer / totalTrx) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-5 rounded-2xl border space-y-4"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Performa Cabang Outlet</span>
          </h3>

          <div className="space-y-2 text-xs">
            {config.outlets.map((outlet) => {
              const count = orders.filter((o) => o.outlet === outlet).length;
              const revenue = orders
                .filter((o) => o.outlet === outlet && o.paymentStatus === 'LUNAS')
                .reduce((sum, o) => sum + o.totalPrice, 0);

              return (
                <div
                  key={outlet}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white">{outlet}</div>
                    <div className="text-[11px] text-slate-400">{count} Transaksi Masuk</div>
                  </div>
                  <div className="text-right font-black text-teal-400 font-mono">
                    {formatCurrency(revenue, config.currency)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
