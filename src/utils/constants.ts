import type { Option } from '@/types'

export const STATUS_OPTIONS: Option[] = [
  { label: '启用', value: 'enabled' },
  { label: '禁用', value: 'disabled' },
]

export const DOC_STATUS_OPTIONS: Option[] = [
  { label: '草稿', value: 'draft' },
  { label: '待审核', value: 'pending_audit' },
  { label: '已审核', value: 'audited' },
  { label: '已关闭', value: 'closed' },
  { label: '已作废', value: 'voided' },
]

export const INOUT_STATUS_OPTIONS: Option[] = [
  { label: '待处理', value: 'pending' },
  { label: '部分完成', value: 'partial' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' },
]

export const STATUS_MAP: Record<string, string> = {
  enabled: '启用',
  disabled: '禁用',
  draft: '草稿',
  pending_audit: '待审核',
  audited: '已审核',
  closed: '已关闭',
  voided: '已作废',
  pending: '待处理',
  partial: '部分完成',
  completed: '已完成',
  cancelled: '已取消',
}

export const STATUS_COLOR_MAP: Record<string, string> = {
  enabled: 'bg-green-100 text-green-800',
  disabled: 'bg-gray-100 text-gray-500',
  draft: 'bg-gray-100 text-gray-600',
  pending_audit: 'bg-yellow-100 text-yellow-800',
  audited: 'bg-green-100 text-green-800',
  closed: 'bg-blue-100 text-blue-800',
  voided: 'bg-red-100 text-red-500',
  pending: 'bg-yellow-100 text-yellow-800',
  partial: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-500',
}

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// 菜单配置
export interface MenuItem {
  key: string
  label: string
  icon: string
  children?: { key: string; label: string; route: string }[]
}

export const MENU_LIST: MenuItem[] = [
  {
    key: 'dashboard',
    label: '首页',
    icon: 'LayoutDashboard',
    children: [
      { key: 'dashboard', label: '数据看板', route: '/dashboard' },
    ],
  },
  {
    key: 'master-data',
    label: '基础资料',
    icon: 'Database',
    children: [
      { key: 'suppliers', label: '供应商管理', route: '/master-data/suppliers' },
      { key: 'customers', label: '客户管理', route: '/master-data/customers' },
      { key: 'products', label: '商品管理', route: '/master-data/products' },
      { key: 'warehouses', label: '仓库管理', route: '/master-data/warehouses' },
      { key: 'stores', label: '门店管理', route: '/master-data/stores' },
    ],
  },
  {
    key: 'purchase',
    label: '采购管理',
    icon: 'ShoppingCart',
    children: [
      { key: 'purchase-orders', label: '采购订单', route: '/purchase/orders' },
      { key: 'purchase-inbounds', label: '采购入库', route: '/purchase/inbounds' },
      { key: 'purchase-returns', label: '采购退货', route: '/purchase/returns' },
    ],
  },
  {
    key: 'sales',
    label: '销售管理',
    icon: 'TrendingUp',
    children: [
      { key: 'sales-orders', label: '销售订单', route: '/sales/orders' },
      { key: 'sales-outbounds', label: '销售出库', route: '/sales/outbounds' },
      { key: 'sales-returns', label: '销售退货', route: '/sales/returns' },
    ],
  },
  {
    key: 'inventory',
    label: '库存管理',
    icon: 'Package',
    children: [
      { key: 'stocks', label: '库存查询', route: '/inventory/stocks' },
      { key: 'movements', label: '库存流水', route: '/inventory/movements' },
      { key: 'transfers', label: '库存调拨', route: '/inventory/transfers' },
      { key: 'adjustments', label: '库存调整', route: '/inventory/adjustments' },
    ],
  },
  {
    key: 'system',
    label: '系统设置',
    icon: 'Settings',
    children: [
      { key: 'users', label: '用户管理', route: '/system/users' },
      { key: 'roles', label: '角色管理', route: '/system/roles' },
      { key: 'menus', label: '菜单管理', route: '/system/menus' },
      { key: 'dictionaries', label: '数据字典', route: '/system/dictionaries' },
    ],
  },
]
