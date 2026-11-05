import React from 'react';
import { X, Printer } from 'lucide-react';
import { Order, LaundryConfig } from '../types/laundry';
import { formatCurrency, getStatusLabel } from '../utils/laundry-calc';

interface ReceiptModalProps {
  order: Order | null;
  config: LaundryConfig;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, config, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-sm rounded-3xl border shadow-2xl flex flex-col overflow-hidden max-h-[92vh]"
        style={{
          backgroundColor: 'var(--bg-card, #131C31)',
          borderColor: 'var(--border-color, #1E293B)',
        }}
      >
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--border-color, #1E293B)' }}
        >
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Printer className="w-4 h-4 text-teal-400" />
            <span>Struk Kasir Thermal (58mm/80mm)</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Thermal Receipt Container */}
        <div className="p-4 overflow-y-auto">
          <div
            id="thermal-receipt"
            className="bg-white text-black p-5 rounded-xl font-mono text-[11px] shadow-inner space-y-3 select-text"
          >
            {/* Header */}
            <div className="text-center space-y-0.5">
              <div className="text-base font-extrabold tracking-tight">
                {config.businessName} {config.businessNameAccent}
              </div>
              <div className="text-[10px] text-gray-700">{config.tagline}</div>
              <div className="text-[10px] text-gray-600">{config.address}</div>
              <div className="text-[10px] text-gray-600">WA: {config.whatsapp}</div>
            </div>

            <div className="border-b border-dashed border-gray-400 my-2" />

            {/* Order Info */}
            <div className="space-y-0.5 text-[10px]">
              <div className="flex justify-between">
                <span>No. Nota:</span>
                <span className="font-bold">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Tanggal:</span>
                <span>{order.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span>Pelanggan:</span>
                <span className="font-bold">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>No. HP:</span>
                <span>{order.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span>Outlet:</span>
                <span>{order.outlet}</span>
              </div>
            </div>

            <div className="border-b border-dashed border-gray-400 my-2" />

            {/* Items */}
            <div className="space-y-1.5">
              {order.items.map((item, idx) => (
                <div key={idx}>
                  <div className="font-bold">{item.serviceName}</div>
                  <div className="flex justify-between text-gray-600">
                    <span>
                      {item.qty} {item.unit} x {formatCurrency(item.unitPrice, config.currency)}
                    </span>
                    <span className="font-bold text-black">
                      {formatCurrency(item.subtotal, config.currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-b border-dashed border-gray-400 my-2" />

            {/* Totals */}
            <div className="space-y-0.5 font-bold">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.subtotal, config.currency)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Diskon:</span>
                  <span>-{formatCurrency(order.discount, config.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold pt-1 border-t border-gray-300">
                <span>TOTAL:</span>
                <span>{formatCurrency(order.totalPrice, config.currency)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-600 pt-1">
                <span>Metode:</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>Status Bayar:</span>
                <span>{order.paymentStatus}</span>
              </div>
            </div>

            <div className="border-b border-dashed border-gray-400 my-2" />

            {/* Footer notes */}
            <div className="text-center text-[10px] text-gray-600 space-y-1">
              <div>Estimasi Selesai: {order.estimatedReady}</div>
              <div className="font-bold">*** TERIMA KASIH ***</div>
              <div className="text-[9px]">
                Barang yang tidak diambil dalam 30 hari di luar tanggung jawab kami. Harap bawa struk ini saat pengambilan cucian.
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div
          className="p-4 border-t flex items-center justify-between bg-slate-950/60"
          style={{ borderColor: 'var(--border-color, #1E293B)' }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 bg-slate-800 hover:bg-slate-700"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-lg"
            style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Struk Sekarang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
