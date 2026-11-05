/**
 * DEXXLAUNDRY - Standalone Engine & Dynamic Configuration System
 * Features:
 * - Dynamic White-Label Theming via CSS variables
 * - Secret Admin Panel (Ctrl+Shift+X or Triple-Click on Logo)
 * - POS & Order Lifecycle Management
 * - Thermal Receipt Printing
 * - WhatsApp Automated Notification Generator
 * - Supabase Integration with LocalStorage Fallback
 */

// Global State
const STORAGE_KEY_CONFIG = 'dexxlaundry_config_v1';
const STORAGE_KEY_ORDERS = 'dexxlaundry_orders_v1';
const STORAGE_KEY_SERVICES = 'dexxlaundry_services_v1';
const STORAGE_KEY_CUSTOMERS = 'dexxlaundry_customers_v1';

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
  supabase: {
    url: '',
    anonKey: '',
    isConnected: false
  },
  secretPin: 'admin123',
  whatsappTemplate: `Halo Kak *{nama}*! 👋
Terima kasih telah mencuci di *{nama_laundry}* ({outlet}).

Berikut rincian pesanan Anda:
📋 No. Nota: *{nota}*
👕 Layanan:
{layanan}
💰 Total: *{total}*
💳 Status Bayar: *{status_bayar}*
⏳ Status Laundry: *{status}*
📅 Estimasi Selesai: *{estimasi}*

📍 Alamat: {alamat_laundry}
📞 WhatsApp Admin: {wa_laundry}

Terima kasih atas kepercayaannya! 🙏✨`
};

const DEFAULT_SERVICES = [
  { id: 'srv-1', name: 'Cuci Komplit Reguler (Cuci + Kering + Setrika)', unit: 'KG', price: 8000, duration: 48 },
  { id: 'srv-2', name: 'Cuci Kering Lipat (Tanpa Setrika)', unit: 'KG', price: 6000, duration: 24 },
  { id: 'srv-3', name: 'Setrika Uap Saja', unit: 'KG', price: 5000, duration: 24 },
  { id: 'srv-4', name: 'Express 4 Jam Kilat', unit: 'KG', price: 15000, duration: 4 },
  { id: 'srv-5', name: 'Bed Cover King Size', unit: 'PCS', price: 30000, duration: 48 },
  { id: 'srv-6', name: 'Sepatu Deep Clean', unit: 'PASANG', price: 35000, duration: 72 }
];

const DEFAULT_ORDERS = [
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
  },
  {
    id: 'ord-2',
    orderNumber: 'TRX-20261105-0002',
    customerName: 'Siti Rahmawati',
    customerPhone: '085712345678',
    outlet: 'Cabang Utama (Pusat)',
    items: [{ name: 'Express 4 Jam Kilat', qty: 3, unit: 'KG', unitPrice: 15000, subtotal: 45000 }],
    totalPrice: 45000,
    paymentMethod: 'CASH',
    paymentStatus: 'LUNAS',
    status: 'SETRIKA',
    createdAt: '2026-11-05 09:15',
    estimatedReady: '2026-11-05 13:15'
  },
  {
    id: 'ord-3',
    orderNumber: 'TRX-20261104-0018',
    customerName: 'dr. Anita Wijaya',
    customerPhone: '081801239876',
    outlet: 'Cabang Utama (Pusat)',
    items: [{ name: 'Bed Cover King Size', qty: 2, unit: 'PCS', unitPrice: 30000, subtotal: 60000 }],
    totalPrice: 60000,
    paymentMethod: 'TRANSFER',
    paymentStatus: 'LUNAS',
    status: 'SIAP',
    createdAt: '2026-11-04 14:20',
    estimatedReady: '2026-11-05 15:00'
  }
];

// Load State from LocalStorage
let appConfig = JSON.parse(localStorage.getItem(STORAGE_KEY_CONFIG) || 'null') || DEFAULT_CONFIG;
let appOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS) || 'null') || DEFAULT_ORDERS;
let appServices = JSON.parse(localStorage.getItem(STORAGE_KEY_SERVICES) || 'null') || DEFAULT_SERVICES;

// Format Currency
function formatRupiah(amount) {
  return (appConfig.currency || 'Rp') + ' ' + Math.round(amount).toLocaleString('id-ID');
}

// Apply Dynamic Theme
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

  // Update Brand Names in DOM
  const brandEl = document.getElementById('sidebarBrandTitle');
  if (brandEl) {
    brandEl.innerHTML = (appConfig.logoEmoji || '🧺') + ' ' + (appConfig.businessName || 'DEXX') + '<span>' + (appConfig.businessNameAccent || 'LAUNDRY') + '</span>';
  }
  const outletDisplay = document.getElementById('currentOutletName');
  if (outletDisplay) {
    outletDisplay.textContent = appConfig.activeOutlet || 'Cabang Utama';
  }
}

