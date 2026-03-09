# Task: Validate Pipeline Completion (QG-003)

**Status:** Active
**Version:** 1.0
**Last Updated:** 2026-02-23
**Owner:** @media-processor

---

## Purpose

Quality Gate 003 validates the entire pipeline execution after all items have been processed. This final gate ensures data integrity, completeness, and generates a comprehensive summary report for review. It acts as the pipeline's exit gate before marking the session as complete.

**Constitutional Reference:** Article V - Quality First (MUST)

---

## Inputs

| Input | Source | Format | Required |
|-------|--------|--------|----------|
| Session directory | Pipeline configuration | Absolute path | Yes |
| Processing manifest | Manifest file | JSON | Yes |
| Pipeline status | Status file | JSON | Yes |
| Expected item count | Source configuration | Integer | Yes |

**Example Input:**
```json
{
  "session_dir": "/path/to/sessions/session-123",
  "manifest_path": "/path/to/sessions/session-123/processing-manifest.json",
  "status_path": "/path/to/sessions/session-123/pipeline-status.json",
  "expected_items": 25,
  "source_name": "Course XYZ - Complete"
}
```

---

## Steps

### 1. Load and Verify Manifest Integrity

```javascript
const manifestPath = path.join(sessionDir, 'processing-manifest.json');

// Load manifest
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
} catch (error) {
  return {
    verdict: 'FAIL',
    critical_error: 'Manifest file corrupt or missing',
    error
  };
}

// Verify schema version
if (!manifest.version || manifest.version !== '1.0') {
  console.warn('WARN: Manifest version mismatch or missing');
}

// Verify required fields
const requiredFields = ['session_id', 'source', 'pipeline', 'items'];
for (const field of requiredFields) {
  if (!manifest[field]) {
    return {
      verdict: 'FAIL',
      critical_error: `Manifest missing required field: ${field}`
    };
  }
}
```

### 2. Validate Item Count and Status Distribution

```javascript
const items = manifest.items;
const expectedCount = manifest.source.total_items || expectedItems;

// Count items by status
const statusCounts = {
  completed: 0,
  failed: 0,
  skipped: 0,
  pending: 0,
  in_progress: 0
};

for (const item of items) {
  const status = item.phases.sculpt?.status ||
                 item.phases.transcription?.status ||
                 item.phases.download?.status ||
                 'unknown';

  if (status === 'completed') statusCounts.completed++;
  else if (status === 'failed') statusCounts.failed++;
  else if (status === 'skipped') statusCounts.skipped++;
  else if (status === 'in_progress') statusCounts.in_progress++;
  else statusCounts.pending++;
}

// Validation checks
const checks = {
  item_count_match: items.length === expectedCount,
  no_pending: statusCounts.pending === 0,
  no_in_progress: statusCounts.in_progress === 0,
  all_items_processed: (statusCounts.completed + statusCounts.failed + statusCounts.skipped) === items.length
};

// Decision
if (!checks.all_items_processed) {
  return {
    verdict: 'FAIL',
    message: 'Pipeline incomplete: some items not processed',
    statusCounts,
    checks
  };
}

if (statusCounts.in_progress > 0) {
  return {
    verdict: 'FAIL',
    message: 'Pipeline still running: items in progress',
    statusCounts
  };
}
```

**Item Count Validation:**

| Check | Condition | Action |
|-------|-----------|--------|
| Count matches expected | `items.length === expected` | PASS |
| Count mismatch | `items.length !== expected` | WARN (log discrepancy) |
| Items pending | `pending > 0` | FAIL (incomplete) |
| Items in progress | `in_progress > 0` | FAIL (still running) |
| All items terminal state | `completed + failed + skipped === total` | PASS |

### 3. Verify Masterpiece Existence for Completed Items

