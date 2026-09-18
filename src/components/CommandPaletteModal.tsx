import React, { useState, useEffect } from 'react';
import { InventoryItem, ModuleId } from '../types/erp';

// Declare SpeechRecognition interfaces for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  onNavigate: (module: ModuleId) => void;
  onSelectPo: (poNum: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  items,
  onNavigate,
  onSelectPo,
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSupported(true);
    }
  }, []);

  const handleVoiceSearch = () => {
    if (!voiceSupported) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'fa-IR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = items.filter((i) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      i.name.toLowerCase().includes(q) ||
      i.sku.toLowerCase().includes(q) ||
      i.hsCode.toLowerCase().includes(q) ||
      i.brand.toLowerCase().includes(q)
    );
  }).slice(0, 5);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-lg shadow-2xl border border-[#c4c6cf] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150 text-[#0d1c2e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-[#e6eeff] bg-[#eff4ff]">
          <span className="material-symbols-outlined text-[20px] text-[#002045] ml-2">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isListening ? "در حال گوش دادن..." : "جستجوی سریع در کاتالوگ کالا، اسناد خرید، کمیسیون، مشتریان..."}
            className="w-full bg-transparent text-xs text-[#0d1c2e] outline-none placeholder-[#74777f]"
          />
          {voiceSupported && (
            <button
              onClick={handleVoiceSearch}
              className={`p-1.5 rounded-full flex items-center justify-center transition-colors ml-2 ${
                isListening ? 'bg-[#ffdad6] text-[#ba1a1a] animate-pulse' : 'hover:bg-[#e6eeff] text-[#3b82f6]'
              }`}
              title="جستجوی صوتی"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
          )}
          <kbd className="px-2 py-0.5 rounded bg-[#e6eeff] text-[10px] font-mono text-[#505f7b]">
            ESC
          </kbd>
        </div>

        {/* Quick Navigation Commands */}
        <div className="p-2 border-b border-[#eff4ff] flex flex-col gap-1 text-xs">
          <span className="text-[10px] text-[#74777f] px-2 font-semibold">بخش‌های پرکاربرد:</span>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => {
                onNavigate('command-center');
                onClose();
              }}
              className="text-right px-2.5 py-1.5 rounded hover:bg-[#eff4ff] flex items-center gap-2 text-[#0d1c2e]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#002045]">dashboard</span>
              <span>مرکز فرماندهی هلدینگ</span>
            </button>
            <button
              onClick={() => {
                onNavigate('inventory');
                onClose();
              }}
              className="text-right px-2.5 py-1.5 rounded hover:bg-[#eff4ff] flex items-center gap-2 text-[#0d1c2e]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#002045]">warehouse</span>
              <span>کاتالوگ جامع کالا و کاردکس</span>
            </button>
            <button
              onClick={() => {
                onNavigate('purchasing');
                onClose();
              }}
              className="text-right px-2.5 py-1.5 rounded hover:bg-[#eff4ff] flex items-center gap-2 text-[#0d1c2e]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#002045]">shopping_cart_checkout</span>
              <span>کمیسیون معاملات و خرید</span>
            </button>
            <button
              onClick={() => {
                onNavigate('approvals');
                onClose();
              }}
              className="text-right px-2.5 py-1.5 rounded hover:bg-[#eff4ff] flex items-center gap-2 text-[#0d1c2e]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#002045]">fact_check</span>
              <span>کارتابل تأییدات و ممیزی</span>
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="p-2 flex flex-col gap-1 max-h-64 overflow-y-auto text-xs">
          <span className="text-[10px] text-[#74777f] px-2 font-semibold">ردیف‌های کاتالوگ منطبق:</span>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onNavigate('inventory');
                onClose();
              }}
              className="p-2 rounded hover:bg-[#eff4ff] cursor-pointer flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-[#002045] bg-[#e6eeff] px-1.5 py-0.5 rounded">
                  {item.sku}
                </span>
                <span className="font-medium text-[#0d1c2e]">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-tabular text-[#505f7b]">
                <span>موجودی: {item.physicalStock} {item.unit}</span>
                <span className="text-[#002045] font-semibold">{item.averageUnitCostRials.toLocaleString('fa-IR')} ریال</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#eff4ff] border-t border-[#e6eeff] flex items-center justify-between text-[11px] text-[#505f7b]">
          <span>راهنما: از کلیدهای جهت‌نما برای انتخاب و اینتر برای ورود استفاده فرمایید</span>
          <span className="font-mono">KAVOSH ERP v4.2</span>
        </div>
      </div>
    </div>
  );
};
