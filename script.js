/**
 * DEXXLAUNDRY - PROFESSIONAL SAAS DASHBOARD ENGINE
 * 100% Pure Vanilla JavaScript (Zero TypeScript, Zero External Frameworks)
 * Designed for High-Performance White-Label Laundry SaaS Deployments
 */

// Storage Keys
const KEY_CONFIG = 'dexxlaundry_cfg_v3';
const KEY_ORDERS = 'dexxlaundry_orders_v3';
const KEY_SERVICES = 'dexxlaundry_srv_v3';
const KEY_CUSTOMERS = 'dexxlaundry_cust_v3';
const KEY_CLEARED = 'dexxlaundry_orders_cleared_v3';

// Clean SVG Icon Library for Enterprise UI (Zero Keyboard Emojis)
const ICONS = {
  trash: `<svg class="svg-icon" style="width:14px;height:14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
  printer: `<svg class="svg-icon" style="width:14px;height:14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>`,
  whatsapp: `<svg class="svg-icon" style="width:14px;height:14px;color:#34D399;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  arrowRight: `<svg class="svg-icon" style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  edit: `<svg class="svg-icon" style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
  check: `<svg class="svg-icon" style="width:12px;height:12px;color:#34D399;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  clock: `<svg class="svg-icon" style="width:12px;height:12px;color:#FBBF24;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  phone: `<svg class="svg-icon" style="width:11px;height:11px;color:var(--text-muted);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  location: `<svg class="svg-icon" style="width:11px;height:11px;color:var(--text-muted);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  plus: `<svg class="svg-icon" style="width:14px;height:14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  package: `<svg class="svg-icon" style="width:28px;height:28px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`
};

// Default Configuration
const DEFAULT_CONFIG = {
  businessName: 'DEXX',
  businessNameAccent: 'LAUNDRY',
  tagline: 'Solusi Cepat, Wangi & Bersih Higienis',
  phone: '0812-3456-7890',
  whatsapp: '6281234567890',
  address: 'Jl. Merdeka No. 45, Jakarta Selatan',
  currency: 'Rp',
  taxRate: 0,
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
  whatsappTemplate: `Halo Kak *{nama}*,
Terima kasih telah mempercayakan cucian Anda di *{nama_laundry}* ({outlet}).

Rincian Pesanan:
- No. Nota: *{nota}*
- Layanan:
{layanan}
- Total: *{total}*
- Status Pembayaran: *{status_bayar}*
- Status Pengerjaan: *{status}*
- Estimasi Selesai: *{estimasi}*

Alamat Toko: {alamat_laundry}
WhatsApp Admin: {wa_laundry}

Terima kasih atas kepercayaan Anda.`
};

// Preset Demo Data
const DEMO_SERVICES = [
  { id: 'srv-1', name: 'Cuci Komplit Reguler (Cuci + Kering + Setrika)', category: 'KILOAN', unit: 'KG', price: 8000, duration: 48, description: 'Pakaian wangi, bersih, dan rapi dilipat.' },
  { id: 'srv-2', name: 'Cuci Kering Lipat (Tanpa Setrika)', category: 'KILOAN', unit: 'KG', price: 6000, duration: 24, description: 'Cocok untuk kaos harian dan handuk.' },
  { id: 'srv-3', name: 'Setrika Uap Saja', category: 'KILOAN', unit: 'KG', price: 5000, duration: 24, description: 'Pakaian sudah bersih dari rumah, disetrika uap.' },
  { id: 'srv-4', name: 'Express 4 Jam (Prioritas Kilat)', category: 'EXPRESS', unit: 'KG', price: 15000, duration: 4, description: 'Mesin khusus express langsung selesai 4 jam.' },
  { id: 'srv-5', name: 'Bed Cover King Size / Jumbo', category: 'SATUAN', unit: 'PCS', price: 30000, duration: 48, description: 'Pencucian tebal dengan sabun antibakteri.' },
  { id: 'srv-6', name: 'Sepatu Deep Clean', category: 'SPECIAL', unit: 'PASANG', price: 35000, duration: 72, description: 'Deep clean upper, midsole, outsole & deodorizing.' }
];

const DEMO_CUSTOMERS = [
  { id: 'cust-1', name: 'Rudi Hartono', phone: '081288991122', address: 'Apartemen Green Tower C 12B', totalOrders: 14, totalSpent: 420000 },
  { id: 'cust-2', name: 'Siti Rahmawati', phone: '085712345678', address: 'Jl. Melati No. 18, Kebayoran', totalOrders: 8, totalSpent: 260000 },
  { id: 'cust-3', name: 'Dimas Prasetyo', phone: '081399887766', address: 'Kost Graha Kamar 204', totalOrders: 5, totalSpent: 145000 },
  { id: 'cust-4', name: 'dr. Anita Wijaya', phone: '081801239876', address: 'Perumahan Puri Indah D-7', totalOrders: 21, totalSpent: 980000 }
];

