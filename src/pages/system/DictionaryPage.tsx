import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { dictionaryApi } from '@/mock/api'
import type { SystemDictionary } from '@/types'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

const DICT_CODES = ['WORKSHOP_TYPE', 'ACCOUNT_TYPE', 'PAYMENT_TERMS', 'SETTLEMENT_TYPE', 'STORE_TYPE', 'WAREHOUSE_TYPE']

export default function DictionaryPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<SystemDictionary>({ api: dictionaryApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<SystemDictionary | null>(null)
  const [viewingItem, setViewingItem] = useState<SystemDictionary | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [dictCodeFilter, setDictCodeFilter] = useState(filters.dictCode || '')
  const [statusFilter, setStatusFilter] = useState(filters.status || '')

  const { register, handleSubmit, reset } = useForm<any>()

  const columns: Column<SystemDictionary>[] = [
    { key: 'dictCode', title: '字典编码', width: '140px' },
    { key: 'dictName', title: '字典名称', width: '140px' },
    { key: 'itemCode', title: '字典项编码', width: '140px' },
    { key: 'itemName', title: '字典项名称', width: '160px' },
    { key: 'sort', title: '排序', width: '60px', align: 'center' },
    { key: 'status', title: '状态', width: '80px', render: v => <StatusBadge status={v} /> },
    { key: 'remark', title: '备注', width: '140px' },
    {
      key: 'actions', title: '操作', width: '200px',
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">详情</button>
          <button onClick={() => openEdit(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">编辑</button>
          <button onClick={() => toggleStatus(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded">{record.status === 'enabled' ? '禁用' : '启用'}</button>
          <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded">删除</button>
        </div>
      ),
    },
  ]

  const openCreate = () => { setEditingItem(null); reset({ dictCode: '', dictName: '', itemCode: '', itemName: '', sort: 0, remark: '' }); setDialogOpen(true) }
  const openEdit = (item: SystemDictionary) => { setEditingItem(item); reset(item); setDialogOpen(true) }
  const openDetail = (item: SystemDictionary) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, dictCode: dictCodeFilter, status: statusFilter })
  const onReset = () => { setKeyword(''); setDictCodeFilter(''); setStatusFilter(''); handleReset() }
  const onDialogSubmit = (formData: any) => {
    if (editingItem) handleUpdate(editingItem.id, { ...formData, sort: Number(formData.sort) || 0 })
    else handleCreate({ ...formData, sort: Number(formData.sort) || 0, status: 'enabled' })
    setDialogOpen(false)
  }
  const toggleStatus = (item: SystemDictionary) => handleUpdate(item.id, { status: item.status === 'enabled' ? 'disabled' : 'enabled' })
  const onDelete = () => { handleDelete(deletingId); setConfirmOpen(false) }

  return (
    <div>
      <PageHeader title="数据字典" description="管理系统数据字典项，定义下拉选项、枚举值等系统基础配置数据">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增字典</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="字典编码/名称/项名" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">字典编码</label><select value={dictCodeFilter} onChange={e => setDictCodeFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{DICT_CODES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">状态</label><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="enabled">启用</option><option value="disabled">禁用</option></select></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑字典项' : '新增字典项'} width="max-w-xl"
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">字典分组</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">字典编码 *</label><input {...register('dictCode', { required: true })} placeholder="如：PAYMENT_TERMS" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">字典名称 *</label><input {...register('dictName', { required: true })} placeholder="如：付款条件" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">字典项明细</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">字典项编码</label><input {...register('itemCode')} placeholder="如：CASH" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">字典项名称 *</label><input {...register('itemName', { required: true })} placeholder="如：现结" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">排序</label><input type="number" {...register('sort')} placeholder="0" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">备注</label><input {...register('remark')} placeholder="补充说明" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            </div>
          </div>
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="字典项详情" width="w-[640px]">
        {viewingItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">字典分组</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">字典编码</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.dictCode}</p></div>
                  <div><span className="text-xs text-gray-500">字典名称</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.dictName}</p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">字典项明细</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">字典项编码</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.itemCode || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">字典项名称</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.itemName}</p></div>
                  <div><span className="text-xs text-gray-500">排序</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.sort}</p></div>
                  <div><span className="text-xs text-gray-500">状态</span><p className="text-sm mt-0.5"><StatusBadge status={viewingItem.status} /></p></div>
                  <div className="col-span-2"><span className="text-xs text-gray-500">备注</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.remark || '-'}</p></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该字典项吗？此操作不可恢复，可能会影响引用该字典项的业务数据。" danger confirmText="删除" onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}
