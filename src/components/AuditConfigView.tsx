import React, { useState } from 'react';
import { WorkflowRuleConfig, AuditEntry, Subsidiary } from '../types/erp';

interface AuditConfigProps {
  workflowRules: WorkflowRuleConfig[];
  auditLogs: AuditEntry[];
  subsidiaries: Subsidiary[];
}

export const AuditConfigView: React.FC<AuditConfigProps> = ({
  workflowRules,
  auditLogs,
  subsidiaries,
}) => {
  const [rules, setRules] = useState<WorkflowRuleConfig[]>(workflowRules);
  const [activeTab, setActiveTab] = useState<'rules' | 'rbac' | 'audit' | 'tenants'>('rules');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
    setToastMsg('قانون گردش کار با موفقیت به‌روزرسانی شد.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-4 py-2 pb-14 text-[#0d1c2e]">
      {toastMsg && (
        <div className="fixed bottom-6 left-10 z-50 bg-[#002045] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-xs border border-[#1a365d]">
          <span className="material-symbols-outlined text-[18px] text-[#adc7f7]">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded shadow-sm border border-[#e6eeff]">
        <div className="flex items-center gap-2 text-xs text-[#505f7b]">
          <span className="text-[#74777f]">سامانه کاوش</span>
          <span>/</span>
          <span className="text-[#74777f]">تنظیمات پایه و امنیت سازمانی</span>
          <span>/</span>
          <span className="font-bold text-[#0d1c2e]">موتور گردش کار (Workflow Engine)، دسترسی‌ها و سوابق ممیزی</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-[#eff4ff] text-[#002045] font-mono font-bold font-tabular">
            CONFIG_DRIVEN: ACTIVE
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#e6eeff] text-xs font-semibold">
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'rules'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">rule</span>
          <span>قوانین سقف اختیارات مالی و جریان تأییدات ({rules.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('rbac')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'rbac'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
          <span>ماتریس سطوح دسترسی (RBAC)</span>
        </button>
        <button
          onClick={() => setActiveTab('tenants')}
          className={`px-4 py-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'tenants'
              ? 'border-[#002045] text-[#002045]'
              : 'border-transparent text-[#505f7b] hover:text-[#0d1c2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">domain</span>
          <span>تنظیمات چندمستأجری و شرکت‌های هلدینگ ({subsidiaries.length})</span>
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
          <span className="material-symbols-outlined text-[16px]">security</span>
          <span>دفتر کل ممیزی و ردپای تغییرات (SHA-256)</span>
        </button>
      </div>

      {/* Rules Engine Tab */}
      {activeTab === 'rules' && (
        <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0d1c2e]">
              قوانین پویای تأیید اسناد (Configurable Workflow Rules):
            </span>
            <span className="text-[11px] text-[#505f7b]">
              بدون نیاز به تغییر کد؛ تغییر سقف اختیارات مالی و جریان تأیید بلافاصله در کل هلدینگ اعمال می‌شود.
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-3 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-wrap items-center justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#002045] mt-0.5">
                    tune
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0d1c2e]">{rule.title}</span>
                      <span className="font-mono text-[10px] text-[#002045] bg-white px-1.5 py-0.2 rounded border border-[#c4c6cf]">
                        {rule.ruleCode}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#505f7b]">شرط سیستمی: {rule.conditionSummary}</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#002045] mt-1">
                      <span>نقش‌های ملزم به امضا:</span>
                      {rule.requiredRoles.map((role) => (
                        <span key={role} className="bg-white px-1.5 py-0.2 rounded font-mono">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span className="text-[11px] font-semibold text-[#505f7b]">
                      {rule.isActive ? 'فعال و در جریان' : 'غیرفعال'}
                    </span>
                    <input
                      type="checkbox"
                      checked={rule.isActive}
                      onChange={() => toggleRule(rule.id)}
                      className="cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RBAC Tab */}
      {activeTab === 'rbac' && (
        <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-3 text-xs">
          <span className="font-bold text-[#0d1c2e]">ماتریس دسترسی‌های سازمانی مبتنی بر نقش (RBAC):</span>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="h-9 bg-[#eff4ff] text-[#505f7b] font-semibold border-b border-[#e6eeff]">
                  <th className="px-3">نقش سازمانی</th>
                  <th className="px-3 text-center">مشاهده کاتالوگ و کاردکس</th>
                  <th className="px-3 text-center">ثبت PR و استعلام</th>
                  <th className="px-3 text-center">تصویب کمیسیون معاملات</th>
                  <th className="px-3 text-center">امضای نهایی مالی</th>
                  <th className="px-3 text-center">سقف تأیید مجاز</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                <tr className="h-10 hover:bg-[#f8f9ff]">
                  <td className="px-3 font-bold text-[#002045]">معاونت بازرگانی و زنجیره تأمین</td>
                  <td className="px-3 text-center text-[#002045]">✓ کامل</td>
                  <td className="px-3 text-center text-[#002045]">✓ کامل</td>
                  <td className="px-3 text-center text-[#002045]">✓ مجاز</td>
                  <td className="px-3 text-center text-[#002045]">✓ تا سقف مجاز</td>
                  <td className="px-3 text-center font-mono font-bold font-tabular">۵,۰۰۰,۰۰۰,۰۰۰ ریال</td>
                </tr>
                <tr className="h-10 hover:bg-[#f8f9ff]">
                  <td className="px-3 font-bold text-[#002045]">هیئت مدیره و مدیرعامل</td>
                  <td className="px-3 text-center text-[#002045]">✓ کامل</td>
                  <td className="px-3 text-center text-[#002045]">✓ کامل</td>
                  <td className="px-3 text-center text-[#002045]">✓ رئیس کمیسیون</td>
                  <td className="px-3 text-center text-[#002045]">✓ امضای نهایی</td>
                  <td className="px-3 text-center font-mono font-bold font-tabular">نامحدود</td>
                </tr>
                <tr className="h-10 hover:bg-[#f8f9ff]">
                  <td className="px-3 font-bold text-[#002045]">سرپرست انبار مرکزی</td>
                  <td className="px-3 text-center text-[#002045]">✓ کامل</td>
                  <td className="px-3 text-center text-[#002045]">✓ درخواست کالا</td>
                  <td className="px-3 text-center text-[#74777f]">-</td>
                  <td className="px-3 text-center text-[#74777f]">-</td>
                  <td className="px-3 text-center font-mono text-[#505f7b]">۵۰,۰۰۰,۰۰۰ ریال (تعدیل)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tenants Tab */}
      {activeTab === 'tenants' && (
        <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-3 text-xs">
          <span className="font-bold text-[#0d1c2e]">پیکربندی شرکت‌های عضو هلدینگ صنعتی پارس:</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subsidiaries.map((sub) => (
              <div key={sub.id} className="p-3 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#002045]">{sub.name}</span>
                  <span className="font-mono text-xs bg-white px-2 py-0.5 rounded text-[#002045] font-bold">
                    کد: {sub.code}
                  </span>
                </div>
                <span className="text-[11px] text-[#505f7b]">{sub.legalName}</span>
                <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#d5e3fc] text-[11px] text-[#505f7b]">
                  <span>شناسه ملی: <strong className="font-mono text-[#0d1c2e]">{sub.nationalId}</strong></span>
                  <span>کد اقتصادی: <strong className="font-mono text-[#0d1c2e]">{sub.economicCode}</strong></span>
                  <span>شعب: <strong className="font-tabular text-[#0d1c2e]">{sub.branchCount}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Trail Tab */}
      {activeTab === 'audit' && (
        <div className="bg-white p-4 rounded shadow-sm border border-[#e6eeff] flex flex-col gap-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0d1c2e]">دفتر ثبت رویدادها و ردپای تغییرات امنیتی:</span>
            <span className="text-[11px] text-[#505f7b]">
              تضمین یکپارچگی داده‌ها بر اساس هش SHA-256 و آدرس IP کاربر
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-wrap items-center justify-between gap-2 text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#002045]">verified</span>
                  <span className="font-bold text-[#0d1c2e]">{log.userName}</span>
                  <span className="text-[#c4c6cf]">|</span>
                  <span className="text-[#505f7b]">{log.actionType}:</span>
                  <span className="text-[#0d1c2e] font-medium">{log.diffSummary}</span>
                </div>

                <div className="flex items-center gap-3 font-tabular">
                  <span className="font-mono text-[#74777f]">{log.ipAddress}</span>
                  <span className="text-[#74777f]">{log.timestamp}</span>
                  <span className="font-mono text-[9px] text-[#002045] bg-white px-2 py-0.5 rounded border border-[#c4c6cf]">
                    {log.sha256Hash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