const DEMO_ORDERS = [
  {
    id: 'ord-101',
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
    id: 'ord-102',
    orderNumber: 'TRX-20261105-0002',
    customerName: 'Siti Rahmawati',
    customerPhone: '085712345678',
    outlet: 'Cabang Utama (Pusat)',
    items: [{ name: 'Express 4 Jam (Prioritas Kilat)', qty: 3, unit: 'KG', unitPrice: 15000, subtotal: 45000 }],
    totalPrice: 45000,
    paymentMethod: 'CASH',
    paymentStatus: 'LUNAS',
    status: 'SETRIKA',
    createdAt: '2026-11-05 09:15',
    estimatedReady: '2026-11-05 13:15'
  },
  {
    id: 'ord-103',
    orderNumber: 'TRX-20261104-0018',
    customerName: 'dr. Anita Wijaya',
    customerPhone: '081801239876',
    outlet: 'Cabang Utama (Pusat)',
    items: [
      { name: 'Bed Cover King Size / Jumbo', qty: 2, unit: 'PCS', unitPrice: 30000, subtotal: 60000 }
    ],
    totalPrice: 60000,
    paymentMethod: 'TRANSFER',
    paymentStatus: 'LUNAS',
    status: 'SIAP',
    createdAt: '2026-11-04 14:20',
    estimatedReady: '2026-11-05 15:00'
  },
  {
    id: 'ord-104',
    orderNumber: 'TRX-20261105-0003',
    customerName: 'Dimas Prasetyo',
    customerPhone: '081399887766',
    outlet: 'Cabang Boulevard',
    items: [{ name: 'Cuci Kering Lipat', qty: 4, unit: 'KG', unitPrice: 6000, subtotal: 24000 }],
    totalPrice: 24000,
    paymentMethod: 'QRIS',
    paymentStatus: 'BELUM_LUNAS',
    status: 'MASUK',
    createdAt: '2026-11-05 10:10',
    estimatedReady: '2026-11-06 12:00'
  }
];

// App State Initialization
let appConfig = JSON.parse(localStorage.getItem(KEY_CONFIG) || 'null') || DEFAULT_CONFIG;

// Resilient Order Storage (Respects explicit deletion so dummy data doesn't revive on refresh)
const isOrdersCleared = localStorage.getItem(KEY_CLEARED) === 'true';
const rawSavedOrders = localStorage.getItem(KEY_ORDERS);
let appOrders = [];

if (isOrdersCleared) {
  appOrders = rawSavedOrders ? JSON.parse(rawSavedOrders) : [];
} else {
  appOrders = rawSavedOrders !== null ? JSON.parse(rawSavedOrders) : JSON.parse(JSON.stringify(DEMO_ORDERS));
}

let appServices = JSON.parse(localStorage.getItem(KEY_SERVICES) || 'null') || DEMO_SERVICES;
let appCustomers = JSON.parse(localStorage.getItem(KEY_CUSTOMERS) || 'null') || DEMO_CUSTOMERS;

// Current Active Tab
let currentTab = 'dashboard';

// POS Current Cart
let posCart = [
  { serviceId: 'srv-1', name: 'Cuci Komplit Reguler', unit: 'KG', qty: 3, unitPrice: 8000, subtotal: 24000 }
];

// Filter State
let orderFilterStatus = 'SEMUA';
let orderSearchTerm = '';

// Formatting Utilities
function formatRupiah(amount) {
  const num = Math.round(Number(amount) || 0);
  return (appConfig.currency || 'Rp') + ' ' + num.toLocaleString('id-ID');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

// Dynamic Theme & Branding Applicator
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

  // Update Brand text
  const brandName = escapeHtml(appConfig.businessName || 'DEXX');
  const brandAccent = escapeHtml(appConfig.businessNameAccent || 'LAUNDRY');

  const brandEl = document.getElementById('brandTextDisplay');
  if (brandEl) {
    brandEl.innerHTML = `${brandName}<span class="brand-accent" id="brandAccentDisplay">${brandAccent}</span>`;
  }

  // Update Outlet label
  const outletLabel = document.getElementById('currentOutletDisplay');
  if (outletLabel) outletLabel.textContent = appConfig.activeOutlet || 'Cabang Utama';

  const headerOutlet = document.getElementById('headerOutletSelect');
  if (headerOutlet) headerOutlet.value = appConfig.activeOutlet || 'Cabang Utama (Pusat)';
}

// Tab Switching
function switchTab(tabId) {
  currentTab = tabId;

  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.view-section').forEach(view => {
    view.classList.toggle('active', view.id === `view-${tabId}`);
  });

  closeMobileSidebar();

  if (tabId === 'dashboard') renderDashboard();
  if (tabId === 'orders') renderOrdersTab();
  if (tabId === 'pos') renderPosTab();
  if (tabId === 'customers') renderCustomersTab();
  if (tabId === 'services') renderServicesTab();
  if (tabId === 'reports') renderReportsTab();
  if (tabId === 'supabase') renderSupabaseTab();
}

// -------------------------------------------------------------
// DUMMY DATA DELETION & RESET (100% Guaranteed Without Broken Prompts)
// -------------------------------------------------------------

/**
 * Direct Instant Delete for Single Order Row
 * No window.confirm needed - deletes immediately & shows undo toast
 */
function deleteOrder(orderId) {
  const target = appOrders.find(o => o.id === orderId);
  const orderNum = target ? target.orderNumber : '';

  appOrders = appOrders.filter(o => o.id !== orderId);
  saveOrders();
  renderDashboard();
  renderOrdersTab();
  showToast(`Transaksi ${orderNum} berhasil dihapus.`);
}

/**
 * Open In-App Modal for Deleting All Dummy Data
 * Replaces window.confirm so it NEVER gets blocked by iframe policies
 */
function openClearAllModal() {
  if (appOrders.length === 0) {
    showToast('Data transaksi sudah dalam keadaan bersih (kosong).');
    return;
  }
  const modal = document.getElementById('confirmDeleteModal');
  if (modal) {
    document.getElementById('confirmModalTitle').textContent = 'Hapus Semua Data Transaksi?';
    document.getElementById('confirmModalDesc').textContent = `Tindakan ini akan menghapus seluruh (${appOrders.length}) transaksi saat ini sehingga dashboard bersih dan siap untuk klien baru.`;
    modal.classList.add('active');
  }
}

/**
 * Execute Clear All Orders
 */