```javascript
const masterpieces = {
  expected: 0,
  found: 0,
  missing: []
};

for (const item of items) {
  // Only check completed items
  if (item.phases.sculpt?.status === 'completed') {
    masterpieces.expected++;

    const masterpiecePath = path.join(
      sessionDir,
      'masterpieces',
      `${item.id}_MASTERPIECE.md`
    );

    if (fs.existsSync(masterpiecePath)) {
      // Verify file is non-empty
      const stats = fs.statSync(masterpiecePath);
      if (stats.size > 0) {
        masterpieces.found++;
      } else {
        masterpieces.missing.push({
          item_id: item.id,
          reason: 'Empty masterpiece file'
        });
      }
    } else {
      masterpieces.missing.push({
        item_id: item.id,
        reason: 'Masterpiece file not found'
      });
    }
  }
}

// Validation
const masterpieceCheck = {
  status: masterpieces.found === masterpieces.expected ? 'PASS' : 'FAIL',
  expected: masterpieces.expected,
  found: masterpieces.found,
  missing_count: masterpieces.missing.length,
  missing_items: masterpieces.missing
};

if (masterpieceCheck.status === 'FAIL') {
  console.error(`ERROR: ${masterpieces.missing.length} masterpieces missing`);
}
```

### 4. Cross-Reference Manifest with Filesystem State

```javascript
// Validate directory structure matches manifest
const checks = {
  downloads: { expected: 0, found: 0, missing: [] },
  transcriptions: { expected: 0, found: 0, missing: [] },
  masterpieces: { expected: 0, found: 0, missing: [] }
};

for (const item of items) {
  // Check download directory
  if (item.phases.download?.status === 'completed') {
    checks.downloads.expected++;
    const downloadDir = path.join(sessionDir, 'downloads', item.id);

    if (fs.existsSync(downloadDir) && fs.readdirSync(downloadDir).length > 0) {
      checks.downloads.found++;
    } else {
      checks.downloads.missing.push(item.id);
    }
  }

  // Check transcription directory
  if (item.phases.transcription?.status === 'completed') {
    checks.transcriptions.expected++;
    const transcriptionDir = path.join(sessionDir, 'transcriptions', item.id);
    const cleanFile = path.join(transcriptionDir, 'transcription_clean.md');

    if (fs.existsSync(cleanFile)) {
      checks.transcriptions.found++;
    } else {
      checks.transcriptions.missing.push(item.id);
    }
  }

  // Masterpieces already checked in step 3
  checks.masterpieces = masterpieceCheck;
}

// Report mismatches
for (const [phase, data] of Object.entries(checks)) {
  if (data.missing.length > 0) {
    console.warn(`WARN: ${data.missing.length} ${phase} missing from filesystem`);
    console.warn(`Missing IDs: ${data.missing.join(', ')}`);
  }
}
```

### 5. Analyze Failure Patterns

```javascript
// Collect all failures
const failures = items
  .filter(item => Object.values(item.phases).some(p => p?.status === 'failed'))
  .map(item => {
    const failedPhases = Object.entries(item.phases)
      .filter(([phase, data]) => data?.status === 'failed')
      .map(([phase, data]) => ({
        phase,
        reason: data.error || data.message || 'Unknown error',
        timestamp: data.timestamp
      }));

    return {
      item_id: item.id,
      item_name: item.name,
      failed_phases: failedPhases
    };
  });

// Group by failure reason
const failureGroups = {};
for (const failure of failures) {
  for (const failedPhase of failure.failed_phases) {
    const key = `${failedPhase.phase}: ${failedPhase.reason}`;
    if (!failureGroups[key]) {
      failureGroups[key] = [];
    }
    failureGroups[key].push(failure.item_id);
  }
}

// Sort by frequency
const failuresByFrequency = Object.entries(failureGroups)
  .map(([reason, items]) => ({ reason, count: items.length, items }))
  .sort((a, b) => b.count - a.count);

// Report top failure reasons
console.log('\n=== Top Failure Reasons ===');
for (const { reason, count, items } of failuresByFrequency.slice(0, 5)) {
  console.log(`${count}x: ${reason}`);
  console.log(`  Items: ${items.slice(0, 3).join(', ')}${items.length > 3 ? '...' : ''}`);
}
```

### 6. Calculate Pipeline Statistics

