# Task: Update Pipeline Status

**Status:** Active
**Version:** 1.0
**Last Updated:** 2026-02-23
**Owner:** @media-processor

---

## Purpose

This task manages two critical JSON files that track pipeline execution state in real-time:

1. **`pipeline-status.json`** - Real-time pipeline progress and current state
2. **`processing-manifest.json`** - Detailed per-item phase tracking and metadata

These files enable observability, recovery from interruptions, and provide data for monitoring dashboards. All tasks in the media-processor pipeline call this task to maintain consistent state tracking.

**Constitutional Reference:** Article II - CLI First (NON-NEGOTIABLE) - Status files are the single source of truth for pipeline state.

---

## Inputs

| Input | Source | Format | Required |
|-------|--------|--------|----------|
| Session directory | Pipeline context | Absolute path | Yes |
| Update type | Caller task | String (event name) | Yes |
| Update data | Caller task | JSON object | Yes |
| Item metadata | Caller task (if item-level) | JSON object | No |

**Update Types (Events):**

| Event | Trigger | Data Required |
|-------|---------|---------------|
| `pipeline_started` | Pipeline initialization | session_id, source, pipeline_type |
| `phase_started` | Beginning of download/transcription/sculpt | phase_name |
| `item_started` | Item processing begins | item_id, item_name, phase |
| `item_completed` | Item successfully processed | item_id, phase, outputs |
| `item_failed` | Item processing failed | item_id, phase, error, retry_count |
| `item_skipped` | Item skipped after max retries | item_id, phase, reason |
| `phase_completed` | All items in phase finished | phase_name, statistics |
| `quality_gate_run` | Quality gate executed | gate_id, verdict, warnings, errors |
| `pipeline_completed` | All phases finished | final_statistics, verdict |

---

## File Schemas

### 1. pipeline-status.json Schema

**Version:** 1.0

```json
{
  "version": "1.0",
  "session_id": "session-123",
  "pipeline": {
    "name": "Hotmart to Masterpieces",
    "type": "hotmart_masterpieces",
    "status": "in_progress",
    "started_at": "2026-02-23T10:00:00Z",
    "completed_at": null,
    "estimated_completion": "2026-02-23T14:00:00Z"
  },
  "source": {
    "name": "Course XYZ - Complete",
    "type": "hotmart",
    "url": "https://hotmart.com/course/xyz",
    "total_items": 25
  },
  "progress": {
    "current": 12,
    "total": 25,
    "percentage": 48
  },
  "current_phase": "transcription",
  "current_item": {
    "id": "item-012",
    "name": "Module 5 - Implementation",
    "phase": "transcription",
    "started_at": "2026-02-23T12:15:00Z"
  },
  "phases_status": {
    "download": {
      "status": "completed",
      "started_at": "2026-02-23T10:00:00Z",
      "completed_at": "2026-02-23T11:30:00Z",
      "items_total": 25,
      "items_completed": 24,
      "items_failed": 1,
      "items_skipped": 0
    },
    "transcription": {
      "status": "in_progress",
      "started_at": "2026-02-23T11:30:00Z",
      "completed_at": null,
      "items_total": 24,
      "items_completed": 11,
      "items_failed": 0,
      "items_skipped": 0,
      "items_in_progress": 1
    },
    "sculpt": {
      "status": "pending",
      "started_at": null,
      "completed_at": null,
      "items_total": 0,
      "items_completed": 0,
      "items_failed": 0,
      "items_skipped": 0
    }
  },
  "queue": {
    "pending": ["item-013", "item-014", "item-015"],
    "in_progress": ["item-012"],
    "completed": ["item-001", "item-002", "..."],
    "failed": ["item-007"],
    "skipped": []
  },
  "recent_completions": [
    {
      "item_id": "item-011",
      "item_name": "Module 4 - Testing",
      "phase": "transcription",
      "completed_at": "2026-02-23T12:10:00Z",
      "duration_seconds": 480
    },
    {
      "item_id": "item-010",
      "item_name": "Module 4 - Architecture",
      "phase": "transcription",
      "completed_at": "2026-02-23T12:05:00Z",
      "duration_seconds": 520
    }
  ],
  "quality_gates": {
    "QG-001-download": {
      "last_run": "2026-02-23T11:25:00Z",
      "last_item": "item-025",
      "verdict": "PASS",
      "warnings": 3,
      "errors": 0
    },
    "QG-002-transcription": {
      "last_run": "2026-02-23T12:10:00Z",
      "last_item": "item-011",
      "verdict": "PASS",
      "warnings": 1,
      "errors": 0
    }
  },
  "errors": [
    {
      "timestamp": "2026-02-23T10:45:00Z",
      "item_id": "item-007",
      "phase": "download",
      "error": "Source URL returned 404 Not Found",
      "retry_count": 2,
      "final": true
    }
  ],
  "statistics": {
    "total_duration_seconds": 7800,
    "avg_download_duration_seconds": 138,
    "avg_transcription_duration_seconds": 510,
    "total_transcribed_words": 98500,
    "total_download_size_mb": 8500
  },
  "last_updated": "2026-02-23T12:15:00Z"
}
```

