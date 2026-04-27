import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import SupplierPage from '@/pages/master-data/SupplierPage'
import CustomerPage from '@/pages/master-data/CustomerPage'
import ProductPage from '@/pages/master-data/ProductPage'
import WarehousePage from '@/pages/master-data/WarehousePage'
import StorePage from '@/pages/master-data/StorePage'
import PurchaseOrderPage from '@/pages/purchase/PurchaseOrderPage'
import PurchaseInboundPage from '@/pages/purchase/PurchaseInboundPage'
import SupplierReturnPage from '@/pages/purchase/SupplierReturnPage'
import SalesOrderPage from '@/pages/sales/SalesOrderPage'
import SalesOutboundPage from '@/pages/sales/SalesOutboundPage'
import CustomerReturnPage from '@/pages/sales/CustomerReturnPage'
import StockQueryPage from '@/pages/inventory/StockQueryPage'
import StockMovementPage from '@/pages/inventory/StockMovementPage'
import StockTransferPage from '@/pages/inventory/StockTransferPage'
import StockAdjustmentPage from '@/pages/inventory/StockAdjustmentPage'
import UserPage from '@/pages/system/UserPage'
import RolePage from '@/pages/system/RolePage'
import MenuPage from '@/pages/system/MenuPage'
import DictionaryPage from '@/pages/system/DictionaryPage'

function ProtectedRoute() {
  const token = useAuthStore(s => s.token)
  if (!token) return <Navigate to="/login" replace />
  return <MainLayout><Outlet /></MainLayout>
}

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/master-data/suppliers" element={<SupplierPage />} />
        <Route path="/master-data/customers" element={<CustomerPage />} />
        <Route path="/master-data/products" element={<ProductPage />} />
        <Route path="/master-data/warehouses" element={<WarehousePage />} />
        <Route path="/master-data/stores" element={<StorePage />} />
        <Route path="/purchase/orders" element={<PurchaseOrderPage />} />
        <Route path="/purchase/inbounds" element={<PurchaseInboundPage />} />
        <Route path="/purchase/returns" element={<SupplierReturnPage />} />
        <Route path="/sales/orders" element={<SalesOrderPage />} />
        <Route path="/sales/outbounds" element={<SalesOutboundPage />} />
        <Route path="/sales/returns" element={<CustomerReturnPage />} />
        <Route path="/inventory/stocks" element={<StockQueryPage />} />
        <Route path="/inventory/movements" element={<StockMovementPage />} />
        <Route path="/inventory/transfers" element={<StockTransferPage />} />
        <Route path="/inventory/adjustments" element={<StockAdjustmentPage />} />
        <Route path="/system/users" element={<UserPage />} />
        <Route path="/system/roles" element={<RolePage />} />
        <Route path="/system/menus" element={<MenuPage />} />
        <Route path="/system/dictionaries" element={<DictionaryPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
