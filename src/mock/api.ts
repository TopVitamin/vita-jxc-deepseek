import {
  mockSuppliers, mockCustomers, mockProducts, mockWarehouses, mockStores,
  mockPurchaseOrders, mockPurchaseInbounds, mockSupplierReturns,
  mockSalesOrders, mockSalesOutbounds, mockCustomerReturns,
  mockStockRecords, mockStockMovements, mockStockTransfers, mockStockAdjustments,
  mockUsers, mockRoles, mockMenus, mockDictionaries,
  mockDashboard,
} from './data'
import { generateId, getNowStr } from '@/utils/format'
import type {
  Supplier, Customer, Product, Warehouse, Store,
  PurchaseOrder, PurchaseInbound, SupplierReturn,
  SalesOrder, SalesOutbound, CustomerReturn,
  StockRecord, StockMovement, StockTransfer, StockAdjustment,
  SystemUser, SystemRole, SystemMenu, SystemDictionary,
} from '@/types'

// 模拟网络延迟
const delay = (ms = 300) => new Promise<void>(r => setTimeout(r, ms))

// ============ 认证 ============
export const authApi = {
  async login(account: string, password: string) {
    await delay(500)
    if (account === 'admin' && password === '123456') {
      return { token: 'mock-token-admin-' + Date.now(), user: { id: 'u1', account: 'admin', name: '系统管理员', phone: '13800000000', role: '超级管理员' } }
    }
    // 支持手机号登录
    const user = mockUsers.find(u => (u.account === account || u.phone === account) && u.status === 'enabled')
    if (user && password === '123456') {
      return { token: 'mock-token-' + user.id + '-' + Date.now(), user: { id: user.id, account: user.account, name: user.name, phone: user.phone, role: user.role } }
    }
    throw new Error('账号或密码错误')
  },
  async register(data: any) {
    await delay(500)
    return { success: true, message: '注册成功，请登录' }
  },
}

// ============ 通用 CRUD 工具函数 ============
function createCrudApi<T extends { id: string }>(dataSource: T[], name: string) {
  let data = [...dataSource]

  return {
    list(query?: Record<string, any>): Promise<{ data: T[]; total: number }> {
      return delay().then(() => {
        let filtered = [...data]
        if (query?.keyword) {
          const kw = query.keyword.toLowerCase()
          filtered = filtered.filter(item =>
            Object.values(item as object).some(v =>
              String(v).toLowerCase().includes(kw)
            )
          )
        }
        if (query?.status) {
          filtered = filtered.filter((item: any) => item.status === query.status)
        }
        if (query?.docStatus) {
          filtered = filtered.filter((item: any) => item.docStatus === query.docStatus)
        }
        if (query?.warehouseName) {
          filtered = filtered.filter((item: any) => item.warehouseName === query.warehouseName)
        }
        // 扩展筛选字段
        if (query?.category) filtered = filtered.filter((item: any) => item.category === query.category)
        if (query?.type) filtered = filtered.filter((item: any) => item.type === query.type)
        if (query?.region) filtered = filtered.filter((item: any) => item.region === query.region)
        if (query?.settlement) filtered = filtered.filter((item: any) => item.settlement === query.settlement)
        if (query?.brand) filtered = filtered.filter((item: any) => item.brand === query.brand)
        if (query?.org) filtered = filtered.filter((item: any) => item.org === query.org)
        if (query?.role) filtered = filtered.filter((item: any) => item.role === query.role)
        if (query?.dictCode) filtered = filtered.filter((item: any) => item.dictCode === query.dictCode)
        if (query?.bizType) filtered = filtered.filter((item: any) => item.bizType === query.bizType)
        if (query?.supplierName) filtered = filtered.filter((item: any) => item.supplierName === query.supplierName)
        if (query?.customerName) filtered = filtered.filter((item: any) => item.customerName === query.customerName)
        if (query?.dateFrom) {
          const dateField = query.dateField || 'createdAt'
          filtered = filtered.filter((item: any) => item[dateField] >= query.dateFrom)
        }
        if (query?.dateTo) {
          const dateField = query.dateField || 'createdAt'
          filtered = filtered.filter((item: any) => item[dateField] <= query.dateTo + 'T23:59:59Z')
        }
        if (query?.minPrice) filtered = filtered.filter((item: any) => {
          const price = item.purchasePrice ?? item.salePrice ?? item.totalAmount ?? 0
          return price >= Number(query.minPrice)
        })
        if (query?.maxPrice) filtered = filtered.filter((item: any) => {
          const price = item.purchasePrice ?? item.salePrice ?? item.totalAmount ?? 0
          return price <= Number(query.maxPrice)
        })
        const page = query?.page || 1
        const pageSize = query?.pageSize || 10
        const start = (page - 1) * pageSize
        return { data: filtered.slice(start, start + pageSize), total: filtered.length }
      })
    },
    getById(id: string): Promise<T | undefined> {
      return delay().then(() => data.find(item => item.id === id))
    },
    create(item: Omit<T, 'id'> & { id?: string }): Promise<T> {
      return delay().then(() => {
        const newItem = { ...item, id: item.id || generateId() } as unknown as T
        data.unshift(newItem)
        return newItem
      })
    },
    update(id: string, updates: Partial<T>): Promise<T> {
      return delay().then(() => {
        const idx = data.findIndex(item => item.id === id)
        if (idx === -1) throw new Error(`${name} not found`)
        data[idx] = { ...data[idx], ...updates }
        return data[idx]
      })
    },
    remove(id: string): Promise<void> {
      return delay().then(() => {
        data = data.filter(item => item.id !== id)
      })
    },
    getData() { return data },
  }
}

