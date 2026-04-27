import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { purchaseInboundApi } from '@/mock/api'
import type { PurchaseInbound } from '@/types'
import { formatCurrency, formatDateTime } from '@/utils/format'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

const INOUT_STATUSES = ['pending', 'partial', 'completed', 'cancelled']

export default function PurchaseInboundPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<PurchaseInbound>({ api: purchaseInboundApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [viewingItem, setViewingItem] = useState<PurchaseInbound | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [docStatus, setDocStatus] = useState(filters.docStatus || '')
  const [warehouseFilter, setWarehouseFilter] = useState(filters.warehouseName || '')
  const [dateFrom, setDateFrom] = useState(filters.dateFrom || '')
  const [dateTo, setDateTo] = useState(filters.dateTo || '')

  const { register, handleSubmit, reset } = useForm<any>()

  const columns: Column<PurchaseInbound>[] = [
    { key: 'inboundNo', title: '入库单号', width: '160px' },
    { key: 'orderNo', title: '来源订单号', width: '160px' },
    { key: 'supplierName', title: '供应商', width: '160px' },
    { key: 'warehouseName', title: '入库仓库', width: '130px' },
    { key: 'inboundDate', title: '入库日期', width: '110px' },
    { key: 'quantity', title: '入库数量', width: '90px', align: 'right', render: v => v?.toLocaleString() },
    { key: 'totalAmount', title: '入库金额', width: '120px', render: v => formatCurrency(v), align: 'right' },
    { key: 'docStatus', title: '状态', width: '80px', render: v => <StatusBadge status={v} /> },
    { key: 'createdAt', title: '创建时间', width: '110px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '160px',
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">详情</button>
          {record.docStatus === 'pending' && <button onClick={() => handleUpdate(record.id, { docStatus: 'completed' })} className="px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded">审核入库</button>}
          {record.docStatus === 'partial' && <button onClick={() => handleUpdate(record.id, { docStatus: 'completed' })} className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded">完成入库</button>}
          <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded">删除</button>
        </div>
      ),
    },
  ]

  const openCreate = () => { reset({ inboundNo: '', orderNo: '', supplierName: '', warehouseName: '', inboundDate: '', quantity: 0, totalAmount: 0, remark: '', inspector: '', contactPhone: '' }); setDialogOpen(true) }
  const openDetail = (item: PurchaseInbound) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, docStatus, warehouseName: warehouseFilter, dateFrom, dateTo, dateField: 'inboundDate' })
  const onReset = () => { setKeyword(''); setDocStatus(''); setWarehouseFilter(''); setDateFrom(''); setDateTo(''); handleReset() }
  const onDialogSubmit = (formData: any) => {
    handleCreate({ ...formData, quantity: Number(formData.quantity) || 0, totalAmount: Number(formData.totalAmount) || 0, docStatus: 'pending', createdAt: new Date().toISOString() })
    setDialogOpen(false)
  }
  const onDelete = () => { handleDelete(deletingId); setConfirmOpen(false) }

  return (
    <div>
      <PageHeader title="采购入库" description="管理采购入库单，记录供应商到货入库信息">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增入库</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="入库单号/订单号/供应商" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">仓库</label><input value={warehouseFilter} onChange={e => setWarehouseFilter(e.target.value)} placeholder="仓库名称" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-32 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">状态</label><select value={docStatus} onChange={e => setDocStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{INOUT_STATUSES.map(s => <option key={s} value={s}>{STATUS_MAP[s] || s}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">入库日期</label><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /><span className="text-xs text-gray-400">-</span><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="新增入库单" width="max-w-2xl"
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">入库信息</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">入库单号</label><input {...register('inboundNo')} placeholder="自动生成" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">来源订单号 *</label><input {...register('orderNo', { required: true })} placeholder="请输入采购订单号" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">供应商 *</label><input {...register('supplierName', { required: true })} placeholder="供应商名称" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">入库仓库 *</label><input {...register('warehouseName', { required: true })} placeholder="仓库名称" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">入库日期 *</label><input type="date" {...register('inboundDate', { required: true })} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">质检员</label><input {...register('inspector')} placeholder="质检负责人" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">入库数量 *</label><input type="number" {...register('quantity', { required: true })} placeholder="0" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">入库金额 (¥) *</label><input type="number" step="0.01" {...register('totalAmount', { required: true })} placeholder="0.00" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">备注</label>
            <textarea {...register('remark')} rows={2} placeholder="入库备注信息" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none" />
          </div>
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="入库单详情" width="w-[640px]">
        {viewingItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">入库信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">入库单号</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.inboundNo}</p></div>
                  <div><span className="text-xs text-gray-500">来源订单号</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.orderNo}</p></div>
                  <div><span className="text-xs text-gray-500">供应商</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.supplierName}</p></div>
                  <div><span className="text-xs text-gray-500">入库仓库</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.warehouseName}</p></div>
                  <div><span className="text-xs text-gray-500">入库日期</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.inboundDate}</p></div>
                  <div><span className="text-xs text-gray-500">入库数量</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.quantity?.toLocaleString()}</p></div>
                  <div><span className="text-xs text-gray-500">入库金额</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{formatCurrency(viewingItem.totalAmount)}</p></div>
                  <div><span className="text-xs text-gray-500">状态</span><p className="text-sm mt-0.5"><StatusBadge status={viewingItem.docStatus} /></p></div>
                  <div><span className="text-xs text-gray-500">质检员</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).inspector || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">创建时间</span><p className="text-sm text-gray-900 mt-0.5">{formatDateTime(viewingItem.createdAt)}</p></div>
                  <div className="col-span-2"><span className="text-xs text-gray-500">备注</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).remark || '-'}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该入库单吗？此操作不可恢复，相关库存数量和流水记录可能受到影响。" danger confirmText="删除" onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}

const STATUS_MAP: Record<string, string> = { pending: '待处理', partial: '部分完成', completed: '已完成', cancelled: '已取消' }
