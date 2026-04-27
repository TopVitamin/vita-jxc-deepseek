import type {
  Supplier, Customer, Product, Warehouse, Store,
  PurchaseOrder, PurchaseInbound, SupplierReturn,
  SalesOrder, SalesOutbound, CustomerReturn,
  StockRecord, StockMovement, StockTransfer, StockAdjustment,
  SystemUser, SystemRole, SystemMenu, SystemDictionary,
  DashboardData,
} from '@/types'

// ============ 基础资料 ============

export const mockSuppliers: Supplier[] = [
  { id: 's1', code: 'SUP001', name: '华强电子科技有限公司', category: '电子元器件', contact: '张伟', phone: '13800138001', settlement: '月结30天', paymentTerms: '货到付款', status: 'enabled', createdAt: '2025-06-15T10:00:00Z' },
  { id: 's2', code: 'SUP002', name: '鑫达五金制品有限公司', category: '五金配件', contact: '李娜', phone: '13800138002', settlement: '月结60天', paymentTerms: '预付款30%', status: 'enabled', createdAt: '2025-07-20T10:00:00Z' },
  { id: 's3', code: 'SUP003', name: '天工精密机械厂', category: '机械设备', contact: '王强', phone: '13800138003', settlement: '月结30天', paymentTerms: '货到付款', status: 'enabled', createdAt: '2025-08-10T10:00:00Z' },
  { id: 's4', code: 'SUP004', name: '瑞丰化工原料公司', category: '化工原料', contact: '赵敏', phone: '13800138004', settlement: '现结', paymentTerms: '全额预付', status: 'disabled', createdAt: '2025-09-05T10:00:00Z' },
  { id: 's5', code: 'SUP005', name: '博远包装材料有限公司', category: '包装材料', contact: '陈刚', phone: '13800138005', settlement: '月结45天', paymentTerms: '货到付款', status: 'enabled', createdAt: '2025-10-12T10:00:00Z' },
]

export const mockCustomers: Customer[] = [
  { id: 'c1', code: 'CUS001', name: '京东商城华南分公司', type: '电商平台', contact: '刘洋', phone: '13900139001', region: '华南', creditLimit: 500000, status: 'enabled', createdAt: '2025-05-10T10:00:00Z' },
  { id: 'c2', code: 'CUS002', name: '沃尔玛（中国）投资有限公司', type: '大型商超', contact: '周杰', phone: '13900139002', region: '华东', creditLimit: 1000000, status: 'enabled', createdAt: '2025-06-18T10:00:00Z' },
  { id: 'c3', code: 'CUS003', name: '华润万家有限公司', type: '大型商超', contact: '吴敏', phone: '13900139003', region: '华南', creditLimit: 800000, status: 'enabled', createdAt: '2025-07-22T10:00:00Z' },
  { id: 'c4', code: 'CUS004', name: '苏宁易购集团股份有限公司', type: '电商平台', contact: '郑伟', phone: '13900139004', region: '华东', creditLimit: 600000, status: 'disabled', createdAt: '2025-08-15T10:00:00Z' },
  { id: 'c5', code: 'CUS005', name: '永辉超市股份有限公司', type: '大型商超', contact: '黄磊', phone: '13900139005', region: '西南', creditLimit: 400000, status: 'enabled', createdAt: '2025-09-20T10:00:00Z' },
]

