import React, { useState } from 'react';
import {
  X,
  Lock,
  KeyRound,
  Palette,
  Store,
  Database,
  MessageSquare,
  Save,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { LaundryConfig, LaundryTheme } from '../types/laundry';
import { THEME_PRESETS, validateSecretPin, applyThemeToDocument } from '../utils/laundry-calc';

interface SecretAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LaundryConfig;
  onSaveConfig: (updated: LaundryConfig) => void;
}

export const SecretAdminModal: React.FC<SecretAdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'branding' | 'theme' | 'outlets' | 'supabase' | 'whatsapp' | 'backup'>('branding');

  // Form State
  const [formConfig, setFormConfig] = useState<LaundryConfig>(config);
  const [jsonExportSuccess, setJsonExportSuccess] = useState(false);

  // Sync state when opened
  React.useEffect(() => {
    if (isOpen) {
      setFormConfig(config);
      setPinInput('');
      setPinError(false);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSecretPin(pinInput, config.secretPin || 'admin123')) {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleApplyPreset = (preset: LaundryTheme) => {
    setFormConfig({
      ...formConfig,
      theme: {
        ...preset,
      },
    });
    applyThemeToDocument(preset);
  };

  const handleSaveAll = () => {
    applyThemeToDocument(formConfig.theme);
    onSaveConfig(formConfig);
    onClose();
    alert('✅ Pengaturan dinamis klien berhasil disimpan! Tampilan dashboard telah terupdate seketika tanpa mengubah kode program.');
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formConfig, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `config_${formConfig.businessName.toLowerCase()}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setJsonExportSuccess(true);
    setTimeout(() => setJsonExportSuccess(false), 2000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setFormConfig({
          ...formConfig,
          ...imported,
        });
        if (imported.theme) {
          applyThemeToDocument(imported.theme);
        }
        alert('Konfigurasi klien berhasil diimpor!');
      } catch (err) {
        alert('File JSON tidak valid!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* PIN GATE */}
      {!isUnlocked ? (
        <div
          className="w-full max-w-md p-6 rounded-3xl border shadow-2xl text-center space-y-4"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-400 mx-auto flex items-center justify-center text-2xl">
            🔐
          </div>
          <div>
            <h2 className="text-lg font-black text-white">
              Panel Rahasia Konfigurasi Klien
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Fitur khusus agency & pemilik untuk menyesuaikan branding, warna, nomor WhatsApp, dan database tanpa menyentuh source code.
            </p>
          </div>

          <form onSubmit={handleVerifyPin} className="space-y-3 pt-2">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              placeholder="Masukkan PIN Rahasia (Default: admin123)"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-center text-sm font-mono tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              autoFocus
            />

            {pinError && (
              <p className="text-xs font-bold text-rose-400">
                PIN Salah! (PIN default: admin123)
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-400 bg-slate-800 hover:bg-slate-700"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all"
                style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
              >
                Buka Panel Rahasia
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* UNLOCKED CONFIGURATION CENTER */
        <div
          className="w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-card, #131C31)',
            borderColor: 'var(--border-color, #1E293B)',
          }}
        >
          {/* Modal Header */}
          <div
            className="p-5 border-b flex items-center justify-between"
            style={{ borderColor: 'var(--border-color, #1E293B)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center font-bold">
                ⚙️
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>Panel Konfigurasi Dinamis (White-Label)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    No-Code Engine
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Perubahan akan otomatis tersimpan di LocalStorage & Supabase tanpa re-build kode!
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 overflow-x-auto scrollbar-none">
            {[
              { id: 'branding', label: '1. Identitas Bisnis', icon: <Store className="w-3.5 h-3.5" /> },
              { id: 'theme', label: '2. Tema & Warna', icon: <Palette className="w-3.5 h-3.5" /> },
              { id: 'outlets', label: '3. Cabang Outlet', icon: <RefreshCw className="w-3.5 h-3.5" /> },
              { id: 'supabase', label: '4. Supabase DB', icon: <Database className="w-3.5 h-3.5" /> },
              { id: 'whatsapp', label: '5. Notifikasi WA', icon: <MessageSquare className="w-3.5 h-3.5" /> },
              { id: 'backup', label: '6. PIN & Backup', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-teal-400 text-teal-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5">
            {/* TAB 1: BRANDING */}
            {activeTab === 'branding' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Nama Brand (Awalan) *
                    </label>
                    <input
                      type="text"
                      value={formConfig.businessName}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, businessName: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      placeholder="DEXX"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Aksen Nama (Berwarna Utama) *
                    </label>
                    <input
                      type="text"
                      value={formConfig.businessNameAccent}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, businessNameAccent: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      placeholder="LAUNDRY"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Slogan / Tagline Bisnis
                  </label>
                  <input
                    type="text"
                    value={formConfig.tagline}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, tagline: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    placeholder="Solusi Cepat, Wangi & Bersih Higienis"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Emoji / Icon Logo
                    </label>
                    <input
                      type="text"
                      value={formConfig.logoEmoji}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, logoEmoji: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-center text-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      No. WhatsApp Bisnis (Kirim Nota)
                    </label>
                    <input
                      type="text"
                      value={formConfig.whatsapp}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, whatsapp: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      placeholder="6281234567890"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Mata Uang (Currency)
                    </label>
                    <input
                      type="text"
                      value={formConfig.currency}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, currency: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      placeholder="Rp"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Alamat Lengkap Outlet
                  </label>
                  <textarea
                    rows={2}
                    value={formConfig.address}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, address: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: THEME & COLOR PRESETS */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    Preset Palet Warna Siap Pakai
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {THEME_PRESETS.map((preset) => (
                      <button
                        key={preset.presetName}
                        onClick={() => handleApplyPreset(preset)}
                        className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          formConfig.theme.accentColor === preset.accentColor
                            ? 'border-teal-400 bg-slate-800'
                            : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: preset.accentColor }}
                          />
                          <div>
                            <div className="text-xs font-bold text-white">
                              {preset.presetName}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {preset.accentColor}
                            </div>
                          </div>
                        </div>
                        {formConfig.theme.accentColor === preset.accentColor && (
                          <CheckCircle2 className="w-4 h-4 text-teal-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Hex Pickers */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-teal-400">Custom Warna Hex Manual</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Warna Utama (Primary)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formConfig.theme.accentColor}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormConfig({
                              ...formConfig,
                              theme: {
                                ...formConfig.theme,
                                accentColor: val,
                                accentHover: val,
                              },
                            });
                          }}
                          className="w-10 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formConfig.theme.accentColor}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormConfig({
                              ...formConfig,
                              theme: { ...formConfig.theme, accentColor: val, accentHover: val },
                            });
                          }}
                          className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Background Utama
                      </label>
                      <input
                        type="text"
                        value={formConfig.theme.bgMain}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            theme: { ...formConfig.theme, bgMain: e.target.value },
                          })
                        }
                        className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Radius Sudut (Border Radius)
                      </label>
                      <select
                        value={formConfig.theme.borderRadius}
                        onChange={(e) =>
                          setFormConfig({
                            ...formConfig,
                            theme: { ...formConfig.theme, borderRadius: e.target.value },
                          })
                        }
                        className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white"
                      >
                        <option value="6px">Minimalis (6px)</option>
                        <option value="12px">Rounded Modern (12px)</option>
                        <option value="18px">Soft Curved (18px)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: OUTLETS */}
            {activeTab === 'outlets' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-white mb-2">
                    Daftar Cabang / Outlet Laundry
                  </h4>
                  <div className="space-y-2">
                    {formConfig.outlets.map((outlet, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800"
                      >
                        <input
                          type="text"
                          value={outlet}
                          onChange={(e) => {
                            const updated = [...formConfig.outlets];
                            updated[index] = e.target.value;
                            setFormConfig({ ...formConfig, outlets: updated });
                          }}
                          className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (formConfig.outlets.length > 1) {
                              setFormConfig({
                                ...formConfig,
                                outlets: formConfig.outlets.filter((_, i) => i !== index),
                              });
                            }
                          }}
                          className="text-rose-400 text-xs px-2 hover:underline"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFormConfig({
                        ...formConfig,
                        outlets: [...formConfig.outlets, `Cabang Baru ${formConfig.outlets.length + 1}`],
                      })
                    }
                    className="mt-3 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20"
                  >
                    + Tambah Cabang
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: SUPABASE */}
            {activeTab === 'supabase' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300">
                  ⚡ <strong>Model 1 Klien = 1 Proyek Supabase:</strong> Setiap klien laundry memiliki URL dan Anon Key sendiri. Jika kosong, sistem tetap berjalan normal dengan LocalStorage sandbox.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="text"
                    value={formConfig.supabase.url}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        supabase: { ...formConfig.supabase, url: e.target.value },
                      })
                    }
                    placeholder="https://xyzabcdefg.supabase.co"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Supabase Anon Public API Key
                  </label>
                  <input
                    type="password"
                    value={formConfig.supabase.anonKey}
                    onChange={(e) =>
                      setFormConfig({
                        ...formConfig,
                        supabase: { ...formConfig.supabase, anonKey: e.target.value },
                      })
                    }
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: WHATSAPP TEMPLATE */}
            {activeTab === 'whatsapp' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Template Pesan Notifikasi WhatsApp Otomatis
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Gunakan placeholder: <code className="text-teal-300">{'{nama}'}</code>, <code className="text-teal-300">{'{nota}'}</code>, <code className="text-teal-300">{'{layanan}'}</code>, <code className="text-teal-300">{'{total}'}</code>, <code className="text-teal-300">{'{status}'}</code>, <code className="text-teal-300">{'{estimasi}'}</code>
                  </p>
                  <textarea
                    rows={8}
                    value={formConfig.whatsappTemplate}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, whatsappTemplate: e.target.value })
                    }
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-200"
                  />
                </div>
              </div>
            )}

            {/* TAB 6: PIN & BACKUP */}
            {activeTab === 'backup' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Ubah PIN Rahasia Admin
                  </label>
                  <input
                    type="text"
                    value={formConfig.secretPin}
                    onChange={(e) =>
                      setFormConfig({ ...formConfig, secretPin: e.target.value })
                    }
                    className="w-full max-w-xs px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    PIN ini digunakan untuk membuka panel rahasia konfigurasi klien ini.
                  </p>
                </div>

                <hr className="border-slate-800" />

                <div>
                  <h4 className="text-xs font-bold text-white mb-2">
                    Backup & Impor Template Klien (.json)
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700"
                    >
                      <Download className="w-4 h-4 text-teal-400" />
                      <span>{jsonExportSuccess ? 'Berhasil Download!' : 'Ekspor Config JSON'}</span>
                    </button>

                    <label className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 cursor-pointer">
                      <Upload className="w-4 h-4 text-emerald-400" />
                      <span>Impor Config JSON</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportJson}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div
            className="p-5 border-t flex items-center justify-between bg-slate-950/60"
            style={{ borderColor: 'var(--border-color, #1E293B)' }}
          >
            <div className="text-xs text-slate-400">
              Perubahan langsung disimpan ke browser & database klien.
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 bg-slate-800 hover:bg-slate-700"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handleSaveAll}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all"
                style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
              >
                <Save className="w-4 h-4" />
                <span>Simpan Konfigurasi Dinamis</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