function executeClearAllOrders() {
  appOrders = [];
  saveOrders();
  localStorage.setItem(KEY_CLEARED, 'true');
  closeModal('confirmDeleteModal');
  renderDashboard();
  renderOrdersTab();
  showToast('Semua data transaksi dummy berhasil dihapus! Database sekarang bersih.');
}

/**
 * Load Demo Orders for Testing
 */
function loadDemoOrders() {
  appOrders = JSON.parse(JSON.stringify(DEMO_ORDERS));
  localStorage.removeItem(KEY_CLEARED);
  saveOrders();
  renderDashboard();
  renderOrdersTab();
  showToast('Data contoh berhasil dimuat kembali.');
}

function saveOrders() {
  localStorage.setItem(KEY_ORDERS, JSON.stringify(appOrders));
}

function saveConfig() {
  localStorage.setItem(KEY_CONFIG, JSON.stringify(appConfig));
  applyTheme();
}

function saveCustomers() {
  localStorage.setItem(KEY_CUSTOMERS, JSON.stringify(appCustomers));
}

function saveServices() {
  localStorage.setItem(KEY_SERVICES, JSON.stringify(appServices));
}

function showToast(msg) {
  const existing = document.getElementById('globalAppToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'globalAppToast';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background-color: var(--accent-primary, #0D9488);
    color: #FFFFFF;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 0.8125rem;
    font-weight: 700;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: modalPop 0.2s ease forwards;
  `;
  toast.innerHTML = `<span>${ICONS.check}</span><span>${escapeHtml(msg)}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 2800);
}

// -------------------------------------------------------------
// RENDER VIEWS
// -------------------------------------------------------------

