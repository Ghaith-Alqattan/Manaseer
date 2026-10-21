#!/bin/bash
# Generate dive clips in parallel from the solid-background stills.
# Usage: bash world/scripts/run_dives.sh [names...]   default: all five
. "$(dirname "$0")/lib.sh"
NAMES="${*:-rock mix field flow future}"
for n in $NAMES; do gen_dive "$n" & done
wait
for n in $NAMES; do [ -f "$V/dive_$n.mp4" ] && extract_frames "$n"; done
echo "[$(stamp)] dives done (credits: $(credits))"
for n in $NAMES; do
  [ -f "$V/dive_$n.mp4" ] && echo "$n: $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,nb_frames,r_frame_rate -of csv=p=0 "$V/dive_$n.mp4")"
done
