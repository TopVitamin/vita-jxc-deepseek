import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authApi } from '@/mock/api'

interface RegisterForm {
  companyName: string
  userName: string
  phone: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>()
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true)
    setErrorMsg('')
    try {
      await authApi.register(data)
      setSuccessMsg('注册成功！即将跳转到登录页...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (e: any) {
      setErrorMsg(e.message || '注册失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">注册账号</h2>
      {errorMsg && (
        <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-700">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200 text-sm text-green-700">{successMsg}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">企业名称</label>
          <input {...register('companyName', { required: '请输入企业名称' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="请输入企业名称" />
          {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">用户姓名</label>
          <input {...register('userName', { required: '请输入用户姓名' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="请输入用户姓名" />
          {errors.userName && <p className="mt-1 text-xs text-red-500">{errors.userName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
          <input {...register('phone', { required: '请输入手机号', pattern: { value: /^1\d{10}$/, message: '请输入正确的手机号' } })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="请输入11位手机号" />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <input type="password" {...register('password', { required: '请输入密码', minLength: { value: 6, message: '密码至少6位' } })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="请输入密码（至少6位）" />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
          <input type="password" {...register('confirmPassword', {
            required: '请确认密码',
            validate: v => v === watch('password') || '两次密码不一致'
          })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="请再次输入密码" />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-2.5 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors font-medium">
          {loading ? '注册中...' : '注 册'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        已有账号？<Link to="/login" className="text-primary-600 hover:text-primary-700">去登录</Link>
      </p>
    </div>
  )
}
