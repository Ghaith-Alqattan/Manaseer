#!/bin/bash
# Seam QA: every connector must start on the previous dive's actual last frame and end on
# the next dive's actual first frame. Reports PSNR (dB) per seam from the RAW renders.
# Calibration from the skill: a frame-locked seam reads ~18-25 dB at 720p from detail
# shimmer alone; a real mismatch is a different composition, not just softness.
. "$(dirname "$0")/lib.sh"
ORDER="rock mix field flow future"
psnr() { # a.png b.png
  ffmpeg -v info -i "$1" -i "$2" -lavfi "psnr" -f null - 2>&1 | grep -oE "average:[0-9.inf]+" | cut -d: -f2
}
set -- $ORDER; i=0; prev=""
for n in "$@"; do
  if [ -n "$prev" ]; then
    i=$((i+1))
    if [ -f "$V/conn_$i.mp4" ]; then
      ffmpeg -v error -y -ss 0 -i "$V/conn_$i.mp4" -frames:v 1 -q:v 2 "$F/conn${i}_first.png"
      ffmpeg -v error -y -sseof -0.15 -i "$V/conn_$i.mp4" -frames:v 1 -q:v 2 "$F/conn${i}_last.png"
      a=$(psnr "$F/last_$prev.png" "$F/conn${i}_first.png")
      b=$(psnr "$F/conn${i}_last.png" "$F/first_$n.png")
      echo "seam $i  $prev -> conn$i start: ${a} dB   conn$i end -> $n: ${b} dB"
    else
      echo "seam $i  $prev -> $n: connector missing"
    fi
  fi
  prev="$n"
done
