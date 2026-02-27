'use client'

import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/layout/header'
import { apiConnections } from '@/lib/api'
import { Wifi, WifiOff, Eye, Radio, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Connection {
  id: string
  phone: string | null
  display_name: string | null
  status: 'connecting' | 'connected' | 'disconnected' | 'banned'
  created_at: string
}

interface MonitoredGroup {
  id: string
  connection_id: string
  group_id: string
  group_name: string
  created_at: string
}

interface Group {
  id: string
  connection_id: string
  name: string
  members_count: number | null
  created_at: string
}

const API_CONFIGS = [
  { name: 'Shopee', status: 'pending' as const, icon: '🛒' },
  { name: 'Mercado Livre', status: 'pending' as const, icon: '📦' },
  { name: 'Amazon', status: 'pending' as const, icon: '🔗' },
]

export default function DashboardPage() {
  const { data: connectionsData, isLoading: connectionsLoading } = useQuery<{ data: Connection[] }>({
    queryKey: ['connections'],
    queryFn: () => apiConnections.list() as Promise<{ data: Connection[] }>,
  })

  const { data: monitoredGroupsData } = useQuery<{ data: MonitoredGroup[] }>({
    queryKey: ['monitored-groups'],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/monitored-groups`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('zap-auth') ? JSON.parse(localStorage.getItem('zap-auth')!).state?.token : ''}` },
    }).then(r => r.json()),
  })

  const { data: groupsData } = useQuery<{ data: Group[] }>({
    queryKey: ['groups'],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/groups`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('zap-auth') ? JSON.parse(localStorage.getItem('zap-auth')!).state?.token : ''}` },
    }).then(r => r.json()),
  })

  const connections = connectionsData?.data ?? []
  const monitoredGroups = monitoredGroupsData?.data ?? []
  const groups = groupsData?.data ?? []

  const getMonitoredGroupsForConnection = (connectionId: string) => {
    return monitoredGroups.filter(g => g.connection_id === connectionId)
  }

  const getDispatchGroupsForConnection = (connectionId: string) => {
    return groups.filter(g => g.connection_id === connectionId)
  }

  return (
    <div>
      <Header title="Dashboard" />
      <div className="p-6 space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Seja bem-vindo(a)! 👋</h1>
          <p className="text-muted-foreground">
            Gerencie suas instâncias do WhatsApp, grupos e credenciais de APIs
          </p>
        </div>

        {/* Instances Section */}
        {connectionsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-4" />
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="space-y-2">
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-8 bg-muted rounded w-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : connections.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <WifiOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Nenhuma instância conectada</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comece conectando sua primeira instância do WhatsApp
            </p>
            <Link
              href="/dashboard/connections"
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Conectar WhatsApp
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {connections.map((conn) => {
              const monitored = getMonitoredGroupsForConnection(conn.id)
              const dispatch = getDispatchGroupsForConnection(conn.id)
              const isConnected = conn.status === 'connected'

              return (
                <div key={conn.id} className="bg-card border border-border rounded-lg p-6">
                  {/* Connection Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'p-2 rounded-lg',
                        isConnected ? 'bg-green-100' : 'bg-gray-100'
                      )}>
                        <Wifi className={cn(
                          'w-5 h-5',
                          isConnected ? 'text-green-600' : 'text-gray-500'
                        )} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{conn.display_name || conn.phone || 'Instância WhatsApp'}</h3>
                        {conn.phone && (
                          <p className="text-sm text-muted-foreground">{conn.phone}</p>
                        )}
                      </div>
                      <div className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        isConnected
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      )}>
                        {isConnected ? '✓ Conectado' : '✕ Desconectado'}
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/connections`}
                      className="text-xs text-primary hover:underline"
                    >
                      Alterar
                    </Link>
                  </div>

                  {/* Sub-cards Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Monitored Groups Card */}
                    <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
                      <div className="flex items-center gap-2 mb-3">
                        <Eye className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">Grupos Monitorados</span>
                      </div>
                      <p className="text-3xl font-bold mb-3">{monitored.length}</p>
                      <div className="space-y-2 mb-4">
                        {monitored.slice(0, 2).map((group) => (
                          <p key={group.id} className="text-xs text-muted-foreground truncate">
                            • {group.group_name}
                          </p>
                        ))}
                        {monitored.length > 2 && (
                          <p className="text-xs text-primary font-medium">
                            +{monitored.length - 2} mais
                          </p>
                        )}
                      </div>
                      <Link
                        href="/dashboard/monitored-groups"
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Alterar Grupos
                      </Link>
                    </div>

                    {/* Dispatch Groups Card */}
                    <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
                      <div className="flex items-center gap-2 mb-3">
                        <Radio className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">Grupos de Disparo</span>
                      </div>
                      <p className="text-3xl font-bold mb-3">{dispatch.length}</p>
                      <div className="space-y-2 mb-4">
                        {dispatch.slice(0, 2).map((group) => (
                          <p key={group.id} className="text-xs text-muted-foreground truncate">
                            • {group.name}
                          </p>
                        ))}
                        {dispatch.length > 2 && (
                          <p className="text-xs text-primary font-medium">
                            +{dispatch.length - 2} mais
                          </p>
                        )}
                      </div>
                      <Link
                        href="/dashboard/groups"
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Editar Grupos
                      </Link>
                    </div>

                    {/* WhatsApp Status Card */}
                    <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
                      <div className="flex items-center gap-2 mb-3">
                        <Wifi className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">Status</span>
                      </div>
                      <div className={cn(
                        'inline-block px-3 py-1 rounded-full text-xs font-medium mb-4',
                        isConnected
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      )}>
                        {isConnected ? '🟢 Ativo' : '🔴 Inativo'}
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        {isConnected
                          ? 'Sua instância está online e pronta para usar'
                          : 'Conecte novamente para usar'}
                      </p>
                      <Link
                        href="/dashboard/connections"
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* API Credentials Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">🔑 Credenciais de APIs</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Configure suas chaves de afiliado para começar a monetizar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {API_CONFIGS.map((api) => (
              <div key={api.name} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{api.icon}</span>
                  <div className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                    api.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  )}>
                    {api.status === 'pending' ? (
                      <>
                        <AlertCircle className="w-3 h-3" />
                        Pendente
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Configurado
                      </>
                    )}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{api.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {api.status === 'pending'
                    ? 'Credenciais não configuradas'
                    : 'Status: Ativo'}
                </p>
                <Link
                  href="/dashboard/settings/apis"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  {api.status === 'pending' ? 'Configurar' : '✎ Editar'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