### 2. processing-manifest.json Schema

**Version:** 1.0

```json
{
  "version": "1.0",
  "session_id": "session-123",
  "created_at": "2026-02-23T10:00:00Z",
  "updated_at": "2026-02-23T12:15:00Z",
  "source": {
    "name": "Course XYZ - Complete",
    "type": "hotmart",
    "url": "https://hotmart.com/course/xyz",
    "total_items": 25,
    "metadata": {
      "instructor": "John Doe",
      "category": "Development",
      "year": 2024
    }
  },
  "pipeline": {
    "type": "hotmart_masterpieces",
    "phases": ["download", "transcription", "sculpt"],
    "config": {
      "transcription_model": "whisper-large-v3",
      "chunk_size": 1000,
      "parallel_downloads": 3
    }
  },
  "items": [
    {
      "id": "item-001",
      "name": "Module 1 - Introduction",
      "source_url": "https://hotmart.com/course/xyz/module-1",
      "order": 1,
      "phases": {
        "download": {
          "status": "completed",
          "started_at": "2026-02-23T10:00:00Z",
          "completed_at": "2026-02-23T10:05:00Z",
          "duration_seconds": 300,
          "outputs": {
            "media_file": "downloads/item-001/lecture.mp4",
            "file_size_mb": 450,
            "duration_seconds": 3600
          },
          "validated": true,
          "validation_report": "downloads/item-001/download-validation.json"
        },
        "transcription": {
          "status": "completed",
          "started_at": "2026-02-23T10:05:00Z",
          "completed_at": "2026-02-23T10:15:00Z",
          "duration_seconds": 600,
          "outputs": {
            "clean_file": "transcriptions/item-001/transcription_clean.md",
            "chunks_dir": "transcriptions/item-001/chunks",
            "chunk_count": 15,
            "word_count": 7800
          },
          "validated": true,
          "validation_report": "transcriptions/item-001/transcription-validation.json",
          "metadata": {
            "model": "whisper-large-v3",
            "language": "pt",
            "confidence_avg": 0.89
          }
        },
        "sculpt": {
          "status": "completed",
          "started_at": "2026-02-23T10:15:00Z",
          "completed_at": "2026-02-23T10:20:00Z",
          "duration_seconds": 300,
          "outputs": {
            "masterpiece": "masterpieces/item-001_MASTERPIECE.md",
            "file_size_kb": 4.2
          }
        }
      },
      "overall_status": "completed",
      "retry_count": 0,
      "warnings": [],
      "errors": []
    },
    {
      "id": "item-007",
      "name": "Module 3 - Advanced Topics",
      "source_url": "https://hotmart.com/course/xyz/module-3",
      "order": 7,
      "phases": {
        "download": {
          "status": "failed",
          "started_at": "2026-02-23T10:30:00Z",
          "completed_at": "2026-02-23T10:45:00Z",
          "duration_seconds": 900,
          "error": "Source URL returned 404 Not Found",
          "retry_count": 2
        }
      },
      "overall_status": "failed",
      "retry_count": 2,
      "warnings": [],
      "errors": [
        {
          "phase": "download",
          "message": "Source URL returned 404 Not Found",
          "timestamp": "2026-02-23T10:45:00Z"
        }
      ]
    }
  ]
}
```

---

## Steps

### 1. Load Existing Status Files

```javascript
const statusPath = path.join(sessionDir, 'pipeline-status.json');
const manifestPath = path.join(sessionDir, 'processing-manifest.json');

// Load or initialize pipeline-status.json
let status;
if (fs.existsSync(statusPath)) {
  status = JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
} else {
  status = initializeStatus(sessionId, sourceConfig, pipelineConfig);
}

// Load or initialize processing-manifest.json
let manifest;
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
} else {
  manifest = initializeManifest(sessionId, sourceConfig, pipelineConfig, items);
}
```

