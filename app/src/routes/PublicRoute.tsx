import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { paths } from './paths'

interface PublicRouteProps {
  children: JSX.Element
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(paths.purchasesHistoric, { replace: true })
    }
  }, [isAuthenticated, navigate])

  return children
}
