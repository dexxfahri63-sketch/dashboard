import { Order, OrderItem, OrderStatus, LaundryConfig, LaundryTheme, Service, Customer } from '../types/laundry';

export function formatCurrency(amount: number, currency = 'Rp'): string {
  const formatted = Math.round(amount).toLocaleString('id-ID');
  return `${currency} ${formatted}`;
}

export function calculateOrderTotals(
  items: Array<{ qty: number; unitPrice: number }>,
  discount = 0,
  taxPercent = 0
): {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  totalQty: number;
} {
  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
  const discountAmount = Math.max(0, Math.min(subtotal, discount));
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = Math.round((afterDiscount * taxPercent) / 100);
  const total = Math.max(0, afterDiscount + taxAmount);
  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  return {
    subtotal,
    discountAmount,
    taxAmount,
    total,
    totalQty,
  };
}

export function generateOrderNumber(sequence: number, prefix = 'TRX', date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const seqPadded = String(sequence).padStart(4, '0');
  return `${prefix}-${year}${month}${day}-${seqPadded}`;
}

export function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case 'MASUK':
      return 'Antrian Masuk';
    case 'CUCI':
      return 'Proses Cuci';
    case 'KERING':
      return 'Pengeringan';
    case 'SETRIKA':
      return 'Setrika / Finishing';
    case 'SIAP':
      return 'Siap Diambil';
    case 'SELESAI':
      return 'Selesai / Diambil';
    case 'BATAL':
      return 'Dibatalkan';
    default:
      return status;
  }
}

export function getNextStatus(status: OrderStatus): OrderStatus | null {
  const workflow: OrderStatus[] = ['MASUK', 'CUCI', 'KERING', 'SETRIKA', 'SIAP', 'SELESAI'];
  const currentIndex = workflow.indexOf(status);
  if (currentIndex >= 0 && currentIndex < workflow.length - 1) {
    return workflow[currentIndex + 1];
  }
  return null;
}

export function formatWhatsAppMessage(template: string, order: Order, config: LaundryConfig): string {
  const itemsText = order.items
    .map((item, idx) => `${idx + 1}. ${item.serviceName} (${item.qty} ${item.unit}) - ${formatCurrency(item.subtotal, config.currency)}`)
    .join('\n');

  const replacements: Record<string, string> = {
    '{nama}': order.customerName,
    '{nota}': order.orderNumber,
    '{outlet}': order.outlet,
    '{layanan}': itemsText,
    '{total}': formatCurrency(order.totalPrice, config.currency),
    '{status}': getStatusLabel(order.status),
    '{status_bayar}': order.paymentStatus === 'LUNAS' ? 'LUNAS ✅' : 'BELUM LUNAS ⏳',
    '{metode_bayar}': order.paymentMethod,
    '{estimasi}': order.estimatedReady,
    '{nama_laundry}': config.businessName,
    '{alamat_laundry}': config.address,
    '{wa_laundry}': config.whatsapp,
  };

  let message = template;
  for (const [key, value] of Object.entries(replacements)) {
    message = message.split(key).join(value);
  }
  return message;
}

export function applyThemeToDocument(theme: LaundryTheme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--accent-primary', theme.accentColor);
  root.style.setProperty('--accent-primary-hover', theme.accentHover);
  root.style.setProperty('--bg-main', theme.bgMain);
  root.style.setProperty('--bg-card', theme.bgCard);
  root.style.setProperty('--bg-surface', theme.bgSurface);
  root.style.setProperty('--text-primary', theme.textColor);
  root.style.setProperty('--text-secondary', theme.textSecondary);
  root.style.setProperty('--border-color', theme.borderColor);
  root.style.setProperty('--border-radius-custom', theme.borderRadius);
  if (theme.fontFamily) {
    root.style.setProperty('--font-custom', theme.fontFamily);
  }
}

export function validateSecretPin(inputPin: string, correctPin: string): boolean {
  return inputPin.trim() === correctPin.trim();
}

