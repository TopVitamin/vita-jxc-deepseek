import { useState } from 'react'
import { useCrudPage } from '@/utils/useCrudPage'
import { stockRecordApi } from '@/mock/api'
import type { StockRecord } from '@/types'
import { formatDateTime } from '@/utils/format'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import DetailDrawer from '@/components/common/DetailDrawer'

export default function StockQueryPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, filters } =
    useCrudPage<StockRecord>({ api: stockRecordApi })

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [viewingItem, setViewingItem] = useState<StockRecord | null>(null)
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [warehouseFilter, setWarehouseFilter] = useState(filters.warehouse || '')

  const onSearch = () => handleSearch({ keyword, warehouseName: warehouseFilter })
  const onReset = () => { setKeyword(''); setWarehouseFilter(''); handleReset() }
  const openDetail = (item: StockRecord) => { setViewingItem(item); setDrawerOpen(true) }

  const columns: Column<StockRecord>[] = [
    { key: 'warehouseName', title: '仓库' },
    { key: 'productCode', title: '商品编码', width: '100px' },
    { key: 'productName', title: '商品名称' },
    { key: 'category', title: '分类', width: '100px' },
    { key: 'unit', title: '单位', width: '60px' },
    { key: 'totalStock', title: '总库存', width: '80px', align: 'right' },
    { key: 'availableStock', title: '可用库存', width: '80px', align: 'right' },
    { key: 'lockedStock', title: '锁定库存', width: '80px', align: 'right' },
    { key: 'frozenStock', title: '冻结库存', width: '80px', align: 'right' },
    { key: 'updatedAt', title: '更新时间', width: '140px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '100px',
      render: (_, record) => (
        <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">库存明细</button>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title="库存查询" description="查询各仓库商品库存信息" />
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="商品编码/名称" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">仓库</label><select value={warehouseFilter} onChange={e => setWarehouseFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-32 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="华南总仓">华南总仓</option><option value="华东分仓">华东分仓</option><option value="西南分仓">西南分仓</option></select></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="库存明细">
        {viewingItem && (
          <div className="space-y-4">
            {[['仓库', viewingItem.warehouseName], ['商品编码', viewingItem.productCode], ['商品名称', viewingItem.productName], ['分类', viewingItem.category], ['单位', viewingItem.unit], ['总库存', viewingItem.totalStock], ['可用库存', viewingItem.availableStock], ['锁定库存', viewingItem.lockedStock], ['冻结库存', viewingItem.frozenStock], ['更新时间', formatDateTime(viewingItem.updatedAt)]].map(([label, val]) => (
              <div key={label as string}><span className="text-xs text-gray-500">{label}</span><p className="text-sm text-gray-900 mt-0.5">{val}</p></div>
            ))}
          </div>
        )}
      </DetailDrawer>
    </div>
  )
}
