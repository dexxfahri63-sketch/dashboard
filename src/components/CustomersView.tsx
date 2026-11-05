import React, { useState } from 'react';
import { Search, UserPlus, Phone, MapPin, MessageCircle, ShoppingBag } from 'lucide-react';
import { Customer, LaundryConfig } from '../types/laundry';
import { formatCurrency } from '../utils/laundry-calc';

interface CustomersViewProps {
  customers: Customer[];
  config: LaundryConfig;
  onAddCustomer: (customer: Customer) => void;
  onSelectCustomerForOrder: (customer: Customer) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  customers,
  config,
  onAddCustomer,
  onSelectCustomerForOrder,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      alert('Nama dan No. WhatsApp wajib diisi!');
      return;
    }
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: newName.trim(),
      phone: newPhone.trim(),
      address: newAddress.trim(),
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: new Date().toISOString().split('T')[0],
    };
    onAddCustomer(newCust);
    setNewName('');
    setNewPhone('');
    setNewAddress('');
    setIsAdding(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Database Pelanggan Laundry</h1>
          <p className="text-xs text-slate-400 mt-1">
            Riwayat pelanggan loyal, kontak WhatsApp, dan akumulasi nilai transaksi
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95"
          style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
        >
          <UserPlus className="w-4 h-4" />
          <span>{isAdding ? 'Tutup Form' : '+ Tambah Pelanggan'}</span>
        </button>
      </div>

      {/* Add Customer Form Modal / Accordion */}
      {isAdding && (
        <form
          onSubmit={handleSaveCustomer}
          className="p-5 rounded-2xl border space-y-4"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <h3 className="text-sm font-bold text-white">Form Pendaftaran Pelanggan Baru</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Contoh: Maya Indah"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                No. WhatsApp / HP *
              </label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Contoh: 08123456789"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Alamat Rumah / Kost
              </label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Contoh: Jl. Anggrek No. 12"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 bg-slate-900 border border-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white"
              style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
            >
              Simpan Pelanggan
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama, nomor HP, atau alamat..."
          className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
        />
      </div>

      {/* Customers List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => {
          const initials = customer.name.slice(0, 2).toUpperCase();
          const cleanPhone = customer.phone.replace(/[^0-9]/g, '');
          const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

          return (
            <div
              key={customer.id}
              className="p-5 rounded-2xl border space-y-3 transition-all hover:border-slate-600 shadow-sm flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-card, #131C31)',
                borderColor: 'var(--border-color, #1E293B)',
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-sm font-bold text-teal-400 flex-shrink-0">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white truncate">{customer.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-500" />
                    <span>{customer.phone}</span>
                  </div>
                  {customer.address && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                      <span className="truncate">{customer.address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">Total Transaksi</div>
                  <div className="font-extrabold text-white mt-0.5">
                    {customer.totalOrders} Kali
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Total Belanja</div>
                  <div className="font-extrabold text-teal-400 mt-0.5">
                    {formatCurrency(customer.totalSpent, config.currency)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                <a
                  href={`https://api.whatsapp.com/send?phone=${waPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat WA</span>
                </a>

                <button
                  onClick={() => onSelectCustomerForOrder(customer)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Baru</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
