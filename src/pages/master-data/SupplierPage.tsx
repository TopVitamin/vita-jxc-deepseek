import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { supplierApi } from '@/mock/api'
import type { Supplier } from '@/types'
import { formatDateTime } from '@/utils/format'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

const CATEGORIES = ['电子元器件', '五金配件', '机械设备', '化工原料', '包装材料', '模具加工', '自动化设备', '物流设备', '新材料', '仪器仪表', '电气设备']
const SETTLEMENTS = ['现结', '月结30天', '月结45天', '月结60天', '月结90天']
const PAYMENT_TERMS = ['货到付款', '预付款20%', '预付款30%', '预付款50%', '全额预付', '分期付款', '货款两清']

export default function SupplierPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters, setFilters } =
    useCrudPage<Supplier>({ api: supplierApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Supplier | null>(null)
  const [viewingItem, setViewingItem] = useState<Supplier | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [statusFilter, setStatusFilter] = useState(filters.status || '')
  const [categoryFilter, setCategoryFilter] = useState(filters.category || '')
  const [settlementFilter, setSettlementFilter] = useState(filters.settlement || '')
  const [dateFrom, setDateFrom] = useState(filters.dateFrom || '')
  const [dateTo, setDateTo] = useState(filters.dateTo || '')

  const { register, handleSubmit, reset, setValue } = useForm<any>()

  const columns: Column<Supplier>[] = [
    { key: 'code', title: '供应商编码', width: '120px' },
    { key: 'name', title: '供应商名称', width: '180px' },
    { key: 'category', title: '供应商分类', width: '100px' },
    { key: 'contact', title: '联系人', width: '80px' },
    { key: 'phone', title: '联系电话', width: '130px' },
    { key: 'settlement', title: '结算方式', width: '100px' },
    { key: 'paymentTerms', title: '付款条件', width: '110px' },
    { key: 'status', title: '状态', width: '70px', render: v => <StatusBadge status={v} /> },
    { key: 'createdAt', title: '创建时间', width: '110px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '200px',
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">详情</button>
          <button onClick={() => openEdit(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">编辑</button>
          <button onClick={() => toggleStatus(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">
            {record.status === 'enabled' ? '禁用' : '启用'}
          </button>
          <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded">删除</button>
        </div>
      ),
    },
  ]

  const openCreate = () => {
    setEditingItem(null)
    reset({ code: '', name: '', category: '', contact: '', phone: '', settlement: '', paymentTerms: '', email: '', taxId: '', address: '', bankAccount: '', bankName: '', remark: '' })
    setDialogOpen(true)
  }

  const openEdit = (item: Supplier) => {
    setEditingItem(item)
    reset(item)
    setDialogOpen(true)
  }

  const openDetail = (item: Supplier) => {
    setViewingItem(item)
    setDrawerOpen(true)
  }

  const confirmDelete = (id: string) => {
    setDeletingId(id)
    setConfirmOpen(true)
  }

  const onSearch = () => handleSearch({ keyword, status: statusFilter, category: categoryFilter, settlement: settlementFilter, dateFrom, dateTo })
  const onReset = () => { setKeyword(''); setStatusFilter(''); setCategoryFilter(''); setSettlementFilter(''); setDateFrom(''); setDateTo(''); handleReset() }

  const onDialogSubmit = (formData: any) => {
    if (editingItem) {
      handleUpdate(editingItem.id, { ...formData })
    } else {
      handleCreate({ ...formData, status: 'enabled', createdAt: new Date().toISOString() })
    }
    setDialogOpen(false)
  }

  const toggleStatus = (item: Supplier) => {
    handleUpdate(item.id, { status: item.status === 'enabled' ? 'disabled' : 'enabled' })
  }

  const onDelete = () => {
    handleDelete(deletingId)
    setConfirmOpen(false)
  }

  return (
    <div>
      <PageHeader title="供应商管理" description="管理供应商基础信息，包括编码、分类、联系人、结算条款等">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800">
          <Plus size={15} />新增供应商
        </button>
      </PageHeader>

      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 whitespace-nowrap">关键词</label>
          <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="编码/名称/联系人"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" />
        </div>
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 whitespace-nowrap">分类</label>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-32 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">全部</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 whitespace-nowrap">结算方式</label>
          <select value={settlementFilter} onChange={e => setSettlementFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">全部</option>
            {SETTLEMENTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 whitespace-nowrap">状态</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">全部</option>
            <option value="enabled">启用</option>
            <option value="disabled">禁用</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 whitespace-nowrap">创建日期</label>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          <span className="text-xs text-gray-400">-</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" />
        </div>
      </SearchPanel>

      <DataTable columns={columns} data={data} rowKey="id" loading={loading}
        pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑供应商' : '新增供应商'} width="max-w-2xl"
        footer={
          <>
            <button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button>
            <button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button>
          </>
        }>
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">基本信息</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">供应商编码</label>
                <input {...register('code')} placeholder="自动生成或手动输入" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">供应商名称 *</label>
                <input {...register('name', { required: true })} placeholder="请输入供应商名称" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">供应商分类 *</label>
                <select {...register('category', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="">请选择</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">税号</label>
                <input {...register('taxId')} placeholder="统一社会信用代码" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">联系信息</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">联系人</label>
                <input {...register('contact')} placeholder="主要联系人姓名" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">联系电话</label>
                <input {...register('phone')} placeholder="手机或座机号" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">电子邮箱</label>
                <input {...register('email')} placeholder="contact@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">联系地址</label>
                <input {...register('address')} placeholder="详细地址" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">财务信息</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">结算方式 *</label>
                <select {...register('settlement', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="">请选择</option>
                  {SETTLEMENTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">付款条件</label>
                <select {...register('paymentTerms')} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="">请选择</option>
                  {PAYMENT_TERMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">开户银行</label>
                <input {...register('bankName')} placeholder="开户行名称" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">银行账号</label>
                <input {...register('bankAccount')} placeholder="对公账号" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">备注</label>
            <textarea {...register('remark')} rows={2} placeholder="其他补充信息" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none" />
          </div>
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="供应商详情" width="w-[640px]">
        {viewingItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">基本信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">供应商编码</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.code}</p></div>
                  <div><span className="text-xs text-gray-500">供应商名称</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.name}</p></div>
                  <div><span className="text-xs text-gray-500">供应商分类</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.category}</p></div>
                  <div><span className="text-xs text-gray-500">状态</span><p className="text-sm mt-0.5"><StatusBadge status={viewingItem.status} /></p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">联系信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">联系人</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.contact || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">联系电话</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.phone || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">电子邮箱</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).email || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">联系地址</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).address || '-'}</p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">财务信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">结算方式</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.settlement || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">付款条件</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.paymentTerms || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">开户银行</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).bankName || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">银行账号</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).bankAccount || '-'}</p></div>
                  <div className="col-span-2"><span className="text-xs text-gray-500">税号</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).taxId || '-'}</p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">系统信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">创建时间</span><p className="text-sm text-gray-900 mt-0.5">{formatDateTime(viewingItem.createdAt)}</p></div>
                  <div><span className="text-xs text-gray-500">备注</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).remark || '-'}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该供应商吗？此操作不可恢复，相关采购订单数据可能受到影响。" danger confirmText="删除"
        onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}
