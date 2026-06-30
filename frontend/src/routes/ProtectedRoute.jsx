import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { PageLoader } from '@/components/common/PageLoader'

export function ProtectedRoute({ children }) {
  const { user, booting } = useAuth()
  const location = useLocation()

  if (booting) return <PageLoader />

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
