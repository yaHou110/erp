import React, { useState } from 'react';
import { motion } from 'motion/react';
import { mockAccountingTransactions, mockBankBalances } from '../data/mockErpData';

export function AccountingFinanceView() {
  const [activeTab, setActiveTab] = useState<'treasury' | 'gl' | 'tax'>('treasury');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fa-IR').format(value) + ' ریال';
  };

  const totalBankBalance = mockBankBalances.reduce((acc, bank) => acc + bank.currentBalanceRials, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#002045]">حسابداری و مالی</h2>
          <p className="text-xs text-[#505f7b] mt-1">مدیریت نقدینگی، اسناد حسابداری و تکالیف قانونی</p>
        </div>
        
        <div className="flex bg-[#eff4ff] p-1 rounded-lg border border-[#d5e3fc]">
          <button
            onClick={() => setActiveTab('treasury')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'treasury' ? 'bg-white text-[#002045] shadow-sm' : 'text-[#505f7b] hover:text-[#002045]'
            }`}
          >
            خزانه و نقدینگی
          </button>
          <button
            onClick={() => setActiveTab('gl')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'gl' ? 'bg-white text-[#002045] shadow-sm' : 'text-[#505f7b] hover:text-[#002045]'
            }`}
          >
            دفتر کل و اسناد
          </button>
          <button
            onClick={() => setActiveTab('tax')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'tax' ? 'bg-white text-[#002045] shadow-sm' : 'text-[#505f7b] hover:text-[#002045]'
            }`}
          >
            سامانه مودیان و مالیات
          </button>
        </div>
      </div>

      {activeTab === 'treasury' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#e6eeff] rounded-xl p-5 shadow-sm col-span-1 md:col-span-2">
              <h3 className="text-[#505f7b] text-xs font-semibold mb-2">مجموع نقدینگی حساب‌های بانکی</h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[#002045] tracking-tight">{new Intl.NumberFormat('fa-IR').format(totalBankBalance)}</span>
                <span className="text-sm text-[#52617e] mb-1">ریال</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px]">
                <span className="text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span>
                  +۱۲.۵٪ نسبت به ماه قبل
                </span>
                <span className="text-[#505f7b]">آخرین بروزرسانی: امروز ۱۰:۱۵</span>
              </div>
            </div>
            
            <div className="bg-white border border-[#e6eeff] rounded-xl p-5 shadow-sm">
              <h3 className="text-[#505f7b] text-xs font-semibold mb-2">اسناد دریافتنی (چک‌ها)</h3>
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-[#002045] tracking-tight">{new Intl.NumberFormat('fa-IR').format(45000000000)}</span>
              </div>
              <div className="mt-2 text-[11px] text-[#52617e]">۳۴ فقره چک سررسید نشده</div>
            </div>
            
            <div className="bg-white border border-[#e6eeff] rounded-xl p-5 shadow-sm">
              <h3 className="text-[#505f7b] text-xs font-semibold mb-2">اسناد پرداختنی (تعهدات)</h3>
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-[#b91c1c] tracking-tight">{new Intl.NumberFormat('fa-IR').format(12800000000)}</span>
              </div>
              <div className="mt-2 text-[11px] text-[#52617e]">۸ فقره در ماه جاری</div>
            </div>
          </div>

          <div className="bg-white border border-[#e6eeff] rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-[#e6eeff] flex items-center justify-between bg-[#f8fbff]">
              <h3 className="text-[#0d1c2e] text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3b82f6]">account_balance</span>
                وضعیت حساب‌های بانکی
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="bg-[#eff4ff] text-[#505f7b] text-xs">
                  <tr>
                    <th className="px-5 py-3 font-semibold">بانک و شعبه</th>
                    <th className="px-5 py-3 font-semibold">شماره حساب</th>
                    <th className="px-5 py-3 font-semibold">نوع حساب</th>
                    <th className="px-5 py-3 font-semibold">موجودی (ریال)</th>
                    <th className="px-5 py-3 font-semibold">آخرین همگام‌سازی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6eeff]">
                  {mockBankBalances.map((bank) => (
                    <tr key={bank.id} className="hover:bg-[#f8fbff] transition-colors">
                      <td className="px-5 py-3 font-medium text-[#002045]">{bank.bankName}</td>
                      <td className="px-5 py-3 text-[#52617e] font-mono text-[13px]">{bank.accountNumber}</td>
                      <td className="px-5 py-3 text-[#52617e] text-xs">{bank.accountType}</td>
                      <td className="px-5 py-3 font-semibold text-[#002045] font-tabular">{formatCurrency(bank.currentBalanceRials)}</td>
                      <td className="px-5 py-3 text-[#74777f] text-xs">{bank.lastSyncTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gl' && (
        <div className="bg-white border border-[#e6eeff] rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[#e6eeff] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f8fbff]">
            <h3 className="text-[#0d1c2e] text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3b82f6]">receipt_long</span>
              دفتر روزنامه / آخرین اسناد حسابداری
            </h3>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 rounded border border-[#d5e3fc] bg-white text-[#002045] text-xs font-medium hover:bg-[#eff4ff] transition-colors">
                فیلتر تاریخ
              </button>
              <button className="h-8 px-3 rounded bg-[#002045] text-white text-xs font-semibold hover:bg-[#1a365d] transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">add</span>
                ثبت سند دستی
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-[#eff4ff] text-[#505f7b] text-xs">
                <tr>
                  <th className="px-5 py-3 font-semibold">تاریخ</th>
                  <th className="px-5 py-3 font-semibold">شماره سند</th>
                  <th className="px-5 py-3 font-semibold">شرح رویداد</th>
                  <th className="px-5 py-3 font-semibold">شرکت / شعبه</th>
                  <th className="px-5 py-3 font-semibold">جمع بدهکار (ریال)</th>
                  <th className="px-5 py-3 font-semibold">جمع بستانکار (ریال)</th>
                  <th className="px-5 py-3 font-semibold">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6eeff]">
                {mockAccountingTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#f8fbff] transition-colors">
                    <td className="px-5 py-3 text-[#505f7b] font-tabular text-[13px]">{tx.date}</td>
                    <td className="px-5 py-3 text-[#002045] font-mono font-medium text-[13px]">{tx.documentNumber}</td>
                    <td className="px-5 py-3 text-[#0d1c2e] text-[13px]">{tx.description}</td>
                    <td className="px-5 py-3 text-[#52617e] text-[12px]">{tx.subsidiaryName}</td>
                    <td className="px-5 py-3 font-medium text-[#15803d] font-tabular">{formatCurrency(tx.totalDebitRials)}</td>
                    <td className="px-5 py-3 font-medium text-[#b91c1c] font-tabular">{formatCurrency(tx.totalCreditRials)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold
                        ${tx.status === 'posted' ? 'bg-[#dcfce7] text-[#15803d]' : 
                          tx.status === 'draft' ? 'bg-[#fef9c3] text-[#a16207]' : 
                          'bg-[#f1f5f9] text-[#64748b]'}`}>
                        {tx.status === 'posted' ? 'ثبت قطعی' : tx.status === 'draft' ? 'یادداشت' : 'باطل شده'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'tax' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-[#e6eeff] rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#eff4ff] text-[#3b82f6] rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl">cloud_done</span>
            </div>
            <h3 className="text-[#0d1c2e] font-bold text-lg mb-2">اتصال به سامانه مودیان فعال است</h3>
            <p className="text-[#505f7b] text-sm mb-6 max-w-md">
              کلیه صورتحساب‌های فروش و خریدهای ثبت شده در سیستم به صورت خودکار و زمان‌بندی شده به کارپوشه مالیاتی شرکت ارسال می‌گردند.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="bg-[#f8fbff] p-3 rounded border border-[#e6eeff]">
                <div className="text-2xl font-bold text-[#002045]">۱۲۸</div>
                <div className="text-[11px] text-[#52617e] mt-1">ارسال موفق (این ماه)</div>
              </div>
              <div className="bg-[#fef2f2] p-3 rounded border border-[#fecaca]">
                <div className="text-2xl font-bold text-[#b91c1c]">۲</div>
                <div className="text-[11px] text-[#b91c1c] mt-1">خطا در ارسال</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-[#e6eeff] rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-[#0d1c2e] font-bold mb-4 border-b border-[#e6eeff] pb-3">گزارشات فصلی و ارزش افزوده</h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#15803d]">check_circle</span>
                    <span className="text-sm font-medium text-[#0d1c2e]">اظهارنامه ارزش افزوده تابستان ۱۴۰۳</span>
                  </div>
                  <span className="text-[11px] bg-[#dcfce7] text-[#15803d] px-2 py-0.5 rounded font-bold">ارسال شده</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#a16207]">pending_actions</span>
                    <span className="text-sm font-medium text-[#0d1c2e]">گزارش خرید و فروش فصلی تابستان</span>
                  </div>
                  <span className="text-[11px] bg-[#fef9c3] text-[#a16207] px-2 py-0.5 rounded font-bold">در حال بررسی</span>
                </li>
              </ul>
            </div>
            <button className="w-full py-2.5 mt-6 rounded bg-[#eff4ff] text-[#002045] text-sm font-bold hover:bg-[#e6eeff] transition-colors">
              تولید فایل گزارش فصلی (TTMS)
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
