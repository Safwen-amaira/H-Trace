import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { Users, Shield, BarChart3 } from 'lucide-react'

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
    <div className="h-screen bg-gray-950 text-white flex">
      <aside className="w-64 bg-gray-900 p-6 border-r border-gray-800">
        <h1 className="text-2xl font-bold text-green-400 mb-8">H-Trace Admin</h1>
        <nav className="space-y-2">
          <a className="block py-2 px-3 rounded bg-gray-800 text-green-300">Users</a>
          <a className="block py-2 px-3 rounded hover:bg-gray-800">Settings</a>
          <a className="block py-2 px-3 rounded hover:bg-gray-800">Logs</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex items-center gap-4">
            <Users className="text-green-400" size={32} />
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-gray-400">Total Users</p>
            </div>
          </div>
          {['free', 'pro', 'enterprise'].map(p => (
            <div key={p} className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex items-center gap-4">
              <BarChart3 className="text-blue-400" size={32} />
              <div>
                <p className="text-2xl font-bold">{stats[p]}</p>
                <p className="text-gray-400 capitalize">{p}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
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
                <tr key={u.id} className="border-t border-gray-800">
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">{u.full_name || '-'}</td>
                  <td className="p-4">
                    <span className="bg-purple-600 px-2 py-1 rounded text-xs">{u.role}</span>
                  </td>
                  <td className="p-4">
                    <select
                      value={u.plan}
                      onChange={(e) => changePlan(u.id, e.target.value)}
                      className="bg-gray-800 border border-gray-600 rounded px-2 py-1"
                    >
                      <option value="free">Free</option>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-400 hover:underline">Edit</button>
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
