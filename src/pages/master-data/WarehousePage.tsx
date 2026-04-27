import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { warehouseApi } from '@/mock/api'
import type { Warehouse } from '@/types'
import { formatDateTime } from '@/utils/format'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

const WH_TYPES = ['主仓', '分仓', '前置仓']
const ORGS = ['华南分公司', '华东分公司', '西南分公司', '华北分公司', '华中分公司', '西北分公司']

export default function WarehousePage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<Warehouse>({ api: warehouseApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Warehouse | null>(null)
  const [viewingItem, setViewingItem] = useState<Warehouse | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [statusFilter, setStatusFilter] = useState(filters.status || '')
  const [typeFilter, setTypeFilter] = useState(filters.type || '')
  const [orgFilter, setOrgFilter] = useState(filters.org || '')
  const [dateFrom, setDateFrom] = useState(filters.dateFrom || '')
  const [dateTo, setDateTo] = useState(filters.dateTo || '')

  const { register, handleSubmit, reset } = useForm<any>()

  const columns: Column<Warehouse>[] = [
    { key: 'code', title: '仓库编码', width: '120px' },
    { key: 'name', title: '仓库名称', width: '160px' },
    { key: 'type', title: '仓库类型', width: '80px' },
    { key: 'org', title: '所属组织', width: '120px' },
    { key: 'address', title: '仓库地址', width: '200px' },
    { key: 'manager', title: '负责人', width: '80px' },
    { key: 'phone', title: '联系电话', width: '130px' },
    { key: 'status', title: '状态', width: '70px', render: v => <StatusBadge status={v} /> },
    { key: 'createdAt', title: '创建时间', width: '110px', render: v => formatDateTime(v) },
    {
      key: 'actions', title: '操作', width: '200px',
      render: (_, record) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openDetail(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">详情</button>
          <button onClick={() => openEdit(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">编辑</button>
          <button onClick={() => toggleStatus(record)} className="px-2 py-1 text-xs text-gray-600 hover:text-primary-600 rounded">{record.status === 'enabled' ? '禁用' : '启用'}</button>
          <button onClick={() => confirmDelete(record.id)} className="px-2 py-1 text-xs text-red-500 rounded">删除</button>
        </div>
      ),
    },
  ]

  const openCreate = () => { setEditingItem(null); reset({ code: '', name: '', type: '', org: '', address: '', manager: '', phone: '', email: '', area: 0, capacity: '', remark: '' }); setDialogOpen(true) }
  const openEdit = (item: Warehouse) => { setEditingItem(item); reset(item); setDialogOpen(true) }
  const openDetail = (item: Warehouse) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, status: statusFilter, type: typeFilter, org: orgFilter, dateFrom, dateTo })
  const onReset = () => { setKeyword(''); setStatusFilter(''); setTypeFilter(''); setOrgFilter(''); setDateFrom(''); setDateTo(''); handleReset() }
  const onDialogSubmit = (formData: any) => {
    if (editingItem) handleUpdate(editingItem.id, { ...formData, area: Number(formData.area) || 0 })
    else handleCreate({ ...formData, area: Number(formData.area) || 0, status: 'enabled', createdAt: new Date().toISOString() })
    setDialogOpen(false)
  }
  const toggleStatus = (item: Warehouse) => handleUpdate(item.id, { status: item.status === 'enabled' ? 'disabled' : 'enabled' })
  const onDelete = () => { handleDelete(deletingId); setConfirmOpen(false) }

  return (
    <div>
      <PageHeader title="仓库管理" description="管理仓库基础信息，包括类型、所属组织、地址、负责人等">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增仓库</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="编码/名称/负责人" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">仓库类型</label><select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{WH_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">所属组织</label><select value={orgFilter} onChange={e => setOrgFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{ORGS.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">状态</label><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="enabled">启用</option><option value="disabled">禁用</option></select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">创建日期</label><input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /><span className="text-xs text-gray-400">-</span><input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-36 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑仓库' : '新增仓库'} width="max-w-2xl"
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">基本信息</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">仓库编码</label><input {...register('code')} placeholder="自动生成或手动输入" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">仓库名称 *</label><input {...register('name', { required: true })} placeholder="请输入仓库名称" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">仓库类型 *</label><select {...register('type', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">请选择</option>{WH_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">所属组织</label><select {...register('org')} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">请选择</option>{ORGS.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">位置与管理</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><label className="block text-xs font-medium text-gray-700 mb-1">仓库地址</label><input {...register('address')} placeholder="详细地址" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">负责人</label><input {...register('manager')} placeholder="仓管负责人" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">联系电话</label><input {...register('phone')} placeholder="手机或座机号" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">电子邮箱</label><input {...register('email')} placeholder="manager@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">仓储参数</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">仓储面积 (㎡)</label><input type="number" {...register('area')} placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">库容说明</label><input {...register('capacity')} placeholder="如：5000个托盘位" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            </div>
          </div>
          <div><label className="block text-xs font-medium text-gray-700 mb-1">备注</label><textarea {...register('remark')} rows={2} placeholder="其他补充信息" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none" /></div>
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="仓库详情" width="w-[640px]">
        {viewingItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">基本信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">仓库编码</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.code}</p></div>
                  <div><span className="text-xs text-gray-500">仓库名称</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.name}</p></div>
                  <div><span className="text-xs text-gray-500">仓库类型</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.type}</p></div>
                  <div><span className="text-xs text-gray-500">所属组织</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.org || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">状态</span><p className="text-sm mt-0.5"><StatusBadge status={viewingItem.status} /></p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">位置与管理</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2"><span className="text-xs text-gray-500">仓库地址</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.address || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">负责人</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.manager || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">联系电话</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.phone || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">电子邮箱</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).email || '-'}</p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">仓储参数</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">仓储面积</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).area ? `${(viewingItem as any).area.toLocaleString()} ㎡` : '-'}</p></div>
                  <div><span className="text-xs text-gray-500">库容说明</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).capacity || '-'}</p></div>
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

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该仓库吗？此操作不可恢复，相关的库存数据、出入库记录可能受到影响。" danger confirmText="删除" onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}
