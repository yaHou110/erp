import React, { useState, useEffect } from 'react';
import { ModuleId, Subsidiary, InventoryItem, ApprovalTask, LicensePlanType } from './types/erp';
import {
  SUBSIDIARIES,
  WAREHOUSES,
  INVENTORY_ITEMS,
  PRIMARY_PROCUREMENT_DOSSIER,
  APPROVAL_INBOX_TASKS,
  SALES_ORDERS,
  WORKFLOW_RULES,
  AUDIT_TRAIL_GLOBAL,
} from './data/mockErpData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CommandCenterView } from './components/CommandCenterView';
import { InventoryKardexView } from './components/InventoryKardexView';
import { ProcurementPurchasingView } from './components/ProcurementPurchasingView';
import { ApprovalsAuditView } from './components/ApprovalsAuditView';
import { CommercialSalesView } from './components/CommercialSalesView';
import { AnalyticsBiView } from './components/AnalyticsBiView';
import { AuditConfigView } from './components/AuditConfigView';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { NewDocumentModal } from './components/NewDocumentModal';
import { AccountingFinanceView } from './components/AccountingFinanceView';
import { PricingPlansModal } from './components/PricingPlansModal';

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('command-center');
  const [currentSubsidiary, setCurrentSubsidiary] = useState<Subsidiary>(SUBSIDIARIES[0]);
  const [items, setItems] = useState<InventoryItem[]>(INVENTORY_ITEMS);
  const [approvalTasks, setApprovalTasks] = useState<ApprovalTask[]>(APPROVAL_INBOX_TASKS);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<LicensePlanType>('enterprise');
  const [globalNotification, setGlobalNotification] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Global Ctrl + K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDocumentCreated = (docType: string, docNumber: string) => {
    setGlobalNotification(`سند تجاری جدید با شماره پیگیری ${docNumber} ثبت و در صف تأیید قرار گرفت.`);
    if (docType === 'PR') {
      setActiveModule('purchasing');
    } else if (docType === 'TRANSFER') {
      setActiveModule('inventory');
    } else if (docType === 'SO') {
      setActiveModule('commercial');
    }
    setTimeout(() => setGlobalNotification(null), 5000);
  };

  const pendingApprovalsCount = approvalTasks.filter((t) => t.status === 'pending').length;

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8f9ff] text-[#0d1c2e] font-sans antialiased flex">
      {/* Global Success Notification Toast */}
      {globalNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#002045] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 text-xs border border-[#1a365d] animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[20px] text-[#adc7f7]">task_alt</span>
          <span className="font-medium">{globalNotification}</span>
          <button
            onClick={() => setGlobalNotification(null)}
            className="mr-3 text-[#c4c6cf] hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        currentSubsidiary={currentSubsidiary}
        pendingApprovalsCount={pendingApprovalsCount}
        currentPlan={currentPlan}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Layout Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'mr-16' : 'mr-64'}`}>
        {/* Top Header */}
        <Header
          currentSubsidiary={currentSubsidiary}
          subsidiaries={SUBSIDIARIES}
          onSelectSubsidiary={(sub) => {
            setCurrentSubsidiary(sub);
            setGlobalNotification(`حوزه ساختار سازمانی به «${sub.name}» تغییر یافت.`);
            setTimeout(() => setGlobalNotification(null), 3000);
          }}
          onOpenNewDocModal={() => setIsNewDocModalOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          unreadCount={pendingApprovalsCount}
          currentPlan={currentPlan}
          onOpenPlansModal={() => setIsPricingModalOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Viewport Content Container */}
        <main className="flex-1 p-5 mt-16 max-w-7xl w-full mx-auto">
          {/* Top Unified Himoura & Plan Banner */}
          <div className="bg-gradient-to-r from-[#002045] via-[#0a2756] to-[#002045] text-white p-3 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-[#3b82f6]/30 shadow-lg mb-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#22c55e] to-[#3b82f6]"></div>
            <div className="absolute -right-6 -top-6 opacity-10">
              <span className="material-symbols-outlined text-[80px]">code</span>
            </div>
            
            <div className="flex items-center gap-3 relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0"></span>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide">توسعه و پیاده‌سازی: گروه نرم‌افزاری هیمورا</span>
                <span className="text-[10px] text-[#adc7f7]">راهکارهای جامع سازمانی (ERP) و هوشمندسازی فرآیندها</span>
              </div>
              <div className="hidden lg:flex items-center bg-white/10 px-3 py-1 rounded border border-white/20 mr-2 backdrop-blur-sm">
                <span className="text-xs font-mono tracking-widest font-bold">09354467269</span>
                <a href="tel:09354467269" className="text-[9px] bg-white text-[#002045] px-2 py-0.5 rounded font-bold hover:bg-[#e6eeff] transition-colors shadow-sm mr-3">مشاوره</a>
              </div>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded border border-white/10 backdrop-blur-sm">
                <span className="text-[11px] text-[#adc7f7]">لایسنس دمو:</span>
                <span className="text-xs font-bold font-mono tracking-tight text-[#22c55e]">
                  {currentPlan.toUpperCase()}
                </span>
              </div>
              <button 
                onClick={() => setIsPricingModalOpen(true)} 
                className="text-xs bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-1.5 rounded font-bold transition-colors shadow border border-[#60a5fa]/50 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">verified</span>
                تغییر پلن
              </button>
            </div>
          </div>

          {activeModule === 'command-center' && (
            <CommandCenterView
              currentSubsidiary={currentSubsidiary}
              onNavigate={setActiveModule}
              onSelectPoDocument={() => setActiveModule('purchasing')}
            />
          )}

          {activeModule === 'inventory' && (
            <InventoryKardexView
              items={items}
              warehouses={WAREHOUSES}
              currentSubsidiary={currentSubsidiary}
              onOpenTransferModal={() => setIsNewDocModalOpen(true)}
              onOpenNewSkuModal={() => setIsNewDocModalOpen(true)}
              onSelectPoDocument={() => setActiveModule('purchasing')}
            />
          )}

          {activeModule === 'purchasing' && (
            <ProcurementPurchasingView
              dossier={PRIMARY_PROCUREMENT_DOSSIER}
              currentSubsidiary={currentSubsidiary}
              onNavigateToApprovals={() => setActiveModule('approvals')}
            />
          )}

          {activeModule === 'approvals' && (
            <ApprovalsAuditView
              tasks={approvalTasks}
              currentSubsidiary={currentSubsidiary}
              onNavigateToProcurement={() => setActiveModule('purchasing')}
            />
          )}

          {activeModule === 'commercial' && (
            <CommercialSalesView
              orders={SALES_ORDERS}
              currentSubsidiary={currentSubsidiary}
            />
          )}

          {activeModule === 'analytics' && (
            <AnalyticsBiView
              currentSubsidiary={currentSubsidiary}
              subsidiaries={SUBSIDIARIES}
            />
          )}

          {activeModule === 'finance' && (
            <AccountingFinanceView />
          )}

          {activeModule === 'audit-config' && (
            <AuditConfigView
              workflowRules={WORKFLOW_RULES}
              auditLogs={AUDIT_TRAIL_GLOBAL}
              subsidiaries={SUBSIDIARIES}
            />
          )}
        </main>
      </div>

      {/* Global Universal Search (Ctrl + K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        items={items}
        onNavigate={setActiveModule}
        onSelectPo={() => setActiveModule('purchasing')}
      />

      {/* New Document Voucher Modal */}
      <NewDocumentModal
        isOpen={isNewDocModalOpen}
        onClose={() => setIsNewDocModalOpen(false)}
        subsidiaries={SUBSIDIARIES}
        warehouses={WAREHOUSES}
        onDocumentCreated={handleDocumentCreated}
      />

      {/* Pricing Plans Modal */}
      <PricingPlansModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        currentPlan={currentPlan}
        onSelectPlan={(plan) => {
          setCurrentPlan(plan);
          setActiveModule('command-center'); // reset to dashboard on plan change to prevent being on locked route
          setIsPricingModalOpen(false);
          setGlobalNotification(`لایسنس سیستم به '${plan}' تغییر یافت.`);
          setTimeout(() => setGlobalNotification(null), 3000);
        }}
      />
    </div>
  );
}
