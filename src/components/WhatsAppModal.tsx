import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { Order, LaundryConfig } from '../types/laundry';
import { formatWhatsAppMessage } from '../utils/laundry-calc';

interface WhatsAppModalProps {
  order: Order | null;
  config: LaundryConfig;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ order, config, onClose }) => {
  if (!order) return null;

  const [message, setMessage] = useState(() =>
    formatWhatsAppMessage(config.whatsappTemplate, order, config)
  );
  const [copied, setCopied] = useState(false);

  // Sanitize phone for WhatsApp Web / API
  const cleanPhone = (order.customerPhone || '').replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
  const waUrl = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(
    message
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-md rounded-3xl border shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
        style={{
          backgroundColor: 'var(--bg-card, #131C31)',
          borderColor: 'var(--border-color, #1E293B)',
        }}
      >
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--border-color, #1E293B)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Kirim Nota via WhatsApp</h3>
              <p className="text-[11px] text-slate-400">
                Penerima: {order.customerName} ({order.customerPhone})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Pratinjau Pesan (Bisa Diedit Sebelum Dikirim):
            </label>
            <textarea
              rows={9}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 font-sans focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div
          className="p-4 border-t flex items-center justify-between bg-slate-950/60"
          style={{ borderColor: 'var(--border-color, #1E293B)' }}
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin' : 'Salin Pesan'}</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Kirim ke WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
