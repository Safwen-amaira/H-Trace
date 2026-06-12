import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { Users, BarChart3, Shield } from 'lucide-react'
import { Navigate } from 'react-router-dom'

export default function Admin() {
  const { user, token } = useAuth()
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({ total: 0, free: 0, pro: 0, enterprise: 0 })

  useEffect(() => {
    axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setUsers(res.data)
        const c = { total: res.data.length, free: 0, pro: 0, enterprise: 0 }
        res.data.forEach(u => { c[u.plan]++ })
        setStats(c)
      })
      .catch(console.error)
  }, [token])

  if (user?.role !== 'admin') return <Navigate to="/dashboard" />

  const changePlan = (userId, plan) => {
    axios.put(`/api/admin/users/${userId}/plan`, { plan }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setUsers(prev => prev.map(u => u.id === userId ? { ...u, plan } : u)))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Panel</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', val: stats.total, icon: Users },
            { label: 'Free', val: stats.free, icon: BarChart3 },
            { label: 'Pro', val: stats.pro, icon: BarChart3 },
            { label: 'Enterprise', val: stats.enterprise, icon: BarChart3 }
          ].map((s, i) => (
            <div key={i} className="card flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500"><s.icon size={20} /></div>
              <div><p className="text-2xl font-bold">{s.val}</p><p className="text-sm text-gray-500 dark:text-gold-500/80">{s.label}</p></div>
            </div>
          ))}
        </div>
        <div className="card">
          <table className="w-full">
            <thead><tr className="text-left text-sm text-gray-500 dark:text-gold-600 border-b dark:border-gold-500/10"><th className="pb-2">Email</th><th className="pb-2">Name</th><th className="pb-2">Role</th><th className="pb-2">Plan</th><th className="pb-2">Action</th></tr></thead>
            <tbody className="divide-y dark:divide-gold-500/10">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="py-3">{u.email}</td>
                  <td className="py-3">{u.full_name || '-'}</td>
                  <td className="py-3"><span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded text-xs">{u.role}</span></td>
                  <td className="py-3">
                    <select value={u.plan} onChange={e => changePlan(u.id, e.target.value)} className="bg-transparent border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm">
                      <option value="free">Free</option><option value="pro">Pro</option><option value="enterprise">Enterprise</option>
                    </select>
                  </td>
                  <td className="py-3"><button className="text-gold-500 hover:underline text-sm">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
