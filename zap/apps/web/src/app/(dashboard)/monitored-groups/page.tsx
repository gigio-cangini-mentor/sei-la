'use client'

import { useEffect, useState } from 'react'
import { useMonitoredGroupsStore } from '@/stores/monitored-groups'
import { AddMonitoredGroupModal } from '@/components/modals/AddMonitoredGroupModal'
import { MonitoredGroupsTable } from '@/components/tables/MonitoredGroupsTable'

export default function MonitoredGroupsPage() {
  const { groups, loading, error, fetchGroups, setError } = useMonitoredGroupsStore()
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState<'active' | 'all'>('active')
  const [sortBy, setSortBy] = useState<'date' | 'messages'>('date')

  // Fetch groups on mount
  useEffect(() => {
    fetchGroups()
    // Set up polling for updates (every 10 seconds)
    const interval = setInterval(() => {
      fetchGroups()
    }, 10000)

    return () => clearInterval(interval)
  }, [fetchGroups])

  const activeGroupsCount = groups.filter((g) => g.status === 'active').length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Monitored Groups</h1>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              + Add Competitor Group
            </button>
          </div>
          <p className="text-gray-600">
            Monitor {activeGroupsCount} active {activeGroupsCount === 1 ? 'group' : 'groups'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && groups.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading monitored groups...</p>
            </div>
          </div>
        ) : groups.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No competitor groups monitored yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start monitoring competitor groups to track and capture their offers in real-time.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Add your first group
            </button>
          </div>
        ) : (
          // Content
          <div className="bg-white rounded-lg shadow">
            {/* Filters and Sort */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Filter
                  </label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'active' | 'all')}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="active">Active Groups Only</option>
                    <option value="all">All Groups</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'messages')}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="date">Date Added (Newest)</option>
                    <option value="messages">Messages Captured</option>
                  </select>
                </div>
              </div>
              {loading && (
                <div className="text-sm text-gray-500">
                  Updating...
                </div>
              )}
            </div>

            {/* Table */}
            <MonitoredGroupsTable
              groups={groups}
              filter={filter}
              sortBy={sortBy}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddMonitoredGroupModal
          onClose={() => {
            setShowModal(false)
            // Refresh groups after adding
            fetchGroups()
          }}
        />
      )}
    </div>
  )
}