// Render Dashboard
function renderDashboard() {
  const activeOrders = appOrders.filter(o => o.status !== 'SELESAI' && o.status !== 'BATAL');
  const readyOrders = appOrders.filter(o => o.status === 'SIAP');
  const todayRevenue = appOrders
    .filter(o => o.paymentStatus === 'LUNAS')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  // Update Metric Cards
  const revEl = document.getElementById('metricRevenue');
  if (revEl) revEl.textContent = formatRupiah(todayRevenue);

  const actEl = document.getElementById('metricActiveOrders');
  if (actEl) actEl.textContent = activeOrders.length.toString();

  const rdyEl = document.getElementById('metricReadyOrders');
  if (rdyEl) rdyEl.textContent = readyOrders.length.toString();

  // Workflow counts
  const stages = ['MASUK', 'CUCI', 'KERING', 'SETRIKA', 'SIAP', 'SELESAI'];
  stages.forEach(st => {
    const el = document.getElementById('stage-count-' + st.toLowerCase());
    if (el) {
      const count = appOrders.filter(o => o.status === st).length;
      el.textContent = count.toString();
    }
  });

  // Recent Orders List
  const listEl = document.getElementById('recentOrdersList');
  if (listEl) {
    if (appOrders.length === 0) {
      listEl.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-muted);">Belum ada transaksi laundry.</div>';
      return;
    }

    listEl.innerHTML = appOrders.slice(0, 8).map(order => {
      const initials = order.customerName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
      const statusBadge = getStatusBadge(order.status);
      const itemsSummary = order.items.map(i => `${i.name} (${i.qty} ${i.unit})`).join(', ');

      return `
        <div class="order-item">
          <div class="order-info-group">
            <div class="order-avatar">${initials}</div>
            <div>
              <div class="order-name">${escapeHtml(order.customerName)}</div>
              <div class="order-id">${order.orderNumber} • ${order.createdAt}</div>
              <div class="order-service-desc">${escapeHtml(itemsSummary)}</div>
            </div>
          </div>
          <div class="order-right-action">
            <div class="order-price-group">
              <div class="order-price">${formatRupiah(order.totalPrice)}</div>
              ${statusBadge}
            </div>
            <button onclick="openWhatsAppModal('${order.id}')" title="Kirim Nota WA" class="btn-secondary" style="padding: 6px 10px; font-size: 0.75rem;">
              💬 WA
            </button>
            <button onclick="printReceipt('${order.id}')" title="Cetak Struk" class="btn-secondary" style="padding: 6px 10px; font-size: 0.75rem;">
              🖨️ Struk
            </button>
            <button onclick="advanceOrderStatus('${order.id}')" title="Lanjut ke proses berikutnya" class="btn-primary" style="padding: 6px 10px; font-size: 0.75rem;">
              ➡️
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
}

function getStatusBadge(status) {
  const map = {
    MASUK: '<span class="badge badge-masuk">Antrian Masuk</span>',
    CUCI: '<span class="badge badge-cuci">Sedang Dicuci</span>',
    KERING: '<span class="badge badge-kering">Pengeringan</span>',
    SETRIKA: '<span class="badge badge-setrika">Setrika</span>',
    SIAP: '<span class="badge badge-siap">Siap Diambil</span>',
    SELESAI: '<span class="badge badge-selesai">Selesai</span>',
    BATAL: '<span class="badge badge-batal">Dibatalkan</span>'
  };
  return map[status] || `<span class="badge">${status}</span>`;
}

function advanceOrderStatus(orderId) {
  const order = appOrders.find(o => o.id === orderId);
  if (!order) return;
  const workflow = ['MASUK', 'CUCI', 'KERING', 'SETRIKA', 'SIAP', 'SELESAI'];
  const curIdx = workflow.indexOf(order.status);
  if (curIdx >= 0 && curIdx < workflow.length - 1) {
    order.status = workflow[curIdx + 1];
    saveOrders();
    renderDashboard();
  }
}

function saveOrders() {
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(appOrders));
}

function saveConfig() {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(appConfig));
  applyTheme();
  renderDashboard();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

// Secret Admin System
let logoClickCount = 0;
let logoClickTimeout = null;

function setupSecretTriggers() {
  // 1. Keyboard Shortcut: Ctrl + Shift + X (or Cmd + Shift + X)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'X' || e.key === 'x')) {
      e.preventDefault();
      promptSecretPin();
    }
  });

  // 2. Triple-Click on Logo
  const brandEl = document.getElementById('sidebarBrandTitle');
  if (brandEl) {
    brandEl.addEventListener('click', () => {
      logoClickCount++;
      clearTimeout(logoClickTimeout);
      logoClickTimeout = setTimeout(() => { logoClickCount = 0; }, 1000);
      if (logoClickCount >= 3) {
        logoClickCount = 0;
        promptSecretPin();
      }
    });
  }

  // 3. Direct secret button in header
  const secretBtn = document.getElementById('btnOpenSecretModal');
  if (secretBtn) {
    secretBtn.addEventListener('click', promptSecretPin);
  }
}

function promptSecretPin() {
  const modal = document.getElementById('secretPinModal');
  if (modal) {
    modal.classList.add('active');
    const input = document.getElementById('inputSecretPin');
    if (input) {
      input.value = '';
      input.focus();
    }
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
    if (errorEl) {
      errorEl.textContent = 'PIN Salah! Default: admin123';
      errorEl.style.display = 'block';
    }
  }
}

function openSecretConfigModal() {
  const modal = document.getElementById('secretConfigModal');
  if (!modal) return;

  // Populate Fields
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

  saveConfig();
  closeModal('secretConfigModal');
  alert('Konfigurasi klien berhasil diperbarui secara dinamis tanpa mengubah kode program!');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// WhatsApp Integration
function openWhatsAppModal(orderId) {
  const order = appOrders.find(o => o.id === orderId);
  if (!order) return;

  const itemsText = order.items.map((it, i) => `${i + 1}. ${it.name} (${it.qty} ${it.unit}) - ${formatRupiah(it.subtotal)}`).join('\n');
  let msg = appConfig.whatsappTemplate || DEFAULT_CONFIG.whatsappTemplate;
  msg = msg.split('{nama}').join(order.customerName)
           .split('{nota}').join(order.orderNumber)
           .split('{outlet}').join(order.outlet)
           .split('{layanan}').join(itemsText)
           .split('{total}').join(formatRupiah(order.totalPrice))
           .split('{status}').join(order.status)
           .split('{status_bayar}').join(order.paymentStatus === 'LUNAS' ? 'LUNAS ✅' : 'BELUM LUNAS ⏳')
           .split('{estimasi}').join(order.estimatedReady)
           .split('{nama_laundry}').join(appConfig.businessName + ' ' + appConfig.businessNameAccent)
           .split('{alamat_laundry}').join(appConfig.address)
           .split('{wa_laundry}').join(appConfig.whatsapp);

  const phoneSanitized = (order.customerPhone || '').replace(/[^0-9]/g, '');
  const finalPhone = phoneSanitized.startsWith('0') ? '62' + phoneSanitized.slice(1) : phoneSanitized;
  const waUrl = `https://api.whatsapp.com/send?phone=${finalPhone}&text=${encodeURIComponent(msg)}`;

  const modal = document.getElementById('whatsappModal');
  if (modal) {
    document.getElementById('waPreviewTarget').textContent = `${order.customerName} (${order.customerPhone})`;
    document.getElementById('waPreviewContent').value = msg;
    const sendBtn = document.getElementById('btnSendWaAction');
    if (sendBtn) {
      sendBtn.onclick = () => window.open(waUrl, '_blank');
    }
    modal.classList.add('active');
  }
}

// Thermal Receipt Printing
function printReceipt(orderId) {
  const order = appOrders.find(o => o.id === orderId);
  if (!order) return;

  const printWindow = window.open('', '', 'width=400,height=600');
  if (!printWindow) {
    alert('Pop-up terblokir. Izinkan pop-up untuk mencetak struk.');
    return;
  }

  const itemsHtml = order.items.map(it => `
    <tr>
      <td style="padding: 4px 0;">${escapeHtml(it.name)}<br><small>${it.qty} ${it.unit} x ${formatRupiah(it.unitPrice)}</small></td>
      <td style="text-align: right; vertical-align: top; padding: 4px 0;">${formatRupiah(it.subtotal)}</td>
    </tr>
  `).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Struk - ${order.orderNumber}</title>
      <style>
        body { font-family: 'Courier New', monospace; font-size: 12px; margin: 0; padding: 10px; color: #000; width: 280px; }
        .text-center { text-align: center; }
        .divider { border-bottom: 1px dashed #000; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; }
      </style>
    </head>
    <body onload="window.print(); window.close();">
      <div class="text-center">
        <h2 style="margin: 0; font-size: 16px;">${escapeHtml(appConfig.businessName)} ${escapeHtml(appConfig.businessNameAccent)}</h2>
        <div style="font-size: 10px;">${escapeHtml(appConfig.tagline)}</div>
        <div style="font-size: 10px;">${escapeHtml(appConfig.address)}</div>
        <div style="font-size: 10px;">WA: ${escapeHtml(appConfig.whatsapp)}</div>
      </div>
      <div class="divider"></div>
      <div>No. Nota: <strong>${order.orderNumber}</strong></div>
      <div>Tanggal : ${order.createdAt}</div>
      <div>Kasir   : Staff Kasir</div>
      <div>Customer: ${escapeHtml(order.customerName)} (${order.customerPhone})</div>
      <div class="divider"></div>
      <table>${itemsHtml}</table>
      <div class="divider"></div>
      <table style="font-weight: bold;">
        <tr><td>Total:</td><td style="text-align: right;">${formatRupiah(order.totalPrice)}</td></tr>
        <tr><td>Metode:</td><td style="text-align: right;">${order.paymentMethod}</td></tr>
        <tr><td>Status:</td><td style="text-align: right;">${order.paymentStatus}</td></tr>
      </table>
      <div class="divider"></div>
      <div class="text-center" style="font-size: 10px;">
        <div>Estimasi Selesai: ${order.estimatedReady}</div>
        <br>
        <div>Terima Kasih Atas Kunjungan Anda!</div>
        <div>Simpan struk ini untuk pengambilan cucian.</div>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// Initial Setup on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  renderDashboard();
  setupSecretTriggers();
});
