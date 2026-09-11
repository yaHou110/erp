import React from 'react';
import { Subsidiary } from '../types/erp';

interface AnalyticsBiProps {
  currentSubsidiary: Subsidiary;
  subsidiaries: Subsidiary[];
}

export const AnalyticsBiView: React.FC<AnalyticsBiProps> = ({
  currentSubsidiary,
  subsidiaries,
}) => {
  return (
    <div className="flex flex-col w-full gap-4 py-2 pb-14 text-[#0d1c2e]">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded shadow-sm border border-[#e6eeff]">
        <div className="flex items-center gap-2 text-xs text-[#505f7b]">
          <span className="text-[#74777f]">سامانه کاوش</span>
          <span>/</span>
          <span className="text-[#74777f]">هوش تجاری و تحلیل کلان</span>
          <span>/</span>
          <span className="font-bold text-[#0d1c2e]">داشبورد تحلیلی زنجیره ارزش و کارایی عملیاتی هلدینگ</span>
        </div>

        <button
          onClick={() => window.print()}
          className="h-8 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#002045] text-xs font-semibold flex items-center gap-1 transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          <span>خروجی گزارش تحلیلی هیئت مدیره</span>
        </button>
      </div>

      {/* 4 Analytical KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <span className="text-xs text-[#505f7b]">نرخ گردش موجودی کالا (Turnover)</span>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۵.۸</span>
            <span className="text-xs text-[#505f7b]">مرتبه در سال</span>
          </div>
          <span className="text-[11px] text-[#002045] font-semibold">+۱۵٪ بهینه‌سازی نسبت به پارسال</span>
        </div>

        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <span className="text-xs text-[#505f7b]">متوسط زمان چرخه خرید (Lead Time)</span>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۱۸</span>
            <span className="text-xs text-[#505f7b]">روز کاری (از PR تا ورود به انبار)</span>
          </div>
          <span className="text-[11px] text-[#002045] font-semibold">کاهش ۷ روزه زمان بوروکراسی</span>
        </div>

        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <span className="text-xs text-[#505f7b]">صرفه‌جویی ناشی از کمیسیون معاملات</span>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۳,۴۵۰,۰۰۰,۰۰۰</span>
            <span className="text-xs text-[#505f7b]">ریال در ۶ ماهه اول</span>
          </div>
          <span className="text-[11px] text-[#505f7b]">تخفیف رقابتی استعلام ۳گانه</span>
        </div>

        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <span className="text-xs text-[#505f7b]">شاخص سلامت زنجیره تأمین (OTIF)</span>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۹۴.۶٪</span>
            <span className="text-xs text-[#505f7b]">تحویل به‌موقع و کامل</span>
          </div>
          <span className="text-[11px] text-[#002045] font-semibold">منطبق بر اهداف سالانه هلدینگ</span>
        </div>
      </div>

      {/* Subsidiary Performance Comparison Matrix */}
      <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-3">
        <span className="text-xs font-bold text-[#0d1c2e]">
          مقایسه تراز عملیاتی و انضباط گردش کار شرکت‌های تابعه هلدینگ پارس:
        </span>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="h-10 bg-[#eff4ff] text-[#505f7b] font-semibold border-b border-[#e6eeff]">
                <th className="px-3">کد</th>
                <th className="px-3">نام شرکت تابعه</th>
                <th className="px-3">حوزه فعالیت صنعتی</th>
                <th className="px-3 text-center">تعداد پرسنل</th>
                <th className="px-3 text-center">انبارها</th>
                <th className="px-3 text-center">انضباط بودجه‌ای</th>
                <th className="px-3 text-center">وضعیت ریسک</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff]">
              {subsidiaries.map((sub) => (
                <tr key={sub.id} className="h-12 hover:bg-[#f8f9ff]">
                  <td className="px-3 font-mono font-bold text-[#002045] font-tabular">{sub.code}</td>
                  <td className="px-3 font-bold text-[#0d1c2e]">{sub.name}</td>
                  <td className="px-3 text-[#505f7b]">
                    {sub.industry === 'manufacturing' && 'صنایع تولید فولاد و نورد'}
                    {sub.industry === 'trading' && 'بازرگانی و تأمین تجهیزات'}
                    {sub.industry === 'casting' && 'ریخته‌گری دقیق و قالب‌سازی'}
                    {sub.industry === 'logistics' && 'ترابری سنگین و حمل مواد'}
                  </td>
                  <td className="px-3 text-center font-tabular">{sub.activeEmployeeCount} نفر</td>
                  <td className="px-3 text-center font-tabular">{sub.warehouseCount} انبار</td>
                  <td className="px-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-[#dce9ff] text-[#002045] text-[10px] font-bold">
                      ۹۶.۴٪ انطباق
                    </span>
                  </td>
                  <td className="px-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#505f7b] text-[10px]">
                      کم‌ریسک (پایدار)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
