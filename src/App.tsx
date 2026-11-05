import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { OrdersView } from './components/OrdersView';
import { PosView } from './components/PosView';
import { CustomersView } from './components/CustomersView';
import { ServicesView } from './components/ServicesView';
import { ReportsView } from './components/ReportsView';
import { SupabaseSetupView } from './components/SupabaseSetupView';
import { ExportFilesView } from './components/ExportFilesView';
import { SecretAdminModal } from './components/SecretAdminModal';
import { ReceiptModal } from './components/ReceiptModal';
import { WhatsAppModal } from './components/WhatsAppModal';

import {
  LaundryConfig,
  Order,
  Service,
  Customer,
  OrderStatus,
  PaymentStatus,
} from './types/laundry';
import {
  DEFAULT_CONFIG,
  INITIAL_SERVICES,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  applyThemeToDocument,
  getNextStatus,
} from './utils/laundry-calc';

const STORAGE_KEY_CONFIG = 'dexxlaundry_app_config_v1';
const STORAGE_KEY_ORDERS = 'dexxlaundry_app_orders_v1';
const STORAGE_KEY_SERVICES = 'dexxlaundry_app_services_v1';
const STORAGE_KEY_CUSTOMERS = 'dexxlaundry_app_customers_v1';

export default function App() {
  // Load State from LocalStorage with defaults
  const [config, setConfig] = useState<LaundryConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SERVICES);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CUSTOMERS);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  // UI Navigation & Modals
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSecretAdminOpen, setIsSecretAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [whatsAppOrder, setWhatsAppOrder] = useState<Order | null>(null);

  // Apply theme dynamically on mount and whenever config changes
  useEffect(() => {
    applyThemeToDocument(config.theme);
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  }, [config]);

  // Persist data updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  // Global Secret Shortcut Listener (Ctrl + Shift + X or Cmd + Shift + X)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'X' || e.key === 'x')) {
        e.preventDefault();
        setIsSecretAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSaveConfig = (updated: LaundryConfig) => {
    setConfig(updated);
    applyThemeToDocument(updated.theme);
  };

  const handleCreateOrder = (
    newOrder: Order,
    options?: { printReceipt?: boolean; sendWa?: boolean }
  ) => {
    setOrders([newOrder, ...orders]);

    // Update customer stats or add if new
    const existingCust = customers.find(
      (c) => c.phone === newOrder.customerPhone || c.name === newOrder.customerName
    );

    if (existingCust) {
      setCustomers(
        customers.map((c) =>
          c.id === existingCust.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: c.totalSpent + newOrder.totalPrice,
                lastOrderDate: newOrder.createdAt.split(' ')[0],
              }
            : c
        )
      );
    } else {
      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        name: newOrder.customerName,
        phone: newOrder.customerPhone,
        address: newOrder.customerAddress || '',
        totalOrders: 1,
        totalSpent: newOrder.totalPrice,
        lastOrderDate: newOrder.createdAt.split(' ')[0],
      };
      setCustomers([newCust, ...customers]);
    }

    if (options?.printReceipt) {
      setReceiptOrder(newOrder);
    } else if (options?.sendWa) {
      setWhatsAppOrder(newOrder);
    } else {
      setActiveTab('orders');
    }
  };

  const handleAdvanceStatus = (orderId: string) => {
    setOrders(
      orders.map((o) => {
        if (o.id === orderId) {
          const next = getNextStatus(o.status);
          return next ? { ...o, status: next } : o;
        }
        return o;
      })
    );
  };

  const handleUpdatePaymentStatus = (orderId: string, status: PaymentStatus) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o))
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter((o) => o.id !== orderId));
  };

  const handleAddCustomer = (customer: Customer) => {
    setCustomers([customer, ...customers]);
  };

  const handleSelectCustomerForOrder = (customer: Customer) => {
    setActiveTab('pos');
  };

  const handleUpdateSupabaseConfig = (url: string, key: string) => {
    setConfig({
      ...config,
      supabase: {
        ...config.supabase,
        url,
        anonKey: key,
        isConnected: Boolean(url && key),
      },
    });
  };

  const handleChangeOutlet = (outlet: string) => {
    setConfig({
      ...config,
      activeOutlet: outlet,
    });
  };

  const pendingOrdersCount = orders.filter(
    (o) => o.status !== 'SELESAI' && o.status !== 'BATAL'
  ).length;

  return (
    <div
      className="flex min-h-screen font-sans selection:bg-teal-500 selection:text-white"
      style={{
        backgroundColor: 'var(--bg-main, #0B1120)',
        color: 'var(--text-primary, #F8FAFC)',
      }}
    >
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }}
        config={config}
        onOpenSecretAdmin={() => setIsSecretAdminOpen(true)}
        pendingOrdersCount={pendingOrdersCount}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main App Content */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-y-auto">
        <Navbar
          config={config}
          onOpenSecretAdmin={() => setIsSecretAdminOpen(true)}
          onOpenPos={() => setActiveTab('pos')}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onChangeOutlet={handleChangeOutlet}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main className="flex-1 pb-16">
          {activeTab === 'dashboard' && (
            <DashboardView
              orders={orders}
              config={config}
              onOpenPos={() => setActiveTab('pos')}
              onOpenCustomers={() => setActiveTab('customers')}
              onOpenSecretAdmin={() => setIsSecretAdminOpen(true)}
              onAdvanceStatus={handleAdvanceStatus}
              onPrintReceipt={(order) => setReceiptOrder(order)}
              onOpenWhatsApp={(order) => setWhatsAppOrder(order)}
              onViewAllOrders={() => setActiveTab('orders')}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              orders={orders}
              config={config}
              onOpenPos={() => setActiveTab('pos')}
              onAdvanceStatus={handleAdvanceStatus}
              onUpdatePaymentStatus={handleUpdatePaymentStatus}
              onDeleteOrder={handleDeleteOrder}
              onPrintReceipt={(order) => setReceiptOrder(order)}
              onOpenWhatsApp={(order) => setWhatsAppOrder(order)}
            />
          )}

          {activeTab === 'pos' && (
            <PosView
              services={services.filter((s) => s.isActive)}
              customers={customers}
              config={config}
              orderCount={orders.length}
              onCreateOrder={handleCreateOrder}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersView
              customers={customers}
              config={config}
              onAddCustomer={handleAddCustomer}
              onSelectCustomerForOrder={handleSelectCustomerForOrder}
            />
          )}

          {activeTab === 'services' && (
            <ServicesView
              services={services}
              config={config}
              onUpdateServices={setServices}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView orders={orders} config={config} />
          )}

          {activeTab === 'supabase' && (
            <SupabaseSetupView
              config={config}
              onUpdateSupabaseConfig={handleUpdateSupabaseConfig}
            />
          )}

          {activeTab === 'export' && <ExportFilesView />}
        </main>
      </div>

      {/* Modals */}
      <SecretAdminModal
        isOpen={isSecretAdminOpen}
        onClose={() => setIsSecretAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />

      <ReceiptModal
        order={receiptOrder}
        config={config}
        onClose={() => setReceiptOrder(null)}
      />

      <WhatsAppModal
        order={whatsAppOrder}
        config={config}
        onClose={() => setWhatsAppOrder(null)}
      />
    </div>
  );
}
