import { useState } from 'react'
import { useCrudPage } from '@/utils/useCrudPage'
import { stockRecordApi } from '@/mock/api'
import type { StockRecord } from '@/types'
import { formatDateTime } from '@/utils/format'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import DetailDrawer from '@/components/common/DetailDrawer'

const CATEGORIES = ['电子元器件', '五金配件', '化工原料', '机械设备', '包装材料', '自动化设备']
const WAREHOUSES = ['华南总仓', '华东分仓', '西南分仓', '华北分仓', '华中分仓', '西北分仓', '广州黄埔前置仓', '深圳龙华前置仓']

export default function StockQueryPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, filters } =
    useCrudPage<StockRecord>({ api: stockRecordApi })

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [viewingItem, setViewingItem] = useState<StockRecord | null>(null)
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [warehouseFilter, setWarehouseFilter] = useState(filters.warehouseName || '')
  const [categoryFilter, setCategoryFilter] = useState(filters.category || '')
  const [minStock, setMinStock] = useState(filters.minStock || '')
  const [maxStock, setMaxStock] = useState(filters.maxStock || '')

  const onSearch = () => handleSearch({ keyword, warehouseName: warehouseFilter, category: categoryFilter, minStock, maxStock })
  const onReset = () => { setKeyword(''); setWarehouseFilter(''); setCategoryFilter(''); setMinStock(''); setMaxStock(''); handleReset() }
  const openDetail = (item: StockRecord) => { setViewingItem(item); setDrawerOpen(true) }

  const columns: Column<StockRecord>[] = [
    { key: 'warehouseName', title: '仓库', width: '130px' },
    { key: 'productCode', title: '商品编码', width: '110px' },
    { key: 'productName', title: '商品名称', width: '180px' },
    { key: 'category', title: '分类', width: '100px' },
    { key: 'unit', title: '单位', width: '60px' },
    { key: 'totalStock', title: '总库存', width: '80px', align: 'right', render: v => v?.toLocaleString() },
    { key: 'availableStock', title: '可用库存', width: '80px', align: 'right', render: v => v?.toLocaleString() },
    { key: 'lockedStock', title: '锁定库存', width: '80px', align: 'right', render: v => v?.toLocaleString() },
    { key: 'frozenStock', title: '冻结库存', width: '80px', align: 'right', render: v => v?.toLocaleString() },
    { key: 'updatedAt', title: '更新时间', width: '110px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '100px',
      render: (_, record) => (
        <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">库存明细</button>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title="库存查询" description="查询各仓库商品库存信息，支持按仓库、分类、库存量等条件筛选" />
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="商品编码/名称" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">仓库</label><select value={warehouseFilter} onChange={e => setWarehouseFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-32 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{WAREHOUSES.map(w => <option key={w} value={w}>{w}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">分类</label><select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">总库存</label><input type="number" value={minStock} onChange={e => setMinStock(e.target.value)} placeholder="最低" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-20 focus:outline-none focus:ring-1 focus:ring-primary-500" /><span className="text-xs text-gray-400">-</span><input type="number" value={maxStock} onChange={e => setMaxStock(e.target.value)} placeholder="最高" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-20 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="库存明细" width="w-[640px]">
        {viewingItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">商品信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">商品编码</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.productCode}</p></div>
                  <div><span className="text-xs text-gray-500">商品名称</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.productName}</p></div>
                  <div><span className="text-xs text-gray-500">商品分类</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.category}</p></div>
                  <div><span className="text-xs text-gray-500">基本单位</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.unit}</p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">库存数量</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">所在仓库</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.warehouseName}</p></div>
                  <div><span className="text-xs text-gray-500">总库存</span><p className="text-sm text-gray-900 mt-0.5 text-lg font-bold">{viewingItem.totalStock?.toLocaleString()}</p></div>
                  <div><span className="text-xs text-gray-500">可用库存</span><p className="text-sm text-green-700 mt-0.5 font-medium">{viewingItem.availableStock?.toLocaleString()}</p></div>
                  <div><span className="text-xs text-gray-500">锁定库存</span><p className="text-sm text-yellow-700 mt-0.5 font-medium">{viewingItem.lockedStock?.toLocaleString()}</p></div>
                  <div><span className="text-xs text-gray-500">冻结库存</span><p className="text-sm text-red-600 mt-0.5 font-medium">{viewingItem.frozenStock?.toLocaleString()}</p></div>
                  <div><span className="text-xs text-gray-500">更新时间</span><p className="text-sm text-gray-900 mt-0.5">{formatDateTime(viewingItem.updatedAt)}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  )
}
