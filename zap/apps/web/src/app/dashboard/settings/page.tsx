'use client'

import { Header } from '@/components/layout/header'
import { useAuthStore } from '@/stores/auth.store'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const { tenantId, role, clearSession } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    clearSession()
    router.push('/login')
  }

  return (
    <div>
      <Header title="Dados da Conta" />
      <div className="p-6 space-y-6">
        {/* Account Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Informações da Conta</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">ID do Tenant</label>
              <p className="font-medium text-xs text-muted-foreground break-all">{tenantId || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Função</label>
              <p className="font-medium capitalize">{role || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2 text-destructive">Zona de Risco</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Ações irreversíveis que afetarão sua conta
          </p>
          <button
            onClick={handleLogout}
            className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-destructive/90 transition-colors"
          >
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  )
}
