#!/bin/bash
# Random Banner Selector for Claude Code
# Auto-discovers all *-banner.sh scripts in this folder and picks one at random

BANNER_DIR="$(cd "$(dirname "$0")" && pwd)"

# Auto-discover all banner scripts except this one
BANNERS=()
for f in "$BANNER_DIR"/*-banner.sh; do
  [ "$f" = "$BANNER_DIR/random-banner.sh" ] && continue
  [ -f "$f" ] && BANNERS+=("$f")
done

# Fallback if no banners found
if [ ${#BANNERS[@]} -eq 0 ]; then
  echo "No banners found in $BANNER_DIR"
  exit 0
fi

# Pick a random one
RANDOM_INDEX=$((RANDOM % ${#BANNERS[@]}))
SELECTED="${BANNERS[$RANDOM_INDEX]}"

# Run it
if [ -x "$SELECTED" ]; then
  exec "$SELECTED"
else
  bash "$SELECTED"
fi
