import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
})

api.interceptors.request.use(async (config) => {
  const session = localStorage.getItem('grace_admin_session')
  if (session) {
    try {
      const { token } = JSON.parse(session)
      if (token) config.headers.Authorization = `Bearer ${token}`
    } catch {
      localStorage.removeItem('grace_admin_session')
    }
  }

  // Add CSRF token for state-changing requests
  if (['post', 'put', 'delete'].includes(config.method?.toLowerCase())) {
    try {
      const csrfResponse = await axios.get('/csrf-token', {
        baseURL: import.meta.env.VITE_API_URL || '/api',
        withCredentials: true,
      })
      if (csrfResponse.data.csrfToken) {
        config.headers['X-CSRF-Token'] = csrfResponse.data.csrfToken
      }
    } catch (error) {
      console.warn('Failed to fetch CSRF token:', error.message)
    }
  }

  return config
})