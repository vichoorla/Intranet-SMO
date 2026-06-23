'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { PrivateRoute } from '@/components/PrivateRoute'
import './app-layout.css'

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <PrivateRoute>
      <div className="app-container">
        <Sidebar />
        <main className="app-main">
          {children}
        </main>
      </div>
    </PrivateRoute>
  )
}
