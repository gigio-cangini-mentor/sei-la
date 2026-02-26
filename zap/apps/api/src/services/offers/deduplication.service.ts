import { createClient } from '@supabase/supabase-js'
import { logger } from '../../lib/logger.js'

/**
 * DeduplicationService: Detect and handle duplicate marketplace offers
 * AC-040: Hash-based daily deduplication window
 *
 * Dedup hash format: {marketplace}:{product_id}:{YYYY-MM-DD}
 * Examples:
 * - shopee:123456:2026-02-26
 * - mercadolivre:MLB789:2026-02-26
 * - amazon:B0123456789:2026-02-26
 */
export class DeduplicationService {
  private supabase?: ReturnType<typeof createClient>

  private getSupabaseClient(): any {
    if (!this.supabase) {
      this.supabase = createClient(
        process.env.SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_KEY || ''
      )
    }
    return this.supabase
  }

  /**
   * AC-040.1: Generate deterministic dedup hash
   * Format: {marketplace}:{product_id}:{YYYY-MM-DD}
   *
   * Hash is consistent regardless of what time during the day capture occurred
   * 09:00 and 14:30 on same day produce same hash
   */
  generateHash(
    marketplace: 'shopee' | 'mercadolivre' | 'amazon',
    productId: string,
    capturedAt: Date
  ): string {
    // Extract YYYY-MM-DD in UTC
    const isoDate = capturedAt.toISOString().split('T')[0]
    return `${marketplace}:${productId}:${isoDate}`
  }

  /**
   * AC-040.2 & AC-040.4: Check if offer already exists (duplicate detection)
   * Queries with dedup_hash + daily window filters
   * Should execute <50ms with idx_dedup_hash + idx_tenant_status indexes
   */
  async checkDuplicate(
    tenantId: string,
    hash: string,
    capturedAt: Date
  ): Promise<boolean> {
    const startOfDay = this.getStartOfDay(capturedAt)
    const endOfDay = this.getEndOfDay(capturedAt)

    try {
      const { data, error } = (await this.getSupabaseClient()
        .from('captured_offers')
        .select('id')
        .eq('tenant_id', tenantId)
        .eq('dedup_hash', hash)
        .gte('captured_at', startOfDay)
        .lt('captured_at', endOfDay)
        .limit(1)
        .single()) as { data: any; error: any }

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned (not an error, just no match)
        logger.error('Dedup check failed', { error, hash, tenantId })
        return false
      }

      return !!data
    } catch (err) {
      logger.error('Dedup check exception', { error: err, hash, tenantId })
      return false
    }
  }

  /**
   * AC-040.6: Mark offer as duplicate and link to original
   * Updates is_duplicate=true and sets duplicate_of_offer_id
   *
   * Called after duplicate is detected and inserted
   */
  async markAsDuplicate(
    tenantId: string,
    newOfferId: string,
    hash: string,
    capturedAt: Date
  ): Promise<void> {
    const startOfDay = this.getStartOfDay(capturedAt)
    const endOfDay = this.getEndOfDay(capturedAt)

    try {
      // Find original (non-duplicate) offer with same hash
      const { data: original, error: fetchError } = (await this.getSupabaseClient()
        .from('captured_offers')
        .select('id')
        .eq('tenant_id', tenantId)
        .eq('dedup_hash', hash)
        .gte('captured_at', startOfDay)
        .lt('captured_at', endOfDay)
        .eq('is_duplicate', false)
        .limit(1)
        .single()) as { data: any; error: any }

      if (fetchError && fetchError.code !== 'PGRST116') {
        logger.warn('Could not find original offer for duplicate', {
          hash,
          tenantId,
          error: fetchError
        })
        return
      }

      if (!original) {
        logger.warn('Original offer not found for duplicate', {
          hash,
          tenantId
        })
        return
      }

      // Update new offer as duplicate
      const updatePayload = {
        is_duplicate: true,
        duplicate_of_offer_id: original.id,
        updated_at: new Date().toISOString()
      }

      const { error: updateError } = (await (this.getSupabaseClient()
        .from('captured_offers')
        .update(updatePayload as any)
        .eq('id', newOfferId)
        .eq('tenant_id', tenantId))) as { error: any }

      if (updateError) {
        logger.error('Failed to mark offer as duplicate', {
          error: updateError,
          newOfferId,
          tenantId
        })
        return
      }

      logger.info('Offer marked as duplicate', {
        newOfferId,
        originalId: original.id,
        hash
      })
    } catch (err) {
      logger.error('Mark duplicate exception', {
        error: err,
        newOfferId,
        tenantId
      })
    }
  }

  /**
   * AC-040.3: Reset daily window at midnight UTC
   * Start of day: 00:00:00.000 UTC
   */
  private getStartOfDay(date: Date): string {
    const d = new Date(date)
    d.setUTCHours(0, 0, 0, 0)
    return d.toISOString()
  }

  /**
   * AC-040.3: End of day window
   * End of day: 23:59:59.999 UTC
   */
  private getEndOfDay(date: Date): string {
    const d = new Date(date)
    d.setUTCHours(23, 59, 59, 999)
    return d.toISOString()
  }
}

// Singleton instance
export const deduplicationService = new DeduplicationService()