export const THEME_PRESETS: LaundryTheme[] = [
  {
    presetName: 'Deep Teal (Dexx Original)',
    accentColor: '#0D9488',
    accentHover: '#14B8A6',
    bgMain: '#0B1120',
    bgCard: '#131C31',
    bgSurface: '#1E293B',
    textColor: '#F8FAFC',
    textSecondary: '#94A3B8',
    borderColor: '#1E293B',
    borderRadius: '12px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  {
    presetName: 'Sapphire Ocean (Modern Tech)',
    accentColor: '#2563EB',
    accentHover: '#3B82F6',
    bgMain: '#0A0F1D',
    bgCard: '#111B2E',
    bgSurface: '#19263E',
    textColor: '#F8FAFC',
    textSecondary: '#94A3B8',
    borderColor: '#1F304F',
    borderRadius: '12px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  {
    presetName: 'Emerald Fresh (Eco Clean)',
    accentColor: '#059669',
    accentHover: '#10B981',
    bgMain: '#061712',
    bgCard: '#0C271E',
    bgSurface: '#13392D',
    textColor: '#F0FDF4',
    textSecondary: '#86EFAC',
    borderColor: '#1E4E3E',
    borderRadius: '12px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  {
    presetName: 'Royal Indigo (Luxury Clean)',
    accentColor: '#7C3AED',
    accentHover: '#8B5CF6',
    bgMain: '#0F0E17',
    bgCard: '#1A1829',
    bgSurface: '#24213B',
    textColor: '#F8FAFC',
    textSecondary: '#C4B5FD',
    borderColor: '#302B4E',
    borderRadius: '14px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  {
    presetName: 'Amber Glow (Warm Wash)',
    accentColor: '#D97706',
    accentHover: '#F59E0B',
    bgMain: '#18120B',
    bgCard: '#241D13',
    bgSurface: '#34291B',
    textColor: '#FFFBEB',
    textSecondary: '#FDE68A',
    borderColor: '#453724',
    borderRadius: '10px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
];

export const DEFAULT_WHATSAPP_TEMPLATE = `Halo Kak *{nama}*! 👋
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

Notifikasi ini dikirim otomatis oleh sistem *{nama_laundry}*. Terima kasih! 🙏✨`;

export const DEFAULT_CONFIG: LaundryConfig = {
  businessName: 'DEXX',
  businessNameAccent: 'LAUNDRY',
  tagline: 'Solusi Cepat, Wangi & Bersih Higienis',
  logoEmoji: '🧺',
  logoUrl: '',
  ownerName: 'Fahri (Owner)',
  phone: '0812-3456-7890',
  whatsapp: '6281234567890',
  address: 'Jl. Merdeka No. 45, Jakarta Selatan',
  currency: 'Rp',
  taxRatePercent: 0,
  activeOutlet: 'Cabang Utama (Pusat)',
  outlets: ['Cabang Utama (Pusat)', 'Cabang Boulevard', 'Cabang Kampus'],
  theme: THEME_PRESETS[0],
  supabase: {
    url: '',
    anonKey: '',
    isConnected: false,
    useSupabase: false,
    tableNamePrefix: 'laundry_',
  },
  secretPin: 'admin123',
  whatsappTemplate: DEFAULT_WHATSAPP_TEMPLATE,
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    name: 'Cuci Komplit Reguler (Cuci + Kering + Setrika)',
    category: 'KILOAN',
    unit: 'KG',
    price: 8000,
    durationHours: 48,
    description: 'Pakaian dicuci wangi, dikeringkan mesin, dan disetrika rapi per helai.',
    isActive: true,
  },
  {
    id: 'srv-2',
    name: 'Cuci Kering Lipat (Tanpa Setrika)',
    category: 'KILOAN',
    unit: 'KG',
    price: 6000,
    durationHours: 24,
    description: 'Cocok untuk kaos harian, sprei biasa, dan handuk.',
    isActive: true,
  },
  {
    id: 'srv-3',
    name: 'Setrika Uap Presisi Saja',
    category: 'KILOAN',
    unit: 'KG',
    price: 5000,
    durationHours: 24,
    description: 'Pakaian sudah bersih dari rumah, disetrika dengan setrika uap industri.',
    isActive: true,
  },
  {
    id: 'srv-4',
    name: 'Express 4 Jam (Kilat Langsung Jadi)',
    category: 'EXPRESS',
    unit: 'KG',
    price: 15000,
    durationHours: 4,
    description: 'Prioritas utama mesin khusus, selesai dan wangi dalam 4 jam.',
    isActive: true,
  },
  {
    id: 'srv-5',
    name: 'Bed Cover King Size / Jumbo',
    category: 'SATUAN',
    unit: 'PCS',
    price: 30000,
    durationHours: 48,
    description: 'Pencucian tebal dengan sabun anti-tungau & antibakteri.',
    isActive: true,
  },
  {
    id: 'srv-6',
    name: 'Sepatu Sneaker / Canvas Deep Clean',
    category: 'SPECIAL',
    unit: 'PASANG',
    price: 35000,
    durationHours: 72,
    description: 'Deep cleaning upper, midsole, outsole & deodorizing fragrance.',
    isActive: true,
  },
  {
    id: 'srv-7',
    name: 'Jas / Blazer Formal Dry Clean',
    category: 'SATUAN',
    unit: 'PCS',
    price: 25000,
    durationHours: 48,
    description: 'Dry cleaning aman serat kain jas, include hanger & plastik pelindung.',
    isActive: true,
  },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Rudi Hartono',
    phone: '081288991122',
    address: 'Apartemen Green Pramuka Tower C 12B',
    totalOrders: 14,
    totalSpent: 420000,
    lastOrderDate: '2026-11-04',
    notes: 'Pelanggan VIP, suka pewangi Lavender',
  },
  {
    id: 'cust-2',
    name: 'Siti Rahmawati',
    phone: '085712345678',
    address: 'Jl. Melati No. 18, Kebayoran',
    totalOrders: 8,
    totalSpent: 260000,
    lastOrderDate: '2026-11-03',
    notes: 'Kemeja kantor selalu digantung hanger',
  },
  {
    id: 'cust-3',
    name: 'Dimas Prasetyo',
    phone: '081399887766',
    address: 'Kost Graha Residence Kamar 204',
    totalOrders: 5,
    totalSpent: 145000,
    lastOrderDate: '2026-11-02',
    notes: 'Bayar via QRIS',
  },
  {
    id: 'cust-4',
    name: 'dr. Anita Wijaya',
    phone: '081801239876',
    address: 'Perumahan Puri Indah Blok D-7',
    totalOrders: 21,
    totalSpent: 980000,
    lastOrderDate: '2026-11-05',
    notes: 'Order rutin jas dokter & bedcover',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'TRX-20261105-0001',
    customerName: 'Rudi Hartono',
    customerPhone: '081288991122',
    customerAddress: 'Apartemen Green Pramuka Tower C 12B',
    outlet: 'Cabang Utama (Pusat)',
    items: [
      {
        serviceId: 'srv-1',
        serviceName: 'Cuci Komplit Reguler',
        unit: 'KG',
        qty: 5,
        unitPrice: 8000,
        subtotal: 40000,
      },
    ],
    totalWeightOrQty: 5,
    subtotal: 40000,
    discount: 0,
    tax: 0,
    totalPrice: 40000,
    paymentMethod: 'QRIS',
    paymentStatus: 'LUNAS',
    status: 'CUCI',
    createdAt: '2026-11-05 08:30',
    estimatedReady: '2026-11-07 10:00',
    notes: 'Pewangi Lavender ekstra',
  },
  {
    id: 'ord-102',
    orderNumber: 'TRX-20261105-0002',
    customerName: 'Siti Rahmawati',
    customerPhone: '085712345678',
    customerAddress: 'Jl. Melati No. 18, Kebayoran',
    outlet: 'Cabang Utama (Pusat)',
    items: [
      {
        serviceId: 'srv-4',
        serviceName: 'Express 4 Jam',
        unit: 'KG',
        qty: 3,
        unitPrice: 15000,
        subtotal: 45000,
      },
    ],
    totalWeightOrQty: 3,
    subtotal: 45000,
    discount: 0,
    tax: 0,
    totalPrice: 45000,
    paymentMethod: 'CASH',
    paymentStatus: 'LUNAS',
    status: 'SETRIKA',
    createdAt: '2026-11-05 09:15',
    estimatedReady: '2026-11-05 13:15',
    notes: 'Mau dipakai meeting sore',
  },
  {
    id: 'ord-103',
    orderNumber: 'TRX-20261104-0018',
    customerName: 'dr. Anita Wijaya',
    customerPhone: '081801239876',
    customerAddress: 'Perumahan Puri Indah Blok D-7',
    outlet: 'Cabang Utama (Pusat)',
    items: [
      {
        serviceId: 'srv-5',
        serviceName: 'Bed Cover King Size',
        unit: 'PCS',
        qty: 2,
        unitPrice: 30000,
        subtotal: 60000,
      },
      {
        serviceId: 'srv-7',
        serviceName: 'Jas / Blazer Formal',
        unit: 'PCS',
        qty: 1,
        unitPrice: 25000,
        subtotal: 25000,
      },
    ],
    totalWeightOrQty: 3,
    subtotal: 85000,
    discount: 5000,
    tax: 0,
    totalPrice: 80000,
    paymentMethod: 'TRANSFER',
    paymentStatus: 'LUNAS',
    status: 'SIAP',
    createdAt: '2026-11-04 14:20',
    estimatedReady: '2026-11-05 15:00',
    notes: 'Sudah selesai & wangi, tinggal diambil',
  },
  {
    id: 'ord-104',
    orderNumber: 'TRX-20261105-0003',
    customerName: 'Dimas Prasetyo',
    customerPhone: '081399887766',
    customerAddress: 'Kost Graha Residence Kamar 204',
    outlet: 'Cabang Boulevard',
    items: [
      {
        serviceId: 'srv-2',
        serviceName: 'Cuci Kering Lipat',
        unit: 'KG',
        qty: 4,
        unitPrice: 6000,
        subtotal: 24000,
      },
    ],
    totalWeightOrQty: 4,
    subtotal: 24000,
    discount: 0,
    tax: 0,
    totalPrice: 24000,
    paymentMethod: 'QRIS',
    paymentStatus: 'BELUM_LUNAS',
    status: 'MASUK',
    createdAt: '2026-11-05 10:10',
    estimatedReady: '2026-11-06 12:00',
    notes: 'Bayar saat ambil',
  },
];
