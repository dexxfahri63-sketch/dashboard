import { OPTIMIZED_SUPABASE_SQL } from './supabase-schema';

export const STANDALONE_FILES = {
  'index.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DEXXLAUNDRY - Dashboard Sistem Kasir & Manajemen Laundry</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand" id="sidebarBrandTitle" title="Klik 3x atau tekan Ctrl+Shift+X untuk Akses Panel Rahasia">
        🧺 DEXX<span>LAUNDRY</span>
      </div>

      <ul class="sidebar-menu">
        <li class="sidebar-item">
          <a href="#dashboard" class="sidebar-link active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
            Dashboard
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#order" class="sidebar-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><path d="M9 10h6"/><path d="M9 14h6"/><path d="M9 18h4"/></svg>
            Order / Antrian
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#kasir" class="sidebar-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Kasir / POS Cepat
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#pelanggan" class="sidebar-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Pelanggan
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#layanan" class="sidebar-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></svg>
            Layanan & Tarif
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#laporan" class="sidebar-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            Laporan Keuangan
          </a>
        </li>
      </ul>

      <div class="sidebar-footer">
        <div class="user-badge">
          <div class="user-avatar">F</div>
          <div class="user-info">
            <div class="user-name">Fahri (Owner)</div>
            <div class="user-role">Administrator</div>
          </div>
        </div>
        <button onclick="promptSecretPin()" class="btn-secret-admin" style="width: 100%; justify-content: center;">
          ⚙️ Kunci Rahasia Admin
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Header -->
      <header class="top-header">
        <div class="header-left">
          <div class="outlet-badge-selector">
            📍 <span id="currentOutletName">Cabang Utama (Pusat)</span>
          </div>
        </div>
        <div class="header-right">
          <button id="btnOpenSecretModal" class="btn-secret-admin" title="Buka Konfigurasi Rahasia Klien">
            🔐 Fitur Rahasia (Ctrl+Shift+X)
          </button>
          <button onclick="promptSecretPin()" class="btn-primary">
            + Order Baru
          </button>
        </div>
      </header>

      <!-- Dashboard View -->
      <div class="page-container" id="mainDashboardView">
        <!-- 4 Metric Cards Grid -->
        <div class="dashboard-grid">
          <div class="metric-card">
            <div class="metric-top">
              <div class="metric-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <span class="badge badge-siap">+18% MoM</span>
            </div>
            <div class="metric-value" id="metricRevenue">Rp 0</div>
            <div class="metric-label">Pendapatan Bulan Ini</div>
            <div class="metric-desc">Total omset bersih terbayar lunas</div>
          </div>

          <div class="metric-card">
            <div class="metric-top">
              <div class="metric-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <span class="badge badge-cuci">Aktif</span>
            </div>
            <div class="metric-value" id="metricActiveOrders">0</div>
            <div class="metric-label">Dalam Antrian & Proses</div>
            <div class="metric-desc">Sedang dicuci, dikeringkan, atau disetrika</div>
          </div>

          <div class="metric-card">
            <div class="metric-top">
              <div class="metric-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
              </div>
              <span class="badge badge-siap">Ready</span>
            </div>
            <div class="metric-value" id="metricReadyOrders">0</div>
            <div class="metric-label">Siap Diambil</div>
            <div class="metric-desc">Sudah wangi & tinggal diserahkan ke pelanggan</div>
          </div>

          <div class="metric-card">
            <div class="metric-top">
              <div class="metric-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              </div>
              <span class="badge badge-masuk">Loyal</span>
            </div>
            <div class="metric-value" id="metricCustomers">48</div>
            <div class="metric-label">Pelanggan Terdaftar</div>
            <div class="metric-desc">Terkoneksi database pelanggan</div>
          </div>
        </div>

        <!-- Main Grid: Pesanan Terbaru (Left) & Workflow Status / Quick Actions (Right) -->
        <div class="main-grid-layout">
          <!-- Left: Recent Orders -->
          <section>
            <div class="section-header">
              <h2 class="section-title">Pesanan Laundry Terbaru</h2>
              <span style="font-size: 0.8125rem; color: var(--text-secondary);">Realtime Order Lifecycle</span>
            </div>
            <div class="order-list" id="recentOrdersList"></div>
          </section>

          <!-- Right: Quick Actions & Workflow -->
          <aside>
            <div class="section-header">
              <h2 class="section-title">Aksi Cepat</h2>
            </div>
            <div class="quick-actions-grid">
              <button onclick="promptSecretPin()" class="quick-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                + Buat Order Baru
              </button>
              <button onclick="promptSecretPin()" class="quick-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Input Pembayaran
              </button>
              <button onclick="promptSecretPin()" class="quick-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                Tambah Pelanggan
              </button>
              <button onclick="promptSecretPin()" class="quick-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                Panel Rahasia
              </button>
            </div>

            <div class="section-header">
              <h2 class="section-title">Alur Proses Laundry</h2>
            </div>
            <div class="workflow-list">
              <div class="workflow-item">
                <div class="workflow-left">
                  <span class="workflow-badge-num" id="stage-count-masuk">0</span>
                  <span>1. Antrian Masuk</span>
                </div>
                <span class="badge badge-masuk">Terima</span>
              </div>
              <div class="workflow-item">
                <div class="workflow-left">
                  <span class="workflow-badge-num" id="stage-count-cuci">0</span>
                  <span>2. Sedang Dicuci (Washing)</span>
                </div>
                <span class="badge badge-cuci">Mesin</span>
              </div>
              <div class="workflow-item">
                <div class="workflow-left">
                  <span class="workflow-badge-num" id="stage-count-kering">0</span>
                  <span>3. Pengeringan (Dryer)</span>
                </div>
                <span class="badge badge-kering">Dryer</span>
              </div>
              <div class="workflow-item">
                <div class="workflow-left">
                  <span class="workflow-badge-num" id="stage-count-setrika">0</span>
                  <span>4. Setrika & Packing</span>
                </div>
                <span class="badge badge-setrika">Uap</span>
              </div>
              <div class="workflow-item">
                <div class="workflow-left">
                  <span class="workflow-badge-num" id="stage-count-siap">0</span>
                  <span>5. Siap Diambil / Diantar</span>
                </div>
                <span class="badge badge-siap">Ready</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  </div>

  <!-- MODAL: Secret PIN Gate -->
  <div class="modal-overlay" id="secretPinModal">
    <div class="modal-box" style="max-width: 420px; text-align: center;">
      <div style="font-size: 2.5rem; margin-bottom: 8px;">🔐</div>
      <h3 class="modal-title" style="margin-bottom: 8px;">Akses Panel Rahasia Klien</h3>
      <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 16px;">
        Masukkan PIN rahasia untuk mengubah branding, tema warna, nama bisnis, dan koneksi database tanpa menyentuh kode.
      </p>
      <div class="form-group">
        <input type="password" id="inputSecretPin" class="form-input" placeholder="Masukkan PIN (Default: admin123)" style="text-align: center; font-size: 1.125rem; letter-spacing: 0.2em;" />
        <div id="pinErrorMsg" style="display: none; color: var(--accent-danger); font-size: 0.75rem; margin-top: 6px;"></div>
      </div>
      <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
        <button onclick="closeModal('secretPinModal')" class="btn-secondary">Batal</button>
        <button onclick="verifySecretPin()" class="btn-primary">Buka Panel</button>
      </div>
    </div>
  </div>

  <!-- MODAL: Secret Admin Configuration Center -->
  <div class="modal-overlay" id="secretConfigModal">
    <div class="modal-box" style="max-width: 680px;">
      <div class="modal-header">
        <div>
          <h3 class="modal-title">⚙️ Konfigurasi Dinamis Klien (Tanpa Ubah Kode)</h3>
          <p style="font-size: 0.75rem; color: var(--text-secondary);">Perubahan langsung tersimpan dan aktif secara realtime</p>
        </div>
        <button onclick="closeModal('secretConfigModal')" class="btn-close">&times;</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Nama Bisnis (Awalan)</label>
            <input type="text" id="cfgBusinessName" class="form-input" placeholder="Contoh: DEXX">
          </div>
          <div class="form-group">
            <label class="form-label">Aksen Nama (Warna Utama)</label>
            <input type="text" id="cfgBusinessAccent" class="form-input" placeholder="Contoh: LAUNDRY">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Slogan / Tagline Bisnis</label>
          <input type="text" id="cfgTagline" class="form-input" placeholder="Solusi Cepat, Wangi & Bersih Higienis">
        </div>

        <div style="display: grid; grid-template-columns: 100px 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Icon / Emoji</label>
            <input type="text" id="cfgLogoEmoji" class="form-input" style="text-align: center; font-size: 1.25rem;" value="🧺">
          </div>
          <div class="form-group">
            <label class="form-label">Warna Aksen Primer</label>
            <input type="color" id="cfgColorAccent" class="form-input" style="height: 42px; padding: 4px; cursor: pointer;" value="#0D9488">
          </div>
          <div class="form-group">
            <label class="form-label">No WhatsApp Bisnis</label>
            <input type="text" id="cfgWhatsapp" class="form-input" placeholder="6281234567890">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Alamat Lengkap Outlet</label>
          <input type="text" id="cfgAddress" class="form-input" placeholder="Jl. Merdeka No. 45, Jakarta Selatan">
        </div>

        <div class="form-group">
          <label class="form-label">Telepon / CS</label>
          <input type="text" id="cfgPhone" class="form-input" placeholder="0812-3456-7890">
        </div>

        <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 6px 0;">

        <div>
          <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 6px;">⚡ Koneksi Database Supabase (1 Klien = 1 Project)</h4>
          <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 12px;">Masukkan kredensial Supabase project klien. Jika kosong, sistem otomatis berjalan di LocalStorage.</p>
        </div>

        <div class="form-group">
          <label class="form-label">Supabase Project URL</label>
          <input type="text" id="cfgSupabaseUrl" class="form-input" placeholder="https://your-project.supabase.co">
        </div>

        <div class="form-group">
          <label class="form-label">Supabase Anon Public API Key</label>
          <input type="password" id="cfgSupabaseKey" class="form-input" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...">
        </div>

        <div class="form-group">
          <label class="form-label">PIN Rahasia Baru</label>
          <input type="text" id="cfgSecretPin" class="form-input" placeholder="admin123">
        </div>

        <div class="form-group">
          <label class="form-label">Format Template Pesan WhatsApp</label>
          <textarea id="cfgWhatsappTpl" class="form-textarea" rows="4" style="font-size: 0.75rem; font-family: monospace;"></textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;">
          <button onclick="closeModal('secretConfigModal')" class="btn-secondary">Tutup</button>
          <button onclick="saveSecretConfigFromModal()" class="btn-primary">💾 Simpan Konfigurasi Klien</button>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL: WhatsApp Message Modal -->
  <div class="modal-overlay" id="whatsappModal">
    <div class="modal-box" style="max-width: 480px;">
      <div class="modal-header">
        <h3 class="modal-title">💬 Kirim Nota WhatsApp</h3>
        <button onclick="closeModal('whatsappModal')" class="btn-close">&times;</button>
      </div>
      <div style="margin-bottom: 14px; font-size: 0.8125rem; color: var(--text-secondary);">
        Tujuan: <strong id="waPreviewTarget" style="color: var(--text-primary);"></strong>
      </div>
      <div class="form-group">
        <textarea id="waPreviewContent" class="form-textarea" rows="9" style="font-size: 0.8125rem; font-family: sans-serif;" readonly></textarea>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button onclick="closeModal('whatsappModal')" class="btn-secondary">Tutup</button>
        <button id="btnSendWaAction" class="btn-primary" style="background-color: #25D366;">
          Buka WhatsApp Web / App
        </button>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`,

  'style.css': `/* DEXXLAUNDRY - DYNAMIC WHITE-LABEL STYLESHEET */
:root {
  --accent-primary: #0D9488;
  --accent-primary-hover: #14B8A6;
  --accent-success: #10B981;
  --accent-warning: #F59E0B;
  --accent-danger: #EF4444;
  --accent-info: #3B82F6;
  --bg-main: #0B1120;
  --bg-card: #131C31;
  --bg-surface: #1E293B;
  --bg-surface-hover: #334155;
  --border-color: #1E293B;
  --border-hover: #334155;
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  --border-radius-custom: 12px;
  --font-custom: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25);
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--font-custom); background-color: var(--bg-main); color: var(--text-primary); line-height: 1.5; min-height: 100vh; overflow-x: hidden; }
.app-container { display: flex; min-height: 100vh; }
.sidebar { width: 260px; background-color: var(--bg-card); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; flex-shrink: 0; position: sticky; top: 0; height: 100vh; z-index: 40; }
.sidebar-brand { padding: 24px 20px; font-size: 1.25rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text-primary); display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border-color); cursor: pointer; user-select: none; }
.sidebar-brand span { color: var(--accent-primary); }
.sidebar-menu { list-style: none; padding: 16px 12px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; }
.sidebar-item { width: 100%; }
.sidebar-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: var(--border-radius-custom); color: var(--text-secondary); text-decoration: none; font-size: 0.875rem; font-weight: 600; transition: var(--transition-fast); }
.sidebar-link:hover { background-color: var(--bg-surface); color: var(--text-primary); }
.sidebar-link.active { background-color: var(--accent-primary); color: #FFFFFF; }
.sidebar-footer { padding: 16px; border-top: 1px solid var(--border-color); background-color: rgba(11, 17, 32, 0.4); }
.user-badge { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.user-avatar { width: 36px; height: 36px; border-radius: 8px; background-color: var(--accent-primary); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem; }
.user-info { flex: 1; overflow: hidden; }
.user-name { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-role { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; }
.main-content { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow-y: auto; }
.top-header { height: 70px; background-color: var(--bg-card); border-bottom: 1px solid var(--border-color); padding: 0 28px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 30; }
.header-left { display: flex; align-items: center; gap: 16px; }
.outlet-badge-selector { background-color: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-primary); padding: 6px 14px; border-radius: 20px; font-size: 0.8125rem; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.header-right { display: flex; align-items: center; gap: 12px; }
.btn-primary { background-color: var(--accent-primary); color: #FFFFFF; border: none; padding: 9px 18px; border-radius: var(--border-radius-custom); font-size: 0.875rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: var(--transition-fast); }
.btn-primary:hover { background-color: var(--accent-primary-hover); transform: translateY(-1px); }
.btn-secondary { background-color: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-primary); padding: 9px 16px; border-radius: var(--border-radius-custom); font-size: 0.875rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: var(--transition-fast); }
.btn-secret-admin { background: rgba(13, 148, 136, 0.12); border: 1px dashed var(--accent-primary); color: var(--accent-primary); padding: 7px 12px; border-radius: var(--border-radius-custom); font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.btn-secret-admin:hover { background: var(--accent-primary); color: #FFF; }
.page-container { padding: 28px; max-width: 1440px; margin: 0 auto; width: 100%; }
.dashboard-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 28px; }
.metric-card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--border-radius-custom); padding: 20px; box-shadow: var(--shadow-md); transition: var(--transition-normal); }
.metric-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.metric-icon { width: 44px; height: 44px; border-radius: 10px; background-color: var(--bg-surface); display: flex; align-items: center; justify-content: center; color: var(--accent-primary); }
.metric-value { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
.metric-label { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
.metric-desc { font-size: 0.75rem; color: var(--text-secondary); }
.main-grid-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.section-title { font-size: 1.125rem; font-weight: 700; color: var(--text-primary); }
.order-list { display: flex; flex-direction: column; gap: 12px; }
.order-item { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--border-radius-custom); padding: 16px; display: flex; justify-content: space-between; align-items: center; }
.order-info-group { display: flex; align-items: center; gap: 14px; }
.order-avatar { width: 42px; height: 42px; border-radius: 10px; background-color: var(--bg-surface); color: var(--text-primary); font-weight: 700; display: flex; align-items: center; justify-content: center; }
.order-name { font-weight: 700; font-size: 0.9375rem; color: var(--text-primary); }
.order-id { font-size: 0.75rem; color: var(--text-muted); }
.order-service-desc { font-size: 0.8125rem; color: var(--text-secondary); margin-top: 2px; }
.order-right-action { display: flex; align-items: center; gap: 16px; }
.order-price-group { text-align: right; }
.order-price { font-weight: 800; font-size: 0.9375rem; color: var(--text-primary); margin-bottom: 4px; }
.badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; display: inline-flex; align-items: center; }
.badge-masuk { background-color: rgba(59, 130, 246, 0.15); color: #60A5FA; }
.badge-cuci { background-color: rgba(14, 165, 233, 0.15); color: #38BDF8; }
.badge-kering { background-color: rgba(249, 115, 22, 0.15); color: #FB923C; }
.badge-setrika { background-color: rgba(245, 158, 11, 0.15); color: #FBBF24; }
.badge-siap { background-color: rgba(16, 185, 129, 0.15); color: #34D399; }
.badge-selesai { background-color: rgba(148, 163, 184, 0.15); color: #CBD5E1; }
.quick-actions-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px; }
.quick-btn { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--border-radius-custom); padding: 18px 12px; text-align: center; color: var(--text-primary); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer; }
.quick-btn:hover { background-color: var(--bg-surface); border-color: var(--accent-primary); }
.workflow-list { display: flex; flex-direction: column; gap: 10px; }
.workflow-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--border-radius-custom); font-size: 0.875rem; font-weight: 600; }
.workflow-left { display: flex; align-items: center; gap: 12px; }
.workflow-badge-num { width: 28px; height: 28px; border-radius: 50%; background-color: var(--accent-primary); color: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; }
.modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.75); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; opacity: 0; pointer-events: none; transition: var(--transition-normal); }
.modal-overlay.active { opacity: 1; pointer-events: auto; }
.modal-box { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--border-radius-custom); width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto; padding: 24px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--border-color); }
.modal-title { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); }
.btn-close { background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer; }
.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 0.8125rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px; }
.form-input, .form-select, .form-textarea { width: 100%; background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px 14px; color: var(--text-primary); font-size: 0.875rem; font-family: inherit; outline: none; }
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--accent-primary); }
@media (max-width: 1200px) { .dashboard-grid { grid-template-columns: repeat(2, 1fr); } .main-grid-layout { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .app-container { flex-direction: column; } .sidebar { width: 100%; height: auto; position: static; } .dashboard-grid { grid-template-columns: 1fr; } .top-header { padding: 0 16px; } .page-container { padding: 16px; } }`,

  'script.js': `// DEXXLAUNDRY - Standalone Engine & Dynamic Configuration System
const STORAGE_KEY_CONFIG = 'dexxlaundry_config_v1';
const STORAGE_KEY_ORDERS = 'dexxlaundry_orders_v1';
const STORAGE_KEY_SERVICES = 'dexxlaundry_services_v1';

const DEFAULT_CONFIG = {
  businessName: 'DEXX',
  businessNameAccent: 'LAUNDRY',
  tagline: 'Solusi Cepat, Wangi & Bersih Higienis',
  logoEmoji: '🧺',
  phone: '0812-3456-7890',
  whatsapp: '6281234567890',
  address: 'Jl. Merdeka No. 45, Jakarta Selatan',
  currency: 'Rp',
  activeOutlet: 'Cabang Utama (Pusat)',
  outlets: ['Cabang Utama (Pusat)', 'Cabang Boulevard', 'Cabang Kampus'],
  theme: {
    accentColor: '#0D9488',
    accentHover: '#14B8A6',
    bgMain: '#0B1120',
    bgCard: '#131C31',
    bgSurface: '#1E293B',
    textColor: '#F8FAFC',
    borderRadius: '12px'
  },
  supabase: { url: '', anonKey: '', isConnected: false },
  secretPin: 'admin123',
  whatsappTemplate: "Halo Kak *{nama}*!\\nTerima kasih telah mencuci di *{nama_laundry}* ({outlet}).\\n\\n📋 No. Nota: *{nota}*\\n👕 Layanan:\\n{layanan}\\n💰 Total: *{total}*\\n💳 Status: *{status_bayar}*\\n⏳ Status Laundry: *{status}*\\n📅 Estimasi Selesai: *{estimasi}*\\n\\nTerima kasih! 🙏✨"
};

let appConfig = JSON.parse(localStorage.getItem(STORAGE_KEY_CONFIG) || 'null') || DEFAULT_CONFIG;
let appOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS) || 'null') || [
  {
    id: 'ord-1',
    orderNumber: 'TRX-20261105-0001',
    customerName: 'Rudi Hartono',
    customerPhone: '081288991122',
    outlet: 'Cabang Utama (Pusat)',
    items: [{ name: 'Cuci Komplit Reguler', qty: 5, unit: 'KG', unitPrice: 8000, subtotal: 40000 }],
    totalPrice: 40000,
    paymentMethod: 'QRIS',
    paymentStatus: 'LUNAS',
    status: 'CUCI',
    createdAt: '2026-11-05 08:30',
    estimatedReady: '2026-11-07 10:00'
  }
];

