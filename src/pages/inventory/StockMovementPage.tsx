import { useState } from 'react'
import { useCrudPage } from '@/utils/useCrudPage'
import { stockMovementApi } from '@/mock/api'
import type { StockMovement } from '@/types'
import { formatDateTime } from '@/utils/format'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import DetailDrawer from '@/components/common/DetailDrawer'

const BIZ_TYPES = ['采购入库', '销售出库', '采购退货出库', '销售退货入库', '库存调拨出库', '库存调拨入库', '库存调整']

export default function StockMovementPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, filters } =
    useCrudPage<StockMovement>({ api: stockMovementApi })

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [viewingItem, setViewingItem] = useState<StockMovement | null>(null)
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [bizType, setBizType] = useState(filters.bizType || '')
  const [dateFrom, setDateFrom] = useState(filters.dateFrom || '')
  const [dateTo, setDateTo] = useState(filters.dateTo || '')

  const onSearch = () => handleSearch({ keyword, bizType, dateFrom, dateTo, dateField: 'operatedAt' })
  const onReset = () => { setKeyword(''); setBizType(''); setDateFrom(''); setDateTo(''); handleReset() }
  const openDetail = (item: StockMovement) => { setViewingItem(item); setDrawerOpen(true) }

  const columns: Column<StockMovement>[] = [
    { key: 'movementNo', title: '流水编号', width: '160px' },
    { key: 'bizType', title: '业务类型', width: '110px' },
    { key: 'sourceDocType', title: '来源类型', width: '100px' },
    { key: 'sourceDocNo', title: '来源单号', width: '160px' },
    { key: 'warehouseName', title: '仓库', width: '120px' },
    { key: 'productName', title: '商品名称', width: '160px' },
    { key: 'beforeQty', title: '变动前', width: '80px', align: 'right', render: v => v?.toLocaleString() },
    { key: 'changeQty', title: '变动量', width: '80px', align: 'right', render: v => <span className={v > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{v > 0 ? '+' + v.toLocaleString() : v.toLocaleString()}</span> },
    { key: 'afterQty', title: '变动后', width: '80px', align: 'right', render: v => v?.toLocaleString() },
    { key: 'operator', title: '操作人', width: '80px' },
    { key: 'operatedAt', title: '操作时间', width: '110px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '80px',
      render: (_, record) => (
        <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">详情</button>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title="库存流水" description="查询商品库存变动记录，追踪每一次出入库操作对库存的影响" />
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="流水号/商品/单号" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">业务类型</label><select value={bizType} onChange={e => setBizType(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{BIZ_TYPES.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">操作时间</label><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /><span className="text-xs text-gray-400">-</span><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="库存流水详情" width="w-[640px]">
        {viewingItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">业务信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">流水编号</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.movementNo}</p></div>
                  <div><span className="text-xs text-gray-500">业务类型</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.bizType}</p></div>
                  <div><span className="text-xs text-gray-500">来源单据类型</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.sourceDocType}</p></div>
                  <div><span className="text-xs text-gray-500">来源单据号</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.sourceDocNo}</p></div>
                  <div><span className="text-xs text-gray-500">操作人</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.operator}</p></div>
                  <div><span className="text-xs text-gray-500">操作时间</span><p className="text-sm text-gray-900 mt-0.5">{formatDateTime(viewingItem.operatedAt)}</p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">商品与库存变动</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">商品编码</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.productCode}</p></div>
                  <div><span className="text-xs text-gray-500">商品名称</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.productName}</p></div>
                  <div><span className="text-xs text-gray-500">仓库</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.warehouseName}</p></div>
                </div>
                <div className="mt-4 flex items-center gap-6">
                  <div className="text-center">
                    <span className="text-xs text-gray-500 block">变动前</span>
                    <span className="text-lg font-bold text-gray-700">{viewingItem.beforeQty?.toLocaleString()}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-500 block">变动量</span>
                    <span className={`text-lg font-bold ${viewingItem.changeQty >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {viewingItem.changeQty > 0 ? '+' : ''}{viewingItem.changeQty?.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-500 block">变动后</span>
                    <span className="text-lg font-bold text-gray-700">{viewingItem.afterQty?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  )
}
