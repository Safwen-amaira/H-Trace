import { useAuth } from '../context/AuthContext'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router-dom'
import { Shield, Activity, CreditCard } from 'lucide-react'

export default function Dashboard() {
  const { user, token } = useAuth()
  const [iocs, setIocs] = useState([])
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    axios.get('/api/threats/iocs', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const data = res.data || []
        setIocs(data.slice(0, 5))
        const counts = {}
        data.forEach(i => {
          counts[i.type] = (counts[i.type] || 0) + 1
        })
        setChartData(Object.entries(counts).map(([type, count]) => ({ type, count })))
      })
      .catch(console.error)
  }, [token])

  return (
    <div className="h-screen bg-dark-950 text-gold-300 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 p-6 border-r border-gold-600/20 flex flex-col">
        <h1 className="text-2xl font-bold text-gold-400 mb-8">H‑Trace</h1>
        <nav className="space-y-1 flex-1">
          <Link to="/dashboard" className="flex items-center gap-3 py-2 px-3 rounded bg-dark-800 text-gold-400 border border-gold-500/20">
            <Activity size={18} /> Dashboard
          </Link>
          <Link to="/settings" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-dark-800 transition">
            <CreditCard size={18} /> Plan & Billing
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-dark-800 transition">
              <Shield size={18} /> Admin Panel
            </Link>
          )}
        </nav>
        <div className="pt-4 border-t border-gold-600/20">
          <p className="text-sm text-gold-500">{user?.email}</p>
          <p className="text-xs text-gold-400 capitalize bg-dark-800 px-2 py-0.5 rounded inline-block mt-1">{user?.plan} plan</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gold-300">Threat Overview</h2>
          <Link to="/settings" className="bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold px-4 py-2 rounded-lg transition">
            Upgrade Plan
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="h-64 rounded-xl border border-gold-600/20 overflow-hidden bg-dark-900">
            <Canvas>
              <ambientLight intensity={0.2} />
              <pointLight position={[5, 5, 5]} intensity={0.5} color="#e6b422" />
              <Sphere args={[1, 64, 64]}>
                <meshStandardMaterial wireframe color="#e6b422" emissive="#e6b422" emissiveIntensity={0.1} />
              </Sphere>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
            </Canvas>
          </div>

          <div className="bg-dark-900 rounded-xl p-4 border border-gold-600/20">
            <h3 className="text-lg font-bold text-gold-300 mb-4">IOC Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="type" stroke="#c99c1a" />
                <YAxis stroke="#c99c1a" />
                <Tooltip contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #e6b422' }} />
                <Bar dataKey="count" fill="#e6b422" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-dark-900 rounded-xl p-6 border border-gold-600/20">
          <h3 className="text-xl font-bold text-gold-300 mb-4">Recent Indicators</h3>
          {iocs.length === 0 ? (
            <p className="text-gold-700">No indicators yet. Integrate a source to see data.</p>
          ) : (
            <ul className="space-y-2">
              {iocs.map((ioc, idx) => (
                <li key={idx} className="py-2 border-b border-gold-600/10 flex justify-between">
                  <span className="text-gold-300">{ioc.value} <span className="text-gold-600">({ioc.type})</span></span>
                  <span className="text-xs bg-dark-800 text-gold-400 px-2 py-0.5 rounded border border-gold-600/20">{ioc.threat_level}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
