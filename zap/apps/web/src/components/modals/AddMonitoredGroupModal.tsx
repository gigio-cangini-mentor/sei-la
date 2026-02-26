'use client'

import { useState, useEffect } from 'react'
import { useMonitoredGroupsStore } from '@/stores/monitored-groups'

interface AddMonitoredGroupModalProps {
  onClose: () => void
}

export function AddMonitoredGroupModal({ onClose }: AddMonitoredGroupModalProps) {
  const { addGroup, groups } = useMonitoredGroupsStore()
  const [connectionId, setConnectionId] = useState('')
  const [groupName, setGroupName] = useState('')
  const [groupJid, setGroupJid] = useState('')
  const [connections, setConnections] = useState<Array<{ id: string; phone: string; displayName: string }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Fetch available connections on mount
  useEffect(() => {
    fetchConnections()
  }, [])

  const fetchConnections = async () => {
    try {
      const response = await fetch('/api/v1/whatsapp-connections')
      if (!response.ok) throw new Error('Failed to fetch connections')
      const json = await response.json()
      setConnections(Array.isArray(json.data) ? json.data : [])
    } catch (err) {
      console.error('Error fetching connections:', err)
      setError('Failed to load WhatsApp connections')
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!connectionId) {
      errors.connectionId = 'Connection is required'
    }
    if (!groupName.trim()) {
      errors.groupName = 'Group name is required'
    }
    if (!groupJid.trim()) {
      errors.groupJid = 'Group JID is required'
    } else if (!groupJid.endsWith('@g.us')) {
      errors.groupJid = 'Group JID must end with @g.us'
    }

    // Check for duplicates
    const isDuplicate = groups.some(
      (g) => g.group_jid === groupJid && g.status !== 'deleted'
    )
    if (isDuplicate) {
      errors.groupJid = 'This group is already being monitored'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await addGroup({
        connection_id: connectionId,
        group_name: groupName,
        group_jid: groupJid,
      })
      // Success - close modal
      onClose()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add group'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Competitor Group</h2>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Connection Selector */}
          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp Connection</label>
            <select
              value={connectionId}
              onChange={(e) => setConnectionId(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                validationErrors.connectionId ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            >
              <option value="">Select a connection...</option>
              {connections.map((conn) => (
                <option key={conn.id} value={conn.id}>
                  {conn.displayName} ({conn.phone})
                </option>
              ))}
            </select>
            {validationErrors.connectionId && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.connectionId}</p>
            )}
          </div>

          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Shopee Deals Group"
              className={`w-full px-3 py-2 border rounded ${
                validationErrors.groupName ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {validationErrors.groupName && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.groupName}</p>
            )}
          </div>

          {/* Group JID */}
          <div>
            <label className="block text-sm font-medium mb-1">Group JID</label>
            <input
              type="text"
              value={groupJid}
              onChange={(e) => setGroupJid(e.target.value)}
              placeholder="e.g., 120363001234567-1234567890@g.us"
              className={`w-full px-3 py-2 border rounded font-mono text-sm ${
                validationErrors.groupJid ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {validationErrors.groupJid && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.groupJid}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">Format: {'{number}-number@g.us'}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
