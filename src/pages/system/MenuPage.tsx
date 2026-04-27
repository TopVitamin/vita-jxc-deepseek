import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { menuApi } from '@/mock/api'
import type { SystemMenu } from '@/types'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

const MENU_TYPES = ['menu', 'button']
const PARENT_MENUS = ['-', '系统设置', '基础数据', '采购管理', '销售管理', '库存管理', '报表中心', '首页看板']

export default function MenuPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<SystemMenu>({ api: menuApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<SystemMenu | null>(null)
  const [viewingItem, setViewingItem] = useState<SystemMenu | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [typeFilter, setTypeFilter] = useState(filters.type || '')
  const [statusFilter, setStatusFilter] = useState(filters.status || '')

  const { register, handleSubmit, reset } = useForm<any>()

  const columns: Column<SystemMenu>[] = [
    { key: 'name', title: '菜单名称', width: '160px' },
    { key: 'code', title: '菜单编码', width: '140px' },
    { key: 'parentName', title: '上级菜单', width: '100px' },
    { key: 'route', title: '路由地址', width: '180px' },
    { key: 'type', title: '类型', width: '70px', render: v => <span className={v === 'menu' ? 'text-blue-600' : 'text-purple-600'}>{v === 'menu' ? '菜单' : '按钮'}</span> },
    { key: 'sort', title: '排序', width: '60px', align: 'center' },
    { key: 'status', title: '状态', width: '80px', render: v => <StatusBadge status={v} /> },
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

  const openCreate = () => { setEditingItem(null); reset({ name: '', code: '', parentName: '-', route: '', type: 'menu', sort: 1, icon: '', permission: '' }); setDialogOpen(true) }
  const openEdit = (item: SystemMenu) => { setEditingItem(item); reset(item); setDialogOpen(true) }
  const openDetail = (item: SystemMenu) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, type: typeFilter, status: statusFilter })
  const onReset = () => { setKeyword(''); setTypeFilter(''); setStatusFilter(''); handleReset() }
  const onDialogSubmit = (formData: any) => {
    if (editingItem) handleUpdate(editingItem.id, formData)
    else handleCreate({ ...formData, sort: Number(formData.sort) || 1, status: 'enabled' })
    setDialogOpen(false)
  }
  const toggleStatus = (item: SystemMenu) => handleUpdate(item.id, { status: item.status === 'enabled' ? 'disabled' : 'enabled' })
  const onDelete = () => { handleDelete(deletingId); setConfirmOpen(false) }

  return (
    <div>
      <PageHeader title="菜单管理" description="管理系统菜单项和按钮权限，配置导航结构和页面路由">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增菜单</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="菜单名称/编码" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">类型</label><select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{MENU_TYPES.map(t => <option key={t} value={t}>{t === 'menu' ? '菜单' : '按钮'}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">状态</label><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="enabled">启用</option><option value="disabled">禁用</option></select></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑菜单' : '新增菜单'} width="max-w-xl"
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">基本信息</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">菜单名称 *</label><input {...register('name', { required: true })} placeholder="显示名称" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">菜单编码</label><input {...register('code')} placeholder="唯一标识" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">上级菜单</label><select {...register('parentName')} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">{PARENT_MENUS.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">路由地址</label><input {...register('route')} placeholder="如：/purchase/order" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">菜单类型</label><select {...register('type')} className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="menu">菜单</option><option value="button">按钮</option></select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">排序</label><input type="number" {...register('sort')} placeholder="数字越小越靠前" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">权限配置</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">图标</label><input {...register('icon')} placeholder="图标名称" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">权限标识</label><input {...register('permission')} placeholder="如：purchase:order:create" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            </div>
          </div>
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="菜单详情" width="w-[640px]">
        {viewingItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">基本信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">菜单名称</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.name}</p></div>
                  <div><span className="text-xs text-gray-500">菜单编码</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.code || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">上级菜单</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.parentName || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">菜单类型</span><p className="text-sm mt-0.5"><span className={viewingItem.type === 'menu' ? 'text-blue-600 font-medium' : 'text-purple-600 font-medium'}>{viewingItem.type === 'menu' ? '菜单' : '按钮'}</span></p></div>
                  <div><span className="text-xs text-gray-500">路由地址</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.route || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">排序</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.sort}</p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">权限配置</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">图标</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).icon || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">权限标识</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).permission || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">状态</span><p className="text-sm mt-0.5"><StatusBadge status={viewingItem.status} /></p></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该菜单项吗？如果有子菜单将一并被移除，此操作不可恢复。" danger confirmText="删除" onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}