export const mockProducts: Product[] = [
  { id: 'p1', code: 'PRD001', name: '精密电阻器 100Ω', barcode: '6901234567890', category: '电子元器件', brand: '华强', unit: '个', purchasePrice: 0.05, salePrice: 0.12, status: 'enabled', createdAt: '2025-04-10T10:00:00Z' },
  { id: 'p2', code: 'PRD002', name: '不锈钢螺栓 M8×30', barcode: '6901234567891', category: '五金配件', brand: '鑫达', unit: '个', purchasePrice: 0.35, salePrice: 0.80, status: 'enabled', createdAt: '2025-04-15T10:00:00Z' },
  { id: 'p3', code: 'PRD003', name: '工业润滑油 L-HM46', barcode: '6901234567892', category: '化工原料', brand: '瑞丰', unit: '桶', purchasePrice: 280.00, salePrice: 420.00, status: 'enabled', createdAt: '2025-05-01T10:00:00Z' },
  { id: 'p4', code: 'PRD004', name: '精密轴承 6205-2RS', barcode: '6901234567893', category: '机械设备', brand: '天工', unit: '个', purchasePrice: 12.50, salePrice: 22.00, status: 'enabled', createdAt: '2025-05-10T10:00:00Z' },
  { id: 'p5', code: 'PRD005', name: '瓦楞纸箱 400×300×200', barcode: '6901234567894', category: '包装材料', brand: '博远', unit: '个', purchasePrice: 2.80, salePrice: 5.50, status: 'enabled', createdAt: '2025-06-01T10:00:00Z' },
  { id: 'p6', code: 'PRD006', name: '集成电路芯片 ATmega328P', barcode: '6901234567895', category: '电子元器件', brand: '华强', unit: '个', purchasePrice: 8.50, salePrice: 15.00, status: 'enabled', createdAt: '2025-06-15T10:00:00Z' },
  { id: 'p7', code: 'PRD007', name: '高强度螺母 M8', barcode: '6901234567896', category: '五金配件', brand: '鑫达', unit: '个', purchasePrice: 0.08, salePrice: 0.20, status: 'disabled', createdAt: '2025-07-01T10:00:00Z' },
  { id: 'p8', code: 'PRD008', name: '工业齿轮油 L-CKC220', barcode: '6901234567897', category: '化工原料', brand: '瑞丰', unit: '桶', purchasePrice: 350.00, salePrice: 520.00, status: 'enabled', createdAt: '2025-08-01T10:00:00Z' },
]

export const mockWarehouses: Warehouse[] = [
  { id: 'w1', code: 'WH001', name: '华南总仓', type: '主仓', org: '华南分公司', address: '广东省广州市黄埔区科学城科林路18号', manager: '林建国', phone: '13600136001', status: 'enabled', createdAt: '2025-03-01T10:00:00Z' },
  { id: 'w2', code: 'WH002', name: '华东分仓', type: '分仓', org: '华东分公司', address: '上海市浦东新区外高桥保税区富特路200号', manager: '陈志明', phone: '13600136002', status: 'enabled', createdAt: '2025-04-15T10:00:00Z' },
  { id: 'w3', code: 'WH003', name: '西南分仓', type: '分仓', org: '西南分公司', address: '四川省成都市高新区天府大道中段688号', manager: '黄文杰', phone: '13600136003', status: 'enabled', createdAt: '2025-05-20T10:00:00Z' },
  { id: 'w4', code: 'WH004', name: '华北分仓', type: '分仓', org: '华北分公司', address: '北京市大兴区亦庄经济开发区荣华路12号', manager: '张明辉', phone: '13600136004', status: 'disabled', createdAt: '2025-06-10T10:00:00Z' },
]

export const mockStores: Store[] = [
  { id: 'st1', code: 'ST001', name: '广州天河城店', region: '华南', type: '直营店', manager: '李明华', phone: '13500135001', address: '广州市天河区天河路208号', status: 'enabled', createdAt: '2025-03-15T10:00:00Z' },
  { id: 'st2', code: 'ST002', name: '深圳万象城店', region: '华南', type: '直营店', manager: '王丽芳', phone: '13500135002', address: '深圳市罗湖区宝安南路1881号', status: 'enabled', createdAt: '2025-04-20T10:00:00Z' },
  { id: 'st3', code: 'ST003', name: '上海南京路店', region: '华东', type: '旗舰店', manager: '张伟强', phone: '13500135003', address: '上海市黄浦区南京东路800号', status: 'enabled', createdAt: '2025-05-10T10:00:00Z' },
  { id: 'st4', code: 'ST004', name: '成都春熙路店', region: '西南', type: '直营店', manager: '刘建华', phone: '13500135004', address: '成都市锦江区春熙路128号', status: 'disabled', createdAt: '2025-06-25T10:00:00Z' },
]

