import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { stockAdjustmentApi } from '@/mock/api'
import type { StockAdjustment } from '@/types'
import { formatDateTime } from '@/utils/format'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

const WAREHOUSES = ['华南总仓', '华东分仓', '西南分仓', '华北分仓', '华中分仓', '西北分仓', '广州黄埔前置仓', '深圳龙华前置仓']
const ADJUST_TYPES = ['盘盈', '盘亏']

export default function StockAdjustmentPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<StockAdjustment>({ api: stockAdjustmentApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{ type: string; id: string; status: string } | null>(null)
  const [editingItem, setEditingItem] = useState<StockAdjustment | null>(null)
  const [viewingItem, setViewingItem] = useState<StockAdjustment | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [docStatus, setDocStatus] = useState(filters.docStatus || '')
  const [adjType, setAdjType] = useState(filters.type || '')
  const [warehouseFilter, setWarehouseFilter] = useState(filters.warehouseName || '')
  const [dateFrom, setDateFrom] = useState(filters.dateFrom || '')
  const [dateTo, setDateTo] = useState(filters.dateTo || '')

  const { register, handleSubmit, reset } = useForm<any>()

  const columns: Column<StockAdjustment>[] = [
    { key: 'adjustmentNo', title: '调整单号', width: '160px' },
    { key: 'warehouseName', title: '调整仓库', width: '130px' },
    { key: 'type', title: '调整类型', width: '80px', render: v => <span className={v === '盘盈' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{v}</span> },
    { key: 'date', title: '调整日期', width: '110px' },
    { key: 'quantity', title: '调整数量', width: '90px', align: 'right', render: v => v?.toLocaleString() },
    { key: 'reason', title: '调整原因', width: '140px' },
    { key: 'docStatus', title: '状态', width: '80px', render: v => <StatusBadge status={v} /> },
    { key: 'creator', title: '创建人', width: '80px' },
    { key: 'createdAt', title: '创建时间', width: '110px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '200px',
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">详情</button>
          {record.docStatus === 'draft' && <button onClick={() => openEdit(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">编辑</button>}
          {record.docStatus === 'pending_audit' && <button onClick={() => doStatusAction(record, 'audited')} className="px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded">审核</button>}
          {record.docStatus === 'audited' && <button onClick={() => doStatusAction(record, 'voided')} className="px-2 py-1 text-xs text-orange-600 hover:bg-orange-50 rounded">反审</button>}
          <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded">删除</button>
        </div>
      ),
    },
  ]

  const openCreate = () => { setEditingItem(null); reset({ adjustmentNo: '', warehouseName: '', type: '', date: '', quantity: 0, reason: '', remark: '' }); setDialogOpen(true) }
  const openEdit = (item: StockAdjustment) => { setEditingItem(item); reset(item); setDialogOpen(true) }
  const openDetail = (item: StockAdjustment) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, docStatus, type: adjType, warehouseName: warehouseFilter, dateFrom, dateTo, dateField: 'date' })
  const onReset = () => { setKeyword(''); setDocStatus(''); setAdjType(''); setWarehouseFilter(''); setDateFrom(''); setDateTo(''); handleReset() }
  const onDialogSubmit = (formData: any) => {
    if (editingItem) handleUpdate(editingItem.id, { ...formData, quantity: Number(formData.quantity) || 0 })
    else handleCreate({ ...formData, quantity: Number(formData.quantity) || 0, docStatus: 'draft', creator: 'admin', createdAt: new Date().toISOString() })
    setDialogOpen(false)
  }
  const doStatusAction = (item: StockAdjustment, newStatus: string) => { setConfirmAction({ type: 'status', id: item.id, status: newStatus }); setConfirmOpen(true) }
  const onConfirmAction = () => {
    if (confirmAction?.type === 'status') handleUpdate(confirmAction.id, { docStatus: confirmAction.status })
    else handleDelete(deletingId)
    setConfirmOpen(false); setConfirmAction(null)
  }

  const getConfirmMessage = () => {
    if (confirmAction?.type === 'status') {
      return confirmAction.status === 'audited'
        ? '确定要审核通过该调整单吗？审核后将根据调整数量更新对应仓库库存。'
        : '确定要反审核该调整单吗？反审后该调整单将作废，库存变动将被回退。'
    }
    return '确定要删除该调整单吗？此操作不可恢复，相关库存流水数据可能受到影响。'
  }

  return (
    <div>
      <PageHeader title="库存调整" description="管理库存盘点调整，处理盘盈盘亏业务，记录库存数量变动原因">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增调整</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="调整单号/仓库" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">仓库</label><select value={warehouseFilter} onChange={e => setWarehouseFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-32 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{WAREHOUSES.map(w => <option key={w} value={w}>{w}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">类型</label><select value={adjType} onChange={e => setAdjType(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{ADJUST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">状态</label><select value={docStatus} onChange={e => setDocStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="draft">草稿</option><option value="pending_audit">待审核</option><option value="audited">已审核</option><option value="voided">已作废</option></select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">调整日期</label><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /><span className="text-xs text-gray-400">-</span><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑调整单' : '新增调整单'} width="max-w-xl"
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">调整信息</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">调整单号</label><input {...register('adjustmentNo')} placeholder="自动生成" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">调整日期 *</label><input type="date" {...register('date', { required: true })} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">调整仓库 *</label><select {...register('warehouseName', { required: true })} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">请选择</option>{WAREHOUSES.map(w => <option key={w} value={w}>{w}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">调整类型 *</label><select {...register('type', { required: true })} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">请选择</option>{ADJUST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">调整数量 *</label><input type="number" {...register('quantity', { required: true })} placeholder="盘盈为正、盘亏为负" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">备注</label><input {...register('remark')} placeholder="调整说明" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div className="col-span-2"><label className="block text-xs font-medium text-gray-700 mb-1">调整原因 *</label><textarea {...register('reason', { required: true })} rows={2} placeholder="请描述调整原因" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none" /></div>
            </div>
          </div>
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="调整单详情" width="w-[640px]">
        {viewingItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">调整信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">调整单号</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.adjustmentNo}</p></div>
                  <div><span className="text-xs text-gray-500">状态</span><p className="text-sm mt-0.5"><StatusBadge status={viewingItem.docStatus} /></p></div>
                  <div><span className="text-xs text-gray-500">调整仓库</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.warehouseName}</p></div>
                  <div><span className="text-xs text-gray-500">调整类型</span><p className="text-sm mt-0.5 font-medium"><span className={viewingItem.type === '盘盈' ? 'text-green-600' : 'text-red-600'}>{viewingItem.type}</span></p></div>
                  <div><span className="text-xs text-gray-500">调整日期</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.date}</p></div>
                  <div><span className="text-xs text-gray-500">调整数量</span><p className="text-sm text-gray-900 mt-0.5 text-lg font-bold">{viewingItem.quantity?.toLocaleString()}</p></div>
                  <div><span className="text-xs text-gray-500">创建人</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.creator}</p></div>
                  <div><span className="text-xs text-gray-500">创建时间</span><p className="text-sm text-gray-900 mt-0.5">{formatDateTime(viewingItem.createdAt)}</p></div>
                  <div className="col-span-2"><span className="text-xs text-gray-500">调整原因</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.reason || '-'}</p></div>
                  <div className="col-span-2"><span className="text-xs text-gray-500">备注</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).remark || '-'}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>

      <ConfirmDialog open={confirmOpen} title={confirmAction ? '操作确认' : '删除确认'} message={getConfirmMessage()} danger={!confirmAction} confirmText={confirmAction ? '确定' : '删除'}
        onConfirm={onConfirmAction} onCancel={() => { setConfirmOpen(false); setConfirmAction(null) }} />
    </div>
  )
}
