import { useLocation, Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { MENU_LIST } from '@/utils/constants'

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const crumbs: { label: string; path?: string }[] = []

  for (const menu of MENU_LIST) {
    for (const child of menu.children || []) {
      if (child.route === pathname) {
        crumbs.push({ label: menu.label })
        crumbs.push({ label: child.label, path: child.route })
        break
      }
    }
  }

  if (!crumbs.length) {
    // fallback: generate from path
    const parts = pathname.split('/').filter(Boolean)
    parts.forEach((part, i) => {
      crumbs.push({ label: part, path: '/' + parts.slice(0, i + 1).join('/') })
    })
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500 py-2 px-1">
      <Link to="/dashboard" className="hover:text-gray-700">
        <Home size={14} />
      </Link>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} />
          {i === crumbs.length - 1 || !c.path ? (
            <span className="text-gray-900">{c.label}</span>
          ) : (
            <Link to={c.path!} className="hover:text-primary-600">{c.label}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}