// ============ 采购管理 ============

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po1', orderNo: 'PO202604010001', supplierId: 's1', supplierName: '华强电子科技有限公司', org: '华南分公司',
    orderDate: '2026-04-01', expectedDate: '2026-04-10', totalAmount: 58500.00,
    docStatus: 'audited', auditStatus: 'audited', creator: 'admin', createdAt: '2026-04-01T08:30:00Z',
    items: [
      { id: 'poi1', productCode: 'PRD001', productName: '精密电阻器 100Ω', unit: '个', quantity: 100000, price: 0.05, amount: 5000, remark: '' },
      { id: 'poi2', productCode: 'PRD006', productName: '集成电路芯片 ATmega328P', unit: '个', quantity: 5000, price: 8.50, amount: 42500, remark: '急用' },
    ],
  },
  {
    id: 'po2', orderNo: 'PO202604020001', supplierId: 's2', supplierName: '鑫达五金制品有限公司', org: '华南分公司',
    orderDate: '2026-04-02', expectedDate: '2026-04-12', totalAmount: 7800.00,
    docStatus: 'pending_audit', auditStatus: 'pending', creator: 'admin', createdAt: '2026-04-02T09:15:00Z',
    items: [
      { id: 'poi3', productCode: 'PRD002', productName: '不锈钢螺栓 M8×30', unit: '个', quantity: 20000, price: 0.35, amount: 7000, remark: '' },
      { id: 'poi4', productCode: 'PRD007', productName: '高强度螺母 M8', unit: '个', quantity: 10000, price: 0.08, amount: 800, remark: '' },
    ],
  },
  {
    id: 'po3', orderNo: 'PO202604030001', supplierId: 's3', supplierName: '天工精密机械厂', org: '华东分公司',
    orderDate: '2026-04-03', expectedDate: '2026-04-15', totalAmount: 25000.00,
    docStatus: 'draft', auditStatus: 'draft', creator: 'admin', createdAt: '2026-04-03T10:00:00Z',
    items: [
      { id: 'poi5', productCode: 'PRD004', productName: '精密轴承 6205-2RS', unit: '个', quantity: 2000, price: 12.50, amount: 25000, remark: '' },
    ],
  },
]

export const mockPurchaseInbounds: PurchaseInbound[] = [
  { id: 'pi1', inboundNo: 'PI202604050001', orderNo: 'PO202604010001', supplierName: '华强电子科技有限公司', warehouseName: '华南总仓', inboundDate: '2026-04-05', quantity: 105000, totalAmount: 58500.00, docStatus: 'completed', createdAt: '2026-04-05T14:00:00Z' },
  { id: 'pi2', inboundNo: 'PI202604060001', orderNo: 'PO202604010001', supplierName: '华强电子科技有限公司', warehouseName: '华南总仓', inboundDate: '2026-04-06', quantity: 5000, totalAmount: 42500.00, docStatus: 'completed', createdAt: '2026-04-06T11:00:00Z' },
]

export const mockSupplierReturns: SupplierReturn[] = [
  { id: 'sr1', returnNo: 'SR202604080001', supplierName: '华强电子科技有限公司', warehouseName: '华南总仓', returnDate: '2026-04-08', quantity: 500, totalAmount: 6000.00, docStatus: 'completed', createdAt: '2026-04-08T10:00:00Z' },
]

// ============ 销售管理 ============

