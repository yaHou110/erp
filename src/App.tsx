import React, { useState, useEffect } from 'react';
import { ModuleId, Subsidiary, InventoryItem, ApprovalTask } from './types/erp';
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

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('command-center');
  const [currentSubsidiary, setCurrentSubsidiary] = useState<Subsidiary>(SUBSIDIARIES[0]);
  const [items, setItems] = useState<InventoryItem[]>(INVENTORY_ITEMS);
  const [approvalTasks, setApprovalTasks] = useState<ApprovalTask[]>(APPROVAL_INBOX_TASKS);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false);
  const [globalNotification, setGlobalNotification] = useState<string | null>(null);

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
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col mr-64">
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
        />

        {/* Viewport Content Container */}
        <main className="flex-1 p-5 mt-16 max-w-7xl w-full mx-auto">
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
    </div>
  );
}
