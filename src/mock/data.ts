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
  { id: 's1', code: 'SUP2026001', name: '华强电子科技有限公司', category: '电子元器件', contact: '张伟', phone: '13800138001', settlement: '月结30天', paymentTerms: '货到付款', status: 'enabled', createdAt: '2025-06-15T10:00:00Z' },
  { id: 's2', code: 'SUP2026002', name: '鑫达五金制品有限公司', category: '五金配件', contact: '李娜', phone: '13800138002', settlement: '月结60天', paymentTerms: '预付款30%', status: 'enabled', createdAt: '2025-07-20T10:00:00Z' },
  { id: 's3', code: 'SUP2026003', name: '天工精密机械厂', category: '机械设备', contact: '王强', phone: '13800138003', settlement: '月结30天', paymentTerms: '货到付款', status: 'enabled', createdAt: '2025-08-10T10:00:00Z' },
  { id: 's4', code: 'SUP2026004', name: '瑞丰化工原料有限公司', category: '化工原料', contact: '赵敏', phone: '13800138004', settlement: '现结', paymentTerms: '全额预付', status: 'disabled', createdAt: '2025-09-05T10:00:00Z' },
  { id: 's5', code: 'SUP2026005', name: '博远包装材料有限公司', category: '包装材料', contact: '陈刚', phone: '13800138005', settlement: '月结45天', paymentTerms: '货到付款', status: 'enabled', createdAt: '2025-10-12T10:00:00Z' },
  { id: 's6', code: 'SUP2026006', name: '恒达精密模具有限公司', category: '模具加工', contact: '孙志明', phone: '13800138006', settlement: '月结30天', paymentTerms: '预付款50%', status: 'enabled', createdAt: '2025-11-01T10:00:00Z' },
  { id: 's7', code: 'SUP2026007', name: '维科自动化设备有限公司', category: '自动化设备', contact: '钱文杰', phone: '13800138007', settlement: '月结90天', paymentTerms: '分期付款', status: 'enabled', createdAt: '2025-11-15T10:00:00Z' },
  { id: 's8', code: 'SUP2026008', name: '顺达物流设备有限公司', category: '物流设备', contact: '吴海龙', phone: '13800138008', settlement: '现结', paymentTerms: '货到付款', status: 'disabled', createdAt: '2025-12-01T10:00:00Z' },
  { id: 's9', code: 'SUP2026009', name: '欧亚新材料科技有限公司', category: '新材料', contact: '马晓燕', phone: '13800138009', settlement: '月结60天', paymentTerms: '预付款20%', status: 'enabled', createdAt: '2025-12-20T10:00:00Z' },
  { id: 's10', code: 'SUP2026010', name: '金利来五金机电有限公司', category: '五金配件', contact: '胡建国', phone: '13800138010', settlement: '月结30天', paymentTerms: '货到付款', status: 'enabled', createdAt: '2026-01-10T10:00:00Z' },
  { id: 's11', code: 'SUP2026011', name: '天润精密仪器有限公司', category: '仪器仪表', contact: '林志远', phone: '13800138011', settlement: '月结45天', paymentTerms: '预付款30%', status: 'enabled', createdAt: '2026-02-05T10:00:00Z' },
  { id: 's12', code: 'SUP2026012', name: '中瑞电气集团有限公司', category: '电气设备', contact: '何丽华', phone: '13800138012', settlement: '月结30天', paymentTerms: '货款两清', status: 'enabled', createdAt: '2026-03-01T10:00:00Z' },
]

export const mockCustomers: Customer[] = [
  { id: 'c1', code: 'CUS2026001', name: '京东商城华南分公司', type: '电商平台', contact: '刘洋', phone: '13900139001', region: '华南', creditLimit: 500000, status: 'enabled', createdAt: '2025-05-10T10:00:00Z' },
  { id: 'c2', code: 'CUS2026002', name: '沃尔玛（中国）投资有限公司', type: '大型商超', contact: '周杰', phone: '13900139002', region: '华东', creditLimit: 1000000, status: 'enabled', createdAt: '2025-06-18T10:00:00Z' },
  { id: 'c3', code: 'CUS2026003', name: '华润万家有限公司', type: '大型商超', contact: '吴敏', phone: '13900139003', region: '华南', creditLimit: 800000, status: 'enabled', createdAt: '2025-07-22T10:00:00Z' },
  { id: 'c4', code: 'CUS2026004', name: '苏宁易购集团股份有限公司', type: '电商平台', contact: '郑伟', phone: '13900139004', region: '华东', creditLimit: 600000, status: 'disabled', createdAt: '2025-08-15T10:00:00Z' },
  { id: 'c5', code: 'CUS2026005', name: '永辉超市股份有限公司', type: '大型商超', contact: '黄磊', phone: '13900139005', region: '西南', creditLimit: 400000, status: 'enabled', createdAt: '2025-09-20T10:00:00Z' },
  { id: 'c6', code: 'CUS2026006', name: '大润发（中国）有限公司', type: '大型商超', contact: '杨波', phone: '13900139006', region: '华东', creditLimit: 700000, status: 'enabled', createdAt: '2025-10-05T10:00:00Z' },
  { id: 'c7', code: 'CUS2026007', name: '拼多多电商平台', type: '电商平台', contact: '陈晓峰', phone: '13900139007', region: '华东', creditLimit: 300000, status: 'enabled', createdAt: '2025-11-10T10:00:00Z' },
  { id: 'c8', code: 'CUS2026008', name: '天虹商场股份有限公司', type: '百货商场', contact: '高洁', phone: '13900139008', region: '华南', creditLimit: 450000, status: 'enabled', createdAt: '2025-12-01T10:00:00Z' },
  { id: 'c9', code: 'CUS2026009', name: '盒马鲜生网络科技有限公司', type: '新零售', contact: '徐志强', phone: '13900139009', region: '华东', creditLimit: 550000, status: 'enabled', createdAt: '2026-01-15T10:00:00Z' },
  { id: 'c10', code: 'CUS2026010', name: '红星美凯龙家居集团', type: '家居卖场', contact: '谢雨晴', phone: '13900139010', region: '华北', creditLimit: 350000, status: 'disabled', createdAt: '2026-02-01T10:00:00Z' },
  { id: 'c11', code: 'CUS2026011', name: '宜家家居（中国）有限公司', type: '家居卖场', contact: '唐明辉', phone: '13900139011', region: '华东', creditLimit: 900000, status: 'enabled', createdAt: '2026-02-20T10:00:00Z' },
  { id: 'c12', code: 'CUS2026012', name: '屈臣氏个人用品商店', type: '连锁零售', contact: '周美玲', phone: '13900139012', region: '华南', creditLimit: 250000, status: 'enabled', createdAt: '2026-03-15T10:00:00Z' },
]

