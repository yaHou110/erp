import React, { useState } from 'react';
import { Subsidiary, Warehouse } from '../types/erp';

interface NewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  subsidiaries: Subsidiary[];
  warehouses: Warehouse[];
  onDocumentCreated: (docType: string, docNumber: string) => void;
}

export const NewDocumentModal: React.FC<NewDocumentModalProps> = ({
  isOpen,
  onClose,
  subsidiaries,
  warehouses,
  onDocumentCreated,
}) => {
  const [docType, setDocType] = useState<'PR' | 'TRANSFER' | 'SO'>('PR');
  const [selectedSubId, setSelectedSubId] = useState(subsidiaries[0].id);
  const [priority, setPriority] = useState<'emergency' | 'high' | 'normal'>('high');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('واحد نگهداری و تعمیرات (نت)');
  const [estimatedAmount, setEstimatedAmount] = useState('۱,۲۰۰,۰۰۰,۰۰۰');
  const [justification, setJustification] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = docType === 'PR' ? 'PR-1403-' : docType === 'TRANSFER' ? 'TR-1403-' : 'SO-1403-';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newDocId = `${prefix}${randNum}`;
    onDocumentCreated(docType, newDocId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-lg shadow-2xl border border-[#c4c6cf] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150 text-[#0d1c2e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e6eeff] bg-[#eff4ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#002045]">post_add</span>
            <span className="text-sm font-bold text-[#002045]">ثبت سند و مدرک تجاری جدید</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#74777f] hover:text-[#0d1c2e] p-1 rounded hover:bg-[#dce9ff]"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 text-xs">
          {/* Document Type Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-[#0d1c2e]">نوع سند تجاری قابل ردیابی:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDocType('PR')}
                className={`py-2 px-3 rounded border text-center transition-all flex flex-col items-center gap-1 ${
                  docType === 'PR'
                    ? 'bg-[#002045] text-white border-[#002045] font-bold'
                    : 'bg-[#eff4ff] text-[#505f7b] border-[#d5e3fc] hover:bg-[#dce9ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
                <span>درخواست خرید (PR)</span>
              </button>

              <button
                type="button"
                onClick={() => setDocType('TRANSFER')}
                className={`py-2 px-3 rounded border text-center transition-all flex flex-col items-center gap-1 ${
                  docType === 'TRANSFER'
                    ? 'bg-[#002045] text-white border-[#002045] font-bold'
                    : 'bg-[#eff4ff] text-[#505f7b] border-[#d5e3fc] hover:bg-[#dce9ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">move_up</span>
                <span>حواله انتقال بین‌انبار</span>
              </button>

              <button
                type="button"
                onClick={() => setDocType('SO')}
                className={`py-2 px-3 rounded border text-center transition-all flex flex-col items-center gap-1 ${
                  docType === 'SO'
                    ? 'bg-[#002045] text-white border-[#002045] font-bold'
                    : 'bg-[#eff4ff] text-[#505f7b] border-[#d5e3fc] hover:bg-[#dce9ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
                <span>پیش‌فاکتور فروش (SO)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Subsidiary */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#0d1c2e]">شرکت متعهد هلدینگ:</label>
              <select
                value={selectedSubId}
                onChange={(e) => setSelectedSubId(e.target.value)}
                className="h-8 px-2.5 rounded bg-[#eff4ff] border border-[#c4c6cf] text-[#0d1c2e] outline-none"
              >
                {subsidiaries.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#0d1c2e]">فوریت عملیاتی:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="h-8 px-2.5 rounded bg-[#eff4ff] border border-[#c4c6cf] text-[#0d1c2e] outline-none"
              >
                <option value="emergency">بحرانی / خطر توقف خط تولید</option>
                <option value="high">اولویت بالا (تأمین فوری)</option>
                <option value="normal">عادی (روال عادی گردش کار)</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0d1c2e]">عنوان عملیاتی سند:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً: تأمین قطعات یدکی پمپ هیدرولیک قفسه نورد یا انتقال ۵۰ تن شمش..."
              className="h-8 px-3 rounded bg-[#eff4ff] border border-[#c4c6cf] focus:border-[#002045] focus:bg-white text-xs text-[#0d1c2e] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Department */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#0d1c2e]">واحد یا انبار درخواست‌کننده:</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="h-8 px-3 rounded bg-[#eff4ff] border border-[#c4c6cf] text-xs text-[#0d1c2e] outline-none"
              />
            </div>

            {/* Estimated amount */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#0d1c2e]">برآورد اولیه ریالی:</label>
              <input
                type="text"
                value={estimatedAmount}
                onChange={(e) => setEstimatedAmount(e.target.value)}
                className="h-8 px-3 rounded bg-[#eff4ff] border border-[#c4c6cf] text-xs font-mono font-tabular text-[#0d1c2e] outline-none"
              />
            </div>
          </div>

          {/* Justification */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#0d1c2e]">توجیه فنی / علت ثبت سند:</label>
            <textarea
              rows={2}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="گزارش پایش وضعیت، دلایل فنی و استناد به استانداردها..."
              className="p-2 rounded bg-[#eff4ff] border border-[#c4c6cf] focus:border-[#002045] focus:bg-white text-xs outline-none"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e6eeff]">
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-4 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#505f7b] text-xs font-semibold"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="h-8 px-5 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">check</span>
              <span>صدور و ارسال به کارتابل تأییدات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
