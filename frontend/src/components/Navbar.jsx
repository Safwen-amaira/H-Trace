import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, LogOut, Shield, LayoutDashboard, Settings } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-gold-500">
            <Shield className="w-6 h-6" />
            H‑Trace
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 dark:text-gold-300 hover:text-gold-500 transition">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 dark:text-gold-300 hover:text-gold-500 transition">Dashboard</Link>
                <Link to="/settings" className="text-gray-700 dark:text-gold-300 hover:text-gold-500 transition">Settings</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 dark:text-gold-300 hover:text-gold-500 transition">Admin</Link>
                )}
                <button onClick={logout} className="text-gray-700 dark:text-gold-300 hover:text-red-400 transition flex items-center gap-1">
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gold-300 hover:text-gold-500 transition">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Register</Link>
              </>
            )}
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gold-500/10 px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block py-2" onClick={() => setMenuOpen(false)}>Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/settings" className="block py-2" onClick={() => setMenuOpen(false)}>Settings</Link>
              {user.role === 'admin' && <Link to="/admin" className="block py-2" onClick={() => setMenuOpen(false)}>Admin</Link>}
              <button onClick={() => { logout(); setMenuOpen(false) }} className="block py-2 text-red-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block py-2" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
