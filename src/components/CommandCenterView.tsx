import React, { useState } from 'react';
import { ModuleId, Subsidiary } from '../types/erp';

interface CommandCenterProps {
  currentSubsidiary: Subsidiary;
  onNavigate: (module: ModuleId) => void;
  onSelectPoDocument: (poNumber: string) => void;
}

export const CommandCenterView: React.FC<CommandCenterProps> = ({
  currentSubsidiary,
  onNavigate,
  onSelectPoDocument,
}) => {
  const [signedDocs, setSignedDocs] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<string | null>(null);

  const handleSign = (docId: string, title: string) => {
    setSignedDocs((prev) => [...prev, docId]);
    setShowToast(`سند ${title} با امضای دیجیتال Level-B تایید و به مرحله بعد ارسال شد.`);
    setTimeout(() => setShowToast(null), 4000);
  };

  return (
    <div className="flex flex-col w-full gap-4 py-2 pb-14 text-[#0d1c2e]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-10 z-50 bg-[#002045] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-xs border border-[#1a365d] animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#adc7f7]">verified</span>
          <span>{showToast}</span>
          <button
            onClick={() => setShowToast(null)}
            className="mr-2 text-[#c4c6cf] hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Dynamic Sub-header & Breadcrumb Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded shadow-sm border border-[#e6eeff]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#002045] animate-pulse"></div>
          <div className="flex items-center gap-1.5 text-xs text-[#505f7b]">
            <span className="font-bold text-[#0d1c2e]">کنسول نظارت بلادرنگ هلدینگ</span>
            <span>/</span>
            <span>پایش تراز عملیاتی، گردش کاردکس و صف تأییدات</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#e6eeff] font-mono text-[10px] text-[#505f7b] font-tabular">
            LIVE_STREAM: ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[#505f7b] text-xs">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            <span>آخرین به‌روزرسانی بسته داده:</span>
            <span className="font-mono text-[#0d1c2e] font-bold font-tabular">۱۴:۴۲:۰۹</span>
          </div>
          <button
            onClick={() => {
              setShowToast('همگام‌سازی بسته داده با سرور مرکزی هلدینگ با موفقیت انجام شد.');
              setTimeout(() => setShowToast(null), 3000);
            }}
            className="h-7 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#002045] text-xs font-semibold flex items-center gap-1 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">sync</span>
            <span>تازه‌سازی فوری</span>
          </button>
          <button
            onClick={() => window.print()}
            className="h-7 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#505f7b] hover:text-[#0d1c2e] text-xs flex items-center gap-1 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">print</span>
            <span>خروجی مدیریتی</span>
          </button>
        </div>
      </div>

      {/* 1. Top KPI Summary Row: 4 High-Density Operational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {/* Card 1: Cash Flow */}
        <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-[#002045]"></div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#505f7b] font-medium">گردش نقدینگی و منابع آزاد هلدینگ</span>
            <span className="material-symbols-outlined text-[18px] text-[#002045]">account_balance_wallet</span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۱۴۸,۵۲۰,۰۰۰,۰۰۰</span>
              <span className="text-xs text-[#505f7b]">ریال</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#f8f9ff]">
            <div className="flex items-center gap-1 text-[#002045] text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span className="font-tabular">+۱۲.۴٪</span>
              <span className="text-[#74777f] font-normal text-[11px]">نسبت به دوره قبل</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[10px] text-[#505f7b]">پایدار</span>
          </div>
        </div>

        {/* Card 2: Pending Approval Queue */}
        <div
          onClick={() => onNavigate('approvals')}
          className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] hover:border-[#adc7f7] cursor-pointer flex flex-col justify-between relative overflow-hidden transition-all"
        >
          <div className="absolute top-0 right-0 left-0 h-1 bg-[#505f7b]"></div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#505f7b] font-medium">اسناد در صف بررسی و اقدام آنی</span>
            <span className="material-symbols-outlined text-[18px] text-[#505f7b]">pending_actions</span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۱۸</span>
              <span className="text-xs text-[#505f7b]">سند باز نیازمند تصمیم</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#f8f9ff] text-[#43474e] text-xs">
            <span className="truncate">۷ خرید بالای سقف</span>
            <span className="text-[#c4c6cf]">|</span>
            <span className="truncate">۴ سفارش در انتظار اعتبار</span>
          </div>
        </div>

        {/* Card 3: Critical Inventory Threshold */}
        <div
          onClick={() => onNavigate('inventory')}
          className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] hover:border-[#ffdad6] cursor-pointer flex flex-col justify-between relative overflow-hidden transition-all"
        >
          <div className="absolute top-0 right-0 left-0 h-1 bg-[#ba1a1a]"></div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#ba1a1a] font-semibold">ارزش موجودی راکد / مرز هشدار</span>
            <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">inventory_2</span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-tabular text-[#ba1a1a]">۳۴</span>
              <span className="text-xs text-[#ba1a1a]">قلم با ریسک توقف عملیاتی</span>
            </div>
          </div>
          <div className="flex items-center gap-1 pt-1 border-t border-[#f8f9ff] text-xs text-[#ba1a1a]">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            <span>۵ ماده اولیه خط ۱ زیر نقطه سفارش</span>
          </div>
        </div>

        {/* Card 4: Sales Target Realization */}
        <div
          onClick={() => onNavigate('commercial')}
          className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] hover:border-[#adc7f7] cursor-pointer flex flex-col justify-between relative overflow-hidden transition-all"
        >
          <div className="absolute top-0 right-0 left-0 h-1 bg-[#1a365d]"></div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#505f7b] font-medium">تحقق اهداف فروش بودجه ماهانه</span>
            <span className="material-symbols-outlined text-[18px] text-[#1a365d]">pie_chart</span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۸۹.۲٪</span>
              <span className="text-xs text-[#505f7b]">از برنامه مصوب</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#f8f9ff] text-xs">
            <span className="text-[#ba1a1a] font-tabular font-semibold">۱.۸-٪ انحراف تراز</span>
            <span className="text-[#74777f] font-tabular">۴ روز مانده تا تسویه آبان</span>
          </div>
        </div>
      </div>

      {/* 2. Operational Exceptions & Critical Alerts Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/30 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">error</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="text-xs font-bold text-[#ba1a1a]">هشدار بحرانی زنجیره تأمین:</span>
              <span className="text-xs">
                تأخیر در تأمین قطعات یدکی پمپ‌های هیدرولیک (تأمین‌کننده: صنایع هیدرولیک سپهر) - احتمال توقف خط شماره ۳
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#93000a] px-2 py-0.5 bg-white rounded font-tabular">
              کد رخداد: ERR-7740
            </span>
            <button
              onClick={() => onNavigate('purchasing')}
              className="h-7 px-3 rounded bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-semibold transition-colors"
              type="button"
            >
              بررسی و جایگزینی
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded bg-[#e6eeff] text-[#002045] border border-[#ceddff] shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#002045]">warning_amber</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="text-xs font-bold text-[#002045]">اعلان کنترل اعتباری مالی:</span>
              <span className="text-xs text-[#0d1c2e]">
                ۳ فقره چک صیادی مشتریان عمده نیازمند تطبیق اعتباری قبل از آزادسازی حواله خروج انبار
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#505f7b] px-2 py-0.5 bg-white rounded font-tabular">
              مجموع: ۴,۸۵۰,۰۰۰,۰۰۰ ریال
            </span>
            <button
              onClick={() => onNavigate('commercial')}
              className="h-7 px-3 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-xs font-semibold transition-colors"
              type="button"
            >
              بازبینی کارتابل مالی
            </button>
          </div>
        </div>
      </div>

      {/* 3. Two-Column Operational Split Grid (Right 65% / Left 35%) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Right Column (8 Cols in 12-col grid) */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          {/* Table Section: Real-time Operations Flow */}
          <div className="bg-white rounded shadow-sm border border-[#e6eeff] flex flex-col overflow-hidden">
            <div className="p-3 bg-[#eff4ff] border-b border-[#e6eeff] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#002045]">reorder</span>
                <span className="text-xs font-bold text-[#0d1c2e]">جریان لحظه‌ای اسناد عملیاتی و خرید</span>
                <span className="px-2 py-0.5 rounded bg-[#e6eeff] text-[#505f7b] font-mono text-[10px] font-tabular">
                  ۶ سند فعال اخیر
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onNavigate('purchasing')}
                  className="h-7 px-2.5 rounded bg-white hover:bg-[#eff4ff] border border-[#d5e3fc] text-[#505f7b] hover:text-[#0d1c2e] text-xs flex items-center gap-1 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">filter_list</span>
                  <span>مشاهده همه اسناد</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="h-9 bg-[#f8f9ff] text-[#505f7b] text-xs font-medium border-b border-[#e6eeff] select-none">
                    <th className="px-3">شناسه سند</th>
                    <th className="px-3">نوع مدرک</th>
                    <th className="px-3">شرکت تابعه</th>
                    <th className="px-3 text-left">مبلغ ریالی</th>
                    <th className="px-3">مسئول پیگیری</th>
                    <th className="px-3 text-center">وضعیت چرخه</th>
                    <th className="px-3 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-[#f8f9ff]">
                  {/* Row 1 */}
                  <tr className="h-10 hover:bg-[#eff4ff] transition-colors">
                    <td className="px-3 font-mono text-[#002045] font-bold font-tabular">PO-1403-8821</td>
                    <td className="px-3">
                      <span className="px-1.5 py-0.5 rounded bg-[#e6eeff] text-[10px] text-[#002045] font-semibold">
                        سفارش خرید (PO)
                      </span>
                    </td>
                    <td className="px-3 text-[#0d1c2e]">پارس فولاد جنوب</td>
                    <td className="px-3 text-left font-mono font-bold font-tabular text-[#0d1c2e]">۲,۴۵۰,۰۰۰,۰۰۰</td>
                    <td className="px-3 text-[#505f7b]">م. مهدی‌پور (تدارکات)</td>
                    <td className="px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-[#ceddff] text-[#002045] text-[10px] font-semibold">
                        در انتظار کمیسیون
                      </span>
                    </td>
                    <td className="px-3 text-center">
                      <button
                        onClick={() => {
                          onSelectPoDocument('PO-1403-08-9821');
                          onNavigate('purchasing');
                        }}
                        className="h-6 px-2 rounded bg-[#eff4ff] hover:bg-[#002045] hover:text-white text-[#002045] text-[11px] font-medium transition-colors"
                        type="button"
                      >
                        مشاهده و بررسی
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="h-10 hover:bg-[#eff4ff] transition-colors">
                    <td className="px-3 font-mono text-[#002045] font-bold font-tabular">PR-1403-1104</td>
                    <td className="px-3">
                      <span className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[10px] text-[#505f7b]">
                        درخواست کالا (PR)
                      </span>
                    </td>
                    <td className="px-3 text-[#0d1c2e]">پارس تریکو</td>
                    <td className="px-3 text-left font-mono font-bold font-tabular text-[#0d1c2e]">۸۴۰,۰۰۰,۰۰۰</td>
                    <td className="px-3 text-[#505f7b]">س. حسینی (انبار مرکزی)</td>
                    <td className="px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-[#dce9ff] text-[#0d1c2e] text-[10px] font-semibold">
                        تأیید نهایی شده
                      </span>
                    </td>
                    <td className="px-3 text-center">
                      <button
                        onClick={() => onNavigate('inventory')}
                        className="h-6 px-2 rounded bg-[#eff4ff] hover:bg-[#002045] hover:text-white text-[#002045] text-[11px] font-medium transition-colors"
                        type="button"
                      >
                        کاردکس انبار
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="h-10 hover:bg-[#eff4ff] transition-colors">
                    <td className="px-3 font-mono text-[#002045] font-bold font-tabular">SI-1403-4912</td>
                    <td className="px-3">
                      <span className="px-1.5 py-0.5 rounded bg-[#ceddff] text-[10px] text-[#52617e]">
                        فاکتور فروش (SI)
                      </span>
                    </td>
                    <td className="px-3 text-[#0d1c2e]">پارس ترابر نوین</td>
                    <td className="px-3 text-left font-mono font-bold font-tabular text-[#0d1c2e]">۶,۱۸۰,۰۰۰,۰۰۰</td>
                    <td className="px-3 text-[#505f7b]">ک. احمدی (فروش عمده)</td>
                    <td className="px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-[#dce9ff] text-[#505f7b] text-[10px] font-semibold">
                        صدور حواله انبار
                      </span>
                    </td>
                    <td className="px-3 text-center">
                      <button
                        onClick={() => onNavigate('commercial')}
                        className="h-6 px-2 rounded bg-[#eff4ff] hover:bg-[#002045] hover:text-white text-[#002045] text-[11px] font-medium transition-colors"
                        type="button"
                      >
                        سفارش فروش
                      </button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="h-10 hover:bg-[#eff4ff] transition-colors">
                    <td className="px-3 font-mono text-[#002045] font-bold font-tabular">PO-1403-8819</td>
                    <td className="px-3">
                      <span className="px-1.5 py-0.5 rounded bg-[#e6eeff] text-[10px] text-[#002045] font-semibold">
                        سفارش خرید (PO)
                      </span>
                    </td>
                    <td className="px-3 text-[#0d1c2e]">پارس فولاد جنوب</td>
                    <td className="px-3 text-left font-mono font-bold font-tabular text-[#0d1c2e]">۱۵,۲۰۰,۰۰۰,۰۰۰</td>
                    <td className="px-3 text-[#505f7b]">ع. شریفی (بازرگانی)</td>
                    <td className="px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-[#ceddff] text-[#002045] text-[10px] font-semibold">
                        در انتظار کمیسیون
                      </span>
                    </td>
                    <td className="px-3 text-center">
                      <button
                        onClick={() => onNavigate('approvals')}
                        className="h-6 px-2 rounded bg-[#eff4ff] hover:bg-[#002045] hover:text-white text-[#002045] text-[11px] font-medium transition-colors"
                        type="button"
                      >
                        کارتابل تأیید
                      </button>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="h-10 hover:bg-[#eff4ff] transition-colors">
                    <td className="px-3 font-mono text-[#002045] font-bold font-tabular">PR-1403-1099</td>
                    <td className="px-3">
                      <span className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[10px] text-[#505f7b]">
                        درخواست کالا (PR)
                      </span>
                    </td>
                    <td className="px-3 text-[#0d1c2e]">صنایع ریخته‌گری پارس</td>
                    <td className="px-3 text-left font-mono font-bold font-tabular text-[#0d1c2e]">۳۱۰,۰۰۰,۰۰۰</td>
                    <td className="px-3 text-[#505f7b]">ب. مرادی (تعمیرات)</td>
                    <td className="px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#93000a] text-[10px] font-semibold">
                        لغو / عدم تأمین
                      </span>
                    </td>
                    <td className="px-3 text-center">
                      <button
                        onClick={() => onNavigate('audit-config')}
                        className="h-6 px-2 rounded bg-[#eff4ff] hover:bg-[#002045] hover:text-white text-[#002045] text-[11px] font-medium transition-colors"
                        type="button"
                      >
                        مشاهده لاگ
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-2.5 bg-[#eff4ff] border-t border-[#e6eeff] flex items-center justify-between text-xs text-[#505f7b]">
              <span>نمایش ۵ رکورد از مجموع ۲۴۸ سند در جریان هلدینگ</span>
              <button
                onClick={() => onNavigate('purchasing')}
                className="text-[#002045] font-semibold hover:underline"
              >
                مشاهده کارتابل کامل خرید و کمیسیون ←
              </button>
            </div>
          </div>

          {/* Financial Chart Section: Monthly Cash Flow vs Commitments */}
          <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#002045]">bar_chart</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0d1c2e]">
                    روند ماهانه جریان نقدینگی و تعهدات خرید هلدینگ
                  </span>
                  <span className="text-[11px] text-[#505f7b]">
                    مقایسه تحلیلی عملکرد واقعی در برابر بودجه مصوب (۶ ماه اخیر سال مالی ۱۴۰۳)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-[#002045]"></span>
                  <span className="text-[#505f7b]">عملکرد واقعی (نقدینگی آزاد)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-[#ceddff]"></span>
                  <span className="text-[#505f7b]">بودجه مصوب هیئت مدیره</span>
                </div>
              </div>
            </div>

            {/* High-Precision SVG Chart */}
            <div className="w-full h-56 mt-2 bg-white flex flex-col justify-end p-2 relative border border-[#eff4ff] rounded">
              <svg className="w-full h-44 overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 160">
                {/* Grid Lines */}
                <line stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="600" y1="10" y2="10" />
                <line stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="600" y1="50" y2="50" />
                <line stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="600" y1="90" y2="90" />
                <line stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="600" y1="130" y2="130" />

                {/* Month 1: خرداد */}
                <rect fill="#ceddff" height="95" rx="2" width="24" x="35" y="55" />
                <rect fill="#002045" height="105" rx="2" width="24" x="65" y="45" />

                {/* Month 2: تیر */}
                <rect fill="#ceddff" height="110" rx="2" width="24" x="135" y="40" />
                <rect fill="#002045" height="118" rx="2" width="24" x="165" y="32" />

                {/* Month 3: مرداد */}
                <rect fill="#ceddff" height="102" rx="2" width="24" x="235" y="48" />
                <rect fill="#002045" height="110" rx="2" width="24" x="265" y="40" />

                {/* Month 4: شهریور */}
                <rect fill="#ceddff" height="120" rx="2" width="24" x="335" y="30" />
                <rect fill="#002045" height="126" rx="2" width="24" x="365" y="24" />

                {/* Month 5: مهر */}
                <rect fill="#ceddff" height="115" rx="2" width="24" x="435" y="35" />
                <rect fill="#002045" height="112" rx="2" width="24" x="465" y="38" />

                {/* Month 6: آبان (جاری) */}
                <rect fill="#ceddff" height="125" rx="2" width="24" x="535" y="25" />
                <rect fill="#002045" height="134" rx="2" width="24" x="565" y="16" />
              </svg>

              <div className="flex justify-between items-center px-6 pt-2 text-xs text-[#505f7b] font-tabular">
                <span>خرداد</span>
                <span>تیر</span>
                <span>مرداد</span>
                <span>شهریور</span>
                <span>مهر</span>
                <span className="font-bold text-[#002045]">آبان (جاری)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column (4 Cols in 12-col grid) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* Action Queue (کارتابل اقدام سریع مدیر) */}
          <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">assignment_late</span>
                <span className="text-xs font-bold text-[#0d1c2e]">کارتابل اقدام سریع مدیر</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#ba1a1a] text-white text-[10px] font-bold font-tabular">
                {5 - signedDocs.length} مورد فوری
              </span>
            </div>
            <p className="text-[11px] text-[#505f7b]">اسناد معوق و پرداخت‌های فوری با اولویت بالا نیازمند تنفیذ الکترونیک</p>

            {/* Queue Item 1 */}
            <div className="p-2.5 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-col gap-1.5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0d1c2e]">خرید کاتالیست واکنش احیا</span>
                  <span className="text-[10px] text-[#505f7b]">پارس فولاد | مهندس کاویانی</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#002045] font-tabular">۴,۲۰۰,۰۰۰,۰۰۰ ریال</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                {signedDocs.includes('q-1') ? (
                  <span className="w-full text-center py-1 text-[11px] font-bold text-[#002045] bg-[#ceddff] rounded">
                    ✓ امضا شد و ارسال گردید
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleSign('q-1', 'خرید کاتالیست واکنش احیا')}
                      className="flex-1 h-7 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">draw</span>
                      <span>امضای دیجیتال</span>
                    </button>
                    <button
                      onClick={() => onNavigate('purchasing')}
                      className="h-7 px-2.5 rounded bg-[#e6eeff] hover:bg-[#dce9ff] text-[#505f7b] hover:text-[#0d1c2e] text-[11px] transition-colors"
                      type="button"
                    >
                      استعلام
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Queue Item 2 */}
            <div className="p-2.5 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-col gap-1.5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0d1c2e]">تجهیز ناوگان لیفتراک سالن ۲</span>
                  <span className="text-[10px] text-[#505f7b]">پارس تریکو | تدارکات داخلی</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#002045] font-tabular">۱,۷۵۰,۰۰۰,۰۰۰ ریال</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                {signedDocs.includes('q-2') ? (
                  <span className="w-full text-center py-1 text-[11px] font-bold text-[#002045] bg-[#ceddff] rounded">
                    ✓ امضا شد و ارسال گردید
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleSign('q-2', 'تجهیز ناوگان لیفتراک')}
                      className="flex-1 h-7 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">draw</span>
                      <span>امضای دیجیتال</span>
                    </button>
                    <button
                      onClick={() => onNavigate('purchasing')}
                      className="h-7 px-2.5 rounded bg-[#e6eeff] hover:bg-[#dce9ff] text-[#505f7b] hover:text-[#0d1c2e] text-[11px] transition-colors"
                      type="button"
                    >
                      استعلام
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Queue Item 3 */}
            <div className="p-2.5 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-col gap-1.5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0d1c2e]">حواله ارزی تأمین الکترود گرافیکی</span>
                  <span className="text-[10px] text-[#505f7b]">هلدینگ پارس | بازرگانی خارجی</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#ba1a1a] font-tabular">$ 48,500 USD</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                {signedDocs.includes('q-3') ? (
                  <span className="w-full text-center py-1 text-[11px] font-bold text-[#002045] bg-[#ceddff] rounded">
                    ✓ حواله ارزی تنفیذ شد
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleSign('q-3', 'حواله ارزی الکترود')}
                      className="flex-1 h-7 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">draw</span>
                      <span>امضای دیجیتال</span>
                    </button>
                    <button
                      onClick={() => onNavigate('purchasing')}
                      className="h-7 px-2.5 rounded bg-[#e6eeff] hover:bg-[#dce9ff] text-[#505f7b] hover:text-[#0d1c2e] text-[11px] transition-colors"
                      type="button"
                    >
                      استعلام
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Queue Item 4 */}
            <div className="p-2.5 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-col gap-1.5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0d1c2e]">تمدید بیمه جامع تأسیسات پالایش</span>
                  <span className="text-[10px] text-[#505f7b]">پارس ترابر | امور حقوقی و قراردادها</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#002045] font-tabular">۳,۹۰۰,۰۰۰,۰۰۰ ریال</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                {signedDocs.includes('q-4') ? (
                  <span className="w-full text-center py-1 text-[11px] font-bold text-[#002045] bg-[#ceddff] rounded">
                    ✓ تمدید بیمه‌نامه تایید شد
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleSign('q-4', 'بیمه جامع تأسیسات')}
                      className="flex-1 h-7 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">draw</span>
                      <span>امضای دیجیتال</span>
                    </button>
                    <button
                      onClick={() => onNavigate('approvals')}
                      className="h-7 px-2.5 rounded bg-[#e6eeff] hover:bg-[#dce9ff] text-[#505f7b] hover:text-[#0d1c2e] text-[11px] transition-colors"
                      type="button"
                    >
                      بررسی
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Warehouse Utilization Section */}
          <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#505f7b]">warehouse</span>
                <span className="text-xs font-bold text-[#0d1c2e]">ظرفیت بارگیری و دپوی انبارها</span>
              </div>
              <span className="text-[11px] text-[#505f7b]">پایش هوشمند ظرفیت</span>
            </div>

            {/* Storage 1: Qazvin Central */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#0d1c2e] font-semibold">انبار مرکزی قزوین (قطعات و محصول)</span>
                <span className="font-mono text-[#002045] font-bold font-tabular">۸۸٪</span>
              </div>
              <div className="w-full h-2 rounded bg-[#e6eeff] overflow-hidden">
                <div className="h-full bg-[#002045] rounded" style={{ width: '88%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-[#505f7b] font-tabular">
                <span>موجودی: ۲۲,۴۰۰ پالت</span>
                <span>ظرفیت آزاد: ۱۲٪</span>
              </div>
            </div>

            {/* Storage 2: Bandar Abbas */}
            <div className="flex flex-col gap-1 pt-1 border-t border-[#f8f9ff]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#0d1c2e] font-semibold">انبار مواد اولیه بندرعباس (محوطه باز)</span>
                <span className="font-mono text-[#002045] font-bold font-tabular">۶۴٪</span>
              </div>
              <div className="w-full h-2 rounded bg-[#e6eeff] overflow-hidden">
                <div className="h-full bg-[#505f7b] rounded" style={{ width: '64%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-[#505f7b] font-tabular">
                <span>موجودی: ۴۸,۱۰۰ تن</span>
                <span>ظرفیت آزاد: ۳۶٪ (مطلوب)</span>
              </div>
            </div>

            {/* Storage 3: Tehran Spare Parts (High alert) */}
            <div className="flex flex-col gap-1 pt-1 border-t border-[#f8f9ff]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#0d1c2e] font-semibold flex items-center gap-1">
                  <span>انبار قطعات یدکی تهران</span>
                  <span className="px-1 rounded bg-[#ba1a1a] text-white text-[9px] font-bold">هشدار سرریز</span>
                </span>
                <span className="font-mono text-[#ba1a1a] font-bold font-tabular">۹۴٪</span>
              </div>
              <div className="w-full h-2 rounded bg-[#e6eeff] overflow-hidden">
                <div className="h-full bg-[#ba1a1a] rounded" style={{ width: '94%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-[#ba1a1a] font-tabular">
                <span>موجودی: ۱۸,۹۵۰ ردیف قطعه</span>
                <span>نیاز به تخلیه به انبار کمکی کرج</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Audit & System Status Footer Bar */}
      <div className="p-3 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-wrap items-center justify-between gap-3 text-[#505f7b] text-[11px] shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#002045]"></span>
            <span>پایگاه داده هلدینگ:</span>
            <span className="font-mono text-[#0d1c2e] font-semibold">CLUSTER_TEH_NODE_01 (PRIMARY)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">speed</span>
            <span>تأخیر همگام‌سازی (Latency):</span>
            <span className="font-mono text-[#0d1c2e] font-semibold font-tabular">14ms</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            <span>پروتکل رمزنگاری و امضا:</span>
            <span className="font-mono text-[#0d1c2e]">PKI-RSA-4096 VALID</span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-tabular">
          <span>آخرین بسته‌شدن تراز قطعی روزانه:</span>
          <span className="font-semibold text-[#002045]">۱۴۰۳/۰۸/۲۱ - ساعت ۲۳:۵۹</span>
        </div>
      </div>
    </div>
  );
};
