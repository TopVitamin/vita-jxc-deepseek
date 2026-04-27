import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authApi } from '@/mock/api'
import { useAuthStore } from '@/stores/authStore'
import { Eye, EyeOff } from 'lucide-react'

interface LoginForm { account: string; password: string }

export default function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore(s => s.setAuth)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await authApi.login(data.account, data.password)
      setAuth(res.token, res.user)
      navigate('/dashboard')
    } catch (e: any) {
      setErrorMsg(e.message || '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">登录系统</h2>
      {errorMsg && (
        <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-700">
          {errorMsg}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">手机号/账号</label>
          <input
            {...register('account', { required: '请输入账号' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="请输入手机号或账号"
          />
          {errors.account && <p className="mt-1 text-xs text-red-500">{errors.account.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              {...register('password', { required: '请输入密码' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pr-10"
              placeholder="请输入密码"
            />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors font-medium"
        >
          {loading ? '登录中...' : '登 录'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        还没有账号？<Link to="/register" className="text-primary-600 hover:text-primary-700">立即注册</Link>
      </p>
      <p className="mt-2 text-center text-xs text-gray-400">
        默认账号：admin / 密码：123456
      </p>
    </div>
  )
}
