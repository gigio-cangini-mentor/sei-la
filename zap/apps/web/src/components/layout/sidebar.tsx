'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  KeyRound,
  Radio,
  User,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui.store'
import { useAuthStore } from '@/stores/auth.store'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/settings/apis', label: 'Configurar APIs', icon: KeyRound },
  { href: '/dashboard/broadcasts', label: 'Disparos em Massa', icon: Radio },
  { href: '/dashboard/settings', label: 'Dados da Conta', icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen } = useUIStore()
  const { clearSession } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    clearSession()
    router.push('/login')
  }

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-card border-r border-border transition-all duration-200',
        sidebarOpen ? 'w-60' : 'w-16',
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-8 h-8 bg-zap-green rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">Z</span>
        </div>
        {sidebarOpen && (
          <span className="font-semibold text-lg tracking-tight">Zap</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-2 border-t border-border space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span>Sair</span>}
        </button>
      </div>
    </aside>
  )
}