### 2. Apply Update Based on Event Type

#### Event: pipeline_started

```javascript
function handlePipelineStarted(status, manifest, data) {
  // Update status.json
  status.pipeline.status = 'in_progress';
  status.pipeline.started_at = new Date().toISOString();
  status.current_phase = data.initial_phase || 'download';

  // Update manifest.json
  manifest.created_at = new Date().toISOString();
  manifest.pipeline = data.pipeline_config;

  return { status, manifest };
}
```

#### Event: phase_started

```javascript
function handlePhaseStarted(status, manifest, data) {
  const { phase_name } = data;

  // Update status.json
  status.current_phase = phase_name;
  status.phases_status[phase_name].status = 'in_progress';
  status.phases_status[phase_name].started_at = new Date().toISOString();

  // Manifest doesn't change on phase start
  return { status, manifest };
}
```

#### Event: item_started

```javascript
function handleItemStarted(status, manifest, data) {
  const { item_id, item_name, phase } = data;

  // Update status.json
  status.current_item = {
    id: item_id,
    name: item_name,
    phase: phase,
    started_at: new Date().toISOString()
  };

  // Move item from pending to in_progress queue
  status.queue.pending = status.queue.pending.filter(id => id !== item_id);
  status.queue.in_progress.push(item_id);

  // Update manifest.json - find item and update phase
  const item = manifest.items.find(i => i.id === item_id);
  if (item) {
    if (!item.phases[phase]) {
      item.phases[phase] = {};
    }
    item.phases[phase].status = 'in_progress';
    item.phases[phase].started_at = new Date().toISOString();
  }

  manifest.updated_at = new Date().toISOString();

  return { status, manifest };
}
```

#### Event: item_completed

```javascript
function handleItemCompleted(status, manifest, data) {
  const { item_id, phase, outputs, duration_seconds } = data;

  // Update status.json
  status.phases_status[phase].items_completed++;
  status.progress.current++;
  status.progress.percentage = Math.round((status.progress.current / status.progress.total) * 100);

  // Move item from in_progress to completed queue
  status.queue.in_progress = status.queue.in_progress.filter(id => id !== item_id);
  status.queue.completed.push(item_id);

  // Add to recent completions (keep last 5)
  status.recent_completions.unshift({
    item_id,
    item_name: status.current_item.name,
    phase,
    completed_at: new Date().toISOString(),
    duration_seconds
  });
  status.recent_completions = status.recent_completions.slice(0, 5);

  // Update manifest.json - find item and update phase
  const item = manifest.items.find(i => i.id === item_id);
  if (item) {
    item.phases[phase].status = 'completed';
    item.phases[phase].completed_at = new Date().toISOString();
    item.phases[phase].duration_seconds = duration_seconds;
    item.phases[phase].outputs = outputs;

    // Update overall status if all phases complete
    const allPhasesComplete = Object.values(item.phases).every(p => p.status === 'completed');
    if (allPhasesComplete) {
      item.overall_status = 'completed';
    }
  }

  manifest.updated_at = new Date().toISOString();

  return { status, manifest };
}
```

#### Event: item_failed

```javascript
function handleItemFailed(status, manifest, data) {
  const { item_id, phase, error, retry_count } = data;

  // Update status.json
  status.phases_status[phase].items_failed++;

  // Move item to failed queue (if final failure)
  if (retry_count >= 2) {
    status.queue.in_progress = status.queue.in_progress.filter(id => id !== item_id);
    status.queue.failed.push(item_id);
  }

  // Add error to error log
  status.errors.push({
    timestamp: new Date().toISOString(),
    item_id,
    phase,
    error,
    retry_count,
    final: retry_count >= 2
  });

  // Update manifest.json - find item and update phase
  const item = manifest.items.find(i => i.id === item_id);
  if (item) {
    item.phases[phase].status = retry_count >= 2 ? 'failed' : 'retrying';
    item.phases[phase].error = error;
    item.phases[phase].retry_count = retry_count;
    item.retry_count = retry_count;

    if (retry_count >= 2) {
      item.overall_status = 'failed';
      item.errors.push({
        phase,
        message: error,
        timestamp: new Date().toISOString()
      });
    }
  }

  manifest.updated_at = new Date().toISOString();

  return { status, manifest };
}
```