// ============ 基础资料 API ============
export const supplierApi = createCrudApi<Supplier>(mockSuppliers, 'Supplier')
export const customerApi = createCrudApi<Customer>(mockCustomers, 'Customer')
export const productApi = createCrudApi<Product>(mockProducts, 'Product')
export const warehouseApi = createCrudApi<Warehouse>(mockWarehouses, 'Warehouse')
export const storeApi = createCrudApi<Store>(mockStores, 'Store')

// ============ 采购管理 API ============
export const purchaseOrderApi = createCrudApi<PurchaseOrder>(mockPurchaseOrders, 'PurchaseOrder')
export const purchaseInboundApi = createCrudApi<PurchaseInbound>(mockPurchaseInbounds, 'PurchaseInbound')
export const supplierReturnApi = createCrudApi<SupplierReturn>(mockSupplierReturns, 'SupplierReturn')

// ============ 销售管理 API ============
export const salesOrderApi = createCrudApi<SalesOrder>(mockSalesOrders, 'SalesOrder')
export const salesOutboundApi = createCrudApi<SalesOutbound>(mockSalesOutbounds, 'SalesOutbound')
export const customerReturnApi = createCrudApi<CustomerReturn>(mockCustomerReturns, 'CustomerReturn')

// ============ 库存管理 API ============
export const stockRecordApi = createCrudApi<StockRecord>(mockStockRecords, 'StockRecord')
export const stockMovementApi = createCrudApi<StockMovement>(mockStockMovements, 'StockMovement')
export const stockTransferApi = createCrudApi<StockTransfer>(mockStockTransfers, 'StockTransfer')
export const stockAdjustmentApi = createCrudApi<StockAdjustment>(mockStockAdjustments, 'StockAdjustment')

// ============ 系统设置 API ============
export const userApi = createCrudApi<SystemUser>(mockUsers, 'SystemUser')
export const roleApi = createCrudApi<SystemRole>(mockRoles, 'SystemRole')
export const menuApi = createCrudApi<SystemMenu>(mockMenus, 'SystemMenu')
export const dictionaryApi = createCrudApi<SystemDictionary>(mockDictionaries, 'SystemDictionary')

// ============ 首页 ============
export const dashboardApi = {
  getData() {
    return delay(500).then(() => mockDashboard)
  },
}