export const mockProducts: Product[] = [
  { id: 'p1', code: 'PRD2026001', name: '精密电阻器 100Ω ±1%', barcode: '6901234567890', category: '电子元器件', brand: '华强', unit: '个', purchasePrice: 0.05, salePrice: 0.12, status: 'enabled', createdAt: '2025-04-10T10:00:00Z' },
  { id: 'p2', code: 'PRD2026002', name: '不锈钢螺栓 M8×30 A2-70', barcode: '6901234567891', category: '五金配件', brand: '鑫达', unit: '个', purchasePrice: 0.35, salePrice: 0.80, status: 'enabled', createdAt: '2025-04-15T10:00:00Z' },
  { id: 'p3', code: 'PRD2026003', name: '工业润滑油 L-HM46 200L', barcode: '6901234567892', category: '化工原料', brand: '瑞丰', unit: '桶', purchasePrice: 280.00, salePrice: 420.00, status: 'enabled', createdAt: '2025-05-01T10:00:00Z' },
  { id: 'p4', code: 'PRD2026004', name: '精密深沟球轴承 6205-2RS', barcode: '6901234567893', category: '机械设备', brand: '天工', unit: '个', purchasePrice: 12.50, salePrice: 22.00, status: 'enabled', createdAt: '2025-05-10T10:00:00Z' },
  { id: 'p5', code: 'PRD2026005', name: '瓦楞纸箱 400×300×200mm', barcode: '6901234567894', category: '包装材料', brand: '博远', unit: '个', purchasePrice: 2.80, salePrice: 5.50, status: 'enabled', createdAt: '2025-06-01T10:00:00Z' },
  { id: 'p6', code: 'PRD2026006', name: '集成电路芯片 ATmega328P-PU', barcode: '6901234567895', category: '电子元器件', brand: '华强', unit: '个', purchasePrice: 8.50, salePrice: 15.00, status: 'enabled', createdAt: '2025-06-15T10:00:00Z' },
  { id: 'p7', code: 'PRD2026007', name: '高强度六角螺母 M8 8级', barcode: '6901234567896', category: '五金配件', brand: '鑫达', unit: '个', purchasePrice: 0.08, salePrice: 0.20, status: 'disabled', createdAt: '2025-07-01T10:00:00Z' },
  { id: 'p8', code: 'PRD2026008', name: '工业齿轮油 L-CKC220 200L', barcode: '6901234567897', category: '化工原料', brand: '瑞丰', unit: '桶', purchasePrice: 350.00, salePrice: 520.00, status: 'enabled', createdAt: '2025-08-01T10:00:00Z' },
  { id: 'p9', code: 'PRD2026009', name: '精密滚珠丝杠 SFU1605-500mm', barcode: '6901234567898', category: '机械设备', brand: '天工', unit: '根', purchasePrice: 185.00, salePrice: 320.00, status: 'enabled', createdAt: '2025-09-01T10:00:00Z' },
  { id: 'p10', code: 'PRD2026010', name: '防静电屏蔽袋 300×400mm', barcode: '6901234567899', category: '包装材料', brand: '博远', unit: '个', purchasePrice: 0.15, salePrice: 0.45, status: 'enabled', createdAt: '2025-10-01T10:00:00Z' },
  { id: 'p11', code: 'PRD2026011', name: '贴片电容 10μF 0805', barcode: '6901234567900', category: '电子元器件', brand: '华强', unit: '个', purchasePrice: 0.02, salePrice: 0.06, status: 'enabled', createdAt: '2025-11-01T10:00:00Z' },
  { id: 'p12', code: 'PRD2026012', name: '平垫圈 M8 镀锌', barcode: '6901234567901', category: '五金配件', brand: '金利来', unit: '个', purchasePrice: 0.03, salePrice: 0.08, status: 'enabled', createdAt: '2025-12-01T10:00:00Z' },
  { id: 'p13', code: 'PRD2026013', name: '工业防锈油 R5117 20L', barcode: '6901234567902', category: '化工原料', brand: '欧亚', unit: '桶', purchasePrice: 120.00, salePrice: 185.00, status: 'enabled', createdAt: '2026-01-01T10:00:00Z' },
  { id: 'p14', code: 'PRD2026014', name: '步进电机 42BYGH34 1.8°', barcode: '6901234567903', category: '自动化设备', brand: '维科', unit: '台', purchasePrice: 45.00, salePrice: 78.00, status: 'enabled', createdAt: '2026-02-01T10:00:00Z' },
  { id: 'p15', code: 'PRD2026015', name: 'PLC控制器 FX3U-32MT', barcode: '6901234567904', category: '自动化设备', brand: '维科', unit: '台', purchasePrice: 680.00, salePrice: 980.00, status: 'enabled', createdAt: '2026-03-01T10:00:00Z' },
]

export const mockWarehouses: Warehouse[] = [
  { id: 'w1', code: 'WH2026001', name: '华南总仓', type: '主仓', org: '华南分公司', address: '广东省广州市黄埔区科学城科林路18号', manager: '林建国', phone: '13600136001', status: 'enabled', createdAt: '2025-03-01T10:00:00Z' },
  { id: 'w2', code: 'WH2026002', name: '华东分仓', type: '分仓', org: '华东分公司', address: '上海市浦东新区外高桥保税区富特路200号', manager: '陈志明', phone: '13600136002', status: 'enabled', createdAt: '2025-04-15T10:00:00Z' },
  { id: 'w3', code: 'WH2026003', name: '西南分仓', type: '分仓', org: '西南分公司', address: '四川省成都市高新区天府大道中段688号', manager: '黄文杰', phone: '13600136003', status: 'enabled', createdAt: '2025-05-20T10:00:00Z' },
  { id: 'w4', code: 'WH2026004', name: '华北分仓', type: '分仓', org: '华北分公司', address: '北京市大兴区亦庄经济开发区荣华路12号', manager: '张明辉', phone: '13600136004', status: 'disabled', createdAt: '2025-06-10T10:00:00Z' },
  { id: 'w5', code: 'WH2026005', name: '华中分仓', type: '分仓', org: '华中分公司', address: '湖北省武汉市东湖高新区光谷大道88号', manager: '赵永强', phone: '13600136005', status: 'enabled', createdAt: '2025-08-01T10:00:00Z' },
  { id: 'w6', code: 'WH2026006', name: '西北分仓', type: '分仓', org: '西北分公司', address: '陕西省西安市高新区唐延路1号', manager: '李雪峰', phone: '13600136006', status: 'enabled', createdAt: '2025-10-01T10:00:00Z' },
  { id: 'w7', code: 'WH2026007', name: '广州黄埔前置仓', type: '前置仓', org: '华南分公司', address: '广东省广州市黄埔区开发大道518号', manager: '王德发', phone: '13600136007', status: 'enabled', createdAt: '2026-01-15T10:00:00Z' },
  { id: 'w8', code: 'WH2026008', name: '深圳龙华前置仓', type: '前置仓', org: '华南分公司', address: '广东省深圳市龙华区民治大道666号', manager: '刘建国', phone: '13600136008', status: 'enabled', createdAt: '2026-02-20T10:00:00Z' },
]

export const mockStores: Store[] = [
  { id: 'st1', code: 'ST2026001', name: '广州天河城旗舰店', region: '华南', type: '旗舰店', manager: '李明华', phone: '13500135001', address: '广州市天河区天河路208号', status: 'enabled', createdAt: '2025-03-15T10:00:00Z' },
  { id: 'st2', code: 'ST2026002', name: '深圳万象城体验店', region: '华南', type: '直营店', manager: '王丽芳', phone: '13500135002', address: '深圳市罗湖区宝安南路1881号', status: 'enabled', createdAt: '2025-04-20T10:00:00Z' },
  { id: 'st3', code: 'ST2026003', name: '上海南京路旗舰店', region: '华东', type: '旗舰店', manager: '张伟强', phone: '13500135003', address: '上海市黄浦区南京东路800号', status: 'enabled', createdAt: '2025-05-10T10:00:00Z' },
  { id: 'st4', code: 'ST2026004', name: '成都春熙路直营店', region: '西南', type: '直营店', manager: '刘建华', phone: '13500135004', address: '成都市锦江区春熙路128号', status: 'disabled', createdAt: '2025-06-25T10:00:00Z' },
  { id: 'st5', code: 'ST2026005', name: '北京王府井旗舰店', region: '华北', type: '旗舰店', manager: '杨志强', phone: '13500135005', address: '北京市东城区王府井大街138号', status: 'enabled', createdAt: '2025-07-15T10:00:00Z' },
  { id: 'st6', code: 'ST2026006', name: '武汉光谷直营店', region: '华中', type: '直营店', manager: '陈建华', phone: '13500135006', address: '武汉市洪山区珞喻路1037号', status: 'enabled', createdAt: '2025-09-01T10:00:00Z' },
  { id: 'st7', code: 'ST2026007', name: '杭州西湖银泰店', region: '华东', type: '直营店', manager: '周丽萍', phone: '13500135007', address: '杭州市上城区延安路258号', status: 'enabled', createdAt: '2025-11-01T10:00:00Z' },
  { id: 'st8', code: 'ST2026008', name: '重庆解放碑直营店', region: '西南', type: '直营店', manager: '黄志明', phone: '13500135008', address: '重庆市渝中区民族路166号', status: 'enabled', createdAt: '2026-01-01T10:00:00Z' },
]

