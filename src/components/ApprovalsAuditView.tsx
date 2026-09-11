import React, { useState } from 'react';
import { ApprovalTask, Subsidiary } from '../types/erp';

interface ApprovalsAuditProps {
  tasks: ApprovalTask[];
  currentSubsidiary: Subsidiary;
  onNavigateToProcurement?: (poNumber: string) => void;
}

export const ApprovalsAuditView: React.FC<ApprovalsAuditProps> = ({
  tasks,
  currentSubsidiary,
  onNavigateToProcurement,
}) => {
  const [taskList, setTaskList] = useState<ApprovalTask[]>(tasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(tasks[0].id);
  const [activeTab, setActiveTab] = useState<'pending' | 'referred' | 'approved' | 'rejected'>('pending');
  const [executiveNote, setExecutiveNote] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const activeTask = taskList.find((t) => t.id === selectedTaskId) || taskList[0];

  const handleApprove = () => {
    setTaskList((prev) =>
      prev.map((t) =>
        t.id === activeTask.id ? { ...t, status: 'approved' } : t
      )
    );
    setActionNotice(`سند ${activeTask.documentNumber} با امضای دیجیتال Level-B تایید و به مرحله بعد ارسال شد.`);
    setExecutiveNote('');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleReject = () => {
    if (!executiveNote.trim()) {
      alert('لطفاً دلیل سیستمی رد سند را در کادر یادداشت کارشناسی وارد نمایید.');
      return;
    }
    setTaskList((prev) =>
      prev.map((t) =>
        t.id === activeTask.id ? { ...t, status: 'rejected' } : t
      )
    );
    setActionNotice(`سند ${activeTask.documentNumber} رد شد و دلیل در کارتابل متقاضی ثبت گردید.`);
    setExecutiveNote('');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleRefer = () => {
    setTaskList((prev) =>
      prev.map((t) =>
        t.id === activeTask.id ? { ...t, status: 'referred' } : t
      )
    );
    setActionNotice(`سند ${activeTask.documentNumber} جهت رفع ابهام به متقاضی ارجاع داده شد.`);
    setExecutiveNote('');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const filteredTasks = taskList.filter((t) => {
    if (activeTab === 'pending') return t.status === 'pending';
    if (activeTab === 'approved') return t.status === 'approved';
    if (activeTab === 'rejected') return t.status === 'rejected';
    if (activeTab === 'referred') return t.status === 'referred';
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-4 py-2 pb-14 text-[#0d1c2e]">
      {/* Toast Alert */}
      {actionNotice && (
        <div className="fixed bottom-6 left-10 z-50 bg-[#002045] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-xs border border-[#1a365d]">
          <span className="material-symbols-outlined text-[18px] text-[#adc7f7]">verified</span>
          <span>{actionNotice}</span>
          <button
            onClick={() => setActionNotice(null)}
            className="mr-2 text-[#c4c6cf] hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Breadcrumb & Global Authority Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded shadow-sm border border-[#e6eeff]">
        <div className="flex items-center gap-2 text-xs text-[#505f7b]">
          <span className="text-[#74777f]">سامانه کاوش</span>
          <span>/</span>
          <span className="text-[#74777f]">سیستم گردش کار و انضباط مالی</span>
          <span>/</span>
          <span className="font-bold text-[#0d1c2e]">کارتابل ممیزی و تصمیم‌گیری اسناد</span>
          <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#002045] font-mono text-[10px] font-tabular">
            ROLE: COMMERCIAL_VP
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-tabular">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#eff4ff] text-[#002045] font-semibold border border-[#d5e3fc]">
            <span className="material-symbols-outlined text-[16px]">vpn_key</span>
            <span>سطح دسترسی امضا: سطح ب (تا سقف ۵ میلیارد ریال)</span>
          </div>
          <div className="flex items-center gap-1 text-[#ba1a1a] font-bold">
            <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
            <span>۲ سند با مهلت اقدام کمتر از ۲ ساعت</span>
          </div>
        </div>
      </div>

      {/* Inbox Tabs Filter */}
      <div className="flex items-center gap-2 border-b border-[#e6eeff] text-xs font-semibold">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'pending'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">inbox</span>
          <span>نیازمند بررسی من</span>
          <span className="px-1.5 py-0.2 rounded bg-[#ba1a1a] text-white text-[10px] font-tabular">
            {taskList.filter((t) => t.status === 'pending').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('referred')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'referred'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">forward</span>
          <span>ارجاع‌شده جهت رفع ابهام</span>
          <span className="px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#505f7b] text-[10px] font-tabular">
            {taskList.filter((t) => t.status === 'referred').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'approved'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">task_alt</span>
          <span>تأیید شده‌های اخیر</span>
          <span className="px-1.5 py-0.2 rounded bg-[#dce9ff] text-[#002045] text-[10px] font-tabular">
            {taskList.filter((t) => t.status === 'approved').length + 48}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'rejected'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">cancel</span>
          <span>رد شده</span>
          <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#93000a] text-[10px] font-tabular">
            {taskList.filter((t) => t.status === 'rejected').length}
          </span>
        </button>
      </div>

      {/* Master-Detail Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Right: Master Cards List (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs text-[#505f7b] px-1">
            <span>اسناد موجود در این کارتابل ({filteredTasks.length} سند)</span>
            <span>مرتب‌سازی بر اساس فوریت زمانی</span>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="p-8 bg-white rounded border border-[#e6eeff] text-center text-xs text-[#505f7b] flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[32px] text-[#c4c6cf]">done_all</span>
              <span>هیچ سندی با این وضعیت در کارتابل موجود نیست.</span>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isSelected = task.id === activeTask.id;
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`p-3.5 rounded shadow-sm border transition-all cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-white border-[#002045] ring-2 ring-[#002045]/20'
                      : 'bg-white border-[#e6eeff] hover:border-[#adc7f7]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#002045] bg-[#eff4ff] px-2 py-0.5 rounded font-tabular">
                        {task.documentNumber}
                      </span>
                      <span className="text-xs font-bold text-[#0d1c2e]">{task.title}</span>
                    </div>

                    {task.isUrgent ? (
                      <span className="px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                        {task.urgencyTag}
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#505f7b] text-[10px]">
                        {task.urgencyTag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-tabular">
                    <span className="text-[#505f7b]">
                      متقاضی: {task.applicantName} ({task.department})
                    </span>
                    <span className="font-mono text-xs font-bold text-[#0d1c2e]">
                      {task.totalAmountRials.toLocaleString('fa-IR')} ریال
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-[#f8f9ff] text-[#505f7b]">
                    <div className="flex items-center gap-1 font-tabular">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      <span>ورود: {task.entryTimestamp}</span>
                    </div>
                    <span className="font-medium text-[#002045]">{task.workflowStep}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Left: Deep Document Inspector (7 Cols) */}
        {activeTask && (
          <div className="xl:col-span-7 bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-4 text-xs">
            {/* Header of Active Document */}
            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#e6eeff]">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#002045]">{activeTask.title}</span>
                  <span className="font-mono text-xs font-bold bg-[#002045] text-white px-2 py-0.5 rounded font-tabular">
                    {activeTask.documentNumber}
                  </span>
                </div>
                <span className="text-xs text-[#505f7b]">
                  شرکت: {activeTask.subsidiaryName} | طرف معامله: {activeTask.customerOrSupplierName}
                </span>
              </div>

              <div className="flex flex-col items-end font-tabular">
                <span className="text-[11px] text-[#505f7b]">ارزش تعهد مالی سند</span>
                <span className="text-base font-bold font-mono text-[#002045]">
                  {activeTask.totalAmountRials.toLocaleString('fa-IR')} ریال
                </span>
              </div>
            </div>

            {/* Justification note & applicant text */}
            <div className="p-3 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-col gap-1.5">
              <span className="font-bold text-[#002045] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">format_quote</span>
                <span>توجیه عملیاتی و یادداشت متقاضی:</span>
              </span>
              <p className="text-[#43474e] leading-relaxed text-[11px]">
                {activeTask.summaryNote}
              </p>
            </div>

            {/* Visual 4-Stage Approval Chain */}
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-[#0d1c2e]">فرآیند گردش کار و زنجیره تأیید:</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <div className="p-2 rounded bg-[#dce9ff] border border-[#adc7f7] flex flex-col gap-0.5 text-[11px]">
                  <span className="font-bold text-[#002045]">۱. ثبت اولیه متقاضی</span>
                  <span className="text-[10px] text-[#505f7b]">تأیید شد (امضای A)</span>
                </div>
                <div className="p-2 rounded bg-[#dce9ff] border border-[#adc7f7] flex flex-col gap-0.5 text-[11px]">
                  <span className="font-bold text-[#002045]">۲. تأیید فنی / اعتباری</span>
                  <span className="text-[10px] text-[#505f7b]">تأیید شد (امضای B)</span>
                </div>
                <div className="p-2 rounded bg-[#002045] text-white border border-[#002045] flex flex-col gap-0.5 text-[11px]">
                  <span className="font-bold text-white">۳. کارتابل شما (معاونت)</span>
                  <span className="text-[10px] text-[#adc7f7]">در انتظار تصمیم</span>
                </div>
                <div className="p-2 rounded bg-[#f8f9ff] border border-[#e6eeff] flex flex-col gap-0.5 text-[11px] opacity-70">
                  <span className="font-semibold text-[#505f7b]">۴. مدیرعامل / مالی</span>
                  <span className="text-[10px] text-[#74777f]">گام نهایی</span>
                </div>
              </div>
            </div>

            {/* Budget & Compliance Tariff Table */}
            {activeTask.budgetTariffCode && (
              <div className="p-3 rounded bg-[#f8f9ff] border border-[#e6eeff] flex flex-col gap-1.5 text-[11px]">
                <span className="font-bold text-[#0d1c2e]">تطبیق ردیف بودجه سالانه و انطباق سرفصل:</span>
                <div className="flex flex-wrap items-center justify-between gap-2 font-tabular">
                  <span>کد سرفصل بودجه: <strong className="font-mono text-[#002045]">{activeTask.budgetTariffCode}</strong></span>
                  <span className="text-[#002045] font-semibold">{activeTask.budgetStatus}</span>
                </div>
              </div>
            )}

            {/* Executive Note Textarea */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#0d1c2e] text-xs">
                دستور و یادداشت کارشناسی معاونت (در سوابق ممیزی سند ثبت خواهد شد):
              </label>
              <textarea
                value={executiveNote}
                onChange={(e) => setExecutiveNote(e.target.value)}
                placeholder="در صورت رد سند، درج علت الزامی است. جهت تأیید می‌توانید یادداشت رهنمود مدیریتی درج فرمایید..."
                rows={3}
                className="w-full p-2 rounded bg-[#eff4ff] border border-[#c4c6cf] focus:border-[#002045] focus:bg-white text-xs outline-none transition-colors"
              />
            </div>

            {/* 3 Executive Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e6eeff]">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReject}
                  disabled={activeTask.status !== 'pending'}
                  className="h-8 px-3 rounded bg-[#ffdad6] hover:bg-[#ffdad6]/80 text-[#93000a] text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-40"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">cancel</span>
                  <span>رد قطعی سند با ثبت دلیل سیستمی</span>
                </button>
                <button
                  onClick={handleRefer}
                  disabled={activeTask.status !== 'pending'}
                  className="h-8 px-3 rounded bg-[#eff4ff] hover:bg-[#dce9ff] text-[#505f7b] text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-40"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">undo</span>
                  <span>ارجاع جهت رفع ابهام</span>
                </button>
              </div>

              <button
                onClick={handleApprove}
                disabled={activeTask.status !== 'pending'}
                className="h-8 px-4 rounded bg-[#002045] hover:bg-[#1a365d] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-40"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">draw</span>
                <span>تأیید و ارسال به مرحله بعد (امضای دیجیتال)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
