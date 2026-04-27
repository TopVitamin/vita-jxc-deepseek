import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { customerReturnApi } from '@/mock/api'
import type { CustomerReturn } from '@/types'
import { formatCurrency, formatDateTime } from '@/utils/format'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

export default function CustomerReturnPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<CustomerReturn>({ api: customerReturnApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [viewingItem, setViewingItem] = useState<CustomerReturn | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [docStatus, setDocStatus] = useState(filters.docStatus || '')

  const { register, handleSubmit, reset } = useForm<any>()

  const columns: Column<CustomerReturn>[] = [
    { key: 'returnNo', title: '退货单号', width: '150px' },
    { key: 'customerName', title: '客户' },
    { key: 'warehouseName', title: '退货仓库' },
    { key: 'returnDate', title: '退货日期', width: '100px', render: v => formatDateTime(v) },
    { key: 'quantity', title: '数量', width: '80px', align: 'right' },
    { key: 'totalAmount', title: '金额', width: '110px', render: v => formatCurrency(v), align: 'right' },
    { key: 'docStatus', title: '状态', width: '80px', render: v => <StatusBadge status={v} /> },
    { key: 'createdAt', title: '创建时间', width: '100px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '150px',
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">详情</button>
          {record.docStatus === 'pending' && <button onClick={() => handleUpdate(record.id, { docStatus: 'completed' })} className="px-2 py-1 text-xs text-green-600 rounded">审核</button>}
          <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 rounded">删除</button>
        </div>
      ),
    },
  ]

  const openCreate = () => { reset({}); setDialogOpen(true) }
  const openDetail = (item: CustomerReturn) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, docStatus })
  const onReset = () => { setKeyword(''); setDocStatus(''); handleReset() }
  const onDialogSubmit = (formData: any) => { handleCreate({ ...formData, docStatus: 'pending', createdAt: new Date().toISOString() }); setDialogOpen(false) }
  const onDelete = () => { handleDelete(deletingId); setConfirmOpen(false) }

  const formFields = [['returnNo', '退货单号'], ['customerName', '客户*'], ['warehouseName', '退货仓库*'], ['returnDate', '退货日期'], ['quantity', '退货数量'], ['totalAmount', '退货金额']]

  return (
    <div>
      <PageHeader title="销售退货" description="管理客户退货单">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增退货</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="退货单号/客户" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">状态</label><select value={docStatus} onChange={e => setDocStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="pending">待处理</option><option value="completed">已完成</option></select></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="新增退货单"
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="grid grid-cols-2 gap-4">
          {formFields.map(([key, label]) => (
            <div key={key}><label className="block text-xs font-medium text-gray-700 mb-1">{label}</label><input {...register(key, { required: label.includes('*') })} type={['quantity', 'totalAmount'].includes(key) ? 'number' : key === 'returnDate' ? 'date' : 'text'} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
          ))}
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="退货单详情">
        {viewingItem && (
          <div className="space-y-4">
            {[['退货单号', viewingItem.returnNo], ['客户', viewingItem.customerName], ['退货仓库', viewingItem.warehouseName], ['退货日期', viewingItem.returnDate], ['退货数量', viewingItem.quantity], ['退货金额', formatCurrency(viewingItem.totalAmount)], ['状态', <StatusBadge key="s" status={viewingItem.docStatus} />], ['创建时间', formatDateTime(viewingItem.createdAt)]].map(([label, val]) => (<div key={label as string}><span className="text-xs text-gray-500">{label}</span><p className="text-sm text-gray-900 mt-0.5">{val}</p></div>))}
          </div>
        )}
      </DetailDrawer>

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该退货单吗？" danger confirmText="删除" onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}
