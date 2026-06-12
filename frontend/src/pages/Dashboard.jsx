import { useAuth } from '../context/AuthContext'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const { user, token } = useAuth()
  const [iocs, setIocs] = useState([])

  useEffect(() => {
    axios.get('/api/threats/iocs', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setIocs(res.data || []))
      .catch(console.error)
  }, [token])

  return (
    <div className="h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 border-r border-gray-800">
        <h1 className="text-2xl font-bold text-green-400 mb-8">H-Trace</h1>
        <nav className="space-y-2">
          <a className="block py-2 px-3 rounded hover:bg-gray-800 hover:text-green-300 cursor-pointer">Dashboard</a>
          <a className="block py-2 px-3 rounded hover:bg-gray-800 hover:text-green-300 cursor-pointer">Threats</a>
          <a className="block py-2 px-3 rounded hover:bg-gray-800 hover:text-green-300 cursor-pointer">Sources</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold mb-6">
          Welcome, {user?.full_name || user?.email}
        </h2>

        {/* 3D Globe for Threats */}
        <div className="h-96 w-full rounded-xl border border-gray-700 overflow-hidden mb-8">
          <Canvas>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} />
            <Sphere args={[1, 64, 64]}>
              <meshStandardMaterial color="#0a0a2a" wireframe />
            </Sphere>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* IOC List */}
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