export const mockSalesOrders: SalesOrder[] = [
  {
    id: 'so1', orderNo: 'SO202604030001', customerId: 'c1', customerName: '京东商城华南分公司', org: '华南分公司',
    orderDate: '2026-04-03', expectedDate: '2026-04-10', totalAmount: 168000.00,
    docStatus: 'audited', auditStatus: 'audited', creator: 'admin', createdAt: '2026-04-03T09:00:00Z',
    items: [
      { id: 'soi1', productCode: 'PRD001', productName: '精密电阻器 100Ω', unit: '个', quantity: 50000, price: 0.12, amount: 6000, remark: '' },
      { id: 'soi2', productCode: 'PRD006', productName: '集成电路芯片 ATmega328P', unit: '个', quantity: 8000, price: 15.00, amount: 120000, remark: '' },
    ],
  },
  {
    id: 'so2', orderNo: 'SO202604040001', customerId: 'c2', customerName: '沃尔玛（中国）投资有限公司', org: '华东分公司',
    orderDate: '2026-04-04', expectedDate: '2026-04-14', totalAmount: 45200.00,
    docStatus: 'pending_audit', auditStatus: 'pending', creator: 'admin', createdAt: '2026-04-04T10:30:00Z',
    items: [
      { id: 'soi3', productCode: 'PRD002', productName: '不锈钢螺栓 M8×30', unit: '个', quantity: 30000, price: 0.80, amount: 24000, remark: '' },
      { id: 'soi4', productCode: 'PRD005', productName: '瓦楞纸箱 400×300×200', unit: '个', quantity: 2000, price: 5.50, amount: 11000, remark: '定制Logo' },
    ],
  },
  {
    id: 'so3', orderNo: 'SO202604050001', customerId: 'c3', customerName: '华润万家有限公司', org: '华南分公司',
    orderDate: '2026-04-05', expectedDate: '2026-04-12', totalAmount: 8500.00,
    docStatus: 'draft', auditStatus: 'draft', creator: 'admin', createdAt: '2026-04-05T08:00:00Z',
    items: [
      { id: 'soi5', productCode: 'PRD004', productName: '精密轴承 6205-2RS', unit: '个', quantity: 300, price: 22.00, amount: 6600, remark: '' },
    ],
  },
]

export const mockSalesOutbounds: SalesOutbound[] = [
  { id: 'so1', outboundNo: 'SOB202604060001', orderNo: 'SO202604030001', customerName: '京东商城华南分公司', warehouseName: '华南总仓', outboundDate: '2026-04-06', quantity: 58000, totalAmount: 168000.00, docStatus: 'completed', createdAt: '2026-04-06T09:00:00Z' },
]

export const mockCustomerReturns: CustomerReturn[] = [
  { id: 'cr1', returnNo: 'CR202604070001', customerName: '京东商城华南分公司', warehouseName: '华南总仓', returnDate: '2026-04-07', quantity: 200, totalAmount: 2400.00, docStatus: 'completed', createdAt: '2026-04-07T11:00:00Z' },
]

// ============ 库存管理 ============

export const mockStockRecords: StockRecord[] = [
  { id: 'sk1', warehouseName: '华南总仓', productCode: 'PRD001', productName: '精密电阻器 100Ω', category: '电子元器件', unit: '个', totalStock: 250000, availableStock: 240000, lockedStock: 8000, frozenStock: 2000, updatedAt: '2026-04-26T08:00:00Z' },
  { id: 'sk2', warehouseName: '华南总仓', productCode: 'PRD002', productName: '不锈钢螺栓 M8×30', category: '五金配件', unit: '个', totalStock: 180000, availableStock: 175000, lockedStock: 5000, frozenStock: 0, updatedAt: '2026-04-26T08:00:00Z' },
  { id: 'sk3', warehouseName: '华南总仓', productCode: 'PRD003', productName: '工业润滑油 L-HM46', category: '化工原料', unit: '桶', totalStock: 350, availableStock: 320, lockedStock: 30, frozenStock: 0, updatedAt: '2026-04-25T16:00:00Z' },
  { id: 'sk4', warehouseName: '华南总仓', productCode: 'PRD004', productName: '精密轴承 6205-2RS', category: '机械设备', unit: '个', totalStock: 8500, availableStock: 8000, lockedStock: 500, frozenStock: 0, updatedAt: '2026-04-26T09:00:00Z' },
  { id: 'sk5', warehouseName: '华南总仓', productCode: 'PRD006', productName: '集成电路芯片 ATmega328P', category: '电子元器件', unit: '个', totalStock: 12000, availableStock: 10000, lockedStock: 2000, frozenStock: 0, updatedAt: '2026-04-27T07:00:00Z' },
  { id: 'sk6', warehouseName: '华东分仓', productCode: 'PRD002', productName: '不锈钢螺栓 M8×30', category: '五金配件', unit: '个', totalStock: 65000, availableStock: 62000, lockedStock: 3000, frozenStock: 0, updatedAt: '2026-04-26T10:00:00Z' },
  { id: 'sk7', warehouseName: '华东分仓', productCode: 'PRD005', productName: '瓦楞纸箱 400×300×200', category: '包装材料', unit: '个', totalStock: 15000, availableStock: 14000, lockedStock: 1000, frozenStock: 0, updatedAt: '2026-04-26T11:00:00Z' },
  { id: 'sk8', warehouseName: '西南分仓', productCode: 'PRD003', productName: '工业润滑油 L-HM46', category: '化工原料', unit: '桶', totalStock: 120, availableStock: 100, lockedStock: 20, frozenStock: 0, updatedAt: '2026-04-25T14:00:00Z' },
  { id: 'sk9', warehouseName: '华南总仓', productCode: 'PRD005', productName: '瓦楞纸箱 400×300×200', category: '包装材料', unit: '个', totalStock: 28000, availableStock: 26000, lockedStock: 0, frozenStock: 2000, updatedAt: '2026-04-26T15:00:00Z' },
  { id: 'sk10', warehouseName: '西南分仓', productCode: 'PRD004', productName: '精密轴承 6205-2RS', category: '机械设备', unit: '个', totalStock: 3200, availableStock: 3000, lockedStock: 200, frozenStock: 0, updatedAt: '2026-04-26T13:00:00Z' },
]

