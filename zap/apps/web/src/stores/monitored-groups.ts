import { create } from 'zustand'
import type { MonitoredGroup } from '@zap/types'

interface MonitoredGroupsStore {
  groups: MonitoredGroup[]
  loading: boolean
  error: string | null

  // Actions
  fetchGroups: () => Promise<void>
  addGroup: (data: {
    connection_id: string
    group_name: string
    group_jid: string
  }) => Promise<void>
  pauseGroup: (id: string) => Promise<void>
  resumeGroup: (id: string) => Promise<void>
  deleteGroup: (id: string) => Promise<void>
  subscribeToUpdates: () => void
  setError: (error: string | null) => void
}

export const useMonitoredGroupsStore = create<MonitoredGroupsStore>((set, get) => ({
  groups: [],
  loading: false,
  error: null,

  setError: (error) => set({ error }),

  fetchGroups: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/v1/monitored-groups')
      if (!response.ok) {
        throw new Error(`Failed to fetch groups: ${response.statusText}`)
      }
      const json = await response.json()
      const data = Array.isArray(json.data) ? json.data : json.data?.groups || []
      set({ groups: data, error: null })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      set({ error: message })
    } finally {
      set({ loading: false })
    }
  },

  addGroup: async (data) => {
    set({ error: null })
    try {
      const response = await fetch('/api/v1/monitored-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errData = await response.json()
        const errorMsg = errData.error || `Failed to add group: ${response.statusText}`
        throw new Error(errorMsg)
      }

      const json = await response.json()
      const newGroup = json.data

      set((state) => ({
        groups: [...state.groups, newGroup],
        error: null,
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      set({ error: message })
      throw err
    }
  },

  pauseGroup: async (id) => {
    set({ error: null })
    try {
      const response = await fetch(`/api/v1/monitored-groups/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'paused' }),
      })

      if (!response.ok) {
        throw new Error(`Failed to pause group: ${response.statusText}`)
      }

      set((state) => ({
        groups: state.groups.map((g) =>
          g.id === id ? { ...g, status: 'paused' as const } : g
        ),
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      set({ error: message })
      throw err
    }
  },

  resumeGroup: async (id) => {
    set({ error: null })
    try {
      const response = await fetch(`/api/v1/monitored-groups/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active' }),
      })

      if (!response.ok) {
        throw new Error(`Failed to resume group: ${response.statusText}`)
      }

      set((state) => ({
        groups: state.groups.map((g) =>
          g.id === id ? { ...g, status: 'active' as const } : g
        ),
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      set({ error: message })
      throw err
    }
  },

  deleteGroup: async (id) => {
    set({ error: null })
    try {
      const response = await fetch(`/api/v1/monitored-groups/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete group: ${response.statusText}`)
      }

      set((state) => ({
        groups: state.groups.filter((g) => g.id !== id),
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      set({ error: message })
      throw err
    }
  },

  subscribeToUpdates: () => {
    // TODO: Implement Supabase realtime subscription
    // For now, this is a placeholder for future real-time updates
  },
}))