function formatRupiah(amount) {
  return (appConfig.currency || 'Rp') + ' ' + Math.round(amount).toLocaleString('id-ID');
}

function applyTheme() {
  const root = document.documentElement;
  const theme = appConfig.theme || {};
  if (theme.accentColor) root.style.setProperty('--accent-primary', theme.accentColor);
  if (theme.accentHover) root.style.setProperty('--accent-primary-hover', theme.accentHover);
  if (theme.bgMain) root.style.setProperty('--bg-main', theme.bgMain);
  if (theme.bgCard) root.style.setProperty('--bg-card', theme.bgCard);
  if (theme.bgSurface) root.style.setProperty('--bg-surface', theme.bgSurface);
  if (theme.textColor) root.style.setProperty('--text-primary', theme.textColor);
  if (theme.borderRadius) root.style.setProperty('--border-radius-custom', theme.borderRadius);

  const brandEl = document.getElementById('sidebarBrandTitle');
  if (brandEl) {
    brandEl.innerHTML = (appConfig.logoEmoji || '🧺') + ' ' + (appConfig.businessName || 'DEXX') + '<span>' + (appConfig.businessNameAccent || 'LAUNDRY') + '</span>';
  }
}

function renderDashboard() {
  const activeOrders = appOrders.filter(o => o.status !== 'SELESAI' && o.status !== 'BATAL');
  const readyOrders = appOrders.filter(o => o.status === 'SIAP');
  const todayRevenue = appOrders.filter(o => o.paymentStatus === 'LUNAS').reduce((sum, o) => sum + o.totalPrice, 0);

  const revEl = document.getElementById('metricRevenue');
  if (revEl) revEl.textContent = formatRupiah(todayRevenue);
  const actEl = document.getElementById('metricActiveOrders');
  if (actEl) actEl.textContent = activeOrders.length.toString();
  const rdyEl = document.getElementById('metricReadyOrders');
  if (rdyEl) rdyEl.textContent = readyOrders.length.toString();

  const stages = ['MASUK', 'CUCI', 'KERING', 'SETRIKA', 'SIAP', 'SELESAI'];
  stages.forEach(st => {
    const el = document.getElementById('stage-count-' + st.toLowerCase());
    if (el) el.textContent = appOrders.filter(o => o.status === st).length.toString();
  });

  const listEl = document.getElementById('recentOrdersList');
  if (listEl) {
    listEl.innerHTML = appOrders.map(order => \`
      <div class="order-item">
        <div class="order-info-group">
          <div class="order-avatar">\${order.customerName.slice(0, 2).toUpperCase()}</div>
          <div>
            <div class="order-name">\${order.customerName}</div>
            <div class="order-id">\${order.orderNumber} • \${order.createdAt}</div>
            <div class="order-service-desc">\${order.items.map(i => \`\${i.name} (\${i.qty} \${i.unit})\`).join(', ')}</div>
          </div>
        </div>
        <div class="order-right-action">
          <div class="order-price-group">
            <div class="order-price">\${formatRupiah(order.totalPrice)}</div>
            <span class="badge badge-cuci">\${order.status}</span>
          </div>
        </div>
      </div>
    \`).join('');
  }
}

function promptSecretPin() {
  const modal = document.getElementById('secretPinModal');
  if (modal) {
    modal.classList.add('active');
    const input = document.getElementById('inputSecretPin');
    if (input) { input.value = ''; input.focus(); }
  }
}

function verifySecretPin() {
  const input = document.getElementById('inputSecretPin');
  const errorEl = document.getElementById('pinErrorMsg');
  const enteredPin = input ? input.value.trim() : '';

  if (enteredPin === (appConfig.secretPin || 'admin123')) {
    if (errorEl) errorEl.style.display = 'none';
    closeModal('secretPinModal');
    openSecretConfigModal();
  } else {
    if (errorEl) { errorEl.textContent = 'PIN Salah! Default: admin123'; errorEl.style.display = 'block'; }
  }
}

function openSecretConfigModal() {
  const modal = document.getElementById('secretConfigModal');
  if (!modal) return;
  document.getElementById('cfgBusinessName').value = appConfig.businessName || 'DEXX';
  document.getElementById('cfgBusinessAccent').value = appConfig.businessNameAccent || 'LAUNDRY';
  document.getElementById('cfgTagline').value = appConfig.tagline || '';
  document.getElementById('cfgLogoEmoji').value = appConfig.logoEmoji || '🧺';
  document.getElementById('cfgPhone').value = appConfig.phone || '';
  document.getElementById('cfgWhatsapp').value = appConfig.whatsapp || '';
  document.getElementById('cfgAddress').value = appConfig.address || '';
  document.getElementById('cfgColorAccent').value = appConfig.theme.accentColor || '#0D9488';
  document.getElementById('cfgSupabaseUrl').value = appConfig.supabase.url || '';
  document.getElementById('cfgSupabaseKey').value = appConfig.supabase.anonKey || '';
  document.getElementById('cfgSecretPin').value = appConfig.secretPin || 'admin123';
  document.getElementById('cfgWhatsappTpl').value = appConfig.whatsappTemplate || '';
  modal.classList.add('active');
}

function saveSecretConfigFromModal() {
  appConfig.businessName = document.getElementById('cfgBusinessName').value.trim() || 'DEXX';
  appConfig.businessNameAccent = document.getElementById('cfgBusinessAccent').value.trim() || 'LAUNDRY';
  appConfig.tagline = document.getElementById('cfgTagline').value.trim();
  appConfig.logoEmoji = document.getElementById('cfgLogoEmoji').value.trim() || '🧺';
  appConfig.phone = document.getElementById('cfgPhone').value.trim();
  appConfig.whatsapp = document.getElementById('cfgWhatsapp').value.trim();
  appConfig.address = document.getElementById('cfgAddress').value.trim();
  appConfig.theme.accentColor = document.getElementById('cfgColorAccent').value;
  appConfig.theme.accentHover = document.getElementById('cfgColorAccent').value;
  appConfig.supabase.url = document.getElementById('cfgSupabaseUrl').value.trim();
  appConfig.supabase.anonKey = document.getElementById('cfgSupabaseKey').value.trim();
  appConfig.secretPin = document.getElementById('cfgSecretPin').value.trim() || 'admin123';
  appConfig.whatsappTemplate = document.getElementById('cfgWhatsappTpl').value.trim();

  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(appConfig));
  applyTheme();
  renderDashboard();
  closeModal('secretConfigModal');
  alert('Konfigurasi klien berhasil diperbarui secara dinamis!');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  renderDashboard();
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'X' || e.key === 'x')) {
      e.preventDefault();
      promptSecretPin();
    }
  });
  const brandEl = document.getElementById('sidebarBrandTitle');
  if (brandEl) {
    let clicks = 0, timer = null;
    brandEl.addEventListener('click', () => {
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(() => { clicks = 0; }, 800);
      if (clicks >= 3) { clicks = 0; promptSecretPin(); }
    });
  }
});`
};