#### Event: item_skipped

```javascript
function handleItemSkipped(status, manifest, data) {
  const { item_id, phase, reason } = data;

  // Update status.json
  status.phases_status[phase].items_skipped++;

  // Move item to skipped queue
  status.queue.in_progress = status.queue.in_progress.filter(id => id !== item_id);
  status.queue.pending = status.queue.pending.filter(id => id !== item_id);
  status.queue.skipped.push(item_id);

  // Update manifest.json
  const item = manifest.items.find(i => i.id === item_id);
  if (item) {
    item.phases[phase].status = 'skipped';
    item.phases[phase].reason = reason;
    item.overall_status = 'skipped';
  }

  manifest.updated_at = new Date().toISOString();

  return { status, manifest };
}
```

#### Event: quality_gate_run

```javascript
function handleQualityGateRun(status, manifest, data) {
  const { gate_id, verdict, warnings, errors, item_id } = data;

  // Update status.json
  status.quality_gates[gate_id] = {
    last_run: new Date().toISOString(),
    last_item: item_id || null,
    verdict,
    warnings: warnings?.length || 0,
    errors: errors?.length || 0
  };

  // Update manifest.json - add validation info to item
  if (item_id) {
    const item = manifest.items.find(i => i.id === item_id);
    if (item) {
      const phase = gate_id.includes('download') ? 'download' :
                    gate_id.includes('transcription') ? 'transcription' : null;

      if (phase && item.phases[phase]) {
        item.phases[phase].validated = verdict === 'PASS';
        item.phases[phase].validation_report = `${phase}s/${item_id}/${phase}-validation.json`;

        if (warnings?.length > 0) {
          item.warnings = item.warnings || [];
          item.warnings.push(...warnings);
        }
      }
    }
  }

  manifest.updated_at = new Date().toISOString();

  return { status, manifest };
}
```

#### Event: pipeline_completed

```javascript
function handlePipelineCompleted(status, manifest, data) {
  const { final_statistics, verdict } = data;

  // Update status.json
  status.pipeline.status = 'completed';
  status.pipeline.completed_at = new Date().toISOString();
  status.current_phase = 'complete';
  status.current_item = null;
  status.statistics = { ...status.statistics, ...final_statistics };

  // Mark all phases complete
  for (const phase of Object.keys(status.phases_status)) {
    if (status.phases_status[phase].status === 'in_progress') {
      status.phases_status[phase].status = 'completed';
      status.phases_status[phase].completed_at = new Date().toISOString();
    }
  }

  // Manifest doesn't need update (items already marked)
  manifest.updated_at = new Date().toISOString();

  return { status, manifest };
}
```

### 3. Update Timestamps and Statistics

```javascript
// Always update last_updated timestamp
status.last_updated = new Date().toISOString();
manifest.updated_at = new Date().toISOString();

// Recalculate progress percentage
status.progress.percentage = Math.round(
  (status.progress.current / status.progress.total) * 100
);

// Update statistics (if applicable)
if (data.duration_seconds) {
  status.statistics.total_duration_seconds += data.duration_seconds;
}

if (data.word_count) {
  status.statistics.total_transcribed_words =
    (status.statistics.total_transcribed_words || 0) + data.word_count;
}

if (data.file_size_mb) {
  status.statistics.total_download_size_mb =
    (status.statistics.total_download_size_mb || 0) + data.file_size_mb;
}
```

### 4. Write Updated Files to Disk

```javascript
// Write pipeline-status.json (atomic write with backup)
const statusTmp = statusPath + '.tmp';
fs.writeFileSync(statusTmp, JSON.stringify(status, null, 2));
if (fs.existsSync(statusPath)) {
  fs.copyFileSync(statusPath, statusPath + '.backup');
}
fs.renameSync(statusTmp, statusPath);

// Write processing-manifest.json (atomic write with backup)
const manifestTmp = manifestPath + '.tmp';
fs.writeFileSync(manifestTmp, JSON.stringify(manifest, null, 2));
if (fs.existsSync(manifestPath)) {
  fs.copyFileSync(manifestPath, manifestPath + '.backup');
}
fs.renameSync(manifestTmp, manifestPath);

console.log(`Status files updated: ${updateType} for ${item_id || 'pipeline'}`);
```

---

## Outputs

