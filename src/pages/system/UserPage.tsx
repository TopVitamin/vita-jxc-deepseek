import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { userApi } from '@/mock/api'
import type { SystemUser } from '@/types'
import { formatDateTime } from '@/utils/format'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

export default function UserPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<SystemUser>({ api: userApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pwdConfirmOpen, setPwdConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<SystemUser | null>(null)
  const [viewingItem, setViewingItem] = useState<SystemUser | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [statusFilter, setStatusFilter] = useState(filters.status || '')

  const { register, handleSubmit, reset } = useForm<any>()

  const columns: Column<SystemUser>[] = [
    { key: 'account', title: '用户账号' },
    { key: 'name', title: '用户姓名' },
    { key: 'phone', title: '手机号', width: '130px' },
    { key: 'role', title: '所属角色' },
    { key: 'status', title: '状态', width: '80px', render: v => <StatusBadge status={v} /> },
    { key: 'lastLoginAt', title: '最近登录', width: '140px', render: v => formatDateTime(v) },
    { key: 'createdAt', title: '创建时间', width: '100px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '220px',
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">详情</button>
          <button onClick={() => openEdit(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">编辑</button>
          <button onClick={() => { setEditingItem(record); setPwdConfirmOpen(true) }} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">重置密码</button>
          <button onClick={() => toggleStatus(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">{record.status === 'enabled' ? '禁用' : '启用'}</button>
          <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 rounded">删除</button>
        </div>
      ),
    },
  ]

  const openCreate = () => { setEditingItem(null); reset({}); setDialogOpen(true) }
  const openEdit = (item: SystemUser) => { setEditingItem(item); reset(item); setDialogOpen(true) }
  const openDetail = (item: SystemUser) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, status: statusFilter })
  const onReset = () => { setKeyword(''); setStatusFilter(''); handleReset() }
  const onDialogSubmit = (formData: any) => {
    if (editingItem) handleUpdate(editingItem.id, formData)
    else handleCreate({ ...formData, status: 'enabled', lastLoginAt: '', createdAt: new Date().toISOString() })
    setDialogOpen(false)
  }
  const toggleStatus = (item: SystemUser) => handleUpdate(item.id, { status: item.status === 'enabled' ? 'disabled' : 'enabled' })
  const onDelete = () => { handleDelete(deletingId); setConfirmOpen(false) }

  const formFields = ['account', 'name', 'phone', 'role']
  const formLabels: Record<string, string> = { account: '用户账号*', name: '用户姓名*', phone: '手机号', role: '所属角色' }

  return (
    <div>
      <PageHeader title="用户管理" description="管理系统用户账号">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增用户</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="账号/姓名/手机号" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500">状态</label><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="enabled">启用</option><option value="disabled">禁用</option></select></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑用户' : '新增用户'}
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="grid grid-cols-2 gap-4">
          {formFields.map(key => (
            <div key={key}><label className="block text-xs font-medium text-gray-700 mb-1">{formLabels[key]}</label><input {...register(key, { required: formLabels[key].includes('*') })} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
          ))}
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="用户详情">
        {viewingItem && (
          <div className="space-y-4">
            {[['用户账号', viewingItem.account], ['用户姓名', viewingItem.name], ['手机号', viewingItem.phone], ['所属角色', viewingItem.role], ['状态', <StatusBadge key="s" status={viewingItem.status} />], ['最近登录', formatDateTime(viewingItem.lastLoginAt)], ['创建时间', formatDateTime(viewingItem.createdAt)]].map(([label, val]) => (<div key={label as string}><span className="text-xs text-gray-500">{label}</span><p className="text-sm text-gray-900 mt-0.5">{val}</p></div>))}
          </div>
        )}
      </DetailDrawer>

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该用户吗？此操作不可恢复。" danger confirmText="删除" onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />

      <ConfirmDialog open={pwdConfirmOpen} title="重置密码" message={`确定要重置用户「${editingItem?.name}」的密码为123456吗？`} confirmText="确定重置"
        onConfirm={() => { setPwdConfirmOpen(false); alert('密码已重置为123456') }} onCancel={() => setPwdConfirmOpen(false)} />
    </div>
  )
}
