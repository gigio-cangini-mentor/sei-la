'use client'

import { Header } from '@/components/layout/header'
import { useState } from 'react'
import { Eye, EyeOff, Save, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface ApiCredential {
  marketplace: string
  icon: string
  description: string
  fields: {
    name: string
    label: string
    placeholder: string
    type: 'text' | 'password'
  }[]
}

const API_CREDENTIALS: ApiCredential[] = [
  {
    marketplace: 'Shopee',
    icon: '🛒',
    description: 'Configure suas credenciais de afiliado da Shopee',
    fields: [
      { name: 'shop_id', label: 'Shop ID', placeholder: '123456789', type: 'text' },
      { name: 'api_key', label: 'API Key', placeholder: 'sua-api-key', type: 'password' },
      { name: 'affiliate_code', label: 'Código de Afiliado', placeholder: 'seu-codigo', type: 'text' },
    ],
  },
  {
    marketplace: 'Mercado Livre',
    icon: '📦',
    description: 'Configure suas credenciais de afiliado do Mercado Livre',
    fields: [
      { name: 'user_id', label: 'User ID', placeholder: '123456789', type: 'text' },
      { name: 'access_token', label: 'Access Token', placeholder: 'seu-token', type: 'password' },
      { name: 'affiliate_id', label: 'ID de Afiliado', placeholder: 'seu-id', type: 'text' },
    ],
  },
  {
    marketplace: 'Amazon',
    icon: '🔗',
    description: 'Configure suas credenciais de afiliado da Amazon',
    fields: [
      { name: 'associate_tag', label: 'Associate Tag', placeholder: 'seu-tag', type: 'text' },
      { name: 'access_key', label: 'Access Key', placeholder: 'sua-chave', type: 'password' },
      { name: 'secret_key', label: 'Secret Key', placeholder: 'sua-chave-secreta', type: 'password' },
    ],
  },
]

export default function ApisPage() {
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [credentials, setCredentials] = useState<Record<string, Record<string, string>>>({})
  const [saved, setSaved] = useState(false)

  const handleFieldChange = (marketplace: string, field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [marketplace]: {
        ...(prev[marketplace] || {}),
        [field]: value,
      },
    }))
    setSaved(false)
  }

  const handleSave = async (marketplace: string) => {
    // TODO: Call API to save credentials
    // await fetch(`/api/v1/apis/credentials`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     marketplace,
    //     credentials: credentials[marketplace],
    //   }),
    // })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const toggleShowSecret = (key: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div>
      <Header title="Configurar APIs" />
      <div className="p-6 space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Suas credenciais são criptografadas e armazenadas com segurança
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Nunca compartilharemos suas chaves com terceiros
            </p>
          </div>
        </div>

        {/* API Configuration Cards */}
        <div className="space-y-6">
          {API_CREDENTIALS.map((api) => (
            <div key={api.marketplace} className="bg-card border border-border rounded-lg p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{api.icon}</span>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{api.marketplace}</h2>
                  <p className="text-sm text-muted-foreground">{api.description}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {api.fields.map((field) => {
                  const key = `${api.marketplace}-${field.name}`
                  const value = credentials[api.marketplace]?.[field.name] || ''
                  const showSecret = showSecrets[key]

                  return (
                    <div key={field.name}>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={showSecret || field.type === 'text' ? 'text' : 'password'}
                          placeholder={field.placeholder}
                          value={value}
                          onChange={(e) =>
                            handleFieldChange(api.marketplace, field.name, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        {field.type === 'password' && (
                          <button
                            type="button"
                            onClick={() => toggleShowSecret(key)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showSecret ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Save Button */}
              <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border">
                <button
                  onClick={() => handleSave(api.marketplace)}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </button>
                {saved && (
                  <span className="text-sm text-green-600 font-medium">✓ Salvo com sucesso</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Learn More Link */}
        <div className="bg-secondary/50 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Precisa de ajuda para encontrar suas credenciais?
          </p>
          <Link href="/docs/setup-apis" className="text-sm text-primary hover:underline font-medium">
            Ver guia de configuração →
          </Link>
        </div>
      </div>
    </div>
  )
}