| Output | Format | Location | Purpose |
|--------|--------|----------|---------|
| pipeline-status.json | JSON | `{session_dir}/pipeline-status.json` | Real-time progress tracking |
| processing-manifest.json | JSON | `{session_dir}/processing-manifest.json` | Detailed item-level tracking |
| Backup files | JSON | `.backup` suffix | Recovery from corruption |

---

## When to Call This Task

**Every task in the pipeline should call update-status at these points:**

| Task | Call Points | Update Type |
|------|------------|-------------|
| run-pipeline | Start, end | `pipeline_started`, `pipeline_completed` |
| download-video/audio | Start item, complete, fail | `item_started`, `item_completed`, `item_failed` |
| validate-download | Gate run | `quality_gate_run` |
| transcribe-audio | Start, complete, fail | `item_started`, `item_completed`, `item_failed` |
| validate-transcription | Gate run | `quality_gate_run` |
| sculpt-transcript | Start, complete, fail | `item_started`, `item_completed`, `item_failed` |
| validate-pipeline | Gate run | `quality_gate_run`, `pipeline_completed` |

---

## Error Handling

### File Write Failures

```javascript
try {
  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
} catch (error) {
  console.error('ERROR: Failed to write pipeline-status.json', error);

  // Attempt recovery from backup
  if (fs.existsSync(statusPath + '.backup')) {
    fs.copyFileSync(statusPath + '.backup', statusPath);
    console.log('Recovered from backup');
  }

  throw error; // Re-throw to alert caller
}
```

### JSON Corruption

```javascript
function loadStatusSafe(statusPath) {
  try {
    return JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
  } catch (error) {
    console.error('ERROR: Status file corrupt, attempting recovery');

    // Try backup
    if (fs.existsSync(statusPath + '.backup')) {
      return JSON.parse(fs.readFileSync(statusPath + '.backup', 'utf-8'));
    }

    // Last resort: initialize new
    console.warn('WARN: No valid backup, initializing new status');
    return initializeStatus();
  }
}
```

### Disk Space Issues

```bash
# Check disk space before write
available=$(df -k "$session_dir" | awk 'NR==2 {print $4}')
if [ "$available" -lt 10240 ]; then  # Less than 10MB
  echo "ERROR: Low disk space, cannot update status files"
  exit 1
fi
```

---

## Validation

### Self-Validation Checklist

- [ ] Status file written successfully
- [ ] Manifest file written successfully
- [ ] Backup files created
- [ ] Atomic write (tmp → rename) used
- [ ] Timestamps updated
- [ ] Progress percentage recalculated
- [ ] Queue states consistent
- [ ] Statistics updated (if applicable)

### Integrity Checks

```javascript
// Verify queue consistency (no duplicates, all items accounted for)
const allQueueItems = [
  ...status.queue.pending,
  ...status.queue.in_progress,
  ...status.queue.completed,
  ...status.queue.failed,
  ...status.queue.skipped
];

const uniqueItems = new Set(allQueueItems);
if (uniqueItems.size !== allQueueItems.length) {
  console.error('ERROR: Duplicate items in queues');
}

if (uniqueItems.size !== manifest.items.length) {
  console.error('ERROR: Queue items count mismatch with manifest');
}
```

---

## Integration

### Called By

- All pipeline tasks (download, transcribe, sculpt, validate)
- Quality gates (validate-download, validate-transcription, validate-pipeline)
- Pipeline orchestrator (run-pipeline workflow)

### Observability

These status files can be consumed by:

- Real-time dashboard (websocket updates)
- CLI progress bar (`npx aios-core /media-processor:status`)
- Monitoring tools (tail -f pipeline-status.json | jq)
- Recovery scripts (resume from last checkpoint)

---

## Notes

- **Atomic writes prevent corruption** - Always write to .tmp then rename
- **Backups enable recovery** - Previous state saved before overwrite
- **Status is single source of truth** - All tasks read from status files to resume
- **Timestamps use ISO 8601** - UTC timezone, sortable, parseable
- **Progress percentage always recalculated** - Never trust old value
- **Queues must be consistent** - Item can only be in one queue at a time

---

**Task Execution Mode:** Library function (called by all pipeline tasks)
**Estimated Duration:** < 100ms per update
**Dependencies:** fs-extra (for atomic writes), proper session directory permissions
**Constitutional Compliance:** CLI First (Article II) - Files are authoritative state
