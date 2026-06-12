import { useAuth } from '../context/AuthContext'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user, token } = useAuth()
  const [iocs, setIocs] = useState([])
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    axios.get('/api/threats/iocs', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const data = res.data || []
        setIocs(data.slice(0, 5))
        // Aggregate by type for chart
        const counts = {}
        data.forEach(i => {
          counts[i.type] = (counts[i.type] || 0) + 1
        })
        setChartData(Object.entries(counts).map(([type, count]) => ({ type, count })))
      })
      .catch(console.error)
  }, [token])

  return (
    <div className="h-screen bg-gray-950 text-white flex">
      <aside className="w-64 bg-gray-900 p-6 border-r border-gray-800 flex flex-col">
        <h1 className="text-2xl font-bold text-green-400 mb-8">H-Trace</h1>
        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className="block py-2 px-3 rounded bg-gray-800 text-green-300">Dashboard</Link>
          <Link to="/settings" className="block py-2 px-3 rounded hover:bg-gray-800">Settings</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="block py-2 px-3 rounded hover:bg-gray-800">Admin Panel</Link>
          )}
        </nav>
        <div className="pt-4 border-t border-gray-800">
          <p className="text-sm text-gray-400">{user?.email}</p>
          <p className="text-xs text-green-400 capitalize">{user?.plan} plan</p>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Welcome, {user?.full_name || user?.email}</h2>
          <Link to="/settings" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold">
            Upgrade Plan
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="h-64 rounded-xl border border-gray-700 overflow-hidden">
            <Canvas>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} />
              <Sphere args={[1, 64, 64]}>
                <meshStandardMaterial color="#0a0a2a" wireframe />
              </Sphere>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <h3 className="text-lg font-bold mb-4">IOC Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="type" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-4">Recent Indicators</h3>
          {iocs.length === 0 ? (
            <p className="text-gray-400">No indicators yet. Integrate a source to see data.</p>
          ) : (
            <ul className="space-y-2">
              {iocs.map((ioc, idx) => (
                <li key={idx} className="py-2 border-b border-gray-800 flex justify-between">
                  <span>{ioc.value} <span className="text-gray-500">({ioc.type})</span></span>
                  <span className="text-sm bg-gray-800 px-2 py-0.5 rounded">{ioc.threat_level}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
