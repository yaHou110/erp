import React, { useState } from 'react';
import { ProcurementDocument, Subsidiary } from '../types/erp';

interface ProcurementPurchasingProps {
  dossier: ProcurementDocument;
  currentSubsidiary: Subsidiary;
  onNavigateToApprovals?: () => void;
}

export const ProcurementPurchasingView: React.FC<ProcurementPurchasingProps> = ({
  dossier,
  currentSubsidiary,
  onNavigateToApprovals,
}) => {
  const [currentDossier, setCurrentDossier] = useState<ProcurementDocument>(dossier);
  const [isCommissionApproved, setIsCommissionApproved] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'matrix' | 'items' | 'compliance' | 'audit'>('matrix');

  const handleApproveCommission = () => {
    setIsCommissionApproved(true);
    setShowToast('مصوبه کمیسیون معاملات با موفقیت به امضای دیجیتال رسید و به کارتابل مدیرعامل ارسال شد.');
    setTimeout(() => setShowToast(null), 4000);
  };

  const handleRejectOrDiscrepancy = () => {
    setShowToast('فرم ثبت مغایرت فنی باز شد و به واحد مهندسی نت عودت داده شد.');
    setTimeout(() => setShowToast(null), 3500);
  };

  return (
    <div className="flex flex-col w-full gap-4 py-2 pb-14 text-[#0d1c2e]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-10 z-50 bg-[#002045] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-xs border border-[#1a365d]">
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

      {/* Breadcrumb and Priority Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded shadow-sm border border-[#e6eeff]">
        <div className="flex items-center gap-2 text-xs text-[#505f7b]">
          <span className="text-[#74777f]">سامانه کاوش</span>
          <span>/</span>
          <span className="text-[#74777f]">تدارکات و خرید</span>
          <span>/</span>
          <span className="font-bold text-[#0d1c2e]">پرونده سفارش خرید قطعات (PO)</span>
          <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
            فوریت: خط تولید (REF: {currentDossier.prReference})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="h-8 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#002045] text-xs font-semibold flex items-center gap-1 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>چاپ فرم رسمی سفارش خرید</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className="h-8 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#505f7b] hover:text-[#0d1c2e] text-xs flex items-center gap-1 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">history</span>
            <span>ردپا و ممیزی سند</span>
          </button>
        </div>
      </div>

      {/* 6-Stage Operational Stepper Header */}
      <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-[#505f7b]">
          <span className="font-bold text-[#0d1c2e]">مراحل چرخه تأمین و سفارش‌گذاری رسمی (Procurement Lifecycle)</span>
          <span className="font-tabular font-mono text-[#002045]">
            گام ۳ از ۶: {isCommissionApproved ? 'تأیید کمیسیون انجام شد' : currentDossier.currentStageLabel}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
          {/* Step 1 */}
          <div className="p-2 rounded bg-[#dce9ff] border border-[#adc7f7] flex flex-col gap-0.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#002045]">۰۱. درخواست کالا (PR)</span>
              <span className="material-symbols-outlined text-[14px] text-[#002045]">check_circle</span>
            </div>
            <span className="text-[10px] text-[#505f7b]">تأیید واحد متقاضی نت</span>
          </div>

          {/* Step 2 */}
          <div className="p-2 rounded bg-[#dce9ff] border border-[#adc7f7] flex flex-col gap-0.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#002045]">۰۲. استعلام بها (RFQ)</span>
              <span className="material-symbols-outlined text-[14px] text-[#002045]">check_circle</span>
            </div>
            <span className="text-[10px] text-[#505f7b]">۳ استعلام رقابتی ثبت شد</span>
          </div>

          {/* Step 3 */}
          <div className={`p-2 rounded border flex flex-col gap-0.5 ${
            isCommissionApproved
              ? 'bg-[#dce9ff] border-[#adc7f7]'
              : 'bg-[#002045] text-white border-[#002045]'
          }`}>
            <div className="flex items-center justify-between text-[11px]">
              <span className={`font-bold ${isCommissionApproved ? 'text-[#002045]' : 'text-white'}`}>
                ۰۳. کمیسیون معاملات
              </span>
              <span className="material-symbols-outlined text-[14px]">
                {isCommissionApproved ? 'check_circle' : 'pending'}
              </span>
            </div>
            <span className={`text-[10px] ${isCommissionApproved ? 'text-[#505f7b]' : 'text-[#d6e3ff]'}`}>
              {isCommissionApproved ? 'مصوب گردید' : 'گام جاری - بررسی هیئت مدیره'}
            </span>
          </div>

          {/* Step 4 */}
          <div className="p-2 rounded bg-[#f8f9ff] border border-[#e6eeff] flex flex-col gap-0.5 opacity-80">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#505f7b]">۰۴. صدور سفارش (PO)</span>
              <span className="text-[10px] text-[#74777f]">گام بعدی</span>
            </div>
            <span className="text-[10px] text-[#74777f]">ابلاغ به شرکت سپهر</span>
          </div>

          {/* Step 5 */}
          <div className="p-2 rounded bg-[#f8f9ff] border border-[#e6eeff] flex flex-col gap-0.5 opacity-70">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#505f7b]">۰۵. بازرسی و انبار (GRN)</span>
            </div>
            <span className="text-[10px] text-[#74777f]">کنترل کیفیت ورودی QC</span>
          </div>

          {/* Step 6 */}
          <div className="p-2 rounded bg-[#f8f9ff] border border-[#e6eeff] flex flex-col gap-0.5 opacity-60">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#505f7b]">۰۶. تسویه مودیان</span>
            </div>
            <span className="text-[10px] text-[#74777f]">انطباق مالیات بر ارزش افزوده</span>
          </div>
        </div>
      </div>

      {/* Main Dossier Header Card */}
      <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#e6eeff]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#002045]">
                {currentDossier.title}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#002045] text-white font-mono text-xs font-tabular">
                {currentDossier.poNumber}
              </span>
            </div>
            <span className="text-xs text-[#505f7b]">
              شرکت: {currentDossier.subsidiaryName} | درخواست عطف: {currentDossier.prReference}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-tabular">
            <div className="flex flex-col items-end">
              <span className="text-[#505f7b] text-[11px]">واحد متقاضی</span>
              <span className="font-bold text-[#0d1c2e]">{currentDossier.requestingDepartment}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[#505f7b] text-[11px]">مرکز هزینه</span>
              <span className="font-bold text-[#002045] font-mono">{currentDossier.costCenterCode}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[#505f7b] text-[11px]">مهلت تحویل به کارخانه</span>
              <span className="font-bold text-[#ba1a1a]">{currentDossier.deliveryDeadline}</span>
            </div>
          </div>
        </div>

        {/* Engineering & Condition Monitoring Justification */}
        <div className="p-3 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-col gap-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#002045] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">engineering</span>
              <span>توجیه فنی و گزارش پایش وضعیت (Condition Monitoring) اداره نت:</span>
            </span>
            <span className="text-[11px] font-mono text-[#505f7b]">
              {currentDossier.technicalSpecNumber} | {currentDossier.isoStandardCode}
            </span>
          </div>
          <p className="text-[#43474e] leading-relaxed text-[11px]">
            {currentDossier.technicalJustification}
          </p>
        </div>

        {/* Budget Variance Control Box */}
        <div className="p-3 rounded bg-white border border-[#c4c6cf] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#505f7b] text-[11px]">سقف بودجه مصوب اداره نت (CAPEX)</span>
            <span className="font-mono text-base font-bold text-[#0d1c2e] font-tabular">
              {currentDossier.budgetCeilingRials.toLocaleString('fa-IR')} ریال
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[#505f7b] text-[11px]">تعهد ناخالص استعلام برتر (سپهر)</span>
            <span className="font-mono text-base font-bold text-[#002045] font-tabular">
              {currentDossier.committedAmountRials.toLocaleString('fa-IR')} ریال
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[#505f7b] text-[11px]">مانده بودجه مجاز پس از این سفارش</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-base font-bold text-[#002045] font-tabular">
                {currentDossier.remainingBudgetCapexRials.toLocaleString('fa-IR')} ریال
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#002045] text-[10px] font-bold">
                عدم انحراف (پوشش کامل)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar for Deep Examination */}
      <div className="flex items-center gap-1 border-b border-[#e6eeff] text-xs font-semibold">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'matrix'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[17px]">balance</span>
          <span>جدول ماتریس مقایسه استعلام‌ها (RFQ Matrix)</span>
        </button>
        <button
          onClick={() => setActiveTab('items')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'items'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[17px]">format_list_numbered</span>
          <span>اقلام ردیف‌های سفارش ({currentDossier.lines.length} قلم)</span>
        </button>
        <button
          onClick={() => setActiveTab('compliance')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'compliance'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[17px]">verified_user</span>
          <span>چک‌لیست حقوقی و انطباق مودیان</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'audit'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[17px]">policy</span>
          <span>سلسله مراتب تأییدات و ردپای SHA-256</span>
        </button>
      </div>

      {/* Tab 1: RFQ Comparative Matrix */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded shadow-sm border border-[#e6eeff] flex flex-col overflow-hidden">
          <div className="p-3 bg-[#eff4ff] border-b border-[#e6eeff] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0d1c2e]">
                ماتریس ارزیابی و استعلام ۳ تأمین‌کننده واجد صلاحیت (کمیسیون معاملات)
              </span>
            </div>
            <span className="text-[11px] text-[#505f7b]">
              معیار انتخاب: ترکیب ۴۰٪ شاخص فنی-کیفی + ۶۰٪ قیمت و شرایط تسویه
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="h-10 bg-[#f8f9ff] text-[#505f7b] text-xs font-semibold border-b border-[#e6eeff]">
                  <th className="px-3">نام تأمین‌کننده / فروشنده</th>
                  <th className="px-3 text-left">مبلغ کل استعلام (ریال)</th>
                  <th className="px-3">شرایط پرداخت و تسویه مالی</th>
                  <th className="px-3 text-center">زمان تحویل</th>
                  <th className="px-3">گارانتی و اصالت ساخت (COO)</th>
                  <th className="px-3 text-center">امتیاز جامع</th>
                  <th className="px-3">نتیجه کمیسیون</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-[#eff4ff]">
                {currentDossier.rfqMatrix.map((quote) => (
                  <tr
                    key={quote.supplierId}
                    className={`h-12 transition-colors ${
                      quote.isWinningBid ? 'bg-[#e6eeff]/60' : 'hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <td className="px-3">
                      <div className="flex items-center gap-2">
                        {quote.isWinningBid && (
                          <span className="material-symbols-outlined text-[18px] text-[#002045]">
                            verified
                          </span>
                        )}
                        <span className={`font-bold ${quote.isWinningBid ? 'text-[#002045]' : 'text-[#0d1c2e]'}`}>
                          {quote.supplierName}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 text-left font-mono font-bold font-tabular text-[#0d1c2e]">
                      {quote.totalGrossRials.toLocaleString('fa-IR')}
                    </td>
                    <td className="px-3 text-[#505f7b]">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            quote.paymentTermsCompliance ? 'bg-[#002045]' : 'bg-[#ba1a1a]'
                          }`}
                        ></span>
                        <span>{quote.paymentTerms}</span>
                      </div>
                    </td>
                    <td className="px-3 text-center font-tabular text-[#505f7b]">
                      {quote.deliveryStatus}
                    </td>
                    <td className="px-3 text-[#505f7b]">
                      <div className="flex flex-col">
                        <span>{quote.warrantyPeriod}</span>
                        <span className="text-[10px] text-[#74777f]">{quote.cooCertificate}</span>
                      </div>
                    </td>
                    <td className="px-3 text-center font-mono font-bold font-tabular">
                      <span
                        className={`px-2 py-0.5 rounded ${
                          quote.vendorScore >= 90
                            ? 'bg-[#dce9ff] text-[#002045]'
                            : 'bg-[#eff4ff] text-[#505f7b]'
                        }`}
                      >
                        {quote.vendorScore} / ۱۰۰
                      </span>
                    </td>
                    <td className="px-3">
                      {quote.isWinningBid ? (
                        <span className="px-2 py-0.5 rounded bg-[#002045] text-white text-[10px] font-bold">
                          پیشنهاد برتر (منتخب)
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#74777f]">{quote.decisionNote}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Itemized Lines Table */}
      {activeTab === 'items' && (
        <div className="bg-white rounded shadow-sm border border-[#e6eeff] flex flex-col overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="h-10 bg-[#eff4ff] text-[#505f7b] text-xs font-semibold border-b border-[#e6eeff]">
                  <th className="px-3 text-center w-12">ردیف</th>
                  <th className="px-3">شرح قلم و مشخصات فنی مهندسی</th>
                  <th className="px-3">شناسه SKU</th>
                  <th className="px-3 text-center">تعداد / واحد</th>
                  <th className="px-3 text-left">نرخ واحد مصوب (ریال)</th>
                  <th className="px-3 text-left">مالیات و عوارض ارزش افزوده (۱۰٪)</th>
                  <th className="px-3 text-left">مبلغ کل ناخالص (ریال)</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-[#eff4ff]">
                {currentDossier.lines.map((line) => (
                  <tr key={line.rowNum} className="h-12 hover:bg-[#f8f9ff]">
                    <td className="px-3 text-center font-mono font-bold text-[#505f7b] font-tabular">
                      {line.rowNum}
                    </td>
                    <td className="px-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0d1c2e]">{line.name}</span>
                        <span className="text-[11px] text-[#505f7b] font-mono">{line.technicalSpec}</span>
                      </div>
                    </td>
                    <td className="px-3 font-mono text-[#002045] font-semibold">{line.sku}</td>
                    <td className="px-3 text-center font-tabular">
                      <span className="font-bold text-[#0d1c2e]">{line.quantity.toLocaleString('fa-IR')}</span>{' '}
                      <span className="text-[#505f7b] text-[11px]">{line.unit}</span>
                    </td>
                    <td className="px-3 text-left font-mono font-bold font-tabular text-[#0d1c2e]">
                      {line.approvedUnitRateRials.toLocaleString('fa-IR')}
                    </td>
                    <td className="px-3 text-left font-mono font-tabular text-[#505f7b]">
                      {line.vatTaxRials.toLocaleString('fa-IR')}
                    </td>
                    <td className="px-3 text-left font-mono font-bold font-tabular text-[#002045]">
                      {line.totalGrossRials.toLocaleString('fa-IR')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="h-12 bg-[#eff4ff] border-t-2 border-[#002045] font-bold text-xs">
                  <td colSpan={6} className="px-4 text-left text-[#002045]">
                    مجموع کل ناخالص سفارش خرید (شامل ۱۰٪ مالیات بر ارزش افزوده سامانه مودیان):
                  </td>
                  <td className="px-3 text-left font-mono text-sm text-[#002045] font-tabular">
                    {currentDossier.committedAmountRials.toLocaleString('fa-IR')} ریال
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Compliance & Legal Checklist */}
      {activeTab === 'compliance' && (
        <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-3">
          <span className="text-xs font-bold text-[#0d1c2e]">
            چک‌لیست الزامات قانونی، ضمانت‌نامه‌ها و سامانه مودیان مالیاتی:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentDossier.complianceItems.map((c) => (
              <div
                key={c.code}
                className="p-3 rounded bg-[#eff4ff] border border-[#d5e3fc] flex items-start gap-2.5 text-xs"
              >
                <span className="material-symbols-outlined text-[20px] text-[#002045] mt-0.5">
                  check_circle
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#002045]">{c.title}</span>
                    <span className="font-mono text-[10px] text-[#505f7b] bg-white px-1.5 py-0.2 rounded border border-[#e6eeff]">
                      {c.code}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#505f7b] leading-relaxed">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Audit Trail and Approval Stages */}
      {activeTab === 'audit' && (
        <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-4 text-xs">
          <span className="font-bold text-[#0d1c2e]">زنجیره تأییدات و ردپای تراکنش‌ها (Audit Log):</span>

          {/* 4-Stage Approval Visual Timeline */}
          <div className="flex flex-col gap-2 p-3 rounded bg-[#eff4ff] border border-[#d5e3fc]">
            {currentDossier.approvalChain.map((step) => (
              <div
                key={step.stepNumber}
                className="p-2.5 rounded bg-white border border-[#e6eeff] flex flex-wrap items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.status === 'completed'
                        ? 'bg-[#002045] text-white'
                        : step.status === 'current'
                        ? 'bg-[#ceddff] text-[#002045] ring-2 ring-[#002045]'
                        : 'bg-[#eff4ff] text-[#74777f]'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#0d1c2e]">{step.stageName}</span>
                    <span className="text-[11px] text-[#505f7b]">
                      {step.assigneeName} ({step.assigneeTitle})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-tabular">
                  {step.actionDate && (
                    <span className="text-[#505f7b]">
                      {step.actionDate} - {step.actionTime}
                    </span>
                  )}
                  {step.digitalSignatureHash && (
                    <span className="font-mono text-[#002045] text-[10px] bg-[#eff4ff] px-2 py-0.5 rounded">
                      {step.digitalSignatureHash}
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                      step.status === 'completed'
                        ? 'bg-[#dce9ff] text-[#002045]'
                        : step.status === 'current'
                        ? 'bg-[#ceddff] text-[#002045]'
                        : 'bg-[#eff4ff] text-[#74777f]'
                    }`}
                  >
                    {step.status === 'completed'
                      ? 'تأیید شده'
                      : step.status === 'current'
                      ? 'در حال بررسی'
                      : 'در انتظار'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cryptographic SHA-256 Audit Records */}
          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-[#505f7b] text-[11px]">لاگ‌های تغییرات سیستمی (SHA-256 Proofs):</span>
            {currentDossier.auditTrail.map((log) => (
              <div
                key={log.id}
                className="p-2 rounded bg-[#f8f9ff] border border-[#e6eeff] flex flex-wrap items-center justify-between gap-2 text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0d1c2e]">{log.userName}</span>
                  <span className="text-[#c4c6cf]">|</span>
                  <span className="text-[#505f7b]">{log.actionType}: {log.diffSummary}</span>
                </div>
                <div className="flex items-center gap-3 font-tabular">
                  <span className="font-mono text-[10px] text-[#74777f]">{log.ipAddress}</span>
                  <span className="text-[#74777f]">{log.timestamp}</span>
                  <span className="font-mono text-[9px] text-[#002045] bg-[#eff4ff] px-1.5 py-0.2 rounded truncate max-w-[150px]">
                    {log.sha256Hash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Control Strip */}
      <div className="p-3 bg-white rounded shadow-sm border border-[#e6eeff] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-[#505f7b]">
          <span className="material-symbols-outlined text-[16px] text-[#002045]">security</span>
          <span>تصمیم‌گیری مستلزم احراز هویت توکن امضای دیجیتال معاونت بازرگانی هلدینگ است.</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRejectOrDiscrepancy}
            className="h-8 px-3 rounded bg-[#ffdad6] hover:bg-[#ffdad6]/80 text-[#93000a] text-xs font-semibold flex items-center gap-1 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">report_problem</span>
            <span>ثبت مغایرت فنی / عودت</span>
          </button>
          <button
            onClick={() => {
              setShowToast('درخواست استعلام مجدد ثبت و به کارشناس خرید ارجاع شد.');
              setTimeout(() => setShowToast(null), 3000);
            }}
            className="h-8 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#505f7b] hover:text-[#0d1c2e] text-xs font-semibold flex items-center gap-1 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">replay</span>
            <span>تجدید استعلام</span>
          </button>
          <button
            onClick={handleApproveCommission}
            disabled={isCommissionApproved}
            className={`h-8 px-4 rounded text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isCommissionApproved
                ? 'bg-[#dce9ff] text-[#002045] cursor-default'
                : 'bg-[#002045] hover:bg-[#1a365d] text-white'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isCommissionApproved ? 'verified' : 'draw'}
            </span>
            <span>{isCommissionApproved ? 'تصویب و امضا شد' : 'تصویب کمیسیون و ارسال به مدیرعامل'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