```javascript
const stats = {
  items: {
    total: items.length,
    completed: statusCounts.completed,
    failed: statusCounts.failed,
    skipped: statusCounts.skipped,
    success_rate: ((statusCounts.completed / items.length) * 100).toFixed(2)
  },
  phases: {
    download: {
      attempted: items.filter(i => i.phases.download).length,
      completed: items.filter(i => i.phases.download?.status === 'completed').length,
      failed: items.filter(i => i.phases.download?.status === 'failed').length
    },
    transcription: {
      attempted: items.filter(i => i.phases.transcription).length,
      completed: items.filter(i => i.phases.transcription?.status === 'completed').length,
      failed: items.filter(i => i.phases.transcription?.status === 'failed').length
    },
    sculpt: {
      attempted: items.filter(i => i.phases.sculpt).length,
      completed: items.filter(i => i.phases.sculpt?.status === 'completed').length,
      failed: items.filter(i => i.phases.sculpt?.status === 'failed').length
    }
  },
  quality_gates: {
    download_validation: {
      passed: items.filter(i => i.phases.download?.validated === true).length,
      failed: items.filter(i => i.phases.download?.validated === false).length
    },
    transcription_validation: {
      passed: items.filter(i => i.phases.transcription?.validated === true).length,
      failed: items.filter(i => i.phases.transcription?.validated === false).length
    }
  },
  timing: {
    pipeline_started: manifest.created_at,
    pipeline_completed: new Date().toISOString(),
    total_duration_hours: calculateDuration(manifest.created_at, new Date())
  }
};

function calculateDuration(start, end) {
  const ms = new Date(end) - new Date(start);
  return (ms / 1000 / 60 / 60).toFixed(2);
}
```

### 7. Generate Final Summary Report

Create `pipeline-report.md`:

```markdown
# Pipeline Completion Report

**Session ID:** session-123
**Source:** Course XYZ - Complete
**Pipeline:** Hotmart → Masterpieces
**Completed:** 2026-02-23T14:30:00Z
**Duration:** 2.5 hours

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Items | 25 |
| Completed | 22 (88%) |
| Failed | 2 (8%) |
| Skipped | 1 (4%) |
| Success Rate | 88% |

**Overall Verdict:** PASS (with 2 failures documented)

---

## Phase Breakdown

### Download Phase
- **Attempted:** 25
- **Completed:** 24 (96%)
- **Failed:** 1 (4%)
- **Average Duration:** 2.3 minutes per item

### Transcription Phase
- **Attempted:** 24
- **Completed:** 23 (95.8%)
- **Failed:** 1 (4.2%)
- **Average Duration:** 8.5 minutes per item
- **Total Words Transcribed:** 187,500

### Sculpting Phase
- **Attempted:** 23
- **Completed:** 22 (95.7%)
- **Failed:** 1 (4.3%)
- **Average Duration:** 3.2 minutes per item

---

## Quality Gates Summary

### QG-001: Download Validation
- **Passed:** 24 items
- **Warnings:** 3 (subtitle files missing)
- **Failed:** 1 (corrupt file after 2 retries)

### QG-002: Transcription Validation
- **Passed:** 23 items
- **Warnings:** 5 (low word count)
- **Failed:** 1 (empty transcription)

### QG-003: Pipeline Completion
- **Manifest Integrity:** PASS
- **Item Count Match:** PASS
- **Masterpieces Complete:** 22/22 (100%)
- **Filesystem Consistency:** PASS

---

## Failures Analysis

### Top Failure Reasons

1. **Download: Source URL unreachable (1 item)**
   - Item: item-007 "Module 3 - Advanced Topics"
   - Reason: 404 Not Found after 2 retries
   - Recommendation: Verify source URL or contact provider

2. **Transcription: Empty output (1 item)**
   - Item: item-015 "Q&A Session Part 2"
   - Reason: Audio file appears to be silent/corrupt
   - Recommendation: Manual inspection of audio file

3. **Sculpt: Masterpiece generation timeout (1 item)**
   - Item: item-022 "Final Project Demo"
   - Reason: LLM timeout (>10 min)
   - Recommendation: Retry with higher timeout or smaller chunk size

### Failed Items Detail

| Item ID | Item Name | Failed Phase | Reason | Recommendation |
|---------|-----------|--------------|--------|----------------|
| item-007 | Module 3 - Advanced Topics | download | 404 Not Found | Verify source URL |
| item-015 | Q&A Session Part 2 | transcription | Empty output | Inspect audio file |
| item-022 | Final Project Demo | sculpt | LLM timeout | Retry with higher timeout |

---

## Warnings Summary

**Total Warnings:** 8

| Warning | Count | Items |
|---------|-------|-------|
| Subtitle files missing | 3 | item-002, item-005, item-012 |
| Low word count in transcription | 5 | item-003, item-009, item-011, item-019, item-024 |

---

## Output Artifacts

### Masterpieces Created
- **Total:** 22 masterpieces
- **Location:** `sessions/session-123/masterpieces/`
- **Average Size:** 3.8 KB per file
- **Total Content:** 84 KB

### Transcriptions
- **Total:** 23 transcriptions
- **Total Words:** 187,500
- **Average WPM:** 135 (normal range)

### Downloads
- **Total Size:** 12.5 GB
- **Video Files:** 20
- **Audio Files:** 4

---

## Recommendations

### Immediate Actions
1. Investigate item-007 source URL (404 error)
2. Manually inspect item-015 audio file for corruption
3. Retry item-022 sculpting with increased timeout

### Pipeline Improvements
1. Consider adding automatic retry with different download source for 404 errors
2. Add pre-flight audio silence detection to skip silent files early
3. Increase default sculpting timeout for long content (>60 min)

### Quality Improvements
1. Low word count warnings suggest possible audio quality issues
2. Consider adding subtitle extraction as fallback for transcription
3. Monitor WPM across items to detect outliers earlier

---

## Filesystem Consistency Check

✓ All completed downloads present in filesystem
✓ All completed transcriptions present in filesystem
✓ All completed masterpieces present in filesystem
✓ Manifest matches filesystem state
✓ No orphaned files detected

---

## Next Steps

1. Review failed items and apply recommendations
2. Archive session artifacts (optional)
3. Export masterpieces to final destination
4. Clean up download/transcription intermediates (if configured)

---

**Report Generated:** 2026-02-23T14:30:00Z
**Report Version:** 1.0
**Validator:** media-processor QG-003
```