function renderDashboard() {
  const totalPaid = appOrders.filter(o => o.paymentStatus === 'LUNAS').reduce((s, o) => s + o.totalPrice, 0);
  const activeOrders = appOrders.filter(o => o.status !== 'SELESAI' && o.status !== 'BATAL');
  const readyOrders = appOrders.filter(o => o.status === 'SIAP');

  document.getElementById('metricRevenue').textContent = formatRupiah(totalPaid);
  document.getElementById('metricActiveOrders').textContent = `${activeOrders.length} Nota`;
  document.getElementById('metricReadyOrders').textContent = `${readyOrders.length} Cucian`;
  document.getElementById('metricCustomers').textContent = (appCustomers.length).toString();

  const sidebarOrderBadge = document.getElementById('sidebarOrderBadge');
  if (sidebarOrderBadge) {
    sidebarOrderBadge.textContent = activeOrders.length.toString();
    sidebarOrderBadge.style.display = activeOrders.length > 0 ? 'inline-block' : 'none';
  }

  const stages = ['MASUK', 'CUCI', 'KERING', 'SETRIKA', 'SIAP'];
  stages.forEach(st => {
    const el = document.getElementById('count-stage-' + st.toLowerCase());
    if (el) {
      el.textContent = appOrders.filter(o => o.status === st).length.toString();
    }
  });

  const listEl = document.getElementById('recentOrdersList');
  if (listEl) {
    if (appOrders.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">${ICONS.package}</div>
          <div class="empty-state-title">Data Transaksi Bersih (0 Pesanan)</div>
          <div class="empty-state-desc">Belum ada transaksi dalam database. Anda dapat menginput transaksi kasir baru atau memuat data contoh untuk pratinjau.</div>
          <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button onclick="switchTab('pos')" class="btn-primary">
              ${ICONS.plus}
              <span>Buat Order Baru</span>
            </button>
            <button onclick="loadDemoOrders()" class="btn-secondary">
              <span>Muat Data Demo</span>
            </button>
          </div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = appOrders.slice(0, 6).map(order => {
      const initials = (order.customerName || 'PL').slice(0, 2).toUpperCase();
      const itemsText = order.items.map(it => `${escapeHtml(it.name)} (${it.qty} ${it.unit})`).join(', ');

      return `
        <div class="order-item">
          <div class="order-info-group">
            <div class="order-avatar">${initials}</div>
            <div style="min-width: 0;">
              <div class="order-name">${escapeHtml(order.customerName)}</div>
              <div class="order-id">${escapeHtml(order.orderNumber)} • ${order.createdAt}</div>
              <div class="order-service-desc">${itemsText}</div>
            </div>
          </div>
          <div class="order-right-action">
            <div class="order-price-group">
              <div class="order-price">${formatRupiah(order.totalPrice)}</div>
              ${getStatusBadge(order.status)}
            </div>
            <button onclick="openWhatsAppModal('${order.id}')" title="Kirim Nota WhatsApp" class="btn-action-icon">
              ${ICONS.whatsapp}
            </button>
            <button onclick="printReceipt('${order.id}')" title="Cetak Struk Thermal" class="btn-action-icon">
              ${ICONS.printer}
            </button>
            <button onclick="advanceOrderStatus('${order.id}')" title="Lanjut ke proses berikutnya" class="btn-advance-status">
              <span>Lanjut</span>
              ${ICONS.arrowRight}
            </button>
            <button onclick="deleteOrder('${order.id}')" title="Hapus transaksi ini" class="btn-action-icon btn-delete-icon">
              ${ICONS.trash}
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
    SETRIKA: '<span class="badge badge-setrika">Setrika Uap</span>',
    SIAP: '<span class="badge badge-siap">Siap Diambil</span>',
    SELESAI: '<span class="badge badge-selesai">Selesai</span>',
    BATAL: '<span class="badge badge-batal">Dibatalkan</span>'
  };
  return map[status] || `<span class="badge">${escapeHtml(status)}</span>`;
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
    renderOrdersTab();
    showToast(`Status transaksi diupdate ke: ${order.status}`);
  }
}

function renderOrdersTab() {
  const container = document.getElementById('fullOrdersList');
  if (!container) return;

  const filtered = appOrders.filter(o => {
    const matchStatus = orderFilterStatus === 'SEMUA' ? true : o.status === orderFilterStatus;
    const matchSearch = orderSearchTerm === '' ||
      o.customerName.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
      o.customerPhone.includes(orderSearchTerm);
    return matchStatus && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">${ICONS.package}</div>
        <div class="empty-state-title">Tidak Ada Pesanan Ditemukan</div>
        <div class="empty-state-desc">Belum ada transaksi cucian yang sesuai dengan filter pencarian saat ini.</div>
        <button onclick="switchTab('pos')" class="btn-primary">
          ${ICONS.plus}
          <span>Input Pesanan Baru</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(order => {
    const isLunas = order.paymentStatus === 'LUNAS';
    const initials = (order.customerName || 'PL').slice(0, 2).toUpperCase();

    return `
      <div class="order-item">
        <div class="order-info-group">
          <div class="order-avatar">${initials}</div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span class="order-name">${escapeHtml(order.customerName)}</span>
              <span class="order-id">${escapeHtml(order.orderNumber)}</span>
              <button onclick="togglePaymentStatus('${order.id}')" class="badge ${isLunas ? 'badge-siap' : 'badge-setrika'}" style="cursor: pointer; border: none;">
                ${isLunas ? `${ICONS.check} Lunas` : `${ICONS.clock} Belum Lunas`}
              </button>
            </div>
            <div class="order-service-desc">${order.items.map(i => `${escapeHtml(i.name)} (${i.qty} ${i.unit})`).join(' + ')}</div>
            <div class="order-meta-info">
              <span>${ICONS.phone} ${escapeHtml(order.customerPhone)}</span>
              <span>•</span>
              <span>${order.createdAt}</span>
              <span>•</span>
              <span>Estimasi: ${order.estimatedReady}</span>
            </div>
          </div>
        </div>
        <div class="order-right-action">
          <div class="order-price-group">
            <div class="order-price">${formatRupiah(order.totalPrice)}</div>
            ${getStatusBadge(order.status)}
          </div>
          <button onclick="openWhatsAppModal('${order.id}')" title="Kirim Nota WA" class="btn-action-icon">
            ${ICONS.whatsapp}
          </button>
          <button onclick="printReceipt('${order.id}')" title="Cetak Struk Thermal" class="btn-action-icon">
            ${ICONS.printer}
          </button>
          <button onclick="advanceOrderStatus('${order.id}')" title="Lanjut proses" class="btn-advance-status">
            <span>Lanjut</span>
            ${ICONS.arrowRight}
          </button>
          <button onclick="deleteOrder('${order.id}')" title="Hapus transaksi" class="btn-action-icon btn-delete-icon">
            ${ICONS.trash}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setOrderFilter(status) {
  orderFilterStatus = status;
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-status') === status);
  });
  renderOrdersTab();
}

function togglePaymentStatus(orderId) {
  const order = appOrders.find(o => o.id === orderId);
  if (!order) return;
  order.paymentStatus = order.paymentStatus === 'LUNAS' ? 'BELUM_LUNAS' : 'LUNAS';
  saveOrders();
  renderOrdersTab();
  renderDashboard();
  showToast(`Status pembayaran: ${order.paymentStatus === 'LUNAS' ? 'Lunas' : 'Belum Lunas'}`);
}

// -------------------------------------------------------------
// POS / KASIR ENGINE
// -------------------------------------------------------------

function renderPosTab() {
  const srvGrid = document.getElementById('posServicesList');
  if (srvGrid) {
    srvGrid.innerHTML = appServices.map(srv => `
      <div onclick="addServiceToPosCart('${srv.id}')" style="background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 12px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: var(--transition-fast);">
        <div>
          <div style="font-size: 0.8125rem; font-weight: 700; color: var(--text-primary);">${escapeHtml(srv.name)}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">
            ${formatRupiah(srv.price)} / ${srv.unit} • ${srv.duration || 24} Jam
          </div>
        </div>
        <button type="button" class="btn-primary" style="width: 28px; height: 28px; padding: 0; justify-content: center; border-radius: 6px;">
          ${ICONS.plus}
        </button>
      </div>
    `).join('');
  }

  const custSelect = document.getElementById('posCustomerSelect');
  if (custSelect) {
    custSelect.innerHTML = '<option value="">Pilih dari Database Pelanggan...</option>' +
      appCustomers.map(c => `<option value="${c.id}">${escapeHtml(c.name)} (${escapeHtml(c.phone)})</option>`).join('');
  }

  renderPosCart();
}

function addServiceToPosCart(serviceId) {
  const srv = appServices.find(s => s.id === serviceId);
  if (!srv) return;

  const existing = posCart.find(it => it.serviceId === serviceId);
  if (existing) {
    existing.qty += 1;
    existing.subtotal = existing.qty * existing.unitPrice;
  } else {
    posCart.push({
      serviceId: srv.id,
      name: srv.name,
      unit: srv.unit,
      qty: 1,
      unitPrice: srv.price,
      subtotal: srv.price
    });
  }
  renderPosCart();
}

function updatePosCartQty(index, delta) {
  if (!posCart[index]) return;
  const item = posCart[index];
  const newQty = Math.max(0.5, Math.round((item.qty + delta) * 10) / 10);
  item.qty = newQty;
  item.subtotal = Math.round(item.qty * item.unitPrice);
  renderPosCart();
}

function removePosCartItem(index) {
  posCart.splice(index, 1);
  renderPosCart();
}

function renderPosCart() {
  const container = document.getElementById('posCartItemsContainer');
  if (!container) return;

  if (posCart.length === 0) {
    container.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.8125rem;">Keranjang kosong. Pilih layanan di sebelah kiri.</div>';
    document.getElementById('posSubtotalDisplay').textContent = formatRupiah(0);
    document.getElementById('posTotalDisplay').textContent = formatRupiah(0);
    return;
  }

  container.innerHTML = posCart.map((item, idx) => `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px; background-color: var(--bg-surface); border-radius: 8px; margin-bottom: 8px; font-size: 0.8125rem;">
      <div style="flex: 1; min-width: 0;">
        <div style="font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(item.name)}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${formatRupiah(item.unitPrice)} / ${item.unit}</div>
      </div>
      <div style="display: flex; align-items: center; gap: 6px;">
        <button onclick="updatePosCartQty(${idx}, ${item.unit === 'KG' ? -0.5 : -1})" class="btn-action-icon" style="width: 26px; height: 26px;">-</button>
        <span style="font-family: monospace; font-weight: bold; width: 34px; text-align: center;">${item.qty}</span>
        <button onclick="updatePosCartQty(${idx}, ${item.unit === 'KG' ? 0.5 : 1})" class="btn-action-icon" style="width: 26px; height: 26px;">+</button>
        <button onclick="removePosCartItem(${idx})" class="btn-action-icon btn-delete-icon" style="width: 26px; height: 26px;">${ICONS.trash}</button>
      </div>
      <div style="font-weight: 800; font-family: monospace; width: 75px; text-align: right;">${formatRupiah(item.subtotal)}</div>
    </div>
  `).join('');

  const subtotal = posCart.reduce((s, it) => s + it.subtotal, 0);
  const discount = Number(document.getElementById('posDiscountInput')?.value) || 0;
  const total = Math.max(0, subtotal - discount);

  document.getElementById('posSubtotalDisplay').textContent = formatRupiah(subtotal);
  document.getElementById('posTotalDisplay').textContent = formatRupiah(total);
}

function handleAutofillCustomer(e) {
  const custId = e.target.value;
  if (!custId) return;
  const found = appCustomers.find(c => c.id === custId);
  if (found) {
    document.getElementById('posCustomerName').value = found.name;
    document.getElementById('posCustomerPhone').value = found.phone;
    document.getElementById('posCustomerAddress').value = found.address || '';
  }
}

function submitPosOrder(afterAction) {
  const name = document.getElementById('posCustomerName')?.value.trim();
  const phone = document.getElementById('posCustomerPhone')?.value.trim();
  const address = document.getElementById('posCustomerAddress')?.value.trim();
  const outlet = document.getElementById('posOutletSelect')?.value || appConfig.activeOutlet;
  const paymentMethod = document.getElementById('posPaymentMethod')?.value || 'CASH';
  const paymentStatus = document.getElementById('posPaymentStatus')?.value || 'LUNAS';
  const discount = Number(document.getElementById('posDiscountInput')?.value) || 0;

  if (!name) {
    showToast('Mohon masukkan nama pelanggan terlebih dahulu!');
    return;
  }
  if (posCart.length === 0) {
    showToast('Keranjang belanja kosong! Pilih minimal satu layanan.');
    return;
  }

  const subtotal = posCart.reduce((s, it) => s + it.subtotal, 0);
  const total = Math.max(0, subtotal - discount);

  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const est = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  const estStr = `${est.getFullYear()}-${pad(est.getMonth() + 1)}-${pad(est.getDate())} ${pad(est.getHours())}:${pad(est.getMinutes())}`;

  const seq = String(appOrders.length + 1).padStart(4, '0');
  const orderNumber = `TRX-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${seq}`;

  const newOrder = {
    id: `ord-${Date.now()}`,
    orderNumber,
    customerName: name,
    customerPhone: phone || '08123456789',
    customerAddress: address,
    outlet,
    items: JSON.parse(JSON.stringify(posCart)),
    totalPrice: total,
    paymentMethod,
    paymentStatus,
    status: 'MASUK',
    createdAt: dateStr,
    estimatedReady: estStr
  };

  appOrders.unshift(newOrder);
  saveOrders();

  const existingCust = appCustomers.find(c => c.name.toLowerCase() === name.toLowerCase() || (phone && c.phone === phone));
  if (existingCust) {
    existingCust.totalOrders += 1;
    existingCust.totalSpent += total;
  } else {
    appCustomers.push({
      id: `cust-${Date.now()}`,
      name,
      phone: phone || '08123456789',
      address,
      totalOrders: 1,
      totalSpent: total
    });
  }
  saveCustomers();

  document.getElementById('posCustomerName').value = '';
  document.getElementById('posCustomerPhone').value = '';
  document.getElementById('posCustomerAddress').value = '';
  document.getElementById('posDiscountInput').value = '0';
  posCart = [];
  renderPosCart();

  showToast(`Transaksi ${orderNumber} berhasil disimpan!`);

  if (afterAction === 'print') {
    printReceipt(newOrder.id);
  } else if (afterAction === 'wa') {
    openWhatsAppModal(newOrder.id);
  } else {
    switchTab('orders');
  }
}

// -------------------------------------------------------------
// CUSTOMERS & SERVICES MODAL (No window.prompt!)
// -------------------------------------------------------------

function renderCustomersTab() {
  const container = document.getElementById('customersListContainer');
  if (!container) return;

  container.innerHTML = appCustomers.map(cust => `
    <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--border-radius-custom); padding: 18px; display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <div class="order-avatar">${(cust.name || 'PL').slice(0, 2).toUpperCase()}</div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 800; font-size: 0.9375rem; color: var(--text-primary);">${escapeHtml(cust.name)}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">${ICONS.phone} ${escapeHtml(cust.phone)}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">${ICONS.location} ${escapeHtml(cust.address || 'Alamat belum diisi')}</div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 10px; background-color: var(--bg-surface); border-radius: 8px; text-align: center; font-size: 0.75rem;">
        <div>
          <div style="color: var(--text-muted);">Total Order</div>
          <div style="font-weight: 800; color: var(--text-primary); margin-top: 2px;">${cust.totalOrders || 0} Kali</div>
        </div>
        <div>
          <div style="color: var(--text-muted);">Total Belanja</div>
          <div style="font-weight: 800; color: var(--accent-primary); margin-top: 2px;">${formatRupiah(cust.totalSpent || 0)}</div>
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <a href="https://api.whatsapp.com/send?phone=${(cust.phone || '').replace(/[^0-9]/g, '')}" target="_blank" class="btn-secondary" style="flex: 1; justify-content: center; font-size: 0.75rem; text-decoration: none; padding: 6px;">
          ${ICONS.whatsapp}
          <span>Chat WhatsApp</span>
        </a>
        <button onclick="deleteCustomer('${cust.id}')" class="btn-action-icon btn-delete-icon" title="Hapus Pelanggan">
          ${ICONS.trash}
        </button>
      </div>
    </div>
  `).join('');
}

function openNewCustomerModal() {
  document.getElementById('modalCustName').value = '';
  document.getElementById('modalCustPhone').value = '';
  document.getElementById('modalCustAddress').value = '';
  const modal = document.getElementById('customerModal');
  if (modal) modal.classList.add('active');
}

function saveNewCustomerFromModal() {
  const name = document.getElementById('modalCustName')?.value.trim();
  const phone = document.getElementById('modalCustPhone')?.value.trim();
  const address = document.getElementById('modalCustAddress')?.value.trim();

  if (!name) {
    showToast('Nama pelanggan wajib diisi.');
    return;
  }

  appCustomers.unshift({
    id: `cust-${Date.now()}`,
    name,
    phone: phone || '',
    address: address || '',
    totalOrders: 0,
    totalSpent: 0
  });
  saveCustomers();
  renderCustomersTab();
  closeModal('customerModal');
  showToast('Pelanggan baru berhasil ditambahkan!');
}

function deleteCustomer(id) {
  appCustomers = appCustomers.filter(c => c.id !== id);
  saveCustomers();
  renderCustomersTab();
  showToast('Data pelanggan dihapus.');
}

function renderServicesTab() {
  const container = document.getElementById('servicesListContainer');
  if (!container) return;

  container.innerHTML = appServices.map(srv => `
    <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--border-radius-custom); padding: 18px; display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="badge badge-cuci">${escapeHtml(srv.category)}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${srv.duration || 24} Jam</span>
        </div>
        <div style="font-size: 0.9375rem; font-weight: 800; color: var(--text-primary);">${escapeHtml(srv.name)}</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">${escapeHtml(srv.description || 'Pencucian higienis dan rapi.')}</div>
        <div style="font-size: 1.125rem; font-weight: 900; color: var(--accent-primary); margin-top: 10px; font-family: monospace;">
          ${formatRupiah(srv.price)} <small style="font-size: 0.75rem; color: var(--text-muted);">/ ${srv.unit}</small>
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid var(--border-color); padding-top: 10px;">
        <button onclick="openEditServiceModal('${srv.id}')" class="btn-secondary" style="font-size: 0.75rem; padding: 6px 12px;">
          ${ICONS.edit}
          <span>Ubah Tarif</span>
        </button>
        <button onclick="deleteService('${srv.id}')" class="btn-action-icon btn-delete-icon" title="Hapus Layanan">
          ${ICONS.trash}
        </button>
      </div>
    </div>
  `).join('');
}

function openNewServiceModal() {
  document.getElementById('modalServiceId').value = '';
  document.getElementById('modalServiceName').value = '';
  document.getElementById('modalServicePrice').value = '10000';
  document.getElementById('modalServiceUnit').value = 'KG';
  document.getElementById('modalServiceCategory').value = 'KILOAN';
  document.getElementById('modalServiceDuration').value = '48';
  document.getElementById('modalServiceDesc').value = 'Pencucian higienis dan rapi.';
  document.getElementById('serviceModalTitle').innerHTML = `<span>${ICONS.plus}</span><span>Tambah Paket Layanan</span>`;
  const modal = document.getElementById('serviceModal');
  if (modal) modal.classList.add('active');
}

function openEditServiceModal(srvId) {
  const srv = appServices.find(s => s.id === srvId);
  if (!srv) return;

  document.getElementById('modalServiceId').value = srv.id;
  document.getElementById('modalServiceName').value = srv.name;
  document.getElementById('modalServicePrice').value = srv.price;
  document.getElementById('modalServiceUnit').value = srv.unit;
  document.getElementById('modalServiceCategory').value = srv.category;
  document.getElementById('modalServiceDuration').value = srv.duration || 48;
  document.getElementById('modalServiceDesc').value = srv.description || '';
  document.getElementById('serviceModalTitle').innerHTML = `<span>${ICONS.edit}</span><span>Ubah Tarif & Layanan</span>`;
  const modal = document.getElementById('serviceModal');
  if (modal) modal.classList.add('active');
}

function saveServiceFromModal() {
  const id = document.getElementById('modalServiceId')?.value;
  const name = document.getElementById('modalServiceName')?.value.trim();
  const price = Number(document.getElementById('modalServicePrice')?.value) || 0;
  const unit = document.getElementById('modalServiceUnit')?.value || 'KG';
  const category = document.getElementById('modalServiceCategory')?.value || 'KILOAN';
  const duration = Number(document.getElementById('modalServiceDuration')?.value) || 48;
  const desc = document.getElementById('modalServiceDesc')?.value.trim();

  if (!name || price <= 0) {
    showToast('Nama paket dan tarif harga wajib diisi dengan benar.');
    return;
  }

  if (id) {
    const srv = appServices.find(s => s.id === id);
    if (srv) {
      srv.name = name;
      srv.price = price;
      srv.unit = unit;
      srv.category = category;
      srv.duration = duration;
      srv.description = desc;
    }
    showToast('Tarif layanan berhasil diperbarui!');
  } else {
    appServices.push({
      id: `srv-${Date.now()}`,
      name,
      price,
      unit,
      category,
      duration,
      description: desc
    });
    showToast('Paket layanan baru berhasil ditambahkan!');
  }

  saveServices();
  renderServicesTab();
  closeModal('serviceModal');
}

function deleteService(srvId) {
  appServices = appServices.filter(s => s.id !== srvId);
  saveServices();
  renderServicesTab();
  showToast('Layanan dihapus.');
}

function renderReportsTab() {
  const lunas = appOrders.filter(o => o.paymentStatus === 'LUNAS').reduce((s, o) => s + o.totalPrice, 0);
  const belumLunas = appOrders.filter(o => o.paymentStatus === 'BELUM_LUNAS').reduce((s, o) => s + o.totalPrice, 0);
  const countCash = appOrders.filter(o => o.paymentMethod === 'CASH').length;
  const countQris = appOrders.filter(o => o.paymentMethod === 'QRIS').length;

  document.getElementById('reportLunasDisplay').textContent = formatRupiah(lunas);
  document.getElementById('reportBelumLunasDisplay').textContent = formatRupiah(belumLunas);
  document.getElementById('reportTotalTrxDisplay').textContent = `${appOrders.length} Nota`;
  document.getElementById('reportCountQris').textContent = `${countQris} Transaksi`;
}

function exportCsvReport() {
  if (appOrders.length === 0) {
    showToast('Belum ada transaksi untuk diekspor!');
    return;
  }
  const headers = ['No. Nota', 'Tanggal', 'Pelanggan', 'No. HP', 'Cabang', 'Total', 'Metode Bayar', 'Status Bayar', 'Status Pengerjaan'];
  const rows = appOrders.map(o => [
    `"${o.orderNumber}"`,
    `"${o.createdAt}"`,
    `"${o.customerName}"`,
    `"${o.customerPhone}"`,
    `"${o.outlet}"`,
    o.totalPrice,
    `"${o.paymentMethod}"`,
    `"${o.paymentStatus}"`,
    `"${o.status}"`
  ]);
  const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', `laporan_laundry_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function renderSupabaseTab() {}

function copySupabaseSql() {
  const sql = document.getElementById('supabaseSqlCode')?.innerText;
  if (sql) {
    navigator.clipboard.writeText(sql);
    showToast('SQL DDL & Index Script berhasil disalin!');
  }
}

// -------------------------------------------------------------
// SECRET ADMIN DYNAMIC CONFIGURATION (Ctrl+Shift+X)
// -------------------------------------------------------------

let logoClicks = 0;
let logoTimer = null;

function setupSecretTriggers() {
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'X' || e.key === 'x')) {
      e.preventDefault();
      openSecretPinModal();
    }
  });

  const brand = document.getElementById('sidebarBrandTitle');
  if (brand) {
    brand.addEventListener('click', () => {
      logoClicks++;
      clearTimeout(logoTimer);
      logoTimer = setTimeout(() => { logoClicks = 0; }, 800);
      if (logoClicks >= 3) {
        logoClicks = 0;
        openSecretPinModal();
      }
    });
  }
}

