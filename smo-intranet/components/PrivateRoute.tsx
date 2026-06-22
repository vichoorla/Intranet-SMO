'use client'

import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth?.user) {
      router.push('/login')
    }
  }, [auth?.user])

  if (!auth?.user) return null

  return <>{children}</>
}
