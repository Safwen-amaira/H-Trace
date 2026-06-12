import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(true)

  const login = async (email, password) => {
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)
    const res = await axios.post('/api/auth/login', formData)
    const { access_token } = res.data
    localStorage.setItem('token', access_token)
    setToken(access_token)
    return res.data
  }

  const register = async (email, password, fullName) => {
    const res = await axios.post('/api/auth/register', {
      email,
      password,
      full_name: fullName
    })
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    if (token) {
      axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data))
        .catch(err => {
          if (err.response && err.response.status === 401) {
            logout()
          }
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
