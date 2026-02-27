#!/usr/bin/env node

/**
 * JARVIS CLI Entry Point
 * Dedicated command-line interface for the JARVIS intelligent orchestration layer.
 *
 * Usage:
 *   jarvis                        # Start interactive REPL
 *   jarvis "implement auth"       # One-shot command
 *   jarvis --version              # Show version
 *   jarvis -v                     # Show version (short)
 *
 * @story 1.1
 */

'use strict';

const path = require('path');

// Resolve project root (bin/ is one level below root)
const projectRoot = path.resolve(__dirname, '..');

// Delegate to bootstrap module
const { bootstrap } = require(path.join(projectRoot, '.aios-core', 'core', 'jarvis', 'jarvis-bootstrap'));

bootstrap({ projectRoot }).catch((error) => {
  console.error(`JARVIS fatal error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  process.exit(1);
});
