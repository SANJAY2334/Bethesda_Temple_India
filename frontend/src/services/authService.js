import { api } from './api.js'

const KEY = 'grace_admin_session'

export const authService = {
  getSession() {
    try {
      return JSON.parse(localStorage.getItem(KEY))
    } catch {
      return null
    }
  },
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials)
    localStorage.setItem(KEY, JSON.stringify(data))
    return data
  },
  async logout() {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.warn('Logout endpoint failed, clearing session locally:', error.message)
    } finally {
      localStorage.removeItem(KEY)
    }
  },
}
