import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
    navigate('/dashboard')
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Sphere args={[1, 64, 64]}>
            <meshStandardMaterial wireframe color="#00ff88" />
          </Sphere>
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <form onSubmit={handleSubmit} className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-gray-700">
          <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">H-Trace</h1>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none focus:border-green-400 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none focus:border-green-400 text-white"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold transition">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
