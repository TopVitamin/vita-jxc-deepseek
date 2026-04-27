import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { salesOrderApi } from '@/mock/api'
import type { SalesOrder } from '@/types'
import { formatCurrency, formatDateTime, generateId } from '@/utils/format'
import { Plus, Trash2 } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

export default function SalesOrderPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<SalesOrder>({ api: salesOrderApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<SalesOrder | null>(null)
  const [viewingItem, setViewingItem] = useState<SalesOrder | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [docStatus, setDocStatus] = useState(filters.docStatus || '')

  const { register, handleSubmit, reset, control, watch } = useForm<any>({
    defaultValues: { items: [{ id: generateId(), productCode: '', productName: '', unit: '', quantity: 1, price: 0, amount: 0, remark: '' }] }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const columns: Column<SalesOrder>[] = [
    { key: 'orderNo', title: '订单号', width: '150px' },
    { key: 'customerName', title: '客户' },
    { key: 'org', title: '销售组织', width: '100px' },
    { key: 'orderDate', title: '销售日期', width: '100px', render: v => formatDateTime(v) },
    { key: 'expectedDate', title: '预计发货', width: '100px' },
    { key: 'totalAmount', title: '订单金额', width: '110px', render: v => formatCurrency(v), align: 'right' },
    { key: 'docStatus', title: '状态', width: '80px', render: v => <StatusBadge status={v} /> },
    { key: 'creator', title: '创建人', width: '80px' },
    { key: 'createdAt', title: '创建时间', width: '100px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '260px',
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">详情</button>
          <button onClick={() => openEdit(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">编辑</button>
          <button onClick={() => changeStatus(record, 'audited')} className="px-2 py-1 text-xs text-green-600 rounded">审核</button>
          <button onClick={() => changeStatus(record, 'voided')} className="px-2 py-1 text-xs text-orange-600 rounded">反审</button>
          <button onClick={() => changeStatus(record, 'closed')} className="px-2 py-1 text-xs text-blue-600 rounded">关闭</button>
          <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 rounded">删除</button>
        </div>
      ),
    },
  ]

  const openCreate = () => { setEditingItem(null); reset({ items: [{ id: generateId(), productCode: '', productName: '', unit: '', quantity: 1, price: 0, amount: 0, remark: '' }] }); setDialogOpen(true) }
  const openEdit = (item: SalesOrder) => { setEditingItem(item); reset(item); setDialogOpen(true) }
  const openDetail = (item: SalesOrder) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, docStatus })
  const onReset = () => { setKeyword(''); setDocStatus(''); handleReset() }

  const recalcAmount = (idx: number) => (watch(`items.${idx}.quantity`) || 0) * (watch(`items.${idx}.price`) || 0)

  const onDialogSubmit = (formData: any) => {
    const items = formData.items.map((item: any) => ({ ...item, amount: item.quantity * item.price }))
    const totalAmount = items.reduce((sum: number, i: any) => sum + i.amount, 0)
    const payload = { ...formData, items, totalAmount, docStatus: editingItem ? editingItem.docStatus : 'draft', auditStatus: editingItem ? editingItem.auditStatus : 'draft', creator: 'admin', createdAt: editingItem ? editingItem.createdAt : new Date().toISOString() }
    if (editingItem) handleUpdate(editingItem.id, payload); else handleCreate(payload)
    setDialogOpen(false)
  }

  const changeStatus = (item: SalesOrder, newStatus: string) => handleUpdate(item.id, { docStatus: newStatus, auditStatus: newStatus === 'audited' ? 'audited' : item.auditStatus })
  const onDelete = () => { handleDelete(deletingId); setConfirmOpen(false) }

  return (
    <div>
      <PageHeader title="销售订单" description="管理销售订单，支持多商品明细">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增订单</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="订单号/客户" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">状态</label><select value={docStatus} onChange={e => setDocStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="draft">草稿</option><option value="pending_audit">待审核</option><option value="audited">已审核</option><option value="closed">已关闭</option></select></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑销售订单' : '新增销售订单'} width="max-w-3xl"
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-xs font-medium text-gray-700 mb-1">订单号</label><input {...register('orderNo')} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">客户 *</label><input {...register('customerName', { required: true })} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">销售组织</label><input {...register('org')} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">销售日期</label><input type="date" {...register('orderDate')} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            <div><label className="block text-xs font-medium text-gray-700 mb-1">预计发货</label><input type="date" {...register('expectedDate')} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-700">商品明细</h4>
              <button type="button" onClick={() => append({ id: generateId(), productCode: '', productName: '', unit: '', quantity: 1, price: 0, amount: 0, remark: '' })}
                className="flex items-center gap-1 px-2 py-1 text-xs text-primary-600 border border-primary-300 rounded hover:bg-primary-50"><Plus size={12} />添加行</button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead><tr className="bg-gray-50 border-b"><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">商品编码</th><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">商品名称</th><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">单位</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500">数量</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500">单价</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500">金额</th><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">备注</th><th className="px-3 py-2 text-xs font-medium text-gray-500"></th></tr></thead>
                <tbody>
                  {fields.map((field, idx) => (
                    <tr key={field.id} className="border-b border-gray-100">
                      <td className="px-3 py-2"><input {...register(`items.${idx}.productCode`)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2"><input {...register(`items.${idx}.productName`)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2"><input {...register(`items.${idx}.unit`)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2"><input type="number" {...register(`items.${idx}.quantity`)} className="w-full px-2 py-1.5 border rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2"><input type="number" step="0.01" {...register(`items.${idx}.price`)} className="w-full px-2 py-1.5 border rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2 text-sm text-right text-gray-700">{formatCurrency(recalcAmount(idx))}</td>
                      <td className="px-3 py-2"><input {...register(`items.${idx}.remark`)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2 text-center"><button type="button" onClick={() => remove(idx)} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="销售订单详情" width="w-[640px]">
        {viewingItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[['订单号', viewingItem.orderNo], ['客户', viewingItem.customerName], ['销售组织', viewingItem.org], ['销售日期', viewingItem.orderDate], ['预计发货', viewingItem.expectedDate], ['状态', <StatusBadge key="s" status={viewingItem.docStatus} />], ['创建人', viewingItem.creator], ['创建时间', formatDateTime(viewingItem.createdAt)]].map(([label, val]) => (
                <div key={label as string}><span className="text-xs text-gray-500">{label}</span><p className="text-sm text-gray-900 mt-0.5">{val}</p></div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">商品明细</h4>
              <table className="w-full border rounded-md overflow-hidden">
                <thead><tr className="bg-gray-50 border-b"><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">商品编码</th><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">商品名称</th><th className="px-3 py-2 text-xs font-medium text-gray-500">单位</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500">数量</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500">单价</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500">金额</th></tr></thead>
                <tbody>{viewingItem.items.map(item => (<tr key={item.id} className="border-b border-gray-50"><td className="px-3 py-2 text-sm">{item.productCode}</td><td className="px-3 py-2 text-sm">{item.productName}</td><td className="px-3 py-2 text-sm text-center">{item.unit}</td><td className="px-3 py-2 text-sm text-right">{item.quantity}</td><td className="px-3 py-2 text-sm text-right">{formatCurrency(item.price)}</td><td className="px-3 py-2 text-sm text-right">{formatCurrency(item.amount)}</td></tr>))}</tbody>
                <tfoot><tr className="bg-gray-50"><td colSpan={5} className="px-3 py-2 text-sm font-medium text-right">合计</td><td className="px-3 py-2 text-sm font-semibold text-right">{formatCurrency(viewingItem.totalAmount)}</td></tr></tfoot>
              </table>
            </div>
          </div>
        )}
      </DetailDrawer>

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该销售订单吗？" danger confirmText="删除" onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}
