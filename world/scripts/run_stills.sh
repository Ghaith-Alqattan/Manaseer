#!/bin/bash
# Generate the remaining scene stills in parallel (rock is the calibration still).
# Usage: bash world/scripts/run_stills.sh [names...]   default: mix field flow future
. "$(dirname "$0")/lib.sh"
NAMES="${*:-mix field flow future}"
for n in $NAMES; do gen_still "$n" & done
wait
echo "[$(stamp)] stills done (credits: $(credits))"
ls -la "$S"
