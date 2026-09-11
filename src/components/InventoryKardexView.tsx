import React, { useState } from 'react';
import { InventoryItem, Warehouse, Subsidiary } from '../types/erp';

interface InventoryKardexProps {
  items: InventoryItem[];
  warehouses: Warehouse[];
  currentSubsidiary: Subsidiary;
  onOpenTransferModal?: () => void;
  onOpenNewSkuModal?: () => void;
  onSelectPoDocument?: (poNumber: string) => void;
}

export const InventoryKardexView: React.FC<InventoryKardexProps> = ({
  items,
  warehouses,
  currentSubsidiary,
  onOpenTransferModal,
  onOpenNewSkuModal,
  onSelectPoDocument,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTabTag, setActiveTabTag] = useState<string>('all');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [activeKardexItem, setActiveKardexItem] = useState<InventoryItem>(items[0]);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Filter items
  const filteredItems = items.filter((item) => {
    if (selectedWarehouseId !== 'all' && item.warehouseId !== selectedWarehouseId) {
      return false;
    }
    if (selectedStatus !== 'all' && item.status !== selectedStatus) {
      return false;
    }
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (activeTabTag === 'critical' && item.status !== 'critical') {
      return false;
    }
    if (activeTabTag === 'in-transit' && item.inTransitPo <= 0) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.hsCode.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.gs1Barcode.includes(q)
      );
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedItemIds.length === filteredItems.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(filteredItems.map((i) => i.id));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const triggerToast = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  return (
    <div className="flex flex-col w-full gap-4 py-2 pb-14 text-[#0d1c2e]">
      {/* Action Notification Toast */}
      {actionSuccessMsg && (
        <div className="fixed bottom-6 left-10 z-50 bg-[#002045] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-xs border border-[#1a365d]">
          <span className="material-symbols-outlined text-[18px] text-[#adc7f7]">check_circle</span>
          <span>{actionSuccessMsg}</span>
          <button
            onClick={() => setActionSuccessMsg(null)}
            className="mr-2 text-[#c4c6cf] hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Breadcrumb & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded shadow-sm border border-[#e6eeff]">
        <div className="flex items-center gap-2 text-xs text-[#505f7b]">
          <span className="text-[#74777f]">سامانه کاوش</span>
          <span>/</span>
          <span className="text-[#74777f]">انبارداری و زنجیره تأمین</span>
          <span>/</span>
          <span className="font-bold text-[#0d1c2e]">کاتالوگ جامع کالا و کاردکس</span>
          <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#002045] font-mono text-[10px] font-tabular">
            ENTITY: {currentSubsidiary.code}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => triggerToast('خروجی رسمی فرمت اکسل (XLSX) کاردکس آماده شد.')}
            className="h-8 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#002045] text-xs font-semibold flex items-center gap-1 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>خروجی اکسل</span>
          </button>
          <button
            onClick={() => window.print()}
            className="h-8 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#505f7b] hover:text-[#0d1c2e] text-xs flex items-center gap-1 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            <span>گزارش چاپی</span>
          </button>
          <button
            onClick={() => {
              if (onOpenTransferModal) onOpenTransferModal();
              else triggerToast('فرم صدور حواله انتقال بین‌انبار باز شد.');
            }}
            className="h-8 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#002045] text-xs font-semibold flex items-center gap-1 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">move_up</span>
            <span>انتقال بین‌انبار</span>
          </button>
          <button
            onClick={() => {
              if (onOpenNewSkuModal) onOpenNewSkuModal();
              else triggerToast('فرم ایجاد ردیف کالای جدید در کاتالوگ هلدینگ باز شد.');
            }}
            className="h-8 px-3.5 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>تعریف کالا و ردیف جدید</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {/* Metric 1 */}
        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#505f7b]">
            <span>کل اقلام ثبت‌شده در کاتالوگ</span>
            <span className="material-symbols-outlined text-[17px] text-[#002045]">format_list_bulleted</span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۱,۸۴۰</span>
            <span className="text-xs text-[#505f7b]">قلم SKU فعال</span>
          </div>
          <div className="text-[11px] text-[#505f7b] pt-1 border-t border-[#f8f9ff] flex items-center justify-between">
            <span>دارای گردش در سال ۱۴۰۳</span>
            <span className="text-[#002045] font-semibold font-tabular">۹۸.۴٪</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#ba1a1a]">
            <span className="font-semibold">اقلام در مرز هشدار / نقطه سفارش</span>
            <span className="material-symbols-outlined text-[17px] text-[#ba1a1a]">warning</span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#ba1a1a]">۳۷</span>
            <span className="text-xs text-[#ba1a1a]">ردیف کالا نیازمند سفارش‌گذاری</span>
          </div>
          <div className="text-[11px] text-[#ba1a1a] pt-1 border-t border-[#f8f9ff] flex items-center justify-between">
            <span>۱۴ قلم با خطر توقف خط</span>
            <span className="underline cursor-pointer font-bold" onClick={() => setActiveTabTag('critical')}>
              مشاهده اقلام
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#505f7b]">
            <span>ارزش ریالی موجودی انبارها (FIFO)</span>
            <span className="material-symbols-outlined text-[17px] text-[#002045]">payments</span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۹۴,۲۰۰,۰۰۰,۰۰۰</span>
            <span className="text-xs text-[#505f7b]">ریال</span>
          </div>
          <div className="text-[11px] text-[#505f7b] pt-1 border-t border-[#f8f9ff] flex items-center justify-between">
            <span>مبنای قیمت‌گذاری انبارداری</span>
            <span className="font-semibold text-[#002045]">میانگین موزون</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#505f7b]">
            <span>حواله‌های خروج صادره امروز</span>
            <span className="material-symbols-outlined text-[17px] text-[#505f7b]">local_shipping</span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۱۸</span>
            <span className="text-xs text-[#505f7b]">فقره سند تحویل کالا</span>
          </div>
          <div className="text-[11px] text-[#505f7b] pt-1 border-t border-[#f8f9ff] flex items-center justify-between">
            <span>حجم فیزیکی ترخیص‌شده</span>
            <span className="font-semibold text-[#0d1c2e] font-tabular">۴۲ پالت</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Universal SKU Search */}
          <div className="relative flex-1 min-w-[280px]">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#74777f]">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی کد کالا (SKU)، نام قطعه، کد تعرفه گمرکی (HS-Code) یا بارکد GS1..."
              className="w-full h-8 pr-9 pl-4 rounded bg-[#eff4ff] border border-transparent focus:border-[#002045] focus:bg-white text-xs text-[#0d1c2e] outline-none transition-colors"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Warehouse Selector */}
            <select
              value={selectedWarehouseId}
              onChange={(e) => setSelectedWarehouseId(e.target.value)}
              className="h-8 px-2.5 rounded bg-[#eff4ff] border border-transparent hover:border-[#c4c6cf] text-[#0d1c2e] outline-none cursor-pointer"
            >
              <option value="all">همه انبارهای هلدینگ ({warehouses.length} انبار فعال)</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>

            {/* Inventory Status Selector */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-8 px-2.5 rounded bg-[#eff4ff] border border-transparent hover:border-[#c4c6cf] text-[#0d1c2e] outline-none cursor-pointer"
            >
              <option value="all">همه وضعیت‌های موجودی</option>
              <option value="critical">کسری بحرانی (زیر نقطه سفارش)</option>
              <option value="low-stock">مرز هشدار</option>
              <option value="normal">موجودی نرمال</option>
              <option value="overstock">مازاد انبار</option>
            </select>

            {/* Category Selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-8 px-2.5 rounded bg-[#eff4ff] border border-transparent hover:border-[#c4c6cf] text-[#0d1c2e] outline-none cursor-pointer"
            >
              <option value="all">همه دسته‌بندی‌ها</option>
              <option value="تجهیزات و قطعات هیدرولیک">تجهیزات و قطعات هیدرولیک</option>
              <option value="آلیاژها و قطعات ماشین‌کاری">آلیاژها و قطعات ماشین‌کاری</option>
              <option value="تجهیزات ابزار دقیق و الکتریکال">تجهیزات ابزار دقیق و الکتریکال</option>
              <option value="مواد مصرفی شیمیایی و روانکارها">مواد مصرفی شیمیایی و روانکارها</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tag Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#eff4ff] text-xs">
          <span className="text-[11px] text-[#505f7b] ml-1">فیلترهای فوری:</span>
          <button
            onClick={() => setActiveTabTag('all')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              activeTabTag === 'all'
                ? 'bg-[#002045] text-white font-semibold'
                : 'bg-[#eff4ff] text-[#505f7b] hover:bg-[#dce9ff]'
            }`}
            type="button"
          >
            همه اقلام ({items.length})
          </button>
          <button
            onClick={() => setActiveTabTag('critical')}
            className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
              activeTabTag === 'critical'
                ? 'bg-[#ba1a1a] text-white font-semibold'
                : 'bg-[#ffdad6] text-[#93000a] hover:bg-[#ffdad6]/80'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[13px]">warning</span>
            <span>کسری بحرانی خط نورد</span>
          </button>
          <button
            onClick={() => setActiveTabTag('in-transit')}
            className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
              activeTabTag === 'in-transit'
                ? 'bg-[#1a365d] text-white font-semibold'
                : 'bg-[#eff4ff] text-[#505f7b] hover:bg-[#dce9ff]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[13px]">local_shipping</span>
            <span>دارای سفارش در راه (PO)</span>
          </button>
        </div>
      </div>

      {/* Bulk Selection Notification Bar */}
      {selectedItemIds.length > 0 && (
        <div className="p-2.5 rounded bg-[#002045] text-white flex flex-wrap items-center justify-between gap-2 text-xs shadow-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-[#adc7f7]">check_box</span>
            <span className="font-bold font-tabular">{selectedItemIds.length} ردیف کالا انتخاب شده است</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('فرآیند صدور حواله انتقال گروهی آماده شد.')}
              className="px-2.5 py-1 rounded bg-[#1a365d] hover:bg-[#ceddff] hover:text-[#002045] transition-colors"
              type="button"
            >
              انتقال بین‌انبار
            </button>
            <button
              onClick={() => triggerToast('چاپ بارکد و برچسب اموال به پرینتر صنعتی ارسال شد.')}
              className="px-2.5 py-1 rounded bg-[#1a365d] hover:bg-[#ceddff] hover:text-[#002045] transition-colors"
              type="button"
            >
              چاپ بارکد و لیبل
            </button>
            <button
              onClick={() => setSelectedItemIds([])}
              className="px-2 py-1 rounded bg-transparent hover:bg-white/10 text-[#adc7f7]"
              type="button"
            >
              انصراف
            </button>
          </div>
        </div>
      )}

      {/* High-Precision Inventory Table */}
      <div className="bg-white rounded shadow-sm border border-[#e6eeff] flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="h-10 bg-[#eff4ff] text-[#505f7b] text-xs font-semibold border-b border-[#e6eeff] select-none">
                <th className="px-3 w-8 text-center">
                  <input
                    type="checkbox"
                    checked={selectedItemIds.length === filteredItems.length && filteredItems.length > 0}
                    onChange={toggleSelectAll}
                    className="cursor-pointer"
                  />
                </th>
                <th className="px-3">کاتالوگ و مشخصات فنی کالا</th>
                <th className="px-2.5 text-center">واحد</th>
                <th className="px-3 text-center">موجودی فیزیکی</th>
                <th className="px-3 text-center">رزرو فروش</th>
                <th className="px-3 text-center">در راه (PO)</th>
                <th className="px-3 text-center">قابل تعهد (ATP)</th>
                <th className="px-3 text-left">ارزش ریالی میانگین</th>
                <th className="px-3">موقعیت در انبار</th>
                <th className="px-3 text-center">وضعیت</th>
                <th className="px-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#eff4ff]">
              {filteredItems.map((item) => {
                const isSelected = selectedItemIds.includes(item.id);
                const isKardexActive = activeKardexItem.id === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setActiveKardexItem(item)}
                    className={`h-14 transition-colors cursor-pointer ${
                      isKardexActive
                        ? 'bg-[#eff4ff]'
                        : isSelected
                        ? 'bg-[#e6eeff]'
                        : 'hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <td
                      className="px-3 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelectItem(item.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectItem(item.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="w-9 h-9 rounded object-cover border border-[#e6eeff] shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded bg-[#eff4ff] border border-[#d5e3fc] flex items-center justify-center text-[#505f7b] shrink-0">
                            <span className="material-symbols-outlined text-[18px]">inventory</span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0d1c2e] hover:text-[#002045]">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-[#505f7b]">
                            <span className="font-mono text-[#002045] font-semibold font-tabular">
                              {item.sku}
                            </span>
                            <span className="text-[#c4c6cf]">|</span>
                            <span>برند: {item.brand}</span>
                            <span className="text-[#c4c6cf]">|</span>
                            <span className="font-mono text-[10px] text-[#74777f]">HS: {item.hsCode}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2.5 text-center text-[#505f7b]">{item.unit}</td>
                    <td className="px-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-mono font-bold font-tabular text-[#0d1c2e] text-sm">
                          {item.physicalStock.toLocaleString('fa-IR')}
                        </span>
                        {item.physicalStock <= item.reorderPoint && (
                          <span className="text-[10px] text-[#ba1a1a] font-tabular">
                            نقطه سفارش: {item.reorderPoint}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 text-center font-mono font-tabular text-[#505f7b]">
                      {item.salesReserved.toLocaleString('fa-IR')}
                    </td>
                    <td className="px-3 text-center">
                      {item.inTransitPo > 0 ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.activePoNumber && onSelectPoDocument) {
                              onSelectPoDocument(item.activePoNumber);
                            }
                          }}
                          className="flex flex-col items-center cursor-pointer group"
                          title="مشاهده جزئیات سفارش خرید در راه"
                        >
                          <span className="font-mono font-bold font-tabular text-[#002045] group-hover:underline">
                            +{item.inTransitPo.toLocaleString('fa-IR')}
                          </span>
                          <span className="text-[9px] text-[#505f7b] font-mono">
                            {item.activePoNumber}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#74777f] font-mono">-</span>
                      )}
                    </td>
                    <td className="px-3 text-center">
                      <span
                        className={`font-mono font-bold font-tabular text-sm px-2 py-0.5 rounded ${
                          item.availableToPromise <= 2
                            ? 'bg-[#ffdad6] text-[#93000a]'
                            : 'bg-[#eff4ff] text-[#002045]'
                        }`}
                      >
                        {item.availableToPromise.toLocaleString('fa-IR')}
                      </span>
                    </td>
                    <td className="px-3 text-left font-mono font-bold font-tabular text-[#0d1c2e]">
                      {item.averageUnitCostRials.toLocaleString('fa-IR')}
                    </td>
                    <td className="px-3">
                      <div className="flex items-center gap-1 text-[#505f7b] text-[11px]">
                        <span className="material-symbols-outlined text-[14px]">shelves</span>
                        <span>{item.locationInWarehouse}</span>
                      </div>
                    </td>
                    <td className="px-3 text-center">
                      {item.status === 'critical' ? (
                        <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                          کسری بحرانی
                        </span>
                      ) : item.status === 'low-stock' ? (
                        <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#002045] border border-[#adc7f7] text-[10px] font-bold">
                          مرز هشدار
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#505f7b] text-[10px]">
                          موجودی نرمال
                        </span>
                      )}
                    </td>
                    <td className="px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => triggerToast(`منوی عملیات برای ردیف ${item.sku} باز شد.`)}
                        className="p-1 rounded hover:bg-[#dce9ff] text-[#505f7b] transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info and count */}
        <div className="p-3 bg-[#eff4ff] border-t border-[#e6eeff] flex flex-wrap items-center justify-between gap-2 text-xs text-[#505f7b]">
          <div>
            <span>نمایش </span>
            <span className="font-bold text-[#0d1c2e] font-tabular">{filteredItems.length}</span>
            <span> ردیف کالا از مجموع </span>
            <span className="font-bold text-[#0d1c2e] font-tabular">{items.length}</span>
            <span> ردیف کاتالوگ فعال هلدینگ پارس</span>
          </div>
          <div className="flex items-center gap-1 font-tabular">
            <button className="px-2 py-1 rounded bg-white border border-[#c4c6cf] text-[#505f7b] hover:bg-[#eff4ff]">
              قبلی
            </button>
            <span className="px-2 font-bold text-[#002045]">صفحه ۱ از ۱</span>
            <button className="px-2 py-1 rounded bg-white border border-[#c4c6cf] text-[#505f7b] hover:bg-[#eff4ff]">
              بعدی
            </button>
          </div>
        </div>
      </div>

      {/* Active Kardex & Stock Distribution Drawer */}
      {activeKardexItem && (
        <div className="bg-white p-4 rounded shadow-sm border border-[#adc7f7] flex flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-2 pb-2 border-b border-[#e6eeff]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[22px] text-[#002045]">inventory_2</span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#002045]">{activeKardexItem.name}</span>
                  <span className="px-2 py-0.5 rounded bg-[#002045] text-white font-mono text-[11px] font-tabular">
                    {activeKardexItem.sku}
                  </span>
                </div>
                <span className="text-xs text-[#505f7b]">
                  شناسه کالا: {activeKardexItem.gs1Barcode} | دسته‌بندی: {activeKardexItem.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerToast(`حواله خروج از انبار برای ${activeKardexItem.sku} ثبت گردید.`)}
                className="h-7 px-3 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">outbox</span>
                <span>صدور حواله خروج</span>
              </button>
              <button
                onClick={() => triggerToast(`درخواست خرید اضطراری (PR) برای تأمین ${activeKardexItem.sku} ثبت شد.`)}
                className="h-7 px-3 rounded bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">add_shopping_cart</span>
                <span>درخواست خرید اضطراری</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Warehouse Distribution */}
            <div className="p-3 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-col gap-2">
              <span className="font-bold text-[#0d1c2e] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#505f7b]">location_on</span>
                <span>پراکندگی موجودی در انبارهای هلدینگ</span>
              </span>
              <div className="flex flex-col gap-1.5 mt-1">
                {activeKardexItem.warehouseDistribution.map((dist, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <div className="flex justify-between text-[#505f7b] text-[11px]">
                      <span>{dist.warehouseName}</span>
                      <span className="font-mono font-bold text-[#0d1c2e] font-tabular">
                        {dist.quantity.toLocaleString('fa-IR')} {activeKardexItem.unit} ({dist.percentage}٪)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded bg-white overflow-hidden">
                      <div
                        className="h-full bg-[#002045] rounded"
                        style={{ width: `${dist.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Kardex Movements */}
            <div className="p-3 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-col gap-2">
              <span className="font-bold text-[#0d1c2e] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#505f7b]">history</span>
                <span>گردش اخیر کاردکس و ثبت مصارف</span>
              </span>
              <div className="flex flex-col gap-1 mt-1">
                {activeKardexItem.recentMovements.map((mov) => (
                  <div
                    key={mov.id}
                    className="p-1.5 rounded bg-white border border-[#e6eeff] flex items-center justify-between text-[11px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          mov.quantityDelta < 0 ? 'bg-[#ba1a1a]' : 'bg-[#002045]'
                        }`}
                      ></span>
                      <div className="flex flex-col">
                        <span className="font-medium text-[#0d1c2e]">{mov.documentRef}</span>
                        <span className="text-[#505f7b] text-[10px]">{mov.reason} ({mov.user})</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`font-mono font-bold font-tabular ${
                          mov.quantityDelta < 0 ? 'text-[#ba1a1a]' : 'text-[#002045]'
                        }`}
                      >
                        {mov.quantityDelta > 0 ? '+' : ''}
                        {mov.quantityDelta.toLocaleString('fa-IR')} {activeKardexItem.unit}
                      </span>
                      <span className="text-[10px] text-[#74777f] font-tabular">{mov.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