---

## Outputs

| Output | Format | Location | Purpose |
|--------|--------|----------|---------|
| Pipeline report | Markdown | `{session_dir}/pipeline-report.md` | Human-readable summary |
| Validation report | JSON | `{session_dir}/pipeline-validation.json` | Machine-readable results |
| Statistics | JSON | Embedded in validation report | Metrics for monitoring |
| Failure list | JSON | Embedded in validation report | Items requiring attention |

**Pipeline Validation JSON Schema:**
```json
{
  "version": "1.0",
  "timestamp": "2026-02-23T14:30:00Z",
  "session_id": "session-123",
  "verdict": "PASS",
  "checks": {
    "manifest_integrity": { "status": "PASS" },
    "item_count_match": { "status": "PASS", "expected": 25, "actual": 25 },
    "items_processed": { "status": "PASS", "completed": 22, "failed": 2, "skipped": 1 },
    "masterpieces_complete": { "status": "PASS", "expected": 22, "found": 22 },
    "filesystem_consistency": { "status": "PASS", "mismatches": 0 }
  },
  "statistics": { /* stats from step 6 */ },
  "failures": [ /* failure details from step 5 */ ],
  "warnings": [ /* warning list */ ],
  "recommendations": [ /* actionable recommendations */ ]
}
```

---

## Decision Matrix

### PASS (Pipeline Complete)

**All conditions met:**
- ✓ Manifest integrity verified
- ✓ All items in terminal state (completed/failed/skipped)
- ✓ completed + failed + skipped == total items
- ✓ No items pending or in progress
- ✓ Masterpieces exist for all completed items
- ✓ Filesystem matches manifest state

**Action:** Mark pipeline as complete, generate final report, notify user.

**Acceptable with PASS:**
- Some items failed (< 20% failure rate)
- Warnings present (logged but non-blocking)
- Skipped items (expected behavior for retries)

