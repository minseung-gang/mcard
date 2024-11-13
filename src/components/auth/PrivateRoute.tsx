import useUser from '@/hooks/auth/useUser'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/signin" replace />
  }
  return <>{children}</>
}
