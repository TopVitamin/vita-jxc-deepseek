import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MENU_LIST } from '@/utils/constants'
import { ChevronDown, ChevronRight, LayoutDashboard, Database, ShoppingCart, TrendingUp, Package, Settings } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Database, ShoppingCart, TrendingUp, Package, Settings,
}

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['dashboard', 'master-data', 'purchase', 'sales', 'inventory', 'system'])

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  const isActive = (route: string) => location.pathname === route
  const isParentActive = (item: typeof MENU_LIST[0]) => item.children?.some(c => c.route === location.pathname)

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-30 transition-all duration-200 flex flex-col
        ${collapsed ? 'w-16' : 'w-56'}`}
    >
      <div className={`h-14 flex items-center border-b border-gray-100 px-4 ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed && <span className="font-bold text-gray-900 text-base">维他进销存</span>}
        {collapsed && <span className="font-bold text-gray-900 text-sm">ERP</span>}
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {MENU_LIST.map(item => {
          const Icon = iconMap[item.icon]
          const expanded = expandedKeys.includes(item.key)
          return (
            <div key={item.key}>
              <button
                onClick={() => {
                  if (item.children?.length) {
                    toggleExpand(item.key)
                  } else if (item.children?.[0]?.route) {
                    navigate(item.children[0].route)
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                  ${isParentActive(item) ? 'text-primary-600 bg-primary-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}
                  ${collapsed ? 'justify-center px-0' : ''}`}
              >
                {Icon && <Icon size={18} />}
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.children && (expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
                  </>
                )}
              </button>
              {expanded && item.children && !collapsed && (
                <div className="ml-9 border-l border-gray-100">
                  {item.children.map(child => (
                    <button
                      key={child.key}
                      onClick={() => navigate(child.route)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors
                        ${isActive(child.route) ? 'text-primary-600 font-medium bg-primary-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
      {!collapsed && (
        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">维他进销存 v1.0</p>
        </div>
      )}
    </aside>
  )
}
