import { useState, type ReactNode } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function MainLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar collapsed={collapsed} />
      <div className={`flex flex-col flex-1 transition-all duration-200 ${collapsed ? 'ml-16' : 'ml-56'}`}>
        <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <div className="flex-1 overflow-auto">
          <div className="px-6 py-2">
            <Breadcrumb />
          </div>
          <main className="px-6 pb-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
