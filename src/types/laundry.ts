export type OrderStatus = 'MASUK' | 'CUCI' | 'KERING' | 'SETRIKA' | 'SIAP' | 'SELESAI' | 'BATAL';
export type PaymentStatus = 'LUNAS' | 'BELUM_LUNAS';
export type PaymentMethod = 'CASH' | 'QRIS' | 'TRANSFER';
export type ServiceCategory = 'KILOAN' | 'SATUAN' | 'EXPRESS' | 'SPECIAL';
export type ServiceUnit = 'KG' | 'PCS' | 'METER' | 'PASANG';

export interface LaundryTheme {
  accentColor: string; // e.g. #0D9488 (Teal)
  accentHover: string;
  bgMain: string;      // e.g. #0B1120
  bgCard: string;      // e.g. #131C31
  bgSurface: string;   // e.g. #1E293B
  textColor: string;   // e.g. #F8FAFC
  textSecondary: string; // e.g. #94A3B8
  borderColor: string; // e.g. #1E293B
  borderRadius: string;// e.g. 12px
  fontFamily: string;  // e.g. Plus Jakarta Sans
  presetName: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
  useSupabase: boolean;
  tableNamePrefix?: string;
}

export interface LaundryConfig {
  businessName: string;
  businessNameAccent: string; // e.g. "LAUNDRY" for DEXX"LAUNDRY"
  tagline: string;
  logoEmoji: string;
  logoUrl?: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  address: string;
  currency: string;
  taxRatePercent: number;
  activeOutlet: string;
  outlets: string[];
  theme: LaundryTheme;
  supabase: SupabaseConfig;
  secretPin: string;
  whatsappTemplate: string;
}

export interface OrderItem {
  serviceId: string;
  serviceName: string;
  unit: ServiceUnit;
  qty: number;
  unitPrice: number;
  subtotal: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. TRX-2026-0042
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  outlet: string;
  items: OrderItem[];
  totalWeightOrQty: number;
  subtotal: number;
  discount: number;
  tax: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: string;
  estimatedReady: string;
  finishedAt?: string;
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  unit: ServiceUnit;
  price: number;
  durationHours: number;
  description: string;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  notes?: string;
}
