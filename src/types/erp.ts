export type ModuleId =
  | 'command-center'
  | 'inventory'
  | 'purchasing'
  | 'commercial'
  | 'approvals'
  | 'analytics'
  | 'finance'
  | 'audit-config';

export interface Subsidiary {
  id: string;
  code: string;
  name: string;
  legalName: string;
  nationalId: string;
  economicCode: string;
  industry: 'manufacturing' | 'trading' | 'casting' | 'logistics';
  branchCount: number;
  warehouseCount: number;
  activeEmployeeCount: number;
  defaultCurrency: string;
}

export interface Warehouse {
  id: string;
  subsidiaryId: string;
  code: string;
  name: string;
  location: string;
  manager: string;
  capacityMetric: string;
  usedCapacityPercent: number;
  totalSkus: number;
  criticalItemCount: number;
}

export interface UserSession {
  id: string;
  fullName: string;
  title: string;
  department: string;
  role: 'SUPER_ADMIN' | 'BOARD_MEMBER' | 'COMMERCIAL_VP' | 'PROCUREMENT_LEAD' | 'WAREHOUSE_CHIEF';
  currentSubsidiaryId: string;
  activeBranch: string;
  fiscalYear: string;
  signatureLevel: 'Level-A (Unlimited)' | 'Level-B (Up to 5B Rials)' | 'Level-C (Up to 500M Rials)';
}

export interface InventoryItem {
  id: string;
  sku: string;
  hsCode: string;
  gs1Barcode: string;
  name: string;
  brand: string;
  category: string;
  unit: string;
  thumbnail?: string;
  physicalStock: number;
  salesReserved: number;
  inTransitPo: number;
  availableToPromise: number; // ATP
  reorderPoint: number;
  minSafetyStock: number;
  maxStock: number;
  averageUnitCostRials: number;
  totalValuationRials: number;
  locationInWarehouse: string;
  warehouseId: string;
  subsidiaryId: string;
  status: 'normal' | 'low-stock' | 'critical' | 'overstock' | 'inactive';
  lastMovementDate: string;
  supplierName: string;
  lastQuotationRateRials: number;
  activePoNumber?: string;
  activePoQuantity?: number;
  warehouseDistribution: {
    warehouseName: string;
    quantity: number;
    percentage: number;
  }[];
  recentMovements: {
    id: string;
    type: 'consumption' | 'transfer' | 'grn' | 'adjustment';
    documentRef: string;
    date: string;
    quantityDelta: number;
    reason: string;
    user: string;
  }[];
}

export interface RFQSupplierQuote {
  supplierId: string;
  supplierName: string;
  isWinningBid: boolean;
  totalGrossRials: number;
  paymentTerms: string;
  paymentTermsCompliance: boolean;
  deliveryDays: number;
  deliveryStatus: string;
  warrantyPeriod: string;
  originCountry: string;
  cooCertificate: string;
  vendorScore: number;
  decisionNote: string;
}

export interface PurchaseOrderItemLine {
  rowNum: string;
  sku: string;
  name: string;
  technicalSpec: string;
  quantity: number;
  unit: string;
  approvedUnitRateRials: number;
  discountRials: number;
  vatTaxRials: number;
  totalGrossRials: number;
  attachmentName?: string;
}

export interface ProcurementDocument {
  id: string;
  poNumber: string;
  prReference: string;
  title: string;
  subsidiaryId: string;
  subsidiaryName: string;
  requestingDepartment: string;
  costCenterCode: string;
  costCenterName: string;
  dateCreated: string;
  deliveryDeadline: string;
  deliveryDaysLeft: number;
  priority: 'emergency' | 'high' | 'normal';
  currentStage: 1 | 2 | 3 | 4 | 5 | 6; // 1: PR, 2: RFQ, 3: BOARD, 4: PO, 5: QC&GRN, 6: INV
  currentStageLabel: string;
  budgetCeilingRials: number;
  committedAmountRials: number;
  remainingBudgetCapexRials: number;
  hasBudgetVariance: boolean;
  technicalSpecNumber: string;
  isoStandardCode: string;
  technicalJustification: string;
  sgsInspectionRequired: boolean;
  lines: PurchaseOrderItemLine[];
  rfqMatrix: RFQSupplierQuote[];
  complianceItems: {
    code: string;
    title: string;
    description: string;
    verified: boolean;
  }[];
  approvalChain: ApprovalStage[];
  auditTrail: AuditEntry[];
}

export interface ApprovalStage {
  stepNumber: number;
  stageName: string;
  assigneeName: string;
  assigneeTitle: string;
  department: string;
  status: 'completed' | 'current' | 'pending' | 'rejected';
  actionDate?: string;
  actionTime?: string;
  comments?: string;
  digitalSignatureHash?: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  userName: string;
  ipAddress: string;
  actionType: string;
  diffSummary: string;
  sha256Hash: string;
}

export interface ApprovalTask {
  id: string;
  documentType: 'PO' | 'SO' | 'ADJ' | 'CTR';
  documentNumber: string;
  title: string;
  urgencyTag: string;
  isUrgent: boolean;
  totalAmountRials: number;
  applicantName: string;
  department: string;
  entryTimestamp: string;
  hoursElapsed: number;
  deadlineHours: number;
  workflowStep: string;
  stageNumber: number;
  totalStages: number;
  status: 'pending' | 'approved' | 'rejected' | 'referred';
  subsidiaryName: string;
  customerOrSupplierName: string;
  summaryNote: string;
  budgetTariffCode?: string;
  budgetStatus?: string;
}

export interface SalesOrderSummary {
  id: string;
  orderNumber: string;
  customerName: string;
  subsidiaryName: string;
  amountRials: number;
  creditRisk: 'low' | 'medium' | 'high';
  guaranteeDoc: string;
  overCreditPercent?: number;
  status: 'draft' | 'credit_approved' | 'dispatch_ready' | 'delivered';
  createdDate: string;
}

export interface WorkflowRuleConfig {
  id: string;
  ruleCode: string;
  title: string;
  entityType: 'PO' | 'SO' | 'TRANSFER' | 'ADJUSTMENT';
  conditionSummary: string;
  thresholdAmountRials?: number;
  requiredRoles: string[];
  isActive: boolean;
}
