import { useState } from 'react'
import { useCrudPage } from '@/utils/useCrudPage'
import { stockMovementApi } from '@/mock/api'
import type { StockMovement } from '@/types'
import { formatDateTime } from '@/utils/format'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import DetailDrawer from '@/components/common/DetailDrawer'

export default function StockMovementPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, filters } =
    useCrudPage<StockMovement>({ api: stockMovementApi })

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [viewingItem, setViewingItem] = useState<StockMovement | null>(null)
  const [keyword, setKeyword] = useState(filters.keyword || '')

  const onSearch = () => handleSearch({ keyword })
  const onReset = () => { setKeyword(''); handleReset() }
  const openDetail = (item: StockMovement) => { setViewingItem(item); setDrawerOpen(true) }

  const columns: Column<StockMovement>[] = [
    { key: 'movementNo', title: '流水编号', width: '150px' },
    { key: 'bizType', title: '业务类型', width: '90px' },
    { key: 'sourceDocType', title: '来源类型', width: '90px' },
    { key: 'sourceDocNo', title: '来源单号', width: '150px' },
    { key: 'warehouseName', title: '仓库' },
    { key: 'productName', title: '商品名称' },
    { key: 'beforeQty', title: '变动前', width: '70px', align: 'right' },
    { key: 'changeQty', title: '变动量', width: '70px', align: 'right', render: v => <span className={v > 0 ? 'text-green-600' : 'text-red-600'}>{v > 0 ? '+' + v : v}</span> },
    { key: 'afterQty', title: '变动后', width: '70px', align: 'right' },
    { key: 'operator', title: '操作人', width: '80px' },
    { key: 'operatedAt', title: '操作时间', width: '140px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '80px',
      render: (_, record) => (
        <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">详情</button>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title="库存流水" description="查询商品库存变动记录" />
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="流水号/商品/单号" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="库存流水详情">
        {viewingItem && (
          <div className="space-y-4">
            {[['流水编号', viewingItem.movementNo], ['业务类型', viewingItem.bizType], ['来源单据类型', viewingItem.sourceDocType], ['来源单据号', viewingItem.sourceDocNo], ['仓库', viewingItem.warehouseName], ['商品编码', viewingItem.productCode], ['商品名称', viewingItem.productName], ['变动前数量', viewingItem.beforeQty], ['变动数量', viewingItem.changeQty], ['变动后数量', viewingItem.afterQty], ['操作人', viewingItem.operator], ['操作时间', formatDateTime(viewingItem.operatedAt)]].map(([label, val]) => (<div key={label as string}><span className="text-xs text-gray-500">{label}</span><p className="text-sm text-gray-900 mt-0.5">{val}</p></div>))}
          </div>
        )}
      </DetailDrawer>
    </div>
  )
}
