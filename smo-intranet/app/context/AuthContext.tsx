'use client'

import {useContext, useState, createContext} from 'react'

type AuthContextType = {
  user: any
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

// user es para el usuario que se loguea y setUser es para verificar si esta en el local storage.
const [user, setUser] = useState(() =>
  JSON.parse(localStorage.getItem('user') || 'null')
)

const login = (email: string, password: string) => { // verifica email y pass como strings y si coinciden con lo establecido accede
    if (email === 'admin@test.com' && password === '123456') {
      const userData = { email }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return true
    }
    return false
  }

const logout = () => { // Elimina al user del localstorage y lo cambia a un null
    localStorage.removeItem('user')
    setUser(null)
    }

return (
    <AuthContext.Provider value={{ user, login, logout }}>
    {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)