// ============ 采购管理 ============

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po1', orderNo: 'PO202604010001', supplierId: 's1', supplierName: '华强电子科技有限公司', org: '华南分公司',
    orderDate: '2026-04-01', expectedDate: '2026-04-10', totalAmount: 58500.00,
    docStatus: 'audited', auditStatus: 'audited', creator: 'admin', createdAt: '2026-04-01T08:30:00Z',
    items: [
      { id: 'poi1', productCode: 'PRD2026001', productName: '精密电阻器 100Ω ±1%', unit: '个', quantity: 100000, price: 0.05, amount: 5000, remark: '' },
      { id: 'poi2', productCode: 'PRD2026006', productName: '集成电路芯片 ATmega328P-PU', unit: '个', quantity: 5000, price: 8.50, amount: 42500, remark: '急用，优先发货' },
      { id: 'poi3', productCode: 'PRD2026011', productName: '贴片电容 10μF 0805', unit: '个', quantity: 50000, price: 0.02, amount: 1000, remark: '' },
    ],
  },
  {
    id: 'po2', orderNo: 'PO202604020001', supplierId: 's2', supplierName: '鑫达五金制品有限公司', org: '华南分公司',
    orderDate: '2026-04-02', expectedDate: '2026-04-12', totalAmount: 14900.00,
    docStatus: 'pending_audit', auditStatus: 'pending', creator: 'admin', createdAt: '2026-04-02T09:15:00Z',
    items: [
      { id: 'poi4', productCode: 'PRD2026002', productName: '不锈钢螺栓 M8×30 A2-70', unit: '个', quantity: 30000, price: 0.35, amount: 10500, remark: '' },
      { id: 'poi5', productCode: 'PRD2026007', productName: '高强度六角螺母 M8 8级', unit: '个', quantity: 40000, price: 0.08, amount: 3200, remark: '' },
      { id: 'poi6', productCode: 'PRD2026012', productName: '平垫圈 M8 镀锌', unit: '个', quantity: 40000, price: 0.03, amount: 1200, remark: '配套螺栓螺母' },
    ],
  },
  {
    id: 'po3', orderNo: 'PO202604030001', supplierId: 's3', supplierName: '天工精密机械厂', org: '华东分公司',
    orderDate: '2026-04-03', expectedDate: '2026-04-15', totalAmount: 75500.00,
    docStatus: 'draft', auditStatus: 'draft', creator: 'admin', createdAt: '2026-04-03T10:00:00Z',
    items: [
      { id: 'poi7', productCode: 'PRD2026004', productName: '精密深沟球轴承 6205-2RS', unit: '个', quantity: 3000, price: 12.50, amount: 37500, remark: '' },
      { id: 'poi8', productCode: 'PRD2026009', productName: '精密滚珠丝杠 SFU1605-500mm', unit: '根', quantity: 200, price: 185.00, amount: 37000, remark: '' },
      { id: 'poi9', productCode: 'PRD2026004', productName: '精密深沟球轴承 6205-2RS', unit: '个', quantity: 80, price: 12.50, amount: 1000, remark: '备件' },
    ],
  },
  {
    id: 'po4', orderNo: 'PO202604050001', supplierId: 's9', supplierName: '欧亚新材料科技有限公司', org: '华南分公司',
    orderDate: '2026-04-05', expectedDate: '2026-04-18', totalAmount: 24000.00,
    docStatus: 'pending_audit', auditStatus: 'pending', creator: '张三', createdAt: '2026-04-05T14:00:00Z',
    items: [
      { id: 'poi10', productCode: 'PRD2026013', productName: '工业防锈油 R5117 20L', unit: '桶', quantity: 200, price: 120.00, amount: 24000, remark: '新供应商试单' },
    ],
  },
  {
    id: 'po5', orderNo: 'PO202604080001', supplierId: 's7', supplierName: '维科自动化设备有限公司', org: '华东分公司',
    orderDate: '2026-04-08', expectedDate: '2026-04-25', totalAmount: 100400.00,
    docStatus: 'draft', auditStatus: 'draft', creator: '张三', createdAt: '2026-04-08T09:00:00Z',
    items: [
      { id: 'poi11', productCode: 'PRD2026014', productName: '步进电机 42BYGH34 1.8°', unit: '台', quantity: 500, price: 45.00, amount: 22500, remark: '' },
      { id: 'poi12', productCode: 'PRD2026015', productName: 'PLC控制器 FX3U-32MT', unit: '台', quantity: 80, price: 680.00, amount: 54400, remark: '项目急用' },
      { id: 'poi13', productCode: 'PRD2026014', productName: '步进电机 42BYGH34 1.8°', unit: '台', quantity: 500, price: 47.00, amount: 23500, remark: '第二批' },
    ],
  },
  {
    id: 'po6', orderNo: 'PO202604100001', supplierId: 's6', supplierName: '恒达精密模具有限公司', org: '华南分公司',
    orderDate: '2026-04-10', expectedDate: '2026-04-22', totalAmount: 45000.00,
    docStatus: 'closed', auditStatus: 'audited', creator: 'admin', createdAt: '2026-04-10T11:00:00Z',
    items: [
      { id: 'poi14', productCode: 'PRD2026004', productName: '精密深沟球轴承 6205-2RS', unit: '个', quantity: 3600, price: 12.50, amount: 45000, remark: '模具配件' },
    ],
  },
  {
    id: 'po7', orderNo: 'PO202604120001', supplierId: 's10', supplierName: '金利来五金机电有限公司', org: '西南分公司',
    orderDate: '2026-04-12', expectedDate: '2026-04-20', totalAmount: 12300.00,
    docStatus: 'voided', auditStatus: 'voided', creator: 'admin', createdAt: '2026-04-12T08:00:00Z',
    items: [
      { id: 'poi15', productCode: 'PRD2026012', productName: '平垫圈 M8 镀锌', unit: '个', quantity: 200000, price: 0.03, amount: 6000, remark: '' },
      { id: 'poi16', productCode: 'PRD2026002', productName: '不锈钢螺栓 M8×30 A2-70', unit: '个', quantity: 18000, price: 0.35, amount: 6300, remark: '' },
    ],
  },
  {
    id: 'po8', orderNo: 'PO202604150001', supplierId: 's5', supplierName: '博远包装材料有限公司', org: '华中分公司',
    orderDate: '2026-04-15', expectedDate: '2026-04-22', totalAmount: 31250.00,
    docStatus: 'audited', auditStatus: 'audited', creator: '张三', createdAt: '2026-04-15T10:00:00Z',
    items: [
      { id: 'poi17', productCode: 'PRD2026005', productName: '瓦楞纸箱 400×300×200mm', unit: '个', quantity: 5000, price: 2.80, amount: 14000, remark: '' },
      { id: 'poi18', productCode: 'PRD2026010', productName: '防静电屏蔽袋 300×400mm', unit: '个', quantity: 50000, price: 0.15, amount: 7500, remark: '' },
      { id: 'poi19', productCode: 'PRD2026005', productName: '瓦楞纸箱 400×300×200mm', unit: '个', quantity: 2500, price: 3.90, amount: 9750, remark: '加厚型' },
    ],
  },
]

export const mockPurchaseInbounds: PurchaseInbound[] = [
  { id: 'pi1', inboundNo: 'PI202604050001', orderNo: 'PO202604010001', supplierName: '华强电子科技有限公司', warehouseName: '华南总仓', inboundDate: '2026-04-05', quantity: 105000, totalAmount: 58500.00, docStatus: 'completed', createdAt: '2026-04-05T14:00:00Z' },
  { id: 'pi2', inboundNo: 'PI202604100001', orderNo: 'PO202604020001', supplierName: '鑫达五金制品有限公司', warehouseName: '华南总仓', inboundDate: '2026-04-10', quantity: 110000, totalAmount: 14900.00, docStatus: 'completed', createdAt: '2026-04-10T10:00:00Z' },
  { id: 'pi3', inboundNo: 'PI202604160001', orderNo: 'PO202604050001', supplierName: '欧亚新材料科技有限公司', warehouseName: '华南总仓', inboundDate: '2026-04-16', quantity: 200, totalAmount: 24000.00, docStatus: 'completed', createdAt: '2026-04-16T09:00:00Z' },
  { id: 'pi4', inboundNo: 'PI202604180001', orderNo: 'PO202604080001', supplierName: '维科自动化设备有限公司', warehouseName: '华东分仓', inboundDate: '2026-04-18', quantity: 300, totalAmount: 36000.00, docStatus: 'partial', createdAt: '2026-04-18T15:00:00Z' },
  { id: 'pi5', inboundNo: 'PI202604200001', orderNo: 'PO202604100001', supplierName: '恒达精密模具有限公司', warehouseName: '华南总仓', inboundDate: '2026-04-20', quantity: 3600, totalAmount: 45000.00, docStatus: 'completed', createdAt: '2026-04-20T11:00:00Z' },
  { id: 'pi6', inboundNo: 'PI202604220001', orderNo: 'PO202604150001', supplierName: '博远包装材料有限公司', warehouseName: '华中分仓', inboundDate: '2026-04-22', quantity: 57500, totalAmount: 31250.00, docStatus: 'pending', createdAt: '2026-04-22T08:00:00Z' },
]

