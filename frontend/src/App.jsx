import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import UserSettings from './pages/UserSettings'
import AuthContextProvider from './context/AuthContext'

export default function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthContextProvider>
  )
}
