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
    <div className="relative h-screen w-screen overflow-hidden bg-dark-950">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#e6b422" />
          <Sphere args={[1, 64, 64]}>
            <meshStandardMaterial wireframe color="#e6b422" emissive="#e6b422" emissiveIntensity={0.2} />
          </Sphere>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
        </Canvas>
      </div>

      <div className="relative z-10 flex items-center justify-center h-full backdrop-blur-sm">
        <div className="bg-dark-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-gold-500/30">
          <h1 className="text-4xl font-bold text-gold-400 mb-2 text-center">H‑Trace</h1>
          <p className="text-gold-600 text-center mb-6 text-sm">Tunisian Threat Intelligence</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-dark-850 border border-gold-600/30 rounded-lg focus:outline-none focus:border-gold-400 text-gold-300 placeholder-gold-700 transition"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-dark-850 border border-gold-600/30 rounded-lg focus:outline-none focus:border-gold-400 text-gold-300 placeholder-gold-700 transition"
                required
              />
            </div>
            <button type="submit" className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold rounded-lg transition duration-200">
              Access Platform
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