export const mockSupplierReturns: SupplierReturn[] = [
  { id: 'sr1', returnNo: 'SR202604080001', supplierName: '华强电子科技有限公司', warehouseName: '华南总仓', returnDate: '2026-04-08', quantity: 500, totalAmount: 6000.00, docStatus: 'completed', createdAt: '2026-04-08T10:00:00Z' },
  { id: 'sr2', returnNo: 'SR202604120001', supplierName: '鑫达五金制品有限公司', warehouseName: '华南总仓', returnDate: '2026-04-12', quantity: 1200, totalAmount: 480.00, docStatus: 'completed', createdAt: '2026-04-12T14:00:00Z' },
  { id: 'sr3', returnNo: 'SR202604180001', supplierName: '维科自动化设备有限公司', warehouseName: '华东分仓', returnDate: '2026-04-18', quantity: 15, totalAmount: 9000.00, docStatus: 'pending', createdAt: '2026-04-18T16:00:00Z' },
  { id: 'sr4', returnNo: 'SR202604250001', supplierName: '博远包装材料有限公司', warehouseName: '华中分仓', returnDate: '2026-04-25', quantity: 800, totalAmount: 3120.00, docStatus: 'pending', createdAt: '2026-04-25T09:00:00Z' },
]

// ============ 销售管理 ============

export const mockSalesOrders: SalesOrder[] = [
  {
    id: 'so1', orderNo: 'SO202604030001', customerId: 'c1', customerName: '京东商城华南分公司', org: '华南分公司',
    orderDate: '2026-04-03', expectedDate: '2026-04-10', totalAmount: 168000.00,
    docStatus: 'audited', auditStatus: 'audited', creator: 'admin', createdAt: '2026-04-03T09:00:00Z',
    items: [
      { id: 'soi1', productCode: 'PRD2026001', productName: '精密电阻器 100Ω ±1%', unit: '个', quantity: 80000, price: 0.12, amount: 9600, remark: '' },
      { id: 'soi2', productCode: 'PRD2026006', productName: '集成电路芯片 ATmega328P-PU', unit: '个', quantity: 10000, price: 15.00, amount: 150000, remark: '京东自营' },
      { id: 'soi3', productCode: 'PRD2026011', productName: '贴片电容 10μF 0805', unit: '个', quantity: 60000, price: 0.06, amount: 3600, remark: '' },
    ],
  },
  {
    id: 'so2', orderNo: 'SO202604040001', customerId: 'c2', customerName: '沃尔玛（中国）投资有限公司', org: '华东分公司',
    orderDate: '2026-04-04', expectedDate: '2026-04-14', totalAmount: 52500.00,
    docStatus: 'pending_audit', auditStatus: 'pending', creator: 'admin', createdAt: '2026-04-04T10:30:00Z',
    items: [
      { id: 'soi4', productCode: 'PRD2026002', productName: '不锈钢螺栓 M8×30 A2-70', unit: '个', quantity: 50000, price: 0.80, amount: 40000, remark: '' },
      { id: 'soi5', productCode: 'PRD2026005', productName: '瓦楞纸箱 400×300×200mm', unit: '个', quantity: 5000, price: 5.50, amount: 27500, remark: '定制沃尔玛Logo' },
    ],
  },
  {
    id: 'so3', orderNo: 'SO202604050001', customerId: 'c3', customerName: '华润万家有限公司', org: '华南分公司',
    orderDate: '2026-04-05', expectedDate: '2026-04-12', totalAmount: 21900.00,
    docStatus: 'draft', auditStatus: 'draft', creator: 'admin', createdAt: '2026-04-05T08:00:00Z',
    items: [
      { id: 'soi6', productCode: 'PRD2026004', productName: '精密深沟球轴承 6205-2RS', unit: '个', quantity: 600, price: 22.00, amount: 13200, remark: '' },
      { id: 'soi7', productCode: 'PRD2026010', productName: '防静电屏蔽袋 300×400mm', unit: '个', quantity: 10000, price: 0.45, amount: 4500, remark: '' },
    ],
  },
  {
    id: 'so4', orderNo: 'SO202604080001', customerId: 'c6', customerName: '大润发（中国）有限公司', org: '华东分公司',
    orderDate: '2026-04-08', expectedDate: '2026-04-18', totalAmount: 135000.00,
    docStatus: 'audited', auditStatus: 'audited', creator: '李四', createdAt: '2026-04-08T11:00:00Z',
    items: [
      { id: 'soi8', productCode: 'PRD2026003', productName: '工业润滑油 L-HM46 200L', unit: '桶', quantity: 250, price: 420.00, amount: 105000, remark: '' },
      { id: 'soi9', productCode: 'PRD2026008', productName: '工业齿轮油 L-CKC220 200L', unit: '桶', quantity: 60, price: 500.00, amount: 30000, remark: '促销价' },
    ],
  },
  {
    id: 'so5', orderNo: 'SO202604100001', customerId: 'c9', customerName: '盒马鲜生网络科技有限公司', org: '华东分公司',
    orderDate: '2026-04-10', expectedDate: '2026-04-16', totalAmount: 88300.00,
    docStatus: 'pending_audit', auditStatus: 'pending', creator: '李四', createdAt: '2026-04-10T14:00:00Z',
    items: [
      { id: 'soi10', productCode: 'PRD2026015', productName: 'PLC控制器 FX3U-32MT', unit: '台', quantity: 60, price: 980.00, amount: 58800, remark: '盒马智能仓储项目' },
      { id: 'soi11', productCode: 'PRD2026014', productName: '步进电机 42BYGH34 1.8°', unit: '台', quantity: 500, price: 59.00, amount: 29500, remark: '' },
    ],
  },
  {
    id: 'so6', orderNo: 'SO202604120001', customerId: 'c11', customerName: '宜家家居（中国）有限公司', org: '华东分公司',
    orderDate: '2026-04-12', expectedDate: '2026-04-22', totalAmount: 156000.00,
    docStatus: 'closed', auditStatus: 'audited', creator: '李四', createdAt: '2026-04-12T09:00:00Z',
    items: [
      { id: 'soi12', productCode: 'PRD2026005', productName: '瓦楞纸箱 400×300×200mm', unit: '个', quantity: 20000, price: 5.50, amount: 110000, remark: '' },
      { id: 'soi13', productCode: 'PRD2026002', productName: '不锈钢螺栓 M8×30 A2-70', unit: '个', quantity: 45000, price: 0.80, amount: 36000, remark: '' },
      { id: 'soi14', productCode: 'PRD2026012', productName: '平垫圈 M8 镀锌', unit: '个', quantity: 100000, price: 0.10, amount: 10000, remark: '' },
    ],
  },
  {
    id: 'so7', orderNo: 'SO202604150001', customerId: 'c8', customerName: '天虹商场股份有限公司', org: '华南分公司',
    orderDate: '2026-04-15', expectedDate: '2026-04-20', totalAmount: 45000.00,
    docStatus: 'draft', auditStatus: 'draft', creator: 'admin', createdAt: '2026-04-15T16:00:00Z',
    items: [
      { id: 'soi15', productCode: 'PRD2026013', productName: '工业防锈油 R5117 20L', unit: '桶', quantity: 200, price: 185.00, amount: 37000, remark: '' },
      { id: 'soi16', productCode: 'PRD2026004', productName: '精密深沟球轴承 6205-2RS', unit: '个', quantity: 400, price: 20.00, amount: 8000, remark: '' },
    ],
  },
  {
    id: 'so8', orderNo: 'SO202604180001', customerId: 'c12', customerName: '屈臣氏个人用品商店', org: '华南分公司',
    orderDate: '2026-04-18', expectedDate: '2026-04-25', totalAmount: 52000.00,
    docStatus: 'voided', auditStatus: 'voided', creator: '李四', createdAt: '2026-04-18T10:00:00Z',
    items: [
      { id: 'soi17', productCode: 'PRD2026009', productName: '精密滚珠丝杠 SFU1605-500mm', unit: '根', quantity: 100, price: 320.00, amount: 32000, remark: '展架配件' },
      { id: 'soi18', productCode: 'PRD2026005', productName: '瓦楞纸箱 400×300×200mm', unit: '个', quantity: 4000, price: 5.00, amount: 20000, remark: '' },
    ],
  },
]

export const mockSalesOutbounds: SalesOutbound[] = [
  { id: 'sb1', outboundNo: 'SOB202604060001', orderNo: 'SO202604030001', customerName: '京东商城华南分公司', warehouseName: '华南总仓', outboundDate: '2026-04-06', quantity: 90000, totalAmount: 159600.00, docStatus: 'completed', createdAt: '2026-04-06T09:00:00Z' },
  { id: 'sb2', outboundNo: 'SOB202604120001', orderNo: 'SO202604080001', customerName: '大润发（中国）有限公司', warehouseName: '华东分仓', outboundDate: '2026-04-12', quantity: 310, totalAmount: 135000.00, docStatus: 'completed', createdAt: '2026-04-12T08:00:00Z' },
  { id: 'sb3', outboundNo: 'SOB202604160001', orderNo: 'SO202604100001', customerName: '盒马鲜生网络科技有限公司', warehouseName: '华东分仓', outboundDate: '2026-04-16', quantity: 200, totalAmount: 35300.00, docStatus: 'pending', createdAt: '2026-04-16T14:00:00Z' },
  { id: 'sb4', outboundNo: 'SOB202604200001', orderNo: 'SO202604120001', customerName: '宜家家居（中国）有限公司', warehouseName: '华中分仓', outboundDate: '2026-04-20', quantity: 165000, totalAmount: 156000.00, docStatus: 'completed', createdAt: '2026-04-20T11:00:00Z' },
]

