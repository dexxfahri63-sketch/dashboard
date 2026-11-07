# Rencana Implementasi: Sinkronisasi Multi-Device Cloud Supabase (Zero-Build CDN)

Pembaruan arsitektur sistem laundry komersial agar seluruh riwayat pesanan, status kasir, dan data pelanggan tersimpan di database cloud Supabase melalui skrip CDN murni, sehingga ketika tautan website dibuka di perangkat lain (laptop kasir, HP pemilik, atau tablet), seluruh riwayat transaksi otomatis tersinkronisasi secara realtime tanpa proses kompilasi/build.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Keputusan Terkonfirmasi (Phase 1):**
> 1. **Database Cloud**: Menggunakan **Supabase via CDN murni** (`https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`), memastikan file tetap 100% Vanilla HTML, CSS, dan JavaScript murni (GitHub tetap berlabel **HTML titik merah** tanpa bundler).
> 2. **Manajemen Kredensial**: Diatur langsung melalui **Panel Rahasia Klien (`Ctrl+Shift+X`)** sehingga pemilik dapat memasukkan *Project URL* dan *Anon Key* Supabase masing-masing tanpa menyentuh baris kode program.
> 3. **Sinkronisasi Multi-Device**: Menggunakan arsitektur *dual-layer* (Supabase Cloud sebagai sumber utama + LocalStorage sebagai cache instan & offline fallback) dilengkapi listener Supabase Realtime.

---

## 1. Overview & Core Concept

- **Apa yang Dibuat**: Integrasi database cloud Supabase langsung ke dalam `index.html` dan `script.js` menggunakan Supabase JavaScript Client via CDN.
- **Masalah yang Diselesaikan**: Sebelumnya data hanya tersimpan di `localStorage` peramban lokal perangkat tersebut. Dengan pembaruan ini, transaksi kasir yang diinput dari laptop kasir di toko akan langsung muncul di HP pemilik di rumah atau tablet cabang lain yang membuka tautan yang sama.
- **Target Pengguna**: Pemilik bisnis laundry dan staf kasir cabang yang memerlukan akses multi-perangkat secara realtime.

---

## 2. User Experience & Visual Design

- **Alur Kerja Pengguna (Multi-Device)**:
  1. **Konfigurasi Awal di Device Utama**: Buka Panel Rahasia (`Ctrl+Shift+X`, PIN `admin123`), isi URL Proyek Supabase dan Anon Key, klik "Simpan & Hubungkan".
  2. **Indikator Status Cloud**: Header dashboard menampilkan badge status koneksi:
     - Hijau: `Cloud Terhubung (Supabase Realtime)`
     - Kuning: `Mode Offline / LocalStorage`
  3. **Akses dari Perangkat Lain**:
     - Sistem menyediakan tombol **"Salin Link Sinkronisasi"** di Panel Rahasia (link dengan parameter konfigurasi terenkripsi sederhana) sehingga ketika link dibuka di HP kasir lain, perangkat tersebut langsung otomatis terhubung ke database cloud yang sama tanpa harus mengetik ulang URL dan Key yang panjang.
  4. **Pembaruan Realtime**: Ketika pesanan baru dibuat atau status diubah dari "Cuci" ke "Siap", seluruh perangkat yang sedang membuka website akan otomatis memperbarui tampilan tanpa perlu me-refresh halaman.

- **Desain & Gaya Visual**:
  - Tetap mempertahankan desain *enterprise dark theme* profesional DexxTrade (`#0B1120`, `#131C31`, `#0D9488`).
  - Menggunakan ikon SVG vektor murni (tanpa emoji keyboard).
  - Tampilan indikator sinkronisasi cloud yang halus di header navigasi atas.

---

## 3. Key Product Decisions & Trade-Offs

- **Pilihan CDN Murni (`@supabase/supabase-js` via jsDelivr)**:
  - *Kenapa*: Memenuhi aturan ketat Anda bahwa repositori harus 100% murni HTML/JS tanpa proses build (Vite/Node/bundler). CDN library Supabase berjalan langsung di browser klien.
  - *Alternatif yang Ditolak*: Menginstal package npm Supabase via bundler karena akan mengubah repositori menjadi berbasis Node/TypeScript dan memerlukan proses build.

- **Arsitektur Dual-Layer (Cloud + Local Cache)**:
  - *Kenapa*: Menjamin kecepatan buka website instan (tidak ada layar putih saat memuat) dan kasir tetap bisa menginput pesanan saat koneksi internet toko sedang drop (*offline-first*), yang kemudian akan disinkronkan saat koneksi kembali online.

- **Fitur Magic Link / Salin URL Konfigurasi Cabang**:
  - *Kenapa*: Mengetik `https://xyz.supabase.co` dan Anon Key yang panjang di HP atau tablet layar sentuh sangat merepotkan. Dengan fitur ini, pemilik toko cukup salin link sinkronisasi dari laptop dan kirim via WhatsApp ke HP kasir.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER BROWSER DEVICES                        │
│                                                                 │
│   [ Device A: Laptop Kasir ]         [ Device B: HP Pemilik ]   │
│   (Input Order / Kasir POS)          (Pantau Omset & Status)    │
└────────────────┬────────────────────────────────┬───────────────┘
                 │                                │
                 │ Realtime WebSocket & REST CRUD │
                 ▼                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE CLOUD DATABASE                      │
│                                                                 │
│   ├── Table: orders (TRX, Customer, Status, Total, Outlet)     │
│   ├── Table: customers (Nama, WhatsApp, Total Belanja)         │
│   ├── Table: client_settings (Nama Bisnis, Tema, WhatsApp)     │
│   └── Realtime Channels (postgres_changes listener)            │
└─────────────────────────────────────────────────────────────────┘
                 ▲
                 │ Fallback / Cache
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LOCAL STORAGE CACHE                        │
│   (Instant First Paint, Offline Fallback, PIN Keamanan)         │
└─────────────────────────────────────────────────────────────────┘
```

### Rencana File yang Diperbarui:
1. **`index.html`**:
   - Menambahkan skrip CDN Supabase: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`.
   - Menambahkan indikator status sinkronisasi cloud di baris header atas.
   - Menambahkan tombol "Salin Tautan Sinkronisasi Antar Device" di dalam modal Panel Rahasia.
2. **`script.js`**:
   - Inisialisasi klien Supabase `supabase.createClient(url, anonKey)`.
   - Handler CRUD terhubung: `fetchOrdersFromCloud()`, `saveOrderToCloud()`, `deleteOrderFromCloud()`.
   - Menambahkan listener Supabase Realtime channel untuk update otomatis antar layar.
   - Deteksi URL parameter sinkronisasi otomatis saat link dibuka di device baru.
3. **`style.css`**:
   - Menambahkan badge status koneksi cloud (hijau/kuning) yang minimalis dan profesional.