function openSecretPinModal() {
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
  const err = document.getElementById('pinErrorMsg');
  const entered = input ? input.value.trim() : '';

  if (entered === (appConfig.secretPin || 'admin123')) {
    if (err) err.style.display = 'none';
    closeModal('secretPinModal');
    openSecretConfigModal();
  } else {
    if (err) {
      err.textContent = 'PIN Salah! Default PIN: admin123';
      err.style.display = 'block';
    }
  }
}

function openSecretConfigModal() {
  const modal = document.getElementById('secretConfigModal');
  if (!modal) return;

  document.getElementById('cfgBusinessName').value = appConfig.businessName || 'DEXX';
  document.getElementById('cfgBusinessAccent').value = appConfig.businessNameAccent || 'LAUNDRY';
  document.getElementById('cfgTagline').value = appConfig.tagline || '';
  document.getElementById('cfgWhatsapp').value = appConfig.whatsapp || '';
  document.getElementById('cfgPhone').value = appConfig.phone || '';
  document.getElementById('cfgAddress').value = appConfig.address || '';
  document.getElementById('cfgColorAccent').value = appConfig.theme.accentColor || '#0D9488';
  document.getElementById('cfgSupabaseUrl').value = appConfig.supabase.url || '';
  document.getElementById('cfgSupabaseKey').value = appConfig.supabase.anonKey || '';
  document.getElementById('cfgSecretPin').value = appConfig.secretPin || 'admin123';
  document.getElementById('cfgWhatsappTpl').value = appConfig.whatsappTemplate || DEFAULT_CONFIG.whatsappTemplate;

  modal.classList.add('active');
}