export const mockStockMovements: StockMovement[] = [
  { id: 'sm1', movementNo: 'SM202604060001', bizType: '入库', sourceDocType: '采购入库', sourceDocNo: 'PI202604050001', warehouseName: '华南总仓', productCode: 'PRD001', productName: '精密电阻器 100Ω', beforeQty: 150000, changeQty: 100000, afterQty: 250000, operator: 'admin', operatedAt: '2026-04-06T09:00:00Z' },
  { id: 'sm2', movementNo: 'SM202604060002', bizType: '出库', sourceDocType: '销售出库', sourceDocNo: 'SOB202604060001', warehouseName: '华南总仓', productCode: 'PRD001', productName: '精密电阻器 100Ω', beforeQty: 250000, changeQty: -50000, afterQty: 200000, operator: 'admin', operatedAt: '2026-04-06T09:30:00Z' },
  { id: 'sm3', movementNo: 'SM202604060003', bizType: '入库', sourceDocType: '采购入库', sourceDocNo: 'PI202604060001', warehouseName: '华南总仓', productCode: 'PRD006', productName: '集成电路芯片 ATmega328P', beforeQty: 7000, changeQty: 5000, afterQty: 12000, operator: 'admin', operatedAt: '2026-04-06T11:00:00Z' },
  { id: 'sm4', movementNo: 'SM202604070001', bizType: '退货入库', sourceDocType: '销售退货', sourceDocNo: 'CR202604070001', warehouseName: '华南总仓', productCode: 'PRD001', productName: '精密电阻器 100Ω', beforeQty: 200000, changeQty: 200, afterQty: 200200, operator: 'admin', operatedAt: '2026-04-07T11:00:00Z' },
  { id: 'sm5', movementNo: 'SM202604080001', bizType: '退货出库', sourceDocType: '采购退货', sourceDocNo: 'SR202604080001', warehouseName: '华南总仓', productCode: 'PRD006', productName: '集成电路芯片 ATmega328P', beforeQty: 12000, changeQty: -500, afterQty: 11500, operator: 'admin', operatedAt: '2026-04-08T10:00:00Z' },
]

export const mockStockTransfers: StockTransfer[] = [
  { id: 'st1', transferNo: 'ST202604100001', fromWarehouse: '华南总仓', toWarehouse: '华东分仓', transferDate: '2026-04-10', quantity: 5000, docStatus: 'audited', creator: 'admin', createdAt: '2026-04-10T09:00:00Z' },
  { id: 'st2', transferNo: 'ST202604120001', fromWarehouse: '华南总仓', toWarehouse: '西南分仓', transferDate: '2026-04-12', quantity: 2000, docStatus: 'pending_audit', creator: 'admin', createdAt: '2026-04-12T10:00:00Z' },
]

