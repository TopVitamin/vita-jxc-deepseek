import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { roleApi } from '@/mock/api'
import type { SystemRole } from '@/types'
import { formatDateTime } from '@/utils/format'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

export default function RolePage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<SystemRole>({ api: roleApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<SystemRole | null>(null)
  const [viewingItem, setViewingItem] = useState<SystemRole | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [statusFilter, setStatusFilter] = useState(filters.status || '')

  const { register, handleSubmit, reset } = useForm<any>()

  const columns: Column<SystemRole>[] = [
    { key: 'code', title: '角色编码', width: '140px' },
    { key: 'name', title: '角色名称' },
    { key: 'description', title: '角色说明' },
    { key: 'status', title: '状态', width: '80px', render: v => <StatusBadge status={v} /> },
    { key: 'createdAt', title: '创建时间', width: '100px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '220px',
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">详情</button>
          <button onClick={() => openEdit(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">编辑</button>
          <button onClick={() => alert('权限分配功能')} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">分配权限</button>
          <button onClick={() => toggleStatus(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">{record.status === 'enabled' ? '禁用' : '启用'}</button>
          <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 rounded">删除</button>
        </div>
      ),
    },
  ]

  const openCreate = () => { setEditingItem(null); reset({ code: '', name: '', description: '' }); setDialogOpen(true) }
  const openEdit = (item: SystemRole) => { setEditingItem(item); reset(item); setDialogOpen(true) }
  const openDetail = (item: SystemRole) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, status: statusFilter })
  const onReset = () => { setKeyword(''); setStatusFilter(''); handleReset() }
  const onDialogSubmit = (formData: any) => {
    if (editingItem) handleUpdate(editingItem.id, formData)
    else handleCreate({ ...formData, status: 'enabled', createdAt: new Date().toISOString() })
    setDialogOpen(false)
  }
  const toggleStatus = (item: SystemRole) => handleUpdate(item.id, { status: item.status === 'enabled' ? 'disabled' : 'enabled' })
  const onDelete = () => { handleDelete(deletingId); setConfirmOpen(false) }

  return (
    <div>
      <PageHeader title="角色管理" description="管理系统角色及权限分配">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增角色</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="编码/名称" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">状态</label><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="enabled">启用</option><option value="disabled">禁用</option></select></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑角色' : '新增角色'}
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="space-y-4">
          <div><label className="block text-xs font-medium text-gray-700 mb-1">角色编码 *</label><input {...register('code', { required: true })} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
          <div><label className="block text-xs font-medium text-gray-700 mb-1">角色名称 *</label><input {...register('name', { required: true })} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
          <div><label className="block text-xs font-medium text-gray-700 mb-1">角色说明</label><textarea {...register('description')} rows={3} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="角色详情">
        {viewingItem && (
          <div className="space-y-4">
            {[['角色编码', viewingItem.code], ['角色名称', viewingItem.name], ['角色说明', viewingItem.description], ['状态', <StatusBadge key="s" status={viewingItem.status} />], ['创建时间', formatDateTime(viewingItem.createdAt)]].map(([label, val]) => (<div key={label as string}><span className="text-xs text-gray-500">{label}</span><p className="text-sm text-gray-900 mt-0.5">{val}</p></div>))}
          </div>
        )}
      </DetailDrawer>

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该角色吗？此操作不可恢复。" danger confirmText="删除" onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}
