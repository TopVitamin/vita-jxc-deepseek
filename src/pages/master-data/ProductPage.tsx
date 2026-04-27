import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCrudPage } from '@/utils/useCrudPage'
import { productApi } from '@/mock/api'
import type { Product } from '@/types'
import { formatCurrency, formatDateTime } from '@/utils/format'
import { Plus } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchPanel from '@/components/common/SearchPanel'
import DataTable, { type Column } from '@/components/common/DataTable'
import StatusBadge from '@/components/common/StatusBadge'
import FormDialog from '@/components/common/FormDialog'
import DetailDrawer from '@/components/common/DetailDrawer'
import ConfirmDialog from '@/components/common/ConfirmDialog'

const CATEGORIES = ['电子元器件', '五金配件', '化工原料', '机械设备', '包装材料', '自动化设备']
const BRANDS = ['华强', '鑫达', '瑞丰', '天工', '博远', '维科', '金利来', '欧亚']
const UNITS = ['个', '桶', '根', '台', '包', '箱', '卷', '套', '组']

export default function ProductPage() {
  const { data, total, loading, page, pageSize, setPage, handleSearch, handleReset, handleCreate, handleUpdate, handleDelete, filters } =
    useCrudPage<Product>({ api: productApi })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Product | null>(null)
  const [viewingItem, setViewingItem] = useState<Product | null>(null)
  const [deletingId, setDeletingId] = useState('')
  const [keyword, setKeyword] = useState(filters.keyword || '')
  const [statusFilter, setStatusFilter] = useState(filters.status || '')
  const [categoryFilter, setCategoryFilter] = useState(filters.category || '')
  const [brandFilter, setBrandFilter] = useState(filters.brand || '')
  const [minPrice, setMinPrice] = useState(filters.minPrice || '')
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || '')

  const { register, handleSubmit, reset } = useForm<any>()

  const columns: Column<Product>[] = [
    { key: 'code', title: '商品编码', width: '120px' },
    { key: 'name', title: '商品名称', width: '200px' },
    { key: 'barcode', title: '条码', width: '140px' },
    { key: 'category', title: '分类', width: '100px' },
    { key: 'brand', title: '品牌', width: '80px' },
    { key: 'unit', title: '单位', width: '60px' },
    { key: 'purchasePrice', title: '采购价', width: '90px', render: v => formatCurrency(v) },
    { key: 'salePrice', title: '销售价', width: '90px', render: v => formatCurrency(v) },
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

  const openCreate = () => { setEditingItem(null); reset({ code: '', name: '', barcode: '', category: '', brand: '', unit: '', purchasePrice: 0, salePrice: 0, spec: '', model: '', minStock: 0, maxStock: 0, remark: '' }); setDialogOpen(true) }
  const openEdit = (item: Product) => { setEditingItem(item); reset(item); setDialogOpen(true) }
  const openDetail = (item: Product) => { setViewingItem(item); setDrawerOpen(true) }
  const confirmDelete = (id: string) => { setDeletingId(id); setConfirmOpen(true) }
  const onSearch = () => handleSearch({ keyword, status: statusFilter, category: categoryFilter, brand: brandFilter, minPrice, maxPrice })
  const onReset = () => { setKeyword(''); setStatusFilter(''); setCategoryFilter(''); setBrandFilter(''); setMinPrice(''); setMaxPrice(''); handleReset() }
  const onDialogSubmit = (formData: any) => {
    const submitData = { ...formData, purchasePrice: Number(formData.purchasePrice) || 0, salePrice: Number(formData.salePrice) || 0, minStock: Number(formData.minStock) || 0, maxStock: Number(formData.maxStock) || 0 }
    if (editingItem) handleUpdate(editingItem.id, submitData)
    else handleCreate({ ...submitData, status: 'enabled', createdAt: new Date().toISOString() })
    setDialogOpen(false)
  }
  const toggleStatus = (item: Product) => handleUpdate(item.id, { status: item.status === 'enabled' ? 'disabled' : 'enabled' })
  const onDelete = () => { handleDelete(deletingId); setConfirmOpen(false) }

  return (
    <div>
      <PageHeader title="商品管理" description="管理商品基础信息，包括分类、品牌、单位、价格等">
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"><Plus size={15} />新增商品</button>
      </PageHeader>
      <SearchPanel onSearch={onSearch} onReset={onReset}>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">关键词</label><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="编码/名称/条码" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-44 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">分类</label><select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-32 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">品牌</label><select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option>{BRANDS.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">状态</label><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">全部</option><option value="enabled">启用</option><option value="disabled">禁用</option></select></div>
        <div className="flex items-center gap-1.5"><label className="text-xs text-gray-500 whitespace-nowrap">售价范围</label><input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="最低" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500" /><span className="text-xs text-gray-400">-</span><input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="最高" className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24 focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
      </SearchPanel>
      <DataTable columns={columns} data={data} rowKey="id" loading={loading} pagination={{ current: page, pageSize, total, onChange: setPage }} />

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingItem ? '编辑商品' : '新增商品'} width="max-w-2xl"
        footer={<><button onClick={() => setDialogOpen(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">取消</button><button onClick={handleSubmit(onDialogSubmit)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800">保存</button></>}>
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">基本信息</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">商品编码</label><input {...register('code')} placeholder="自动生成或手动输入" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">商品名称 *</label><input {...register('name', { required: true })} placeholder="请输入商品名称" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">商品条码</label><input {...register('barcode')} placeholder="13位EAN条码" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">商品分类 *</label><select {...register('category', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">请选择</option>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">品牌</label><select {...register('brand')} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">请选择</option>{BRANDS.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">基本单位 *</label><select {...register('unit', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"><option value="">请选择</option>{UNITS.map(u => <option key={u} value={u}>{u}</option>)}</select></div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">规格参数</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">规格</label><input {...register('spec')} placeholder="如：100Ω ±1%" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">型号</label><input {...register('model')} placeholder="产品型号" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">价格与库存</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">采购价 (¥)</label><input type="number" step="0.01" {...register('purchasePrice')} placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">销售价 (¥) *</label><input type="number" step="0.01" {...register('salePrice', { required: true })} placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">最低库存预警</label><input type="number" {...register('minStock')} placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">最高库存上限</label><input type="number" {...register('maxStock')} placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" /></div>
            </div>
          </div>
          <div><label className="block text-xs font-medium text-gray-700 mb-1">备注</label><textarea {...register('remark')} rows={2} placeholder="其他补充信息" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none" /></div>
        </div>
      </FormDialog>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="商品详情" width="w-[640px]">
        {viewingItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">基本信息</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">商品编码</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.code}</p></div>
                  <div><span className="text-xs text-gray-500">商品名称</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{viewingItem.name}</p></div>
                  <div><span className="text-xs text-gray-500">商品条码</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.barcode || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">商品分类</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.category || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">品牌</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.brand || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">基本单位</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.unit || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">规格</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).spec || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">型号</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).model || '-'}</p></div>
                  <div><span className="text-xs text-gray-500">状态</span><p className="text-sm mt-0.5"><StatusBadge status={viewingItem.status} /></p></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">价格与库存策略</h4>
              <div className="bg-gray-50/50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-xs text-gray-500">采购价</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{formatCurrency(viewingItem.purchasePrice)}</p></div>
                  <div><span className="text-xs text-gray-500">销售价</span><p className="text-sm text-gray-900 mt-0.5 font-medium">{formatCurrency(viewingItem.salePrice)}</p></div>
                  <div><span className="text-xs text-gray-500">毛利率</span><p className="text-sm text-gray-900 mt-0.5">{viewingItem.salePrice > 0 ? ((viewingItem.salePrice - viewingItem.purchasePrice) / viewingItem.salePrice * 100).toFixed(1) + '%' : '-'}</p></div>
                  <div><span className="text-xs text-gray-500">最低库存预警</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).minStock || 0}</p></div>
                  <div><span className="text-xs text-gray-500">最高库存上限</span><p className="text-sm text-gray-900 mt-0.5">{(viewingItem as any).maxStock || 0}</p></div>
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

      <ConfirmDialog open={confirmOpen} title="删除确认" message="确定要删除该商品吗？此操作不可恢复，相关的采购、销售及库存数据可能受到影响。" danger confirmText="删除" onConfirm={onDelete} onCancel={() => setConfirmOpen(false)} />
    </div>
  )
}
