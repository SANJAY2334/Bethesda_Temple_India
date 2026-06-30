/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'
import { authService } from '../services/authService.js'

const AuthContext = createContext(null)

function getInitialUser() {
  const saved = authService.getSession()
  return saved?.token && saved?.user ? saved.user : null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser)
  const booting = false

  const value = useMemo(
    () => ({
      user,
      booting,
      async login(credentials) {
        const session = await authService.login(credentials)
        setUser(session.user)
        return session
      },
      logout() {
        authService.logout()
        setUser(null)
      },
    }),
    [user, booting],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
