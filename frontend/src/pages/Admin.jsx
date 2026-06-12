import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { Users, BarChart3 } from 'lucide-react'

export default function Admin() {
  const { user, token } = useAuth()
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({ total: 0, free: 0, pro: 0, enterprise: 0 })

  useEffect(() => {
    axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setUsers(res.data)
        const counts = res.data.reduce((acc, u) => {
          acc.total++
          acc[u.plan]++
          return acc
        }, { total: 0, free: 0, pro: 0, enterprise: 0 })
        setStats(counts)
      })
      .catch(console.error)
  }, [token])

  const changePlan = (userId, newPlan) => {
    axios.put(`/api/admin/users/${userId}/plan`, { plan: newPlan }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setUsers(users.map(u => u.id === userId ? { ...u, plan: newPlan } : u))
    })
  }

  if (user?.role !== 'admin') return <Navigate to="/dashboard" />

  return (
    <div className="h-screen bg-dark-950 text-gold-300 flex">
      <aside className="w-64 bg-dark-900 p-6 border-r border-gold-600/20">
        <h1 className="text-2xl font-bold text-gold-400 mb-8">Admin Panel</h1>
        <nav className="space-y-1">
          <a className="flex items-center gap-3 py-2 px-3 rounded bg-dark-800 text-gold-400 border border-gold-500/20">
            <Users size={18} /> Users
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-900 rounded-xl p-6 border border-gold-600/20 flex items-center gap-4">
            <Users className="text-gold-400" size={32} />
            <div>
              <p className="text-2xl font-bold text-gold-300">{stats.total}</p>
              <p className="text-gold-600">Total Users</p>
            </div>
          </div>
          {['free', 'pro', 'enterprise'].map(p => (
            <div key={p} className="bg-dark-900 rounded-xl p-6 border border-gold-600/20 flex items-center gap-4">
              <BarChart3 className="text-gold-400" size={32} />
              <div>
                <p className="text-2xl font-bold text-gold-300">{stats[p]}</p>
                <p className="text-gold-600 capitalize">{p}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-dark-900 rounded-xl border border-gold-600/20 overflow-hidden">
          <table className="w-full text-gold-300">
            <thead className="bg-dark-800">
              <tr>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Plan</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t border-gold-600/10">
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">{u.full_name || '-'}</td>
                  <td className="p-4">
                    <span className="bg-gold-600 text-dark-950 px-2 py-1 rounded text-xs">{u.role}</span>
                  </td>
                  <td className="p-4">
                    <select
                      value={u.plan}
                      onChange={(e) => changePlan(u.id, e.target.value)}
                      className="bg-dark-850 border border-gold-600/30 rounded px-2 py-1 text-gold-300 focus:outline-none"
                    >
                      <option value="free">Free</option>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button className="text-gold-400 hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
