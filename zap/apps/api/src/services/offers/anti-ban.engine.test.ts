import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AntiBanEngine } from './anti-ban.engine.js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Redis } from 'ioredis'

describe('AntiBanEngine', () => {
  let engine: AntiBanEngine
  let mockSupabase: Partial<SupabaseClient>
  let mockRedis: Partial<Redis>

  beforeEach(() => {
    engine = new AntiBanEngine()

    // Mock Supabase client with proper chain: select().eq().single()
    const singleMock = vi.fn().mockResolvedValue({
      data: { backoff_multiplier: 1.0, status: 'active' },
      error: null,
    })
    const eqMock = vi.fn().mockReturnValue({
      single: singleMock,
    })
    const selectMock = vi.fn().mockReturnValue({
      eq: eqMock,
    })

    mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: selectMock,
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        }),
      }),
    } as any

    // Mock Redis client
    mockRedis = {
      incr: vi.fn().mockResolvedValue(1),
      expire: vi.fn().mockResolvedValue(1),
      del: vi.fn().mockResolvedValue(1),
    } as any
  })

  describe('AC-050.1: Jitter variation', () => {
    it('should generate variable jitter between 0-30 seconds', () => {
      const jitterSamples: number[] = []

      for (let i = 0; i < 100; i++) {
        const jitter = engine['calculateJitter'](`offer-${i}|group-1`)
        jitterSamples.push(jitter)

        expect(jitter).toBeGreaterThanOrEqual(0)
        expect(jitter).toBeLessThanOrEqual(30 * 1000) // 30 seconds in ms
      }

      // Check for variation (not all same value)
      const uniqueValues = new Set(jitterSamples).size
      expect(uniqueValues).toBeGreaterThan(50) // At least 50 different values

      // Calculate standard deviation
      const mean = jitterSamples.reduce((a, b) => a + b) / jitterSamples.length
      const variance =
        jitterSamples.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / jitterSamples.length
      const stdDev = Math.sqrt(variance)

      // AC-050.1: Standard deviation > 5 sec
      expect(stdDev).toBeGreaterThan(5000) // 5 seconds in ms
    })

    it('should produce deterministic output for same seed', () => {
      const seed = 'offer-123|group-456'
      const jitter1 = engine['calculateJitter'](seed)
      const jitter2 = engine['calculateJitter'](seed)

      expect(jitter1).toBe(jitter2) // Same seed = same jitter
    })

    it('should produce different output for different seeds', () => {
      const jitter1 = engine['calculateJitter']('offer-1|group-1')
      const jitter2 = engine['calculateJitter']('offer-2|group-1')
      const jitter3 = engine['calculateJitter']('offer-1|group-2')

      // Not all should be the same (statistically)
      const unique = new Set([jitter1, jitter2, jitter3])
      expect(unique.size).toBeGreaterThan(1)
    })
  })

  describe('AC-050.2: Group backoff multiplier', () => {
    it('should apply backoff multiplier to delay', async () => {
      const singleMock = vi.fn().mockResolvedValue({
        data: { backoff_multiplier: 2.0, status: 'active' },
        error: null,
      })
      const eqMock = vi.fn().mockReturnValue({
        single: singleMock,
      })
      const selectMock = vi.fn().mockReturnValue({
        eq: eqMock,
      })

      mockSupabase.from = vi.fn().mockReturnValue({
        select: selectMock,
      }) as any

      const result = await engine.calculateDelay('group-1', 'offer-1', mockSupabase as any, mockRedis as any)

      expect(result.multiplier).toBe(2.0)
      expect(result.delayMs).toBeGreaterThanOrEqual(2 * 60 * 1000 * 2) // base * multiplier
    })

    it('should default to 1.0 multiplier if group not found', async () => {
      const singleMock = vi.fn().mockResolvedValue({
        data: null,
        error: new Error('Not found'),
      })
      const eqMock = vi.fn().mockReturnValue({
        single: singleMock,
      })
      const selectMock = vi.fn().mockReturnValue({
        eq: eqMock,
      })

      mockSupabase.from = vi.fn().mockReturnValue({
        select: selectMock,
      }) as any

      const result = await engine.calculateDelay('group-1', 'offer-1', mockSupabase as any, mockRedis as any)

      expect(result.multiplier).toBe(1.0)
    })
  })

  describe('AC-050.3: Exponential backoff', () => {
    it('should calculate exponential backoff delays', () => {
      expect(engine.calculateExponentialBackoff(1)).toBe(5 * 60 * 1000) // 5 min
      expect(engine.calculateExponentialBackoff(2)).toBe(10 * 60 * 1000) // 10 min
      expect(engine.calculateExponentialBackoff(3)).toBe(20 * 60 * 1000) // 20 min
      expect(engine.calculateExponentialBackoff(4)).toBe(60 * 60 * 1000) // 60 min (capped)
      expect(engine.calculateExponentialBackoff(5)).toBe(60 * 60 * 1000) // 60 min (capped)
    })
  })

  describe('AC-050.4: Circuit breaker', () => {
    it('should trigger circuit breaker after 3 failures', async () => {
      mockRedis.incr = vi
        .fn()
        .mockResolvedValueOnce(1)
        .mockResolvedValueOnce(2)
        .mockResolvedValueOnce(3) // Threshold reached

      const count1 = await engine.trackFailure('group-1', mockRedis as any)
      const count2 = await engine.trackFailure('group-1', mockRedis as any)
      const count3 = await engine.trackFailure('group-1', mockRedis as any)

      expect(engine.isCircuitBreakerTriggered(count1)).toBe(false)
      expect(engine.isCircuitBreakerTriggered(count2)).toBe(false)
      expect(engine.isCircuitBreakerTriggered(count3)).toBe(true)
    })

    it('should mark group as restricted', async () => {
      const updateMock = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      })

      mockSupabase.from = vi.fn().mockReturnValue({
        update: updateMock,
      }) as any

      await engine.markGroupRestricted('group-1', 'Max failures exceeded', mockSupabase as any)

      expect(updateMock).toHaveBeenCalledWith({
        status: 'restricted',
        backoff_multiplier: 3.0,
      })
    })

    it('should reset failure counter', async () => {
      await engine.resetFailureCount('group-1', mockRedis as any)

      expect(mockRedis.del).toHaveBeenCalledWith('group:failures:group-1')
    })
  })

  describe('Delay calculation integration', () => {
    it('should calculate total delay with jitter and multiplier', async () => {
      const result = await engine.calculateDelay('group-1', 'offer-1', mockSupabase as any, mockRedis as any)

      // Base delay (2 min) * multiplier (1.0) + jitter (0-30 sec)
      const minExpected = 2 * 60 * 1000 // 2 min
      const maxExpected = 2 * 60 * 1000 + 30 * 1000 // 2.5 min

      expect(result.delayMs).toBeGreaterThanOrEqual(minExpected)
      expect(result.delayMs).toBeLessThanOrEqual(maxExpected)
    })
  })
})
