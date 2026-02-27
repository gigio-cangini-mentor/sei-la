/**
 * Anti-ban delay engine for WhatsApp offer replication
 * AC-050: Intelligent delays to prevent account restrictions
 */

import { logger } from '../../lib/logger.js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Redis } from 'ioredis'

export interface DelayCalculationResult {
  delayMs: number
  multiplier: number
  jitterMs: number
}

export class AntiBanEngine {
  private readonly baseDelayMs = 2 * 60 * 1000 // 2 minutes
  private readonly maxJitterMs = 30 * 1000 // 30 seconds
  private readonly failureThreshold = 3 // Circuit breaker threshold

  /**
   * AC-050.1 + AC-050.2: Calculate delay with jitter and multiplier
   */
  async calculateDelay(
    groupId: string,
    offerId: string,
    supabase: SupabaseClient,
    redis: Redis,
  ): Promise<DelayCalculationResult> {
    // 1. Get group's backoff multiplier
    const { data: group, error } = await supabase
      .from('monitored_groups')
      .select('backoff_multiplier, status')
      .eq('id', groupId)
      .single()

    if (error) {
      logger.warn('Failed to fetch group backoff multiplier', { groupId, error })
    }

    const multiplier = group?.backoff_multiplier || 1.0
    const jitterMs = this.calculateJitter(offerId + groupId)
    const totalDelayMs = this.baseDelayMs * multiplier + jitterMs

    logger.debug('Anti-ban delay calculated', {
      groupId,
      baseDelay: this.baseDelayMs,
      multiplier,
      jitterMs,
      totalDelay: totalDelayMs,
    })

    return {
      delayMs: totalDelayMs,
      multiplier,
      jitterMs,
    }
  }

  /**
   * AC-050.1: Deterministic jitter (appears random but reproducible)
   * Using hash-based pseudo-random for deterministic output
   */
  private calculateJitter(seed: string): number {
    // Hash seed to 0-1 range
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i)
      hash = hash & hash // Convert to 32-bit integer
    }

    // Convert to 0-1 range
    const random = Math.abs(hash % 1000) / 1000
    // Scale to 0-30 seconds
    const jitter = random * this.maxJitterMs

    return jitter
  }

  /**
   * AC-050.2: Mark group as restricted and increase backoff multiplier
   */
  async markGroupRestricted(
    groupId: string,
    reason: string,
    supabase: SupabaseClient,
  ): Promise<void> {
    const { error } = await supabase
      .from('monitored_groups')
      .update({
        status: 'restricted',
        backoff_multiplier: 3.0, // Triple the delay
      })
      .eq('id', groupId)

    if (error) {
      logger.error('Failed to mark group restricted', { groupId, error })
      throw error
    }

    logger.warn('Group marked as restricted', { groupId, reason })
  }

  /**
   * AC-050.4: Track failures and trigger circuit breaker if threshold exceeded
   */
  async trackFailure(groupId: string, redis: Redis): Promise<number> {
    const key = `group:failures:${groupId}`
    const failureCount = await redis.incr(key)

    // Auto-expire after 24 hours
    await redis.expire(key, 24 * 60 * 60)

    return failureCount
  }

  /**
   * AC-050.4: Reset failure counter for a group
   */
  async resetFailureCount(groupId: string, redis: Redis): Promise<void> {
    const key = `group:failures:${groupId}`
    await redis.del(key)
  }

  /**
   * AC-050.4: Check if group should be circuit-broken
   */
  isCircuitBreakerTriggered(failureCount: number): boolean {
    return failureCount >= this.failureThreshold
  }

  /**
   * AC-050.3: Calculate exponential backoff delay for queue retry
   */
  calculateExponentialBackoff(attemptNumber: number): number {
    // Attempt 1 = 5 min, 2 = 10 min, 3 = 20 min, 4+ = 60 min
    if (attemptNumber >= 4) {
      return 60 * 60 * 1000 // 60 minutes
    }

    const baseBackoff = 5 * 60 * 1000 // 5 minutes
    return baseBackoff * Math.pow(2, attemptNumber - 1)
  }
}

// Singleton instance
export const antiBanEngine = new AntiBanEngine()
