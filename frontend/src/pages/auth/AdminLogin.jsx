import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { SEO } from '@/components/common/SEO'

export default function AdminLogin() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/admin" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const form = new FormData(event.currentTarget)
    try {
      await login({ email: form.get('email'), password: form.get('password') })
      navigate(location.state?.from?.pathname || '/admin', { replace: true })
    } catch {
      setError('Unable to sign in with those credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <SEO title="Admin Login" path="/admin/login" description="Secure administrator login for Bethesda Temple." />
      <form onSubmit={handleSubmit} className="glass-panel w-full max-w-md rounded-[30px] p-8">
        <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-[#18324a] text-white">
          <LockKeyhole size={24} />
        </div>
        <h1 className="font-display text-5xl font-semibold text-[#18324a]">Admin Login</h1>
        <p className="mt-3 text-[#617284]">Protected content studio for church staff.</p>
        <input name="email" type="email" required placeholder="Email" className="mt-8 w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-4 outline-none" />
        <input name="password" type="password" required placeholder="Password" className="mt-4 w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-4 outline-none" />
        {error ? <p className="mt-4 text-sm font-semibold text-red-700">{error}</p> : null}
        <button disabled={loading} className="mt-6 w-full rounded-full bg-[#18324a] px-6 py-4 font-semibold text-white disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