export const mockCustomerReturns: CustomerReturn[] = [
  { id: 'cr1', returnNo: 'CR202604070001', customerName: '京东商城华南分公司', warehouseName: '华南总仓', returnDate: '2026-04-07', quantity: 200, totalAmount: 2400.00, docStatus: 'completed', createdAt: '2026-04-07T11:00:00Z' },
  { id: 'cr2', returnNo: 'CR202604140001', customerName: '大润发（中国）有限公司', warehouseName: '华东分仓', returnDate: '2026-04-14', quantity: 5, totalAmount: 2100.00, docStatus: 'completed', createdAt: '2026-04-14T15:00:00Z' },
  { id: 'cr3', returnNo: 'CR202604220001', customerName: '宜家家居（中国）有限公司', warehouseName: '华中分仓', returnDate: '2026-04-22', quantity: 500, totalAmount: 2750.00, docStatus: 'pending', createdAt: '2026-04-22T10:00:00Z' },
  { id: 'cr4', returnNo: 'CR202604260001', customerName: '盒马鲜生网络科技有限公司', warehouseName: '华东分仓', returnDate: '2026-04-26', quantity: 20, totalAmount: 11800.00, docStatus: 'pending', createdAt: '2026-04-26T13:00:00Z' },
]

// ============ 库存管理 ============

export const mockStockRecords: StockRecord[] = [
  { id: 'sk1', warehouseName: '华南总仓', productCode: 'PRD2026001', productName: '精密电阻器 100Ω ±1%', category: '电子元器件', unit: '个', totalStock: 250000, availableStock: 240000, lockedStock: 8000, frozenStock: 2000, updatedAt: '2026-04-26T08:00:00Z' },
  { id: 'sk2', warehouseName: '华南总仓', productCode: 'PRD2026002', productName: '不锈钢螺栓 M8×30 A2-70', category: '五金配件', unit: '个', totalStock: 180000, availableStock: 175000, lockedStock: 5000, frozenStock: 0, updatedAt: '2026-04-26T08:00:00Z' },
  { id: 'sk3', warehouseName: '华南总仓', productCode: 'PRD2026003', productName: '工业润滑油 L-HM46 200L', category: '化工原料', unit: '桶', totalStock: 350, availableStock: 320, lockedStock: 30, frozenStock: 0, updatedAt: '2026-04-25T16:00:00Z' },
  { id: 'sk4', warehouseName: '华南总仓', productCode: 'PRD2026004', productName: '精密深沟球轴承 6205-2RS', category: '机械设备', unit: '个', totalStock: 8500, availableStock: 8000, lockedStock: 500, frozenStock: 0, updatedAt: '2026-04-26T09:00:00Z' },
  { id: 'sk5', warehouseName: '华南总仓', productCode: 'PRD2026006', productName: '集成电路芯片 ATmega328P-PU', category: '电子元器件', unit: '个', totalStock: 12000, availableStock: 10000, lockedStock: 2000, frozenStock: 0, updatedAt: '2026-04-27T07:00:00Z' },
  { id: 'sk6', warehouseName: '华东分仓', productCode: 'PRD2026002', productName: '不锈钢螺栓 M8×30 A2-70', category: '五金配件', unit: '个', totalStock: 65000, availableStock: 62000, lockedStock: 3000, frozenStock: 0, updatedAt: '2026-04-26T10:00:00Z' },
  { id: 'sk7', warehouseName: '华东分仓', productCode: 'PRD2026005', productName: '瓦楞纸箱 400×300×200mm', category: '包装材料', unit: '个', totalStock: 15000, availableStock: 14000, lockedStock: 1000, frozenStock: 0, updatedAt: '2026-04-26T11:00:00Z' },
  { id: 'sk8', warehouseName: '西南分仓', productCode: 'PRD2026003', productName: '工业润滑油 L-HM46 200L', category: '化工原料', unit: '桶', totalStock: 120, availableStock: 100, lockedStock: 20, frozenStock: 0, updatedAt: '2026-04-25T14:00:00Z' },
  { id: 'sk9', warehouseName: '华南总仓', productCode: 'PRD2026005', productName: '瓦楞纸箱 400×300×200mm', category: '包装材料', unit: '个', totalStock: 28000, availableStock: 26000, lockedStock: 0, frozenStock: 2000, updatedAt: '2026-04-26T15:00:00Z' },
  { id: 'sk10', warehouseName: '西南分仓', productCode: 'PRD2026004', productName: '精密深沟球轴承 6205-2RS', category: '机械设备', unit: '个', totalStock: 3200, availableStock: 3000, lockedStock: 200, frozenStock: 0, updatedAt: '2026-04-26T13:00:00Z' },
  { id: 'sk11', warehouseName: '华中分仓', productCode: 'PRD2026009', productName: '精密滚珠丝杠 SFU1605-500mm', category: '机械设备', unit: '根', totalStock: 450, availableStock: 400, lockedStock: 50, frozenStock: 0, updatedAt: '2026-04-26T14:00:00Z' },
  { id: 'sk12', warehouseName: '华北分仓', productCode: 'PRD2026005', productName: '瓦楞纸箱 400×300×200mm', category: '包装材料', unit: '个', totalStock: 12000, availableStock: 11000, lockedStock: 0, frozenStock: 1000, updatedAt: '2026-04-25T10:00:00Z' },
  { id: 'sk13', warehouseName: '华中分仓', productCode: 'PRD2026014', productName: '步进电机 42BYGH34 1.8°', category: '自动化设备', unit: '台', totalStock: 1200, availableStock: 1100, lockedStock: 100, frozenStock: 0, updatedAt: '2026-04-26T12:00:00Z' },
  { id: 'sk14', warehouseName: '广州黄埔前置仓', productCode: 'PRD2026001', productName: '精密电阻器 100Ω ±1%', category: '电子元器件', unit: '个', totalStock: 80000, availableStock: 75000, lockedStock: 5000, frozenStock: 0, updatedAt: '2026-04-26T09:00:00Z' },
  { id: 'sk15', warehouseName: '深圳龙华前置仓', productCode: 'PRD2026006', productName: '集成电路芯片 ATmega328P-PU', category: '电子元器件', unit: '个', totalStock: 5000, availableStock: 4800, lockedStock: 200, frozenStock: 0, updatedAt: '2026-04-27T06:00:00Z' },
  { id: 'sk16', warehouseName: '西北分仓', productCode: 'PRD2026003', productName: '工业润滑油 L-HM46 200L', category: '化工原料', unit: '桶', totalStock: 80, availableStock: 70, lockedStock: 10, frozenStock: 0, updatedAt: '2026-04-24T11:00:00Z' },
]

