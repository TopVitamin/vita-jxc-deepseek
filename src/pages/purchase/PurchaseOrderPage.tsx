import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { purchaseOrderApi } from '@/mock/api'
import type { PurchaseOrder } from '@/types'
import { formatCurrency, formatDateTime, generateId } from '@/utils/format'
import { Plus, Trash2 } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

const ORGS = ['华南分公司', '华东分公司', '西南分公司', '华北分公司', '华中分公司', '西北分公司']

export default function PurchaseOrderPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<PurchaseOrder>({ api: purchaseOrderApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{ type: string; id: string; status: string } | null>(null)
  const [editingItem, setEditingItem] = useState<PurchaseOrder | null>(null)
  const [viewingItem, setViewingItem] = useState<PurchaseOrder | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [docStatus, setDocStatus] = useState(filters.docStatus || '')
  const [supplierFilter, setSupplierFilter] = useState(filters.supplierName || '')
  const [dateFrom, setDateFrom] = useState(filters.dateFrom || '')
  const [dateTo, setDateTo] = useState(filters.dateTo || '')

  const { register, handleSubmit, reset, control, watch } = useForm<any>({
    defaultValues: { items: [{ id: generateId(), productCode: '', productName: '', unit: '', quantity: 1, price: 0, amount: 0, remark: '' }] }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const columns: Column<PurchaseOrder>[] = [
    { key: 'orderNo', title: '订单号', width: '160px' },
    { key: 'supplierName', title: '供应商', width: '180px' },
    { key: 'org', title: '采购组织', width: '110px' },
    { key: 'orderDate', title: '采购日期', width: '110px', render: v => formatDateTime(v) },
    { key: 'expectedDate', title: '预计到货', width: '110px' },
    { key: 'totalAmount', title: '订单金额', width: '120px', render: v => formatCurrency(v), align: 'right' },
    { key: 'docStatus', title: '单据状态', width: '80px', render: v => <StatusBadge status={v} /> },
    { key: 'creator', title: '创建人', width: '80px' },
    { key: 'createdAt', title: '创建时间', width: '110px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '280px',
      render: (_, record) => (
        <div className="flex items-center gap-1 flex-wrap">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">详情</button>
          {record.docStatus === 'draft' && <button onClick={() => openEdit(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">编辑</button>}
          {record.docStatus === 'draft' && <button onClick={() => doStatusAction(record, 'pending_audit')} className="px-2 py-1 text-xs text-yellow-600 hover:bg-yellow-50 rounded">提交</button>}
          {record.docStatus === 'pending_audit' && <button onClick={() => doStatusAction(record, 'audited')} className="px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded">审核</button>}
          {record.docStatus === 'audited' && <button onClick={() => doStatusAction(record, 'voided')} className="px-2 py-1 text-xs text-orange-600 hover:bg-orange-50 rounded">反审</button>}
          {record.docStatus === 'audited' && <button onClick={() => doStatusAction(record, 'closed')} className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded">关闭</button>}
          {(record.docStatus === 'draft' || record.docStatus === 'voided') && <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded">删除</button>}
        </div>
      ),
    },
  ]

  const openCreate = () => {
    setEditingItem(null)
    reset({ orderNo: '', supplierName: '', org: '', orderDate: '', expectedDate: '', remark: '',
      items: [{ id: generateId(), productCode: '', productName: '', unit: '', quantity: 1, price: 0, amount: 0, remark: '' }] })
    setDialogOpen(true)
  }
  const openEdit = (item: PurchaseOrder) => { setEditingItem(item); reset(item); setDialogOpen(true) }
  const openDetail = (item: PurchaseOrder) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, docStatus, supplierName: supplierFilter, dateFrom, dateTo, dateField: 'orderDate' })
  const onReset = () => { setKeyword(''); setDocStatus(''); setSupplierFilter(''); setDateFrom(''); setDateTo(''); handleReset() }

  const recalcAmount = (idx: number) => { const qty = watch(`items.${idx}.quantity`) || 0; const prc = watch(`items.${idx}.price`) || 0; return qty * prc }

  const onDialogSubmit = (formData: any) => {
    const items = formData.items.map((item: any) => ({ ...item, amount: item.quantity * item.price }))
    const totalAmount = items.reduce((sum: number, i: any) => sum + i.amount, 0)
    const payload = { ...formData, items, totalAmount, docStatus: editingItem ? editingItem.docStatus : 'draft', auditStatus: editingItem ? editingItem.auditStatus : 'draft', creator: editingItem?.creator || 'admin', createdAt: editingItem ? editingItem.createdAt : new Date().toISOString() }
    if (editingItem) handleUpdate(editingItem.id, payload)
    else handleCreate(payload)
    setDialogOpen(false)
  }

  const doStatusAction = (item: PurchaseOrder, newStatus: string) => {
    setConfirmAction({ type: 'status', id: item.id, status: newStatus })
    setConfirmOpen(true)
  }

  const onConfirmAction = () => {
    if (confirmAction?.type === 'status') {
      handleUpdate(confirmAction.id, { docStatus: confirmAction.status, auditStatus: confirmAction.status === 'audited' ? 'audited' : confirmAction.status === 'pending_audit' ? 'pending' : confirmAction.status })
    } else {
      handleDelete(deletingId)
    }
    setConfirmOpen(false)
    setConfirmAction(null)
  }

  const getConfirmMessage = () => {
    if (confirmAction?.type === 'status') {
      const labels: Record<string, string> = { pending_audit: '提交审核', audited: '审核通过', voided: '反审核', closed: '关闭订单' }
      return `确定要${labels[confirmAction.status] || '变更状态'}该采购订单吗？`
    }
    return '确定要删除该采购订单吗？此操作不可恢复，相关入库和流水数据可能受到影响。'
  }

  return (
    <div>
      <PageHeader title="采购订单" description="管理采购订单，支持多商品明细行，支持审核、关闭等流程操作">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增订单</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="订单号/供应商" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">供应商</label><input value={supplierFilter} onChange={e => setSupplierFilter(e.target.value)} placeholder="供应商名称" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">状态</label><select value={docStatus} onChange={e => setDocStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="draft">草稿</option><option value="pending_audit">待审核</option><option value="audited">已审核</option><option value="closed">已关闭</option><option value="voided">已作废</option></select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">采购日期</label><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /><span className="text-xs text-gray-400">-</span><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑采购订单' : '新增采购订单'} width="max-w-4xl"
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">订单信息</h4>
            <div className="grid grid-cols-3 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">订单号</label><input {...register('orderNo')} placeholder="自动生成" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">供应商 *</label><input {...register('supplierName', { required: true })} placeholder="请输入供应商名称" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">采购组织</label><select {...register('org')} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">请选择</option>{ORGS.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">采购日期 *</label><input type="date" {...register('orderDate', { required: true })} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">预计到货日期</label><input type="date" {...register('expectedDate')} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">备注</label><input {...register('remark')} placeholder="订单备注" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">商品明细</h4>
              <button type="button" onClick={() => append({ id: generateId(), productCode: '', productName: '', unit: '', quantity: 1, price: 0, amount: 0, remark: '' })}
                className="flex items-center gap-1 px-2 py-1 text-xs text-primary-600 border border-primary-300 rounded hover:bg-primary-50"><Plus size={12} />添加行</button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead><tr className="bg-gray-50 border-b"><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">商品编码</th><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">商品名称</th><th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-16">单位</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500 w-24">数量</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500 w-24">单价</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500 w-28">金额</th><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">备注</th><th className="px-3 py-2 text-center text-xs font-medium text-gray-500 w-12"></th></tr></thead>
                <tbody>
                  {fields.map((field, idx) => (
                    <tr key={field.id} className="border-b border-gray-100">
                      <td className="px-3 py-2"><input {...register(`items.${idx}.productCode`)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2"><input {...register(`items.${idx}.productName`)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2"><input {...register(`items.${idx}.unit`)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2"><input type="number" {...register(`items.${idx}.quantity`)} className="w-full px-2 py-1.5 border rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2"><input type="number" step="0.01" {...register(`items.${idx}.price`)} className="w-full px-2 py-1.5 border rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary-500" /></td>
                      <td className="px-3 py-2 text-sm text-right text-gray-700 font-medium">{formatCurrency(recalcAmount(idx))}</td>
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

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="采购订单详情" width="w-[680px]">
        {viewingItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">订单信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">订单号</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.orderNo}</p></div>
                  <div><span className="text-xs text-gray-500">供应商</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.supplierName}</p></div>
                  <div><span className="text-xs text-gray-500">采购组织</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.org || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">单据状态</span><p className="text-sm mt-0.5"><StatusBadge status={viewingItem.docStatus} /></p></div>
                  <div><span className="text-xs text-gray-500">采购日期</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.orderDate}</p></div>
                  <div><span className="text-xs text-gray-500">预计到货</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.expectedDate || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">创建人</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.creator}</p></div>
                  <div><span className="text-xs text-gray-500">创建时间</span><p className="text-sm text-gray-900 mt-0.5">{formatDateTime(viewingItem.createdAt)}</p></div>
                  <div className="col-span-2"><span className="text-xs text-gray-500">备注</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).remark || '-'}</p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">商品明细</h4>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead><tr className="bg-gray-50 border-b"><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">商品编码</th><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">商品名称</th><th className="px-3 py-2 text-center text-xs font-medium text-gray-500">单位</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500">数量</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500">单价</th><th className="px-3 py-2 text-right text-xs font-medium text-gray-500">金额</th><th className="px-3 py-2 text-left text-xs font-medium text-gray-500">备注</th></tr></thead>
                  <tbody>
                    {viewingItem.items.map(item => (
                      <tr key={item.id} className="border-b border-gray-50">
                        <td className="px-3 py-2 text-sm">{item.productCode}</td><td className="px-3 py-2 text-sm">{item.productName}</td><td className="px-3 py-2 text-sm text-center">{item.unit}</td><td className="px-3 py-2 text-sm text-right">{item.quantity.toLocaleString()}</td><td className="px-3 py-2 text-sm text-right">{formatCurrency(item.price)}</td><td className="px-3 py-2 text-sm text-right font-medium">{formatCurrency(item.amount)}</td><td className="px-3 py-2 text-xs text-gray-500">{item.remark || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot><tr className="bg-gray-50"><td colSpan={5} className="px-3 py-2 text-sm font-medium text-right">合计</td><td className="px-3 py-2 text-sm font-semibold text-right">{formatCurrency(viewingItem.totalAmount)}</td><td></td></tr></tfoot>
                </table>
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
