import { LoaderCircle, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loginAdmin, setAdminToken } from '../services/api'

function AdminLoginPage() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const { data } = await loginAdmin(credentials)
      setAdminToken(data.token)
      toast.success('Admin login successful.')
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid admin credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-navy-950 px-5">
      <div className="glass-panel w-full max-w-md p-8 text-white">
        <div className="inline-flex rounded-2xl border border-white/12 bg-white/8 p-3 text-teal-200">
          <ShieldCheck size={24} />
        </div>
        <h1 className="mt-6 font-display text-5xl">Admin Login</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300/78">Use the configured admin credentials to access registrations and paper submissions.</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            className="field bg-white"
            type="email"
            placeholder="Admin email"
            value={credentials.email}
            onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
            required
          />
          <input
            className="field bg-white"
            type="password"
            placeholder="Admin password"
            value={credentials.password}
            onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
            required
          />
          <button type="submit" className="button-primary w-full" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" size={18} /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage

