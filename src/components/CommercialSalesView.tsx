import React, { useState } from 'react';
import { SalesOrderSummary, Subsidiary } from '../types/erp';

interface CommercialSalesProps {
  orders: SalesOrderSummary[];
  currentSubsidiary: Subsidiary;
}

export const CommercialSalesView: React.FC<CommercialSalesProps> = ({
  orders,
  currentSubsidiary,
}) => {
  const [orderList, setOrderList] = useState<SalesOrderSummary[]>(orders);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleApproveCredit = (id: string, orderNum: string) => {
    setOrderList((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'dispatch_ready' } : o))
    );
    setToastMsg(`حواله خروج انبار برای فاکتور فروش ${orderNum} صادر و ابلاغ گردید.`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="flex flex-col w-full gap-4 py-2 pb-14 text-[#0d1c2e]">
      {toastMsg && (
        <div className="fixed bottom-6 left-10 z-50 bg-[#002045] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-xs border border-[#1a365d]">
          <span className="material-symbols-outlined text-[18px] text-[#adc7f7]">check_circle</span>
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="mr-2 text-[#c4c6cf] hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded shadow-sm border border-[#e6eeff]">
        <div className="flex items-center gap-2 text-xs text-[#505f7b]">
          <span className="text-[#74777f]">سامانه کاوش</span>
          <span>/</span>
          <span className="text-[#74777f]">بازرگانی و فروش</span>
          <span>/</span>
          <span className="font-bold text-[#0d1c2e]">مدیریت سفارشات فروش، مشتریان و کنترل اعتباری</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="h-8 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#002045] text-xs font-semibold flex items-center gap-1 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>گزارش فاکتورهای باز</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <span className="text-xs text-[#505f7b]">کل تعهدات فروش ماه جاری</span>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۲۸,۶۲۰,۰۰۰,۰۰۰</span>
            <span className="text-xs text-[#505f7b]">ریال</span>
          </div>
          <span className="text-[11px] text-[#002045] font-semibold">تحقق ۹۲٪ هدف بودجه</span>
        </div>

        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <span className="text-xs text-[#505f7b]">چک‌های صیادی در جریان وصول</span>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#0d1c2e]">۱۴,۸۰۰,۰۰۰,۰۰۰</span>
            <span className="text-xs text-[#505f7b]">ریال</span>
          </div>
          <span className="text-[11px] text-[#505f7b]">۱۰۰٪ انطباق با سامانه صیاد</span>
        </div>

        <div className="bg-white p-3.5 rounded shadow-sm border border-[#e6eeff] flex flex-col justify-between">
          <span className="text-xs text-[#ba1a1a]">هشدار مشتریان در مرز سقف اعتباری</span>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-xl font-bold font-tabular text-[#ba1a1a]">۲ مشتری</span>
          </div>
          <span className="text-[11px] text-[#ba1a1a]">نیاز به بازنگری تضامین بانکی</span>
        </div>
      </div>

      {/* Sales Orders Table */}
      <div className="bg-white rounded shadow-sm border border-[#e6eeff] flex flex-col overflow-hidden">
        <div className="p-3 bg-[#eff4ff] border-b border-[#e6eeff] flex items-center justify-between">
          <span className="text-xs font-bold text-[#0d1c2e]">فهرست سفارشات فروش و حواله‌های آماده ترخیص انبار</span>
          <span className="text-[11px] text-[#505f7b]">انطباق آنلاین با سامانه مودیان مالیاتی کشور</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="h-10 bg-[#f8f9ff] text-[#505f7b] font-semibold border-b border-[#e6eeff]">
                <th className="px-3">شماره سفارش (SI)</th>
                <th className="px-3">نام مشتری / خریدار عمده</th>
                <th className="px-3">شرکت تابعه</th>
                <th className="px-3 text-left">مبلغ سفارش (ریال)</th>
                <th className="px-3">سند تضمین و تسویه</th>
                <th className="px-3 text-center">ریسک اعتباری</th>
                <th className="px-3 text-center">وضعیت سند</th>
                <th className="px-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff]">
              {orderList.map((order) => (
                <tr key={order.id} className="h-12 hover:bg-[#f8f9ff]">
                  <td className="px-3 font-mono font-bold text-[#002045] font-tabular">
                    {order.orderNumber}
                  </td>
                  <td className="px-3 font-bold text-[#0d1c2e]">{order.customerName}</td>
                  <td className="px-3 text-[#505f7b]">{order.subsidiaryName}</td>
                  <td className="px-3 text-left font-mono font-bold font-tabular text-[#0d1c2e]">
                    {order.amountRials.toLocaleString('fa-IR')}
                  </td>
                  <td className="px-3 text-[#505f7b]">{order.guaranteeDoc}</td>
                  <td className="px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.creditRisk === 'low'
                          ? 'bg-[#dce9ff] text-[#002045]'
                          : 'bg-[#ffdad6] text-[#93000a]'
                      }`}
                    >
                      {order.creditRisk === 'low' ? 'ریسک پایین (معتبر)' : 'ریسک متوسط (+۵٪ مازاد)'}
                    </span>
                  </td>
                  <td className="px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        order.status === 'dispatch_ready'
                          ? 'bg-[#dce9ff] text-[#002045]'
                          : 'bg-[#ceddff] text-[#002045]'
                      }`}
                    >
                      {order.status === 'dispatch_ready'
                        ? 'آماده بارگیری و خروج'
                        : 'تأیید اعتباری شده'}
                    </span>
                  </td>
                  <td className="px-3 text-center">
                    {order.status !== 'dispatch_ready' ? (
                      <button
                        onClick={() => handleApproveCredit(order.id, order.orderNumber)}
                        className="h-7 px-2.5 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-[11px] font-semibold transition-colors"
                        type="button"
                      >
                        صدور حواله خروج
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#002045] font-semibold">حواله صادر شد</span>
                    )}
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
