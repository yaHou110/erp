import React, { useState } from 'react';
import { Subsidiary, LicensePlanType } from '../types/erp';

interface HeaderProps {
  currentSubsidiary: Subsidiary;
  subsidiaries: Subsidiary[];
  onSelectSubsidiary: (sub: Subsidiary) => void;
  onOpenNewDocModal: () => void;
  onOpenCommandPalette: () => void;
  unreadCount: number;
  currentPlan: LicensePlanType;
  onOpenPlansModal: () => void;
  isSidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentSubsidiary,
  subsidiaries,
  onSelectSubsidiary,
  onOpenNewDocModal,
  onOpenCommandPalette,
  unreadCount,
  currentPlan,
  onOpenPlansModal,
  isSidebarCollapsed,
}) => {
  const [showSubDropdown, setShowSubDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const planLabels = {
    basic: 'پایه (Basic)',
    standard: 'استاندارد (Standard)',
    pro: 'پیشرفته (Pro)',
    enterprise: 'هلدینگ (Enterprise)'
  };

  return (
    <header className={`fixed top-0 left-0 h-16 bg-white border-b border-[#e6eeff] shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-40 flex items-center justify-between px-5 transition-all duration-300 ${isSidebarCollapsed ? 'right-16' : 'right-64'}`}>
      {/* Search Input & Quick Context */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          onClick={onOpenCommandPalette}
          className="relative w-full max-w-xs md:max-w-sm shrink-0 cursor-pointer group"
          title="باز کردن جستجوی سریع هوشمند"
        >
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#74777f]">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </div>
          <div className="w-full h-8 pr-9 pl-14 rounded bg-[#eff4ff] border border-transparent group-hover:border-[#c4c6cf] text-xs text-[#0d1c2e] flex items-center select-none transition-colors">
            <span className="text-[#74777f] truncate">جستجو در اسناد، کالاها و کد پیگیری...</span>
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <kbd className="px-1.5 py-0.5 rounded bg-[#e6eeff] text-[10px] font-mono text-[#505f7b] font-tabular">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Company context pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded bg-[#eff4ff] text-[#505f7b] text-[11px] border border-[#d5e3fc] shrink-0 whitespace-nowrap relative">
          <button
            onClick={() => setShowSubDropdown(!showSubDropdown)}
            className="flex items-center gap-1 hover:text-[#002045] font-semibold text-[#002045] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px] text-[#002045]">corporate_fare</span>
            <span>شرکت: {currentSubsidiary.name}</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
          <span className="text-[#c4c6cf]">|</span>
          <span>شعبه: مرکزی تهران</span>
          <span className="text-[#c4c6cf]">|</span>
          <span className="font-semibold text-[#002045] font-tabular">سال مالی: ۱۴۰۳</span>

          {showSubDropdown && (
            <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-[#c4c6cf] p-1.5 z-50 flex flex-col gap-1">
              <span className="text-[10px] text-[#505f7b] px-2 py-1 font-semibold">
                انتخاب شرکت تابعه هلدینگ:
              </span>
              {subsidiaries.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onSelectSubsidiary(sub);
                    setShowSubDropdown(false);
                  }}
                  className={`text-right px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                    sub.id === currentSubsidiary.id
                      ? 'bg-[#002045] text-white font-semibold'
                      : 'hover:bg-[#eff4ff] text-[#0d1c2e]'
                  }`}
                >
                  <span>{sub.name}</span>
                  <span className="font-mono text-[10px] opacity-70">{sub.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded bg-[#e6eeff] text-[#52617e] text-[11px] whitespace-nowrap">
          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
          <span className="font-tabular">سه‌شنبه، ۲۲ آبان ۱۴۰۳</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 rounded hover:bg-[#dce9ff] text-[#505f7b] hover:text-[#0d1c2e] transition-colors"
            title="اعلان‌ها و رویدادها"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#ba1a1a] text-white text-[10px] flex items-center justify-center font-bold font-tabular">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute left-0 mt-2 w-80 bg-white rounded shadow-xl border border-[#c4c6cf] p-3 z-50 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#e6eeff]">
                <span className="text-xs font-bold text-[#002045]">اعلان‌های سیستم</span>
                <span className="text-[10px] text-[#ba1a1a] bg-[#ffdad6] px-1.5 py-0.5 rounded font-tabular">
                  {unreadCount} مورد فوری
                </span>
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="p-2 rounded bg-[#ffdad6]/40 border border-[#ffdad6] flex flex-col gap-0.5">
                  <span className="font-semibold text-[#93000a]">تأخیر در تحویل قطعات هیدرولیک</span>
                  <span className="text-[11px] text-[#505f7b]">احتمال توقف قفسه خط نورد گرم طی ۷۲ ساعت</span>
                </div>
                <div className="p-2 rounded bg-[#eff4ff] flex flex-col gap-0.5">
                  <span className="font-semibold text-[#002045]">سند PO-9821 نیازمند امضا</span>
                  <span className="text-[11px] text-[#505f7b]">مهلت تصمیم‌گیری کمیسیون تا ساعت ۱۷ امروز</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Voucher Button */}
        <button
          onClick={onOpenNewDocModal}
          className="h-8 px-3.5 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm whitespace-nowrap"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          <span>ثبت سند جدید</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pr-2 border-r border-[#e6eeff] whitespace-nowrap">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-bold text-[#0d1c2e]">مهندس حامد حسن پور</span>
            <div className="flex items-center gap-1">
              <span className="px-1 rounded bg-[#ceddff] text-[#52617e] text-[10px] font-medium">
                مدیر ارشد سیستم
              </span>
              <span className="text-[10px] text-[#505f7b]">معاونت بازرگانی</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#002045] text-white flex items-center justify-center font-bold text-xs shrink-0">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