function saveSecretConfigFromModal() {
  appConfig.businessName = document.getElementById('cfgBusinessName').value.trim() || 'DEXX';
  appConfig.businessNameAccent = document.getElementById('cfgBusinessAccent').value.trim() || 'LAUNDRY';
  appConfig.tagline = document.getElementById('cfgTagline').value.trim();
  appConfig.whatsapp = document.getElementById('cfgWhatsapp').value.trim();
  appConfig.phone = document.getElementById('cfgPhone').value.trim();
  appConfig.address = document.getElementById('cfgAddress').value.trim();
  const color = document.getElementById('cfgColorAccent').value;
  appConfig.theme.accentColor = color;
  appConfig.theme.accentHover = color;
  appConfig.supabase.url = document.getElementById('cfgSupabaseUrl').value.trim();
  appConfig.supabase.anonKey = document.getElementById('cfgSupabaseKey').value.trim();
  appConfig.secretPin = document.getElementById('cfgSecretPin').value.trim() || 'admin123';
  appConfig.whatsappTemplate = document.getElementById('cfgWhatsappTpl').value.trim();

  saveConfig();
  renderDashboard();
  closeModal('secretConfigModal');
  showToast('Konfigurasi klien berhasil disimpan secara dinamis!');
}

function applyPresetColor(colorHex) {
  document.getElementById('cfgColorAccent').value = colorHex;
  appConfig.theme.accentColor = colorHex;
  appConfig.theme.accentHover = colorHex;
  applyTheme();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// -------------------------------------------------------------
// WHATSAPP & RECEIPT PRINT ENGINE
// -------------------------------------------------------------

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
           .split('{status_bayar}').join(order.paymentStatus === 'LUNAS' ? 'Lunas' : 'Belum Lunas')
           .split('{estimasi}').join(order.estimatedReady)
           .split('{nama_laundry}').join((appConfig.businessName || 'DEXX') + ' ' + (appConfig.businessNameAccent || 'LAUNDRY'))
           .split('{alamat_laundry}').join(appConfig.address || '')
           .split('{wa_laundry}').join(appConfig.whatsapp || '');

  const phoneSanitized = (order.customerPhone || '').replace(/[^0-9]/g, '');
  const finalPhone = phoneSanitized.startsWith('0') ? '62' + phoneSanitized.slice(1) : phoneSanitized;
  const waUrl = `https://api.whatsapp.com/send?phone=${finalPhone}&text=${encodeURIComponent(msg)}`;

  const modal = document.getElementById('whatsappModal');
  if (modal) {
    document.getElementById('waTargetDisplay').textContent = `${order.customerName} (${order.customerPhone})`;
    document.getElementById('waMessageTextarea').value = msg;
    const sendBtn = document.getElementById('btnSendWaAction');
    if (sendBtn) {
      sendBtn.onclick = () => window.open(waUrl, '_blank');
    }
    modal.classList.add('active');
  }
}

