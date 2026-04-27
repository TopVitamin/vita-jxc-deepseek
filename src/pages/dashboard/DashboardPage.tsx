import { useEffect, useState } from 'react'
import { dashboardApi } from '@/mock/api'
import type { DashboardData } from '@/types'
import { formatCurrency } from '@/utils/format'
import { DollarSign, ShoppingCart, Package, AlertTriangle, FileText, Truck, TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatusBadge from '@/components/common/StatusBadge'
import PageHeader from '@/components/common/PageHeader'

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardApi.getData().then(d => { setData(d); setLoading(false) })
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">加载中...</div>
  }
  if (!data) return null

  const cards = [
    { label: '今日销售额', value: formatCurrency(data.todaySales), icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '今日采购额', value: formatCurrency(data.todayPurchase), icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: '当前库存SKU', value: data.totalSku.toLocaleString(), icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
    { label: '库存预警数', value: data.alertSku.toString(), icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: '待审核采购订单', value: data.pendingPurchaseOrders.toString(), icon: FileText, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: '待出库销售订单', value: data.pendingSalesOrders.toString(), icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <div>
      <PageHeader title="数据看板" description="查看系统核心运营数据概览" />
      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-md border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{card.label}</span>
              <card.icon size={18} className={card.color} />
            </div>
            <p className="mt-2 text-xl font-semibold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 近7日销售趋势 */}
        <div className="bg-white rounded-md border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">近7日销售趋势</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.salesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `${(v / 10000).toFixed(0)}万`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 近7日采购趋势 */}
        <div className="bg-white rounded-md border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">近7日采购趋势</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.purchaseTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `${(v / 10000).toFixed(0)}万`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Line type="monotone" dataKey="amount" stroke="#ea580c" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 库存预警 */}
        <div className="bg-white rounded-md border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">库存预警</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">商品名称</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">仓库</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">当前库存</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">最低库存</th>
                </tr>
              </thead>
              <tbody>
                {data.stockAlerts.map((alert, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-4 py-2.5 text-sm text-gray-900">{alert.productName}</td>
                    <td className="px-4 py-2.5 text-sm text-gray-500">{alert.warehouse}</td>
                    <td className="px-4 py-2.5 text-sm text-red-600 text-right">{alert.stock}</td>
                    <td className="px-4 py-2.5 text-sm text-gray-500 text-right">{alert.minStock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 待办事项 */}
        <div className="bg-white rounded-md border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">待办事项</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {data.todos.map(todo => (
              <div key={todo.id} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusBadge status={
                    todo.type === '审核' ? 'pending_audit' : todo.type === '出库' ? 'completed' : 'pending'
                  } />
                  <span className="text-sm text-gray-700">{todo.title}</span>
                </div>
                <span className="text-xs text-gray-400">{todo.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
