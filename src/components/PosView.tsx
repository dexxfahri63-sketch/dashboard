import React, { useState } from 'react';
import {
  Plus,
  Minus,
  Trash2,
  Printer,
  MessageCircle,
  Save,
  UserPlus,
  CreditCard,
  QrCode,
  Banknote,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  Order,
  OrderItem,
  Service,
  Customer,
  LaundryConfig,
  PaymentMethod,
  PaymentStatus,
} from '../types/laundry';
import {
  formatCurrency,
  calculateOrderTotals,
  generateOrderNumber,
} from '../utils/laundry-calc';

interface PosViewProps {
  services: Service[];
  customers: Customer[];
  config: LaundryConfig;
  orderCount: number;
  onCreateOrder: (order: Order, options?: { printReceipt?: boolean; sendWa?: boolean }) => void;
}

export const PosView: React.FC<PosViewProps> = ({
  services,
  customers,
  config,
  orderCount,
  onCreateOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState(config.activeOutlet);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      serviceId: services[0]?.id || 'srv-1',
      serviceName: services[0]?.name || 'Cuci Komplit Reguler',
      unit: services[0]?.unit || 'KG',
      qty: 3,
      unitPrice: services[0]?.price || 8000,
      subtotal: 24000,
    },
  ]);
  const [discount, setDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('LUNAS');
  const [notes, setNotes] = useState('');

  // Quick Customer Autofill
  const handleSelectExistingCustomer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const custId = e.target.value;
    if (!custId) return;
    const found = customers.find((c) => c.id === custId);
    if (found) {
      setCustomerName(found.name);
      setCustomerPhone(found.phone);
      setCustomerAddress(found.address);
    }
  };

  // Add Item to Cart
  const handleAddServiceToOrder = (service: Service) => {
    const existingIndex = orderItems.findIndex((it) => it.serviceId === service.id);
    if (existingIndex >= 0) {
      const updated = [...orderItems];
      updated[existingIndex].qty += 1;
      updated[existingIndex].subtotal = updated[existingIndex].qty * updated[existingIndex].unitPrice;
      setOrderItems(updated);
    } else {
      setOrderItems([
        ...orderItems,
        {
          serviceId: service.id,
          serviceName: service.name,
          unit: service.unit,
          qty: 1,
          unitPrice: service.price,
          subtotal: service.price,
        },
      ]);
    }
  };

  const handleUpdateQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    const updated = [...orderItems];
    updated[index].qty = Math.round(newQty * 10) / 10;
    updated[index].subtotal = Math.round(updated[index].qty * updated[index].unitPrice);
    setOrderItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const totals = calculateOrderTotals(orderItems, discount, config.taxRatePercent);

  // Calculate estimated completion
  const now = new Date();
  const maxDuration = Math.max(
    ...orderItems.map((it) => {
      const s = services.find((srv) => srv.id === it.serviceId);
      return s ? s.durationHours : 24;
    }),
    24
  );
  const estimatedDate = new Date(now.getTime() + maxDuration * 60 * 60 * 1000);
  const formatDateTime = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(
      d.getMinutes()
    ).padStart(2, '0')}`;
  };

  const handleSubmit = (actionType: 'save' | 'receipt' | 'wa') => {
    if (!customerName.trim()) {
      alert('Mohon isi nama customer terlebih dahulu!');
      return;
    }
    if (orderItems.length === 0) {
      alert('Pilih minimal satu layanan laundry!');
      return;
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderNumber(orderCount + 1),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim() || '081234567890',
      customerAddress: customerAddress.trim(),
      outlet: selectedOutlet,
      items: orderItems,
      totalWeightOrQty: totals.totalQty,
      subtotal: totals.subtotal,
      discount: totals.discountAmount,
      tax: totals.taxAmount,
      totalPrice: totals.total,
      paymentMethod,
      paymentStatus,
      status: 'MASUK',
      createdAt: formatDateTime(now),
      estimatedReady: formatDateTime(estimatedDate),
      notes: notes.trim(),
    };

    onCreateOrder(newOrder, {
      printReceipt: actionType === 'receipt',
      sendWa: actionType === 'wa',
    });

    // Reset Form
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setNotes('');
    setDiscount(0);
    setOrderItems([
      {
        serviceId: services[0]?.id || 'srv-1',
        serviceName: services[0]?.name || 'Cuci Komplit Reguler',
        unit: services[0]?.unit || 'KG',
        qty: 3,
        unitPrice: services[0]?.price || 8000,
        subtotal: 24000,
      },
    ]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span>Kasir / POS Input Order Cepat</span>
          <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Realtime Tally
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Input transaksi laundry, hitung kiloan/satuan, cetak struk kasir, atau kirim notifikasi WhatsApp otomatis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Customer & Services Catalog */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Input Card */}
          <div
            className="p-5 rounded-2xl border space-y-4"
            style={{
              backgroundColor: 'var(--bg-card, #131C31)',
              borderColor: 'var(--border-color, #1E293B)',
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-teal-400" />
                <span>Data Pelanggan</span>
              </h2>

              <select
                onChange={handleSelectExistingCustomer}
                className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="">Pilih dari Database Pelanggan...</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Nama Pelanggan *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  No. WhatsApp / HP *
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Alamat / Catatan Antar
                </label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Contoh: Kost Griya No. 4"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Cabang Outlet
                </label>
                <select
                  value={selectedOutlet}
                  onChange={(e) => setSelectedOutlet(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  {config.outlets.map((outlet) => (
                    <option key={outlet} value={outlet}>
                      {outlet}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Services Selector */}
          <div
            className="p-5 rounded-2xl border space-y-3"
            style={{
              backgroundColor: 'var(--bg-card, #131C31)',
              borderColor: 'var(--border-color, #1E293B)',
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Pilih Layanan & Tarif (Klik untuk Menambahkan)</span>
              </h2>
              <span className="text-xs text-slate-400">Katalog Tersedia</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {services.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => handleAddServiceToOrder(srv)}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500 text-left transition-all hover:bg-slate-800 flex items-center justify-between group"
                >
                  <div className="truncate mr-2">
                    <div className="text-xs font-bold text-slate-200 group-hover:text-teal-400 truncate">
                      {srv.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {formatCurrency(srv.price, config.currency)} / {srv.unit} • {srv.durationHours} Jam
                    </div>
                  </div>
                  <span className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all font-bold text-sm">
                    +
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Order Cart, Totals & Checkout */}
        <div className="lg:col-span-5 space-y-4">
          <div
            className="p-5 rounded-2xl border space-y-4 shadow-lg sticky top-20"
            style={{
              backgroundColor: 'var(--bg-card, #131C31)',
              borderColor: 'var(--border-color, #1E293B)',
            }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-color, #1E293B)' }}>
              <div>
                <h3 className="text-sm font-bold text-white">Keranjang Transaksi</h3>
                <span className="text-[11px] font-mono text-teal-400">
                  {generateOrderNumber(orderCount + 1)}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                {orderItems.length} Item
              </span>
            </div>

            {/* Item list */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {orderItems.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  Keranjang kosong. Klik layanan di sebelah kiri.
                </div>
              ) : (
                orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-200 truncate">
                        {item.serviceName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {formatCurrency(item.unitPrice, config.currency)} / {item.unit}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleUpdateQty(idx, item.qty - (item.unit === 'KG' ? 0.5 : 1))}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        step={item.unit === 'KG' ? '0.1' : '1'}
                        value={item.qty}
                        onChange={(e) => handleUpdateQty(idx, parseFloat(e.target.value) || 0)}
                        className="w-12 text-center bg-slate-950 border border-slate-700 rounded py-0.5 text-xs text-white font-mono"
                      />
                      <button
                        onClick={() => handleUpdateQty(idx, item.qty + (item.unit === 'KG' ? 0.5 : 1))}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(idx)}
                        className="p-1 rounded text-rose-400 hover:bg-rose-500/20 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right font-bold text-white w-20 flex-shrink-0">
                      {formatCurrency(item.subtotal, config.currency)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Calculations */}
            <div className="border-t pt-3 space-y-2 text-xs" style={{ borderColor: 'var(--border-color, #1E293B)' }}>
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{formatCurrency(totals.subtotal, config.currency)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Diskon (Rp)</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-right text-xs text-white font-mono"
                />
              </div>

              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total Bayar</span>
                <span style={{ color: 'var(--accent-primary, #0D9488)' }}>
                  {formatCurrency(totals.total, config.currency)}
                </span>
              </div>
            </div>

            {/* Payment Method & Status */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="grid grid-cols-3 gap-2">
                {(['CASH', 'QRIS', 'TRANSFER'] as PaymentMethod[]).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center gap-1 ${
                      paymentMethod === method
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {method === 'CASH' && <Banknote className="w-4 h-4" />}
                    {method === 'QRIS' && <QrCode className="w-4 h-4" />}
                    {method === 'TRANSFER' && <CreditCard className="w-4 h-4" />}
                    <span>{method}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setPaymentStatus('LUNAS')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                    paymentStatus === 'LUNAS'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  Lunas ✅
                </button>
                <button
                  onClick={() => setPaymentStatus('BELUM_LUNAS')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                    paymentStatus === 'BELUM_LUNAS'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  Bayar Nanti ⏳
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleSubmit('receipt')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95"
                style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
              >
                <Printer className="w-4 h-4" />
                <span>Simpan & Cetak Struk Kasir</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSubmit('wa')}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim WhatsApp</span>
                </button>
                <button
                  onClick={() => handleSubmit('save')}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Saja</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