export const mockStockMovements: StockMovement[] = [
  { id: 'sm1', movementNo: 'SM202604060001', bizType: '采购入库', sourceDocType: '采购入库', sourceDocNo: 'PI202604050001', warehouseName: '华南总仓', productCode: 'PRD2026001', productName: '精密电阻器 100Ω ±1%', beforeQty: 150000, changeQty: 100000, afterQty: 250000, operator: 'admin', operatedAt: '2026-04-06T09:00:00Z' },
  { id: 'sm2', movementNo: 'SM202604060002', bizType: '销售出库', sourceDocType: '销售出库', sourceDocNo: 'SOB202604060001', warehouseName: '华南总仓', productCode: 'PRD2026001', productName: '精密电阻器 100Ω ±1%', beforeQty: 250000, changeQty: -80000, afterQty: 170000, operator: 'admin', operatedAt: '2026-04-06T09:30:00Z' },
  { id: 'sm3', movementNo: 'SM202604060003', bizType: '采购入库', sourceDocType: '采购入库', sourceDocNo: 'PI202604050001', warehouseName: '华南总仓', productCode: 'PRD2026006', productName: '集成电路芯片 ATmega328P-PU', beforeQty: 7000, changeQty: 5000, afterQty: 12000, operator: 'admin', operatedAt: '2026-04-06T11:00:00Z' },
  { id: 'sm4', movementNo: 'SM202604070001', bizType: '销售退货入库', sourceDocType: '销售退货', sourceDocNo: 'CR202604070001', warehouseName: '华南总仓', productCode: 'PRD2026001', productName: '精密电阻器 100Ω ±1%', beforeQty: 170000, changeQty: 200, afterQty: 170200, operator: 'admin', operatedAt: '2026-04-07T11:00:00Z' },
  { id: 'sm5', movementNo: 'SM202604080001', bizType: '采购退货出库', sourceDocType: '采购退货', sourceDocNo: 'SR202604080001', warehouseName: '华南总仓', productCode: 'PRD2026006', productName: '集成电路芯片 ATmega328P-PU', beforeQty: 12000, changeQty: -500, afterQty: 11500, operator: 'admin', operatedAt: '2026-04-08T10:00:00Z' },
  { id: 'sm6', movementNo: 'SM202604100001', bizType: '采购入库', sourceDocType: '采购入库', sourceDocNo: 'PI202604100001', warehouseName: '华南总仓', productCode: 'PRD2026002', productName: '不锈钢螺栓 M8×30 A2-70', beforeQty: 100000, changeQty: 30000, afterQty: 130000, operator: '张三', operatedAt: '2026-04-10T10:00:00Z' },
  { id: 'sm7', movementNo: 'SM202604120001', bizType: '销售出库', sourceDocType: '销售出库', sourceDocNo: 'SOB202604120001', warehouseName: '华东分仓', productCode: 'PRD2026003', productName: '工业润滑油 L-HM46 200L', beforeQty: 280, changeQty: -250, afterQty: 30, operator: '李四', operatedAt: '2026-04-12T08:00:00Z' },
  { id: 'sm8', movementNo: 'SM202604120002', bizType: '销售出库', sourceDocType: '销售出库', sourceDocNo: 'SOB202604120001', warehouseName: '华东分仓', productCode: 'PRD2026008', productName: '工业齿轮油 L-CKC220 200L', beforeQty: 150, changeQty: -60, afterQty: 90, operator: '李四', operatedAt: '2026-04-12T08:10:00Z' },
  { id: 'sm9', movementNo: 'SM202604140001', bizType: '销售退货入库', sourceDocType: '销售退货', sourceDocNo: 'CR202604140001', warehouseName: '华东分仓', productCode: 'PRD2026003', productName: '工业润滑油 L-HM46 200L', beforeQty: 30, changeQty: 5, afterQty: 35, operator: '李四', operatedAt: '2026-04-14T15:00:00Z' },
  { id: 'sm10', movementNo: 'SM202604160001', bizType: '采购入库', sourceDocType: '采购入库', sourceDocNo: 'PI202604160001', warehouseName: '华南总仓', productCode: 'PRD2026013', productName: '工业防锈油 R5117 20L', beforeQty: 0, changeQty: 200, afterQty: 200, operator: '张三', operatedAt: '2026-04-16T09:00:00Z' },
  { id: 'sm11', movementNo: 'SM202604180001', bizType: '采购入库', sourceDocType: '采购入库', sourceDocNo: 'PI202604180001', warehouseName: '华东分仓', productCode: 'PRD2026014', productName: '步进电机 42BYGH34 1.8°', beforeQty: 0, changeQty: 300, afterQty: 300, operator: '张三', operatedAt: '2026-04-18T15:00:00Z' },
  { id: 'sm12', movementNo: 'SM202604200001', bizType: '销售出库', sourceDocType: '销售出库', sourceDocNo: 'SOB202604200001', warehouseName: '华中分仓', productCode: 'PRD2026005', productName: '瓦楞纸箱 400×300×200mm', beforeQty: 25000, changeQty: -20000, afterQty: 5000, operator: '李四', operatedAt: '2026-04-20T11:00:00Z' },
]

export const mockStockTransfers: StockTransfer[] = [
  { id: 'st1', transferNo: 'ST202604100001', fromWarehouse: '华南总仓', toWarehouse: '华东分仓', transferDate: '2026-04-10', quantity: 5000, docStatus: 'audited', creator: 'admin', createdAt: '2026-04-10T09:00:00Z' },
  { id: 'st2', transferNo: 'ST202604120001', fromWarehouse: '华南总仓', toWarehouse: '西南分仓', transferDate: '2026-04-12', quantity: 2000, docStatus: 'pending_audit', creator: 'admin', createdAt: '2026-04-12T10:00:00Z' },
  { id: 'st3', transferNo: 'ST202604150001', fromWarehouse: '华东分仓', toWarehouse: '华中分仓', transferDate: '2026-04-15', quantity: 3500, docStatus: 'audited', creator: '王五', createdAt: '2026-04-15T14:00:00Z' },
  { id: 'st4', transferNo: 'ST202604180001', fromWarehouse: '华南总仓', toWarehouse: '广州黄埔前置仓', transferDate: '2026-04-18', quantity: 8000, docStatus: 'audited', creator: '王五', createdAt: '2026-04-18T08:00:00Z' },
  { id: 'st5', transferNo: 'ST202604220001', fromWarehouse: '华南总仓', toWarehouse: '西北分仓', transferDate: '2026-04-22', quantity: 1200, docStatus: 'draft', creator: '王五', createdAt: '2026-04-22T11:00:00Z' },
]

export const mockStockAdjustments: StockAdjustment[] = [
  { id: 'sa1', adjustmentNo: 'SA202604110001', warehouseName: '华南总仓', type: '盘盈', date: '2026-04-11', quantity: 50, reason: '月度盘点差异调整，实际库存比系统多50个', docStatus: 'audited', creator: 'admin', createdAt: '2026-04-11T08:00:00Z' },
  { id: 'sa2', adjustmentNo: 'SA202604130001', warehouseName: '华东分仓', type: '盘亏', date: '2026-04-13', quantity: -20, reason: '运输途中损耗，经物流确认破损件数', docStatus: 'pending_audit', creator: 'admin', createdAt: '2026-04-13T14:00:00Z' },
  { id: 'sa3', adjustmentNo: 'SA202604170001', warehouseName: '西南分仓', type: '盘盈', date: '2026-04-17', quantity: 15, reason: '前期入库未及时录入系统，补录', docStatus: 'audited', creator: '王五', createdAt: '2026-04-17T10:00:00Z' },
  { id: 'sa4', adjustmentNo: 'SA202604200001', warehouseName: '华中分仓', type: '盘亏', date: '2026-04-20', quantity: -35, reason: '仓库漏水导致部分纸箱受潮报废', docStatus: 'draft', creator: '王五', createdAt: '2026-04-20T15:00:00Z' },
  { id: 'sa5', adjustmentNo: 'SA202604240001', warehouseName: '广州黄埔前置仓', type: '盘盈', date: '2026-04-24', quantity: 8, reason: '退货商品修复后重新入库', docStatus: 'pending_audit', creator: '王五', createdAt: '2026-04-24T09:00:00Z' },
]

// ============ 系统设置 ============

export const mockUsers: SystemUser[] = [
  { id: 'u1', account: 'admin', name: '系统管理员', phone: '13800000000', role: '超级管理员', status: 'enabled', lastLoginAt: '2026-04-27T08:30:00Z', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'u2', account: 'zhangsan', name: '张三', phone: '13800000001', role: '采购员', status: 'enabled', lastLoginAt: '2026-04-26T17:00:00Z', createdAt: '2025-06-01T00:00:00Z' },
  { id: 'u3', account: 'lisi', name: '李四', phone: '13800000002', role: '销售员', status: 'enabled', lastLoginAt: '2026-04-26T16:30:00Z', createdAt: '2025-07-01T00:00:00Z' },
  { id: 'u4', account: 'wangwu', name: '王五', phone: '13800000003', role: '仓管员', status: 'disabled', lastLoginAt: '2026-03-15T10:00:00Z', createdAt: '2025-08-01T00:00:00Z' },
  { id: 'u5', account: 'zhaoliu', name: '赵六', phone: '13800000004', role: '财务主管', status: 'enabled', lastLoginAt: '2026-04-25T09:00:00Z', createdAt: '2025-09-01T00:00:00Z' },
  { id: 'u6', account: 'qianqi', name: '钱七', phone: '13800000005', role: '运营经理', status: 'enabled', lastLoginAt: '2026-04-26T14:00:00Z', createdAt: '2025-10-01T00:00:00Z' },
  { id: 'u7', account: 'sunba', name: '孙八', phone: '13800000006', role: '仓管员', status: 'enabled', lastLoginAt: '2026-04-24T11:00:00Z', createdAt: '2025-11-01T00:00:00Z' },
  { id: 'u8', account: 'zhoujiu', name: '周九', phone: '13800000007', role: '质检员', status: 'enabled', lastLoginAt: '2026-04-25T16:00:00Z', createdAt: '2026-01-01T00:00:00Z' },
  { id: 'u9', account: 'wushi', name: '吴十', phone: '13800000008', role: '采购员', status: 'disabled', lastLoginAt: '2026-02-20T08:00:00Z', createdAt: '2026-02-01T00:00:00Z' },
]

