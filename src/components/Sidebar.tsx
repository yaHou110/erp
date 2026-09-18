import React from 'react';
import { ModuleId, Subsidiary, LicensePlanType } from '../types/erp';

interface SidebarProps {
  activeModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  currentSubsidiary: Subsidiary;
  pendingApprovalsCount: number;
  currentPlan: LicensePlanType;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  currentSubsidiary,
  pendingApprovalsCount,
  currentPlan,
  isCollapsed,
  onToggleCollapse,
}) => {
  const isModuleLocked = (moduleId: ModuleId) => {
    switch (currentPlan) {
      case 'basic':
        return !['command-center', 'inventory', 'commercial'].includes(moduleId);
      case 'standard':
        return ['finance', 'analytics', 'audit-config'].includes(moduleId);
      case 'pro':
        return ['analytics', 'audit-config'].includes(moduleId);
      case 'enterprise':
        return false;
      default:
        return false;
    }
  };

  const navItems: {
    id: ModuleId;
    title: string;
    indexNum: string;
    icon: string;
    badge?: string | number;
    badgeVariant?: 'error' | 'muted';
    disabled?: boolean;
  }[] = [
    {
      id: 'command-center',
      title: 'مرکز فرماندهی',
      indexNum: '01',
      icon: 'dashboard',
      disabled: isModuleLocked('command-center'),
    },
    {
      id: 'inventory',
      title: 'کاتالوگ و انبار',
      indexNum: '02',
      icon: 'warehouse',
      disabled: isModuleLocked('inventory'),
    },
    {
      id: 'purchasing',
      title: 'تدارکات و خرید',
      indexNum: '03',
      icon: 'shopping_cart_checkout',
      disabled: isModuleLocked('purchasing'),
    },
    {
      id: 'commercial',
      title: 'فروش و مشتریان',
      indexNum: '04',
      icon: 'point_of_sale',
      disabled: isModuleLocked('commercial'),
    },
    {
      id: 'approvals',
      title: 'کارتابل تأییدات',
      indexNum: '05',
      icon: 'fact_check',
      badge: pendingApprovalsCount,
      badgeVariant: 'error',
      disabled: isModuleLocked('approvals'),
    },
    {
      id: 'analytics',
      title: 'گزارشات و هوش تجاری',
      indexNum: '06',
      icon: 'query_stats',
      disabled: isModuleLocked('analytics'),
    },
    {
      id: 'finance',
      title: 'حسابداری و مالی',
      indexNum: '07',
      icon: 'account_balance',
      disabled: isModuleLocked('finance'),
    },
    {
      id: 'audit-config',
      title: 'تنظیمات و ردپا',
      indexNum: '08',
      icon: 'history_toggle_off',
      disabled: isModuleLocked('audit-config'),
    },
  ];

  return (
    <aside className={`fixed top-0 right-0 h-screen bg-white border-l border-[#e6eeff] shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-50 flex flex-col justify-between select-none transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className={`h-16 px-4 flex items-center bg-[#eff4ff] border-b border-[#e6eeff] ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#002045] flex items-center justify-center text-white shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[19px]">apps</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#002045] tracking-tight">سامانه کاوش</span>
                <span className="text-[10px] text-[#505f7b] font-mono tracking-wider">KAVOSH ERP v4.2</span>
              </div>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="w-7 h-7 flex items-center justify-center rounded bg-[#e6eeff] hover:bg-[#dce9ff] text-[#0d1c2e] transition-colors shrink-0"
            title="وضعیت فشرده‌سازی منو"
            type="button"
          >
            <span className={`material-symbols-outlined text-[17px] transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>chevron_right</span>
          </button>
        </div>

        {/* Organizational Context Breadcrumb Card */}
        {!isCollapsed && (
          <div className="p-3 bg-white border-b border-[#eff4ff]">
            <div className="p-2 rounded bg-[#eff4ff] border border-[#d5e3fc] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#505f7b] font-medium">حوزه ساختار سازمانی</span>
                <span className="material-symbols-outlined text-[13px] text-[#505f7b]">domain</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#0d1c2e] truncate font-bold">
                <span className="material-symbols-outlined text-[14px] text-[#002045]">apartment</span>
                <span className="truncate">هلدینگ صنعتی پارس</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#43474e] truncate pr-2">
                <span className="material-symbols-outlined text-[12px] text-[#505f7b]">subdirectory_arrow_left</span>
                <span className="truncate">{currentSubsidiary.name}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1 px-2.5 py-2">
          {navItems.map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => !item.disabled && onSelectModule(item.id)}
                disabled={item.disabled}
                title={isCollapsed ? item.title : undefined}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2 rounded text-xs transition-all ${
                  item.disabled
                    ? 'text-[#74777f] opacity-60 cursor-not-allowed'
                    : isActive
                    ? 'bg-[#1a365d] text-white font-semibold shadow-sm'
                    : 'text-[#43474e] hover:bg-[#eff4ff] hover:text-[#002045]'
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
                  <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-[#d6e3ff]' : 'text-[#505f7b]'}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="font-medium">{item.title}</span>}
                </div>

                {!isCollapsed && (
                  <div className="flex items-center gap-1.5">
                    {item.badge !== undefined && (
                      item.badgeVariant === 'error' ? (
                        <span className="px-1.5 py-0.5 rounded bg-[#ba1a1a] text-white text-[10px] font-bold font-tabular">
                          {item.badge}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded bg-[#e6eeff] text-[#52617e] text-[10px]">
                          {item.badge}
                        </span>
                      )
                    )}
                    <span className={`text-[10px] font-mono font-tabular ${isActive ? 'text-[#adc7f7]' : 'text-[#74777f]'}`}>
                      {item.indexNum}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Production Health & Telemetry Status Footer */}
      <div className="flex flex-col">
        <div className={`p-3 bg-[#eff4ff] border-t border-[#d5e3fc] flex flex-col gap-2 ${isCollapsed ? 'hidden' : ''}`}>
          <div className="flex items-center justify-between p-1.5 rounded bg-white border border-[#e6eeff]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#52617e]"></span>
              <span className="text-[11px] text-[#43474e] font-medium">محیط عملیاتی (PROD)</span>
            </div>
            <span className="material-symbols-outlined text-[15px] text-[#505f7b]">dns</span>
          </div>
          <div className="flex items-center justify-between px-1 text-[11px]">
            <div className="flex items-center gap-1 text-[#505f7b]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#002045]"></span>
              <span>سامانه در دسترس و پایدار</span>
            </div>
            <span className="font-mono text-[10px] text-[#505f7b] font-tabular font-semibold">99.98%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
