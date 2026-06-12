import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
  LayoutDashboard, Shield, Zap, BarChart3, Globe,
  Settings, LogOut, Sun, Moon, Menu, X
} from 'lucide-react'
import { useState } from 'react'

export default function SidebarLayout() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/events', icon: Zap, label: 'Events' },
    { to: '/threats', icon: Shield, label: 'Threats' },
    { to: '/map', icon: Globe, label: 'Threat Map' },
    { to: '/settings', icon: Settings, label: 'Settings' },
    ...(user?.role === 'admin' ? [{ to: '/admin', icon: Shield, label: 'Admin' }] : []),
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gold-500/10">
        <div className="p-6 border-b border-gray-200 dark:border-gold-500/10">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gold-500">
            <Shield className="w-6 h-6" />
            H‑Trace
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.to
                  ? 'bg-gold-500/10 text-gold-500'
                  : 'text-gray-700 dark:text-gold-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gold-500/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gold-400">{user?.email}</span>
            <button onClick={toggleTheme} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-white dark:bg-gray-900 p-4 flex flex-col">
            <button className="self-end mb-4" onClick={() => setSidebarOpen(false)}>
              <X size={24} className="text-gray-500" />
            </button>
            <nav className="flex-1 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    location.pathname === item.to
                      ? 'bg-gold-500/10 text-gold-500'
                      : 'text-gray-700 dark:text-gold-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </nav>
            <button onClick={logout} className="mt-4 flex items-center gap-2 text-sm text-red-500">Sign Out</button>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-white dark:bg-gray-900 border-b p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gold-500">H‑Trace</Link>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