export const mockStockAdjustments: StockAdjustment[] = [
  { id: 'sa1', adjustmentNo: 'SA202604110001', warehouseName: '华南总仓', type: '盘盈', date: '2026-04-11', quantity: 50, reason: '盘点差异调整', docStatus: 'audited', creator: 'admin', createdAt: '2026-04-11T08:00:00Z' },
  { id: 'sa2', adjustmentNo: 'SA202604130001', warehouseName: '华东分仓', type: '盘亏', date: '2026-04-13', quantity: -20, reason: '运输损耗', docStatus: 'pending_audit', creator: 'admin', createdAt: '2026-04-13T14:00:00Z' },
]

// ============ 系统设置 ============

export const mockUsers: SystemUser[] = [
  { id: 'u1', account: 'admin', name: '系统管理员', phone: '13800000000', role: '超级管理员', status: 'enabled', lastLoginAt: '2026-04-27T08:30:00Z', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'u2', account: 'zhangsan', name: '张三', phone: '13800000001', role: '采购员', status: 'enabled', lastLoginAt: '2026-04-26T17:00:00Z', createdAt: '2025-06-01T00:00:00Z' },
  { id: 'u3', account: 'lisi', name: '李四', phone: '13800000002', role: '销售员', status: 'enabled', lastLoginAt: '2026-04-26T16:30:00Z', createdAt: '2025-07-01T00:00:00Z' },
  { id: 'u4', account: 'wangwu', name: '王五', phone: '13800000003', role: '仓管员', status: 'disabled', lastLoginAt: '2026-03-15T10:00:00Z', createdAt: '2025-08-01T00:00:00Z' },
]

export const mockRoles: SystemRole[] = [
  { id: 'r1', code: 'ROLE_ADMIN', name: '超级管理员', description: '系统最高权限，可管理所有模块', status: 'enabled', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'r2', code: 'ROLE_PURCHASE', name: '采购员', description: '负责采购订单、入库、退货管理', status: 'enabled', createdAt: '2025-06-01T00:00:00Z' },
  { id: 'r3', code: 'ROLE_SALES', name: '销售员', description: '负责销售订单、出库、退货管理', status: 'enabled', createdAt: '2025-07-01T00:00:00Z' },
  { id: 'r4', code: 'ROLE_WAREHOUSE', name: '仓管员', description: '负责库存查询、调拨、调整管理', status: 'enabled', createdAt: '2025-08-01T00:00:00Z' },
]

export const mockMenus: SystemMenu[] = [
  { id: 'm1', name: '首页', code: 'dashboard', parentId: '', parentName: '-', route: '/dashboard', type: 'menu', sort: 1, status: 'enabled' },
  { id: 'm2', name: '基础资料', code: 'master-data', parentId: '', parentName: '-', route: '', type: 'menu', sort: 2, status: 'enabled' },
  { id: 'm3', name: '供应商管理', code: 'suppliers', parentId: 'm2', parentName: '基础资料', route: '/master-data/suppliers', type: 'menu', sort: 1, status: 'enabled' },
  { id: 'm4', name: '客户管理', code: 'customers', parentId: 'm2', parentName: '基础资料', route: '/master-data/customers', type: 'menu', sort: 2, status: 'enabled' },
  { id: 'm5', name: '商品管理', code: 'products', parentId: 'm2', parentName: '基础资料', route: '/master-data/products', type: 'menu', sort: 3, status: 'enabled' },
  { id: 'm6', name: '采购管理', code: 'purchase', parentId: '', parentName: '-', route: '', type: 'menu', sort: 3, status: 'enabled' },
  { id: 'm7', name: '采购订单', code: 'purchase-order', parentId: 'm6', parentName: '采购管理', route: '/purchase/orders', type: 'menu', sort: 1, status: 'enabled' },
  { id: 'm8', name: '销售管理', code: 'sales', parentId: '', parentName: '-', route: '', type: 'menu', sort: 4, status: 'enabled' },
  { id: 'm9', name: '销售订单', code: 'sales-order', parentId: 'm8', parentName: '销售管理', route: '/sales/orders', type: 'menu', sort: 1, status: 'enabled' },
  { id: 'm10', name: '库存管理', code: 'inventory', parentId: '', parentName: '-', route: '', type: 'menu', sort: 5, status: 'enabled' },
  { id: 'm11', name: '系统设置', code: 'system', parentId: '', parentName: '-', route: '', type: 'menu', sort: 6, status: 'enabled' },
  { id: 'm12', name: '用户管理', code: 'users', parentId: 'm11', parentName: '系统设置', route: '/system/users', type: 'menu', sort: 1, status: 'enabled' },
]

