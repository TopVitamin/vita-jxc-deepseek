import type { ReactNode } from 'react'
import { Search, RotateCcw } from 'lucide-react'

interface Props {
  children: ReactNode
  onSearch: () => void
  onReset: () => void
}

export default function SearchPanel({ children, onSearch, onReset }: Props) {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-4 mb-4">
      <div className="flex flex-wrap items-end gap-3">
        {children}
        <div className="flex items-center gap-2">
          <button
            onClick={onSearch}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
          >
            <Search size={14} />
            查询
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={14} />
            重置
          </button>
        </div>
      </div>
    </div>
  )
}