### FAIL (Pipeline Incomplete or Corrupt)

**Blocking conditions:**
- ✗ Manifest corrupt or missing required fields
- ✗ Items still pending or in progress (pipeline not finished)
- ✗ completed + failed + skipped ≠ total items (data integrity issue)
- ✗ Masterpieces missing for completed items (phase incomplete)
- ✗ Filesystem state doesn't match manifest (corruption)

**Action:** Block completion, report critical errors, require manual intervention.

### WARN (Complete with Issues)

**Warnings that don't block completion:**
- High failure rate (>20% but pipeline finished)
- Filesystem mismatches (minor, e.g., extra files)
- stats.json missing for some items
- Item count mismatch (more items than expected)

**Action:** Complete pipeline but flag for review.

---

## Validation

### Self-Validation Checklist

- [ ] Manifest loaded and validated
- [ ] Item count matches expected
- [ ] All items in terminal state
- [ ] No items pending/in-progress
- [ ] Masterpieces verified for completed items
- [ ] Filesystem consistency checked
- [ ] Failure analysis completed
- [ ] Statistics calculated
- [ ] Final report generated (markdown + JSON)
- [ ] Recommendations documented

### Quality Metrics

| Metric | Target | Measured By |
|--------|--------|-------------|
| Pipeline success rate | >= 80% | Completed items / Total items |
| Failure rate | < 20% | Failed items / Total items |
| Filesystem consistency | 100% | Manifest matches filesystem |
| Masterpiece completeness | 100% | Masterpieces / Completed items |

---

## Integration

### Called By

- `run-pipeline.md` workflow (after all items processed)
- Manual trigger: `npx aios-core /media-processor:workflows:validate-pipeline`

### Calls

- `update-status.md` task (to mark pipeline complete)
- Notification system (to alert user of completion)

### Status Updates

```javascript
// Final pipeline-status.json update
{
  "pipeline": {
    "status": "completed",
    "verdict": "PASS"
  },
  "progress": {
    "current": 25,
    "total": 25,
    "percentage": 100
  },
  "current_phase": "complete",
  "phases_status": {
    "download": { "status": "completed", "items_completed": 24 },
    "transcription": { "status": "completed", "items_completed": 23 },
    "sculpt": { "status": "completed", "items_completed": 22 }
  },
  "quality_gates": {
    "QG-003-pipeline": {
      "last_run": "2026-02-23T14:30:00Z",
      "verdict": "PASS",
      "items_validated": 25,
      "failures": 2
    }
  },
  "completed_at": "2026-02-23T14:30:00Z"
}
```

---

## Error Handling

### Manifest Corruption

```javascript
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
} catch (error) {
  // Attempt recovery from backup
  const backupPath = manifestPath + '.backup';
  if (fs.existsSync(backupPath)) {
    console.log('Attempting recovery from backup manifest...');
    manifest = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
  } else {
    return { verdict: 'FAIL', critical_error: 'Manifest corrupt and no backup available' };
  }
}
```

### Filesystem Access Errors

```bash
# Check session directory is readable
if [ ! -r "$session_dir" ]; then
  echo "ERROR: Cannot read session directory (permission denied)"
  exit 1
fi

# Check disk space for report generation
available=$(df -k "$session_dir" | awk 'NR==2 {print $4}')
if [ "$available" -lt 10240 ]; then  # Less than 10MB
  echo "WARN: Low disk space for report generation"
fi
```

---

## Notes

- **This is the final quality gate** - No more processing after this point
- **Failure here indicates data integrity issues** - Requires manual investigation
- **Report serves as audit trail** - Keep for compliance/debugging
- **Statistics useful for pipeline optimization** - Track trends across sessions
- **Recommendations should be actionable** - Specific steps to improve quality

---

**Task Execution Mode:** Automated (called by pipeline orchestrator at end)
**Estimated Duration:** 10-30 seconds (depending on item count)
**Dependencies:** jq (for JSON parsing), access to all session artifacts
**Constitutional Compliance:** Quality First (Article V) - Final validation gate