export const mockDictionaries: SystemDictionary[] = [
  { id: 'd1', dictCode: 'SUPPLIER_CATEGORY', dictName: '供应商分类', itemCode: 'ELECTRONIC', itemName: '电子元器件', sort: 1, status: 'enabled', remark: '' },
  { id: 'd2', dictCode: 'SUPPLIER_CATEGORY', dictName: '供应商分类', itemCode: 'HARDWARE', itemName: '五金配件', sort: 2, status: 'enabled', remark: '' },
  { id: 'd3', dictCode: 'SUPPLIER_CATEGORY', dictName: '供应商分类', itemCode: 'MACHINERY', itemName: '机械设备', sort: 3, status: 'enabled', remark: '' },
  { id: 'd4', dictCode: 'CUSTOMER_TYPE', dictName: '客户类型', itemCode: 'ECOMMERCE', itemName: '电商平台', sort: 1, status: 'enabled', remark: '' },
  { id: 'd5', dictCode: 'CUSTOMER_TYPE', dictName: '客户类型', itemCode: 'SUPERMARKET', itemName: '大型商超', sort: 2, status: 'enabled', remark: '' },
  { id: 'd6', dictCode: 'SETTLEMENT', dictName: '结算方式', itemCode: 'MONTHLY30', itemName: '月结30天', sort: 1, status: 'enabled', remark: '' },
  { id: 'd7', dictCode: 'SETTLEMENT', dictName: '结算方式', itemCode: 'MONTHLY60', itemName: '月结60天', sort: 2, status: 'enabled', remark: '' },
  { id: 'd8', dictCode: 'SETTLEMENT', dictName: '结算方式', itemCode: 'CASH', itemName: '现结', sort: 3, status: 'enabled', remark: '' },
]

// ============ 首页看板 ============

export const mockDashboard: DashboardData = {
  todaySales: 168000.00,
  todayPurchase: 33500.00,
  totalSku: 1458,
  alertSku: 23,
  pendingPurchaseOrders: 3,
  pendingSalesOrders: 2,
  salesTrend: [
    { date: '04-21', amount: 125000 }, { date: '04-22', amount: 98000 }, { date: '04-23', amount: 142000 },
    { date: '04-24', amount: 168000 }, { date: '04-25', amount: 135000 }, { date: '04-26', amount: 156000 },
    { date: '04-27', amount: 168000 },
  ],
  purchaseTrend: [
    { date: '04-21', amount: 45000 }, { date: '04-22', amount: 32000 }, { date: '04-23', amount: 58000 },
    { date: '04-24', amount: 28000 }, { date: '04-25', amount: 41000 }, { date: '04-26', amount: 35000 },
    { date: '04-27', amount: 33500 },
  ],
  stockAlerts: [
    { productName: '高强度螺母 M8', warehouse: '华南总仓', stock: 1500, minStock: 2000 },
    { productName: '工业齿轮油 L-CKC220', warehouse: '华东分仓', stock: 85, minStock: 100 },
    { productName: '精密轴承 6205-2RS', warehouse: '西南分仓', stock: 3200, minStock: 5000 },
    { productName: '瓦楞纸箱 400×300×200', warehouse: '华南总仓', stock: 28000, minStock: 30000 },
  ],
  todos: [
    { id: 't1', type: '审核', title: '采购订单 PO202604020001 待审核', time: '2026-04-02 09:15' },
    { id: 't2', type: '审核', title: '销售订单 SO202604040001 待审核', time: '2026-04-04 10:30' },
    { id: 't3', type: '出库', title: '销售订单 SO202604050001 待出库', time: '2026-04-05 08:00' },
    { id: 't4', type: '入库', title: '采购订单 PO202604030001 待入库', time: '2026-04-03 10:00' },
    { id: 't5', type: '调拨', title: '调拨单 ST202604120001 待审核', time: '2026-04-12 10:00' },
  ],
}
