import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router-dom'
import { Activity, Shield, AlertTriangle, Zap, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { user, token } = useAuth()
  const [iocs, setIocs] = useState([])
  const [stats, setStats] = useState({ total: 0, high: 0, medium: 0, low: 0 })

  useEffect(() => {
    axios.get('/api/threats/iocs', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const data = res.data || []
        setIocs(data.slice(0, 10))
        const counts = { total: data.length, high: 0, medium: 0, low: 0 }
        data.forEach(i => {
          if (i.threat_level === 'high' || i.threat_level === 'critical') counts.high++
          else if (i.threat_level === 'medium') counts.medium++
          else counts.low++
        })
        setStats(counts)
      })
      .catch(console.error)
  }, [token])

  const chartData = [
    { name: 'High/Crit', value: stats.high },
    { name: 'Medium', value: stats.medium },
    { name: 'Low', value: stats.low }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gold-300/70 mt-1">Welcome back, {user?.full_name || user?.email}</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Link to="/settings" className="btn-primary">Upgrade Plan</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="px-4 py-2 border border-gray-300 dark:border-gold-500/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">Admin</Link>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total IOCs', value: stats.total, icon: Activity, color: 'text-gold-500' },
            { label: 'High/Critical', value: stats.high, icon: AlertTriangle, color: 'text-red-500' },
            { label: 'Medium', value: stats.medium, icon: Zap, color: 'text-yellow-500' },
            { label: 'Low', value: stats.low, icon: Shield, color: 'text-green-500' }
          ].map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="card flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color} bg-current/10`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                <p className="text-sm text-gray-500 dark:text-gold-500/80">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gold-300">IOC Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#f5c542' }} />
                <Bar dataKey="value" fill="#e6b422" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card flex flex-col justify-center items-center">
            <Zap className="w-12 h-12 text-gold-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gold-300">Threat Map</h3>
            <p className="text-gray-600 dark:text-gold-500/80 text-center">Geolocation view coming soon.<br/>Track attacks across Tunisian governorates.</p>
          </div>
        </div>

        {/* IOC Table */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gold-300">Recent Indicators</h3>
          {iocs.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gold-600">
              <AlertTriangle className="mx-auto mb-2 w-8 h-8" />
              <p>No indicators yet. Add a threat feed to see live data.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 dark:text-gold-600 border-b dark:border-gold-500/10">
                    <th className="pb-2">Value</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Source</th>
                    <th className="pb-2">Threat</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gold-500/10">
                  {iocs.map((ioc, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                      <td className="py-3 font-mono text-sm">{ioc.value}</td>
                      <td className="py-3 capitalize text-sm">{ioc.type}</td>
                      <td className="py-3 text-sm">{ioc.source}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          ioc.threat_level === 'high' || ioc.threat_level === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' :
                          ioc.threat_level === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                        }`}>
                          {ioc.threat_level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
