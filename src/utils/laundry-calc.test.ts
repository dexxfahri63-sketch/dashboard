import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOrderTotals,
  formatCurrency,
  generateOrderNumber,
  getStatusLabel,
  getNextStatus,
  formatWhatsAppMessage,
  validateSecretPin,
  DEFAULT_CONFIG,
} from './laundry-calc';
import { Order } from '../types/laundry';

test('calculateOrderTotals correctly calculates subtotal, discounts, tax, and total', () => {
  const items = [
    { qty: 3, unitPrice: 8000 },  // 24000
    { qty: 2, unitPrice: 15000 }, // 30000
  ];
  // Subtotal = 54,000. Discount = 4,000 -> 50,000. Tax = 10% -> 5,000. Total = 55,000.
  const result = calculateOrderTotals(items, 4000, 10);
  assert.equal(result.subtotal, 54000);
  assert.equal(result.discountAmount, 4000);
  assert.equal(result.taxAmount, 5000);
  assert.equal(result.total, 55000);
  assert.equal(result.totalQty, 5);
});

test('calculateOrderTotals clamps discount so total is never negative', () => {
  const items = [{ qty: 1, unitPrice: 10000 }];
  const result = calculateOrderTotals(items, 50000, 0);
  assert.equal(result.subtotal, 10000);
  assert.equal(result.discountAmount, 10000);
  assert.equal(result.total, 0);
});

test('formatCurrency formats Indonesian Rupiah properly', () => {
  const formatted = formatCurrency(45000);
  assert.equal(formatted.includes('Rp'), true);
  assert.equal(formatted.includes('45.000'), true);
});

test('generateOrderNumber creates standardized format TRX-YYYYMMDD-XXXX', () => {
  const mockDate = new Date('2026-11-05T12:00:00Z');
  const orderNum = generateOrderNumber(42, 'TRX', mockDate);
  assert.equal(orderNum, 'TRX-20261105-0042');
});

test('getNextStatus progresses through laundry workflow stages correctly', () => {
  assert.equal(getNextStatus('MASUK'), 'CUCI');
  assert.equal(getNextStatus('CUCI'), 'KERING');
  assert.equal(getNextStatus('KERING'), 'SETRIKA');
  assert.equal(getNextStatus('SETRIKA'), 'SIAP');
  assert.equal(getNextStatus('SIAP'), 'SELESAI');
  assert.equal(getNextStatus('SELESAI'), null);
});

test('validateSecretPin checks client admin pin securely', () => {
  assert.equal(validateSecretPin('admin123', 'admin123'), true);
  assert.equal(validateSecretPin(' admin123 ', 'admin123'), true);
  assert.equal(validateSecretPin('wrong', 'admin123'), false);
});

test('formatWhatsAppMessage replaces tokens accurately', () => {
  const mockOrder: Order = {
    id: 'ord-test',
    orderNumber: 'TRX-20261105-0099',
    customerName: 'Budi Santoso',
    customerPhone: '08123456789',
    outlet: 'Cabang Utama (Pusat)',
    items: [
      {
        serviceId: 'srv-1',
        serviceName: 'Cuci Komplit Reguler',
        unit: 'KG',
        qty: 4,
        unitPrice: 8000,
        subtotal: 32000,
      },
    ],
    totalWeightOrQty: 4,
    subtotal: 32000,
    discount: 0,
    tax: 0,
    totalPrice: 32000,
    paymentMethod: 'QRIS',
    paymentStatus: 'LUNAS',
    status: 'MASUK',
    createdAt: '2026-11-05 10:00',
    estimatedReady: '2026-11-07 10:00',
  };

  const message = formatWhatsAppMessage(
    'Nota {nota} untuk {nama} seharga {total}. Status: {status}',
    mockOrder,
    DEFAULT_CONFIG
  );

  assert.equal(message.includes('TRX-20261105-0099'), true);
  assert.equal(message.includes('Budi Santoso'), true);
  assert.equal(message.includes('Antrian Masuk'), true);
  assert.equal(message.includes('Rp 32.000'), true);
});
