import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { stockTransferApi } from '@/mock/api'
import type { StockTransfer } from '@/types'
import { formatDateTime } from '@/utils/format'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

export default function StockTransferPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<StockTransfer>({ api: stockTransferApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<StockTransfer | null>(null)
  const [viewingItem, setViewingItem] = useState<StockTransfer | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [docStatus, setDocStatus] = useState(filters.docStatus || '')

  const { register, handleSubmit, reset } = useForm<any>()

  const columns: Column<StockTransfer>[] = [
    { key: 'transferNo', title: '调拨单号', width: '150px' },
    { key: 'fromWarehouse', title: '调出仓库' },
    { key: 'toWarehouse', title: '调入仓库' },
    { key: 'transferDate', title: '调拨日期', width: '100px', render: v => formatDateTime(v) },
    { key: 'quantity', title: '数量', width: '80px', align: 'right' },
    { key: 'docStatus', title: '状态', width: '80px', render: v => <StatusBadge status={v} /> },
    { key: 'creator', title: '创建人', width: '80px' },
    { key: 'createdAt', title: '创建时间', width: '100px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '200px',
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">详情</button>
          <button onClick={() => openEdit(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">编辑</button>
          {record.docStatus === 'pending_audit' && <button onClick={() => handleUpdate(record.id, { docStatus: 'audited' })} className="px-2 py-1 text-xs text-green-600 rounded">审核</button>}
          <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 rounded">删除</button>
        </div>
      ),
    },
  ]

  const openCreate = () => { setEditingItem(null); reset({}); setDialogOpen(true) }
  const openEdit = (item: StockTransfer) => { setEditingItem(item); reset(item); setDialogOpen(true) }
  const openDetail = (item: StockTransfer) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, docStatus })
  const onReset = () => { setKeyword(''); setDocStatus(''); handleReset() }
  const onDialogSubmit = (formData: any) => {
    if (editingItem) handleUpdate(editingItem.id, formData)
    else handleCreate({ ...formData, docStatus: 'draft', creator: 'admin', createdAt: new Date().toISOString() })
    setDialogOpen(false)
  }
  const onDelete = () => { handleDelete(deletingId); setConfirmOpen(false) }

  const formFields = [['transferNo', '调拨单号'], ['fromWarehouse', '调出仓库*'], ['toWarehouse', '调入仓库*'], ['transferDate', '调拨日期'], ['quantity', '调拨数量']]

  return (
    <div>
      <PageHeader title="库存调拨" description="管理仓库间库存调拨">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增调拨</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="调拨单号" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">状态</label><select value={docStatus} onChange={e => setDocStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="draft">草稿</option><option value="pending_audit">待审核</option><option value="audited">已审核</option></select></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑调拨单' : '新增调拨单'}
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="grid grid-cols-2 gap-4">
          {formFields.map(([key, label]) => (
            <div key={key}><label className="block text-xs font-medium text-gray-700 mb-1">{label}</label><input {...register(key, { required: label.includes('*') })} type={key === 'quantity' ? 'number' : key === 'transferDate' ? 'date' : 'text'} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
          ))}
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="调拨单详情">
        {viewingItem && (
          <div className="space-y-4">
            {[['调拨单号', viewingItem.transferNo], ['调出仓库', viewingItem.fromWarehouse], ['调入仓库', viewingItem.toWarehouse], ['调拨日期', viewingItem.transferDate], ['调拨数量', viewingItem.quantity], ['状态', <StatusBadge key="s" status={viewingItem.docStatus} />], ['创建人', viewingItem.creator], ['创建时间', formatDateTime(viewingItem.createdAt)]].map(([label, val]) => (<div key={label as string}><span className="text-xs text-gray-500">{label}</span><p className="text-sm text-gray-900 mt-0.5">{val}</p></div>))}
          </div>
        )}
      </DetailDrawer>

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该调拨单吗？" danger confirmText="删除" onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}
