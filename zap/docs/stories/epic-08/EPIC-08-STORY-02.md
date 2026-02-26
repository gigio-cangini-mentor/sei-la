# EPIC-08-STORY-02 — Shopee integration (Phase 1)
**Story ID:** ZAP-044
**Epic:** EPIC-08 — Link Substitution Engine
**Sprint:** 1 | **Phase:** MVP
**Priority:** 🔴 CRITICAL
**Story Points:** 3
**Status:** Ready for Review
**Assigned to:** @dev (Dex)
**Prepared by:** River (Scrum Master)

---

## User Story

**As a** link substitution engine,
**I want** to construct Shopee affiliate links using the user's affiliate ID,
**so that** offers can be sent with proper tracking.

---

## Acceptance Criteria

### AC-044.1 — Shopee link construction works
```bash
Input: productId='123456', affiliateId='user_123'
Output: "https://shopee.com.br/p-123456?af_id=user_123"

EXPECTED: Correct format with af_id parameter
```

### AC-044.2 — Retrieves credential from marketplace_credentials table
```bash
1. Fetch tenant's credentials
2. Extract shopee_affiliate_id
3. Use in link construction
4. If no credential: return error "Shopee not configured"
```

### AC-044.3 — Handles missing credentials gracefully
```bash
If tenant hasn't configured Shopee:
- Return: { error: "Shopee not configured", code: "SHOPEE_UNCONFIGURED" }
- Do NOT offer to non-monitored users
```

### AC-044.4 — Validates product ID format
```bash
✓ Valid: "123456" → uses as-is
✗ Invalid: "ABC", "", null → returns error
```

### AC-044.5 — Link construction is idempotent
```bash
buildShopeeLink(productId, affiliateId)
  →  "https://shopee.com.br/p-123456?af_id=user_123"

buildShopeeLink(productId, affiliateId) [same inputs]
  →  "https://shopee.com.br/p-123456?af_id=user_123" [identical]
```

---

## Technical Notes

### Shopee Strategy Implementation
```typescript
// apps/api/src/services/offers/strategies/shopee.strategy.ts

export class ShopeeStrategy implements MarketplaceStrategy {
  constructor(private encryption: EncryptionService) {}

  async buildLink(
    productId: string,
    tenantId: string
  ): Promise<string> {
    // Validate product ID
    if (!productId || !/^\d+$/.test(productId)) {
      throw new Error(`Invalid Shopee product ID: ${productId}`)
    }

    // Fetch credentials
    const { data: creds, error } = await supabaseAdmin
      .from('marketplace_credentials')
      .select('shopee_affiliate_id')
      .eq('tenant_id', tenantId)
      .single()

    if (error || !creds?.shopee_affiliate_id) {
      throw new Error('Shopee not configured')
    }

    const affiliateId = creds.shopee_affiliate_id

    // Build link
    const baseUrl = 'https://shopee.com.br'
    const link = `${baseUrl}/p-${productId}?af_id=${affiliateId}`

    return link
  }
}
```

### Unit Tests
```typescript
describe('ShopeeStrategy', () => {
  let strategy: ShopeeStrategy

  beforeEach(() => {
    strategy = new ShopeeStrategy(mockEncryption)
  })

  test('builds valid Shopee link', async () => {
    const link = await strategy.buildLink('123456', 'tenant-1')
    expect(link).toBe('https://shopee.com.br/p-123456?af_id=user_123')
  })

  test('throws if product ID invalid', async () => {
    expect(() => strategy.buildLink('ABC', 'tenant-1')).toThrow()
  })

  test('throws if Shopee not configured', async () => {
    mockSupabase.select.mockResolvedValue({ data: null })
    expect(() => strategy.buildLink('123456', 'tenant-1')).toThrow()
  })

  test('is idempotent', async () => {
    const link1 = await strategy.buildLink('123456', 'tenant-1')
    const link2 = await strategy.buildLink('123456', 'tenant-1')
    expect(link1).toBe(link2)
  })
})
```

---

## Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| ZAP-043 (credentials storage) | Hard | Must exist |
| ZAP-038 (URL extraction) | Soft | For context |

**Blocks:**
- ZAP-047 (LinkSubstitutionService factory uses this)
- EPIC-09 (replication uses substitution service)