export const mockRoles: SystemRole[] = [
  { id: 'r1', code: 'ROLE_ADMIN', name: '超级管理员', description: '系统最高权限，拥有所有模块的增删改查及系统配置权限', status: 'enabled', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'r2', code: 'ROLE_PURCHASE', name: '采购员', description: '负责采购订单创建、编辑、提交审核，采购入库和退货管理', status: 'enabled', createdAt: '2025-06-01T00:00:00Z' },
  { id: 'r3', code: 'ROLE_SALES', name: '销售员', description: '负责销售订单创建、编辑、提交审核，销售出库和退货管理', status: 'enabled', createdAt: '2025-07-01T00:00:00Z' },
  { id: 'r4', code: 'ROLE_WAREHOUSE', name: '仓管员', description: '负责库存查询、库存盘点、库存调拨与调整管理', status: 'enabled', createdAt: '2025-08-01T00:00:00Z' },
  { id: 'r5', code: 'ROLE_FINANCE', name: '财务主管', description: '审批采购/销售订单金额，查看财务报表和结算数据', status: 'enabled', createdAt: '2025-09-01T00:00:00Z' },
  { id: 'r6', code: 'ROLE_MANAGER', name: '运营经理', description: '查看全部数据报表，审核关键业务单据，管理团队权限', status: 'enabled', createdAt: '2025-10-01T00:00:00Z' },
  { id: 'r7', code: 'ROLE_QUALITY', name: '质检员', description: '负责入库商品质量检查，记录质检结果和异常处理', status: 'enabled', createdAt: '2025-11-01T00:00:00Z' },
]

export const mockMenus: SystemMenu[] = [
  { id: 'm1', name: '首页', code: 'dashboard', parentId: '', parentName: '-', route: '/dashboard', type: 'menu', sort: 1, status: 'enabled' },
  { id: 'm2', name: '基础资料', code: 'master-data', parentId: '', parentName: '-', route: '', type: 'menu', sort: 2, status: 'enabled' },
  { id: 'm3', name: '供应商管理', code: 'suppliers', parentId: 'm2', parentName: '基础资料', route: '/master-data/suppliers', type: 'menu', sort: 1, status: 'enabled' },
  { id: 'm4', name: '客户管理', code: 'customers', parentId: 'm2', parentName: '基础资料', route: '/master-data/customers', type: 'menu', sort: 2, status: 'enabled' },
  { id: 'm5', name: '商品管理', code: 'products', parentId: 'm2', parentName: '基础资料', route: '/master-data/products', type: 'menu', sort: 3, status: 'enabled' },
  { id: 'm6', name: '仓库管理', code: 'warehouses', parentId: 'm2', parentName: '基础资料', route: '/master-data/warehouses', type: 'menu', sort: 4, status: 'enabled' },
  { id: 'm7', name: '门店管理', code: 'stores', parentId: 'm2', parentName: '基础资料', route: '/master-data/stores', type: 'menu', sort: 5, status: 'enabled' },
  { id: 'm8', name: '采购管理', code: 'purchase', parentId: '', parentName: '-', route: '', type: 'menu', sort: 3, status: 'enabled' },
  { id: 'm9', name: '采购订单', code: 'purchase-order', parentId: 'm8', parentName: '采购管理', route: '/purchase/orders', type: 'menu', sort: 1, status: 'enabled' },
  { id: 'm10', name: '采购入库', code: 'purchase-inbound', parentId: 'm8', parentName: '采购管理', route: '/purchase/inbounds', type: 'menu', sort: 2, status: 'enabled' },
  { id: 'm11', name: '采购退货', code: 'purchase-return', parentId: 'm8', parentName: '采购管理', route: '/purchase/returns', type: 'menu', sort: 3, status: 'enabled' },
  { id: 'm12', name: '销售管理', code: 'sales', parentId: '', parentName: '-', route: '', type: 'menu', sort: 4, status: 'enabled' },
  { id: 'm13', name: '销售订单', code: 'sales-order', parentId: 'm12', parentName: '销售管理', route: '/sales/orders', type: 'menu', sort: 1, status: 'enabled' },
  { id: 'm14', name: '销售出库', code: 'sales-outbound', parentId: 'm12', parentName: '销售管理', route: '/sales/outbounds', type: 'menu', sort: 2, status: 'enabled' },
  { id: 'm15', name: '销售退货', code: 'sales-return', parentId: 'm12', parentName: '销售管理', route: '/sales/returns', type: 'menu', sort: 3, status: 'enabled' },
  { id: 'm16', name: '库存管理', code: 'inventory', parentId: '', parentName: '-', route: '', type: 'menu', sort: 5, status: 'enabled' },
  { id: 'm17', name: '库存查询', code: 'stock-query', parentId: 'm16', parentName: '库存管理', route: '/inventory/stocks', type: 'menu', sort: 1, status: 'enabled' },
  { id: 'm18', name: '库存流水', code: 'stock-movement', parentId: 'm16', parentName: '库存管理', route: '/inventory/movements', type: 'menu', sort: 2, status: 'enabled' },
  { id: 'm19', name: '库存调拨', code: 'stock-transfer', parentId: 'm16', parentName: '库存管理', route: '/inventory/transfers', type: 'menu', sort: 3, status: 'enabled' },
  { id: 'm20', name: '库存调整', code: 'stock-adjustment', parentId: 'm16', parentName: '库存管理', route: '/inventory/adjustments', type: 'menu', sort: 4, status: 'enabled' },
  { id: 'm21', name: '系统设置', code: 'system', parentId: '', parentName: '-', route: '', type: 'menu', sort: 6, status: 'enabled' },
  { id: 'm22', name: '用户管理', code: 'users', parentId: 'm21', parentName: '系统设置', route: '/system/users', type: 'menu', sort: 1, status: 'enabled' },
  { id: 'm23', name: '角色管理', code: 'roles', parentId: 'm21', parentName: '系统设置', route: '/system/roles', type: 'menu', sort: 2, status: 'enabled' },
  { id: 'm24', name: '菜单管理', code: 'menus', parentId: 'm21', parentName: '系统设置', route: '/system/menus', type: 'menu', sort: 3, status: 'enabled' },
  { id: 'm25', name: '数据字典', code: 'dictionaries', parentId: 'm21', parentName: '系统设置', route: '/system/dictionaries', type: 'menu', sort: 4, status: 'enabled' },
]

