import { useState, useEffect, useCallback } from 'react'
import { generateId, getNowStr } from './format'

interface CrudApi<T> {
  list: (query?: any) => Promise<{ data: T[]; total: number }>
  create: (item: any) => Promise<T>
  update: (id: string, updates: any) => Promise<T>
  remove: (id: string) => Promise<void>
}

interface UseCrudPageOptions<T> {
  api: CrudApi<T>
  defaultPageSize?: number
}

export function useCrudPage<T extends Record<string, any>>({ api, defaultPageSize = 10 }: UseCrudPageOptions<T>) {
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [filters, setFilters] = useState<Record<string, any>>({})

  const fetchData = useCallback(async (query?: Record<string, any>) => {
    setLoading(true)
    try {
      const q = { page, pageSize, ...filters, ...(query || {}) }
      const res = await api.list(q)
      setData(res.data)
      setTotal(res.total)
    } finally {
      setLoading(false)
    }
  }, [api, page, pageSize, filters])

  useEffect(() => { fetchData() }, [page, pageSize, filters])

  const handleSearch = (newFilters: Record<string, any>) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleReset = () => {
    setFilters({})
    setPage(1)
  }

  const handleCreate = async (item: any) => {
    await api.create(item)
    fetchData()
  }

  const handleUpdate = async (id: string, updates: any) => {
    await api.update(id, updates)
    fetchData()
  }

  const handleDelete = async (id: string) => {
    await api.remove(id)
    fetchData()
  }

  return {
    data, total, loading, page, pageSize,
    setPage, setPageSize,
    filters, setFilters,
    handleSearch, handleReset,
    handleCreate, handleUpdate, handleDelete,
    fetchData,
  }
}

// 生成通用 helper
export const genId = generateId
export const now = getNowStr