function copyWaText() {
  const txt = document.getElementById('waMessageTextarea')?.value;
  if (txt) {
    navigator.clipboard.writeText(txt);
    showToast('Teks pesan WhatsApp berhasil disalin.');
  }
}

function printReceipt(orderId) {
  const order = appOrders.find(o => o.id === orderId);
  if (!order) return;

  const receiptBody = document.getElementById('thermalReceiptBody');
  if (receiptBody) {
    const itemsHtml = order.items.map(it => `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <div>${escapeHtml(it.name)}<br><small style="color: #666;">${it.qty} ${it.unit} x ${formatRupiah(it.unitPrice)}</small></div>
        <div style="font-weight: bold; text-align: right;">${formatRupiah(it.subtotal)}</div>
      </div>
    `).join('');

    receiptBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 8px;">
        <h2 style="font-size: 15px; margin: 0; font-weight: 800; letter-spacing: 0.5px;">${escapeHtml(appConfig.businessName)} ${escapeHtml(appConfig.businessNameAccent)}</h2>
        <div style="font-size: 10px; margin-top: 2px;">${escapeHtml(appConfig.tagline)}</div>
        <div style="font-size: 10px; color: #555; margin-top: 2px;">${escapeHtml(appConfig.address)}</div>
        <div style="font-size: 10px; color: #555;">WA: ${escapeHtml(appConfig.whatsapp)}</div>
      </div>
      <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
      <div style="font-size: 10px; line-height: 1.4;">
        <div>No. Nota : <strong>${escapeHtml(order.orderNumber)}</strong></div>
        <div>Tanggal  : ${escapeHtml(order.createdAt)}</div>
        <div>Pelanggan: <strong>${escapeHtml(order.customerName)}</strong> (${escapeHtml(order.customerPhone)})</div>
        <div>Outlet   : ${escapeHtml(order.outlet)}</div>
      </div>
      <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
      <div style="font-size: 10px;">${itemsHtml}</div>
      <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
      <div style="font-size: 11px; font-weight: bold; display: flex; justify-content: space-between;">
        <span>TOTAL BAYAR:</span>
        <span>${formatRupiah(order.totalPrice)}</span>
      </div>
      <div style="font-size: 10px; color: #444; margin-top: 4px; display: flex; justify-content: space-between;">
        <span>Metode: ${escapeHtml(order.paymentMethod)}</span>
        <span>Status: ${escapeHtml(order.paymentStatus)}</span>
      </div>
      <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
      <div style="text-align: center; font-size: 10px; color: #555; line-height: 1.4;">
        <div>Estimasi Selesai: <strong>${escapeHtml(order.estimatedReady)}</strong></div>
        <br>
        <div>TERIMA KASIH</div>
        <div>Mohon membawa struk ini saat pengambilan cucian.</div>
      </div>
    `;

    const modal = document.getElementById('receiptModal');
    if (modal) modal.classList.add('active');
  }
}

function triggerBrowserPrint() {
  window.print();
}

// Mobile Drawer
function toggleMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.toggle('mobile-open');
  if (backdrop) backdrop.classList.toggle('active');
}

function closeMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (backdrop) backdrop.classList.remove('active');
}

// DOM Ready Init
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  renderDashboard();
  setupSecretTriggers();

  const searchInput = document.getElementById('globalSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      orderSearchTerm = e.target.value.trim();
      if (currentTab === 'dashboard') renderDashboard();
      if (currentTab === 'orders') renderOrdersTab();
    });
  }
});
