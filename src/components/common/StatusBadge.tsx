import { STATUS_MAP, STATUS_COLOR_MAP } from '@/utils/constants'

interface Props {
  status: string
  className?: string
}

export default function StatusBadge({ status, className = '' }: Props) {
  const label = STATUS_MAP[status] || status
  const color = STATUS_COLOR_MAP[status] || 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color} ${className}`}>
      {label}
    </span>
  )
}
