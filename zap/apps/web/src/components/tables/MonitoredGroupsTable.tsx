'use client'

import { useState } from 'react'
import type { MonitoredGroup } from '@zap/types'
import { useMonitoredGroupsStore } from '@/stores/monitored-groups'

interface MonitoredGroupsTableProps {
  groups: MonitoredGroup[]
  filter: 'active' | 'all'
  sortBy: 'date' | 'messages'
}

export function MonitoredGroupsTable({
  groups,
  filter,
  sortBy,
}: MonitoredGroupsTableProps) {
  const { pauseGroup, resumeGroup, deleteGroup } = useMonitoredGroupsStore()
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  // Filter groups
  let filtered = groups.filter((g) => filter === 'all' || g.status === 'active')

  // Sort groups
  filtered = filtered.sort((a, b) => {
    if (sortBy === 'date') {
      return (
        new Date(b.monitored_since).getTime() - new Date(a.monitored_since).getTime()
      )
    } else {
      return b.message_count - a.message_count
    }
  })

  const handlePause = async (id: string) => {
    setActionLoading(id)
    setActionError(null)
    try {
      await pauseGroup(id)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to pause group'
      setActionError(message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleResume = async (id: string) => {
    setActionLoading(id)
    setActionError(null)
    try {
      await resumeGroup(id)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to resume group'
      setActionError(message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    setActionLoading(id)
    setActionError(null)
    try {
      await deleteGroup(id)
      setDeleteConfirmId(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete group'
      setActionError(message)
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded">Active</span>
      case 'paused':
        return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded">Paused</span>
      case 'deleted':
        return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded">Deleted</span>
      default:
        return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded">{status}</span>
    }
  }

  const formatLastMessage = (timestamp: string | null) => {
    if (!timestamp) return 'Never'
    const date = new Date(timestamp)
    const now = new Date()
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffSeconds < 60) return 'Just now'
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div>
      {actionError && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          {actionError}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Group Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Messages</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Last Message</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{group.group_name}</p>
                    <p className="text-sm text-gray-500 font-mono">{group.group_jid}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(group.status)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{group.message_count}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatLastMessage(group.last_message_at)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {group.status === 'active' ? (
                      <button
                        onClick={() => handlePause(group.id)}
                        disabled={actionLoading === group.id}
                        className="px-3 py-1 text-sm text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200 disabled:opacity-50"
                      >
                        {actionLoading === group.id ? 'Pausing...' : 'Pause'}
                      </button>
                    ) : group.status === 'paused' ? (
                      <button
                        onClick={() => handleResume(group.id)}
                        disabled={actionLoading === group.id}
                        className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded hover:bg-green-200 disabled:opacity-50"
                      >
                        {actionLoading === group.id ? 'Resuming...' : 'Resume'}
                      </button>
                    ) : null}

                    <div className="relative">
                      <button
                        onClick={() => setDeleteConfirmId(deleteConfirmId === group.id ? null : group.id)}
                        disabled={actionLoading === group.id}
                        className="px-3 py-1 text-sm text-red-700 bg-red-100 rounded hover:bg-red-200 disabled:opacity-50"
                      >
                        Delete
                      </button>

                      {deleteConfirmId === group.id && (
                        <div className="absolute right-0 mt-2 p-3 bg-white border rounded shadow-lg z-10 w-48">
                          <p className="text-sm font-medium mb-2">
                            Stop monitoring this group?
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(group.id)}
                              disabled={actionLoading === group.id}
                              className="flex-1 px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              disabled={actionLoading === group.id}
                              className="flex-1 px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