---

## Definition of Done

- [x] ShopeeStrategy class implemented
- [x] Link construction correct format
- [x] Retrieves affiliate ID from credentials
- [x] Handles missing credentials
- [x] Validates product ID
- [x] Idempotent
- [x] Unit tests: all cases
- [x] `npm run typecheck` → 0 errors ✅
- [x] All tests passing (206/206) ✅

---

## File List (update as you work)

| File | Action | Notes |
|------|--------|-------|
| `apps/api/src/services/offers/strategies/shopee.strategy.ts` | CREATE | ShopeeStrategy class with link construction logic |
| `apps/api/src/services/offers/strategies/shopee.strategy.test.ts` | CREATE | 19 unit tests covering all 5 AC + edge cases |

---

## Dev Agent Record

### Implementation Status ✅

**Status:** Completed (Ready for QA)
**Developer:** Dex (@dev)
**Completion Date:** 2026-02-26
**Mode:** YOLO (Autonomous)

#### Implementation Summary
- **ShopeeStrategy Class:** Marketplace strategy implementing link construction with credential retrieval
- **Link Format:** `https://shopee.com.br/p-{productId}?af_id={affiliateId}`
- **Affiliate ID Source:** marketplace_credentials table (ZAP-043 dependency)
- **Validation:** Numeric-only product ID validation regex: `^\d+$`
- **Tests:** 19 comprehensive unit tests covering all AC and edge cases
- **Quality:** TypeScript ✅ (0 errors), 206/206 tests PASS ✅

#### Quality Checks
- ✅ AC-044.1: Link construction with correct format
- ✅ AC-044.2: Fetches affiliate_id from marketplace_credentials table
- ✅ AC-044.3: Handles missing credentials gracefully (throws "Shopee not configured")
- ✅ AC-044.4: Validates product ID format (numeric only)
- ✅ AC-044.5: Link construction idempotent (same inputs = same output)
- ✅ No hardcoded values (all from DB or config)
- ✅ Error logging without exposing sensitive data
- ✅ `npm run typecheck` — PASS (0 errors)
- ✅ 206/206 tests passing

#### Key Implementation Details
- **Dependency:** Requires ZAP-043 (marketplace_credentials table with affiliate_id) ✓ Already complete
- **Imports Fixed:** Corrected path imports in both implementation and marketplace-credentials.ts route file
  - Changed from `@/clients/supabase` → `../../db/client.js` (relative paths)
  - Changed from `@/utils/logger` → `../../lib/logger.js`
- **Error Handling:** Graceful errors with proper logging, no credential exposure
- **RLS Compatible:** Filters by tenant_id for multi-tenant safety

#### Files Created/Modified
1. **Created:** `apps/api/src/services/offers/strategies/shopee.strategy.ts` (67 lines)
   - ShopeeStrategy class implementing MarketplaceStrategy interface
   - buildLink() method with validation and credential retrieval

2. **Created:** `apps/api/src/services/offers/strategies/shopee.strategy.test.ts` (352 lines)
   - 19 unit tests covering: link construction, validation, idempotency, edge cases
   - Proper mocking of Supabase client

3. **Modified:** `apps/api/src/routes/marketplace-credentials.ts`
   - Fixed import paths and auth context destructuring

#### Testing Coverage
- **Acceptance Criteria:** All 5 AC fully tested and passing
- **Edge Cases:** Long product IDs, special characters in affiliate ID, unicode handling
- **Error Paths:** Missing credentials, invalid product IDs, database errors
- **Idempotency:** Verified identical inputs produce identical outputs
- **Tenant Isolation:** Verified tenant_id filtering in queries

#### Blocker Status
- ✅ ZAP-043 (marketplace_credentials) - COMPLETE
- ⏳ Blocks: ZAP-045 (Mercado Livre), ZAP-046 (Amazon), ZAP-047 (Factory)

---

## Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-02-26 | Dex (@dev) | ✅ Implementation complete — ShopeeStrategy class, 19 unit tests, all AC verified, 206/206 tests PASS, ready for QA |
| 2026-02-26 | River (SM) | Story created — Phase 1 |

---

*Source: docs/architecture/redirectflow-architecture-design.md § Part 2*
