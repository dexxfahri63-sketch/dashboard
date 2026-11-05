import React, { useState } from 'react';
import { Tag, Plus, Edit2, Trash2, Clock, Check } from 'lucide-react';
import { Service, ServiceCategory, ServiceUnit, LaundryConfig } from '../types/laundry';
import { formatCurrency } from '../utils/laundry-calc';

interface ServicesViewProps {
  services: Service[];
  config: LaundryConfig;
  onUpdateServices: (updated: Service[]) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  services,
  config,
  onUpdateServices,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('KILOAN');
  const [unit, setUnit] = useState<ServiceUnit>('KG');
  const [price, setPrice] = useState<number>(8000);
  const [duration, setDuration] = useState<number>(24);
  const [description, setDescription] = useState('');

  const handleStartEdit = (srv: Service) => {
    setEditingId(srv.id);
    setName(srv.name);
    setCategory(srv.category);
    setUnit(srv.unit);
    setPrice(srv.price);
    setDuration(srv.durationHours);
    setDescription(srv.description);
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      const updated = services.map((s) =>
        s.id === editingId
          ? {
              ...s,
              name: name.trim(),
              category,
              unit,
              price,
              durationHours: duration,
              description: description.trim(),
            }
          : s
      );
      onUpdateServices(updated);
    } else {
      const newSrv: Service = {
        id: `srv-${Date.now()}`,
        name: name.trim(),
        category,
        unit,
        price,
        durationHours: duration,
        description: description.trim(),
        isActive: true,
      };
      onUpdateServices([...services, newSrv]);
    }

    // Reset
    setIsAdding(false);
    setEditingId(null);
    setName('');
    setDescription('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus paket layanan ini dari katalog?')) {
      onUpdateServices(services.filter((s) => s.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    onUpdateServices(
      services.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white">Daftar Layanan & Tarif Laundry</h1>
          <p className="text-xs text-slate-400 mt-1">
            Atur paket kiloan, satuan, dry clean, sepatu, dan durasi pengerjaan sesuai kebutuhan outlet
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setName('');
            setDescription('');
            setPrice(10000);
            setIsAdding(!isAdding);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-95"
          style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Tutup Form' : '+ Tambah Layanan'}</span>
        </button>
      </div>

      {/* Add / Edit Form */}
      {isAdding && (
        <form
          onSubmit={handleSave}
          className="p-5 rounded-2xl border space-y-4"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <h3 className="text-sm font-bold text-white">
            {editingId ? 'Edit Layanan Laundry' : 'Tambah Layanan Baru'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Nama Layanan *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Cuci Komplit Wangi Melati"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              >
                <option value="KILOAN">Kiloan</option>
                <option value="SATUAN">Satuan</option>
                <option value="EXPRESS">Express</option>
                <option value="SPECIAL">Special (Sepatu/Tas)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Satuan Ukur
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as ServiceUnit)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              >
                <option value="KG">Kilogram (KG)</option>
                <option value="PCS">Potong / Buah (PCS)</option>
                <option value="PASANG">Pasang</option>
                <option value="METER">Meter</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Tarif Harga (Rp) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Estimasi Pengerjaan (Jam)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Keterangan Singkat
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Include setrika uap & pewangi"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
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
              {editingId ? 'Simpan Perubahan' : 'Tambahkan ke Katalog'}
            </button>
          </div>
        </form>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              srv.isActive ? 'border-slate-800' : 'border-slate-800/40 opacity-60'
            }`}
            style={{
              backgroundColor: 'var(--bg-card, #131C31)',
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  {srv.category}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{srv.durationHours} Jam</span>
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">{srv.name}</h3>
              <p className="text-xs text-slate-400 mt-1 min-h-[36px]">
                {srv.description || 'Pencucian standar higienis & rapi.'}
              </p>

              <div className="text-lg font-black text-white mt-3 font-mono">
                {formatCurrency(srv.price, config.currency)}{' '}
                <span className="text-xs font-normal text-slate-400">/ {srv.unit}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-800/80">
              <button
                onClick={() => handleToggleActive(srv.id)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                  srv.isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {srv.isActive ? 'Aktif di Kasir' : 'Non-aktif'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStartEdit(srv)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(srv.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