export const mockDictionaries: SystemDictionary[] = [
  { id: 'd1', dictCode: 'SUPPLIER_CATEGORY', dictName: '供应商分类', itemCode: 'ELECTRONIC', itemName: '电子元器件', sort: 1, status: 'enabled', remark: '' },
  { id: 'd2', dictCode: 'SUPPLIER_CATEGORY', dictName: '供应商分类', itemCode: 'HARDWARE', itemName: '五金配件', sort: 2, status: 'enabled', remark: '' },
  { id: 'd3', dictCode: 'SUPPLIER_CATEGORY', dictName: '供应商分类', itemCode: 'MACHINERY', itemName: '机械设备', sort: 3, status: 'enabled', remark: '' },
  { id: 'd4', dictCode: 'SUPPLIER_CATEGORY', dictName: '供应商分类', itemCode: 'CHEMICAL', itemName: '化工原料', sort: 4, status: 'enabled', remark: '' },
  { id: 'd5', dictCode: 'SUPPLIER_CATEGORY', dictName: '供应商分类', itemCode: 'PACKAGING', itemName: '包装材料', sort: 5, status: 'enabled', remark: '' },
  { id: 'd6', dictCode: 'SUPPLIER_CATEGORY', dictName: '供应商分类', itemCode: 'AUTOMATION', itemName: '自动化设备', sort: 6, status: 'enabled', remark: '' },
  { id: 'd7', dictCode: 'CUSTOMER_TYPE', dictName: '客户类型', itemCode: 'ECOMMERCE', itemName: '电商平台', sort: 1, status: 'enabled', remark: '' },
  { id: 'd8', dictCode: 'CUSTOMER_TYPE', dictName: '客户类型', itemCode: 'SUPERMARKET', itemName: '大型商超', sort: 2, status: 'enabled', remark: '' },
  { id: 'd9', dictCode: 'CUSTOMER_TYPE', dictName: '客户类型', itemCode: 'DEPARTMENT', itemName: '百货商场', sort: 3, status: 'enabled', remark: '' },
  { id: 'd10', dictCode: 'CUSTOMER_TYPE', dictName: '客户类型', itemCode: 'NEW_RETAIL', itemName: '新零售', sort: 4, status: 'enabled', remark: '' },
  { id: 'd11', dictCode: 'CUSTOMER_TYPE', dictName: '客户类型', itemCode: 'HOME', itemName: '家居卖场', sort: 5, status: 'enabled', remark: '' },
  { id: 'd12', dictCode: 'CUSTOMER_TYPE', dictName: '客户类型', itemCode: 'CHAIN', itemName: '连锁零售', sort: 6, status: 'enabled', remark: '' },
  { id: 'd13', dictCode: 'SETTLEMENT', dictName: '结算方式', itemCode: 'MONTHLY30', itemName: '月结30天', sort: 1, status: 'enabled', remark: '' },
  { id: 'd14', dictCode: 'SETTLEMENT', dictName: '结算方式', itemCode: 'MONTHLY45', itemName: '月结45天', sort: 2, status: 'enabled', remark: '' },
  { id: 'd15', dictCode: 'SETTLEMENT', dictName: '结算方式', itemCode: 'MONTHLY60', itemName: '月结60天', sort: 3, status: 'enabled', remark: '' },
  { id: 'd16', dictCode: 'SETTLEMENT', dictName: '结算方式', itemCode: 'MONTHLY90', itemName: '月结90天', sort: 4, status: 'enabled', remark: '' },
  { id: 'd17', dictCode: 'SETTLEMENT', dictName: '结算方式', itemCode: 'CASH', itemName: '现结', sort: 5, status: 'enabled', remark: '' },
  { id: 'd18', dictCode: 'PAYMENT_TERMS', dictName: '付款条件', itemCode: 'COD', itemName: '货到付款', sort: 1, status: 'enabled', remark: '' },
  { id: 'd19', dictCode: 'PAYMENT_TERMS', dictName: '付款条件', itemCode: 'PREPAID30', itemName: '预付款30%', sort: 2, status: 'enabled', remark: '' },
  { id: 'd20', dictCode: 'PAYMENT_TERMS', dictName: '付款条件', itemCode: 'PREPAID50', itemName: '预付款50%', sort: 3, status: 'enabled', remark: '' },
  { id: 'd21', dictCode: 'PAYMENT_TERMS', dictName: '付款条件', itemCode: 'FULL_PREPAID', itemName: '全额预付', sort: 4, status: 'enabled', remark: '' },
  { id: 'd22', dictCode: 'PAYMENT_TERMS', dictName: '付款条件', itemCode: 'INSTALLMENT', itemName: '分期付款', sort: 5, status: 'enabled', remark: '' },
  { id: 'd23', dictCode: 'WH_TYPE', dictName: '仓库类型', itemCode: 'MAIN', itemName: '主仓', sort: 1, status: 'enabled', remark: '' },
  { id: 'd24', dictCode: 'WH_TYPE', dictName: '仓库类型', itemCode: 'SUB', itemName: '分仓', sort: 2, status: 'enabled', remark: '' },
  { id: 'd25', dictCode: 'WH_TYPE', dictName: '仓库类型', itemCode: 'FRONT', itemName: '前置仓', sort: 3, status: 'enabled', remark: '' },
  { id: 'd26', dictCode: 'STORE_TYPE', dictName: '门店类型', itemCode: 'FLAGSHIP', itemName: '旗舰店', sort: 1, status: 'enabled', remark: '' },
  { id: 'd27', dictCode: 'STORE_TYPE', dictName: '门店类型', itemCode: 'DIRECT', itemName: '直营店', sort: 2, status: 'enabled', remark: '' },
  { id: 'd28', dictCode: 'ADJUST_TYPE', dictName: '调整类型', itemCode: 'PROFIT', itemName: '盘盈', sort: 1, status: 'enabled', remark: '实际库存多于系统记录' },
  { id: 'd29', dictCode: 'ADJUST_TYPE', dictName: '调整类型', itemCode: 'LOSS', itemName: '盘亏', sort: 2, status: 'enabled', remark: '实际库存少于系统记录' },
]

// ============ 首页看板 ============

export const mockDashboard: DashboardData = {
  todaySales: 213500.00,
  todayPurchase: 55800.00,
  totalSku: 1892,
  alertSku: 31,
  pendingPurchaseOrders: 4,
  pendingSalesOrders: 3,
  salesTrend: [
    { date: '04-01', amount: 98000 }, { date: '04-02', amount: 115000 }, { date: '04-03', amount: 168000 },
    { date: '04-04', amount: 142000 }, { date: '04-05', amount: 185000 }, { date: '04-06', amount: 159000 },
    { date: '04-07', amount: 132000 }, { date: '04-08', amount: 198000 }, { date: '04-09', amount: 175000 },
    { date: '04-10', amount: 145000 }, { date: '04-11', amount: 162000 }, { date: '04-12', amount: 188000 },
    { date: '04-13', amount: 205000 }, { date: '04-14', amount: 178000 }, { date: '04-15', amount: 156000 },
    { date: '04-16', amount: 192000 }, { date: '04-17', amount: 210000 }, { date: '04-18', amount: 185000 },
    { date: '04-19', amount: 168000 }, { date: '04-20', amount: 225000 }, { date: '04-21', amount: 195000 },
    { date: '04-22', amount: 182000 }, { date: '04-23', amount: 208000 }, { date: '04-24', amount: 175000 },
    { date: '04-25', amount: 190000 }, { date: '04-26', amount: 198000 }, { date: '04-27', amount: 213500 },
  ],
  purchaseTrend: [
    { date: '04-01', amount: 32000 }, { date: '04-02', amount: 45000 }, { date: '04-03', amount: 58500 },
    { date: '04-04', amount: 38000 }, { date: '04-05', amount: 52000 }, { date: '04-06', amount: 41000 },
    { date: '04-07', amount: 28000 }, { date: '04-08', amount: 62000 }, { date: '04-09', amount: 35000 },
    { date: '04-10', amount: 48000 }, { date: '04-11', amount: 55000 }, { date: '04-12', amount: 42000 },
    { date: '04-13', amount: 38000 }, { date: '04-14', amount: 51000 }, { date: '04-15', amount: 44000 },
    { date: '04-16', amount: 35000 }, { date: '04-17', amount: 58000 }, { date: '04-18', amount: 46000 },
    { date: '04-19', amount: 39000 }, { date: '04-20', amount: 53000 }, { date: '04-21', amount: 45000 },
    { date: '04-22', amount: 32000 }, { date: '04-23', amount: 58000 }, { date: '04-24', amount: 28000 },
    { date: '04-25', amount: 41000 }, { date: '04-26', amount: 35000 }, { date: '04-27', amount: 55800 },
  ],
  stockAlerts: [
    { productName: '高强度六角螺母 M8 8级', warehouse: '华南总仓', stock: 1500, minStock: 2000 },
    { productName: '工业齿轮油 L-CKC220 200L', warehouse: '华东分仓', stock: 90, minStock: 100 },
    { productName: '精密深沟球轴承 6205-2RS', warehouse: '西南分仓', stock: 3200, minStock: 5000 },
    { productName: '瓦楞纸箱 400×300×200mm', warehouse: '华中分仓', stock: 5000, minStock: 8000 },
    { productName: '步进电机 42BYGH34 1.8°', warehouse: '华中分仓', stock: 1100, minStock: 1500 },
    { productName: '贴片电容 10μF 0805', warehouse: '华南总仓', stock: 35000, minStock: 50000 },
    { productName: '工业防锈油 R5117 20L', warehouse: '华北分仓', stock: 30, minStock: 50 },
  ],
  todos: [
    { id: 't1', type: '审核', title: '采购订单 PO202604020001 待审核（金额 ¥14,900）', time: '2026-04-02 09:15' },
    { id: 't2', type: '审核', title: '销售订单 SO202604040001 待审核（金额 ¥52,500）', time: '2026-04-04 10:30' },
    { id: 't3', type: '审核', title: '采购订单 PO202604050001 待审核（金额 ¥24,000）', time: '2026-04-05 14:00' },
    { id: 't4', type: '出库', title: '销售订单 SO202604050001 待出库（金额 ¥21,900）', time: '2026-04-05 08:00' },
    { id: 't5', type: '审核', title: '调拨单 ST202604120001 待审核', time: '2026-04-12 10:00' },
    { id: 't6', type: '入库', title: '采购订单 PO202604080001 部分到货（300/1080台）', time: '2026-04-18 15:00' },
    { id: 't7', type: '审核', title: '销售订单 SO202604100001 待审核（金额 ¥88,300）', time: '2026-04-10 14:00' },
    { id: 't8', type: '审核', title: '库存调整 SA202604240001 待审核', time: '2026-04-24 09:00' },
  ],
}
