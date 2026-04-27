import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react'

export interface Column<T> {
  key: string
  title: string
  width?: string
  render?: (value: any, record: T, index: number) => ReactNode
  align?: 'left' | 'center' | 'right'
}

interface Props<T> {
  columns: Column<T>[]
  data: T[]
  rowKey: string
  loading?: boolean
  pagination?: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
  }
  emptyText?: string
}

export default function DataTable<T extends Record<string, any>>({
  columns, data, rowKey, loading, pagination, emptyText = '暂无数据'
}: Props<T>) {
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 0

  return (
    <div className="bg-white rounded-md border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap
                    ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}`}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-16 text-center text-sm text-gray-400">
                  加载中...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-16 text-center text-gray-400">
                  <Inbox size={32} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">{emptyText}</p>
                </td>
              </tr>
            ) : (
              data.map((record, idx) => (
                <tr key={record[rowKey]} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-sm text-gray-700 whitespace-nowrap
                        ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}`}
                    >
                      {col.render ? col.render(record[col.key], record, idx) : record[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && pagination.total > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/30">
          <span className="text-sm text-gray-500">
            共 {pagination.total} 条，第 {pagination.current}/{totalPages} 页
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={pagination.current <= 1}
              onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
              className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 7) {
                pageNum = i + 1
              } else if (pagination.current <= 4) {
                pageNum = i + 1
              } else if (pagination.current >= totalPages - 3) {
                pageNum = totalPages - 6 + i
              } else {
                pageNum = pagination.current - 3 + i
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => pagination.onChange(pageNum, pagination.pageSize)}
                  className={`w-8 h-8 text-sm rounded transition-colors
                    ${pageNum === pagination.current ? 'bg-gray-900 text-white' : 'hover:bg-gray-200 text-gray-700'}`}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              disabled={pagination.current >= totalPages}
              onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
              className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
