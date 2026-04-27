// ============ 通用类型 ============

export interface PageParams {
  page: number
  pageSize: number
}

export interface PageResult<T> {
  data: T[]
  total: number
}

export interface Option {
  label: string
  value: string
}

// ============ 状态枚举 ============

export type UseStatus = 'enabled' | 'disabled'

export type DocStatus = 'draft' | 'pending_audit' | 'audited' | 'closed' | 'voided'

export type InOutStatus = 'pending' | 'partial' | 'completed' | 'cancelled'

// ============ 认证相关 ============

export interface LoginParams {
  account: string
  password: string
}

export interface RegisterParams {
  companyName: string
  userName: string
  phone: string
  password: string
  confirmPassword: string
}

export interface UserInfo {
  id: string
  account: string
  name: string
  phone: string
  role: string
  avatar?: string
}

export interface AuthState {
  token: string | null
  user: UserInfo | null
}

// ============ 基础资料 ============

export interface Supplier {
  id: string
  code: string
  name: string
  category: string
  contact: string
  phone: string
  settlement: string
  paymentTerms: string
  status: UseStatus
  createdAt: string
}

export interface Customer {
  id: string
  code: string
  name: string
  type: string
  contact: string
  phone: string
  region: string
  creditLimit: number
  status: UseStatus
  createdAt: string
}

export interface Product {
  id: string
  code: string
  name: string
  barcode: string
  category: string
  brand: string
  unit: string
  purchasePrice: number
  salePrice: number
  status: UseStatus
  createdAt: string
}

export interface Warehouse {
  id: string
  code: string
  name: string
  type: string
  org: string
  address: string
  manager: string
  phone: string
  status: UseStatus
  createdAt: string
}

export interface Store {
  id: string
  code: string
  name: string
  region: string
  type: string
  manager: string
  phone: string
  address: string
  status: UseStatus
  createdAt: string
}

// ============ 采购管理 ============

export interface PurchaseOrderItem {
  id: string
  productCode: string
  productName: string
  unit: string
  quantity: number
  price: number
  amount: number
  remark: string
}

export interface PurchaseOrder {
  id: string
  orderNo: string
  supplierId: string
  supplierName: string
  org: string
  orderDate: string
  expectedDate: string
  totalAmount: number
  docStatus: DocStatus
  auditStatus: string
  creator: string
  createdAt: string
  items: PurchaseOrderItem[]
}

export interface PurchaseInbound {
  id: string
  inboundNo: string
  orderNo: string
  supplierName: string
  warehouseName: string
  inboundDate: string
  quantity: number
  totalAmount: number
  docStatus: InOutStatus
  createdAt: string
}

export interface SupplierReturn {
  id: string
  returnNo: string
  supplierName: string
  warehouseName: string
  returnDate: string
  quantity: number
  totalAmount: number
  docStatus: InOutStatus
  createdAt: string
}

// ============ 销售管理 ============

export interface SalesOrderItem {
  id: string
  productCode: string
  productName: string
  unit: string
  quantity: number
  price: number
  amount: number
  remark: string
}

export interface SalesOrder {
  id: string
  orderNo: string
  customerId: string
  customerName: string
  org: string
  orderDate: string
  expectedDate: string
  totalAmount: number
  docStatus: DocStatus
  auditStatus: string
  creator: string
  createdAt: string
  items: SalesOrderItem[]
}

export interface SalesOutbound {
  id: string
  outboundNo: string
  orderNo: string
  customerName: string
  warehouseName: string
  outboundDate: string
  quantity: number
  totalAmount: number
  docStatus: InOutStatus
  createdAt: string
}

export interface CustomerReturn {
  id: string
  returnNo: string
  customerName: string
  warehouseName: string
  returnDate: string
  quantity: number
  totalAmount: number
  docStatus: InOutStatus
  createdAt: string
}

// ============ 库存管理 ============

export interface StockRecord {
  id: string
  warehouseName: string
  productCode: string
  productName: string
  category: string
  unit: string
  totalStock: number
  availableStock: number
  lockedStock: number
  frozenStock: number
  updatedAt: string
}

export interface StockMovement {
  id: string
  movementNo: string
  bizType: string
  sourceDocType: string
  sourceDocNo: string
  warehouseName: string
  productCode: string
  productName: string
  beforeQty: number
  changeQty: number
  afterQty: number
  operator: string
  operatedAt: string
}

export interface StockTransfer {
  id: string
  transferNo: string
  fromWarehouse: string
  toWarehouse: string
  transferDate: string
  quantity: number
  docStatus: DocStatus
  creator: string
  createdAt: string
}

export interface StockAdjustment {
  id: string
  adjustmentNo: string
  warehouseName: string
  type: string
  date: string
  quantity: number
  reason: string
  docStatus: DocStatus
  creator: string
  createdAt: string
}

// ============ 系统设置 ============

export interface SystemUser {
  id: string
  account: string
  name: string
  phone: string
  role: string
  status: UseStatus
  lastLoginAt: string
  createdAt: string
}

export interface SystemRole {
  id: string
  code: string
  name: string
  description: string
  status: UseStatus
  createdAt: string
}

export interface SystemMenu {
  id: string
  name: string
  code: string
  parentId: string
  parentName: string
  route: string
  type: 'menu' | 'button'
  sort: number
  status: UseStatus
}

export interface SystemDictionary {
  id: string
  dictCode: string
  dictName: string
  itemCode: string
  itemName: string
  sort: number
  status: UseStatus
  remark: string
}

// ============ 首页看板 ============

export interface DashboardData {
  todaySales: number
  todayPurchase: number
  totalSku: number
  alertSku: number
  pendingPurchaseOrders: number
  pendingSalesOrders: number
  salesTrend: { date: string; amount: number }[]
  purchaseTrend: { date: string; amount: number }[]
  stockAlerts: { productName: string; warehouse: string; stock: number; minStock: number }[]
  todos: { id: string; type: string; title: string; time: string }[]
}
