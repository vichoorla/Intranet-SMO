'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './sidebar.css'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      <h2>SMO</h2>
      <nav className="sidebar-nav">
        <Link 
          href="/app/consultas" 
          className={`nav-link ${pathname === '/app/consultas' ? 'active' : ''}`}
        >
          📋 Consultas
        </Link>
        <Link 
          href="/app/trabajos" 
          className={`nav-link ${pathname === '/app/trabajos' ? 'active' : ''}`}
        >
          🔧 Trabajos Realizados
        </Link>
      </nav>
    </aside>
  )
}
