#!/bin/bash
# Encode raw renders for scrubbing: native resolution, crf 20, GOP 8, light sharpen,
# no audio, faststart. Outputs to public/world/vid/. Stills to public/world/*.webp.
. "$(dirname "$0")/lib.sh"
OUT="D:/Manaseer/public/world"
mkdir -p "$OUT/vid"
ORDER="rock mix field flow future"

enc() {
  ffmpeg -v error -y -i "$1" -an -vf "unsharp=5:5:0.8:5:5:0.0" \
    -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
    -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$2"
  echo "enc $(basename "$2") $(du -h "$2" | cut -f1)"
}

for n in $ORDER; do
  [ -f "$V/dive_$n.mp4" ] && enc "$V/dive_$n.mp4" "$OUT/vid/$n.mp4"
  # Poster = the dive's actual first frame so the still-to-video handoff is seamless.
  if [ -f "$F/first_$n.png" ]; then
    python -I -c '
import sys
from PIL import Image
Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2], "WEBP", quality=84, method=6)
' "$F/first_$n.png" "$OUT/$n.webp" && echo "poster $n.webp"
  fi
done
i=0
for n in $ORDER; do
  i=$((i+1)); [ -f "$V/conn_$i.mp4" ] && enc "$V/conn_$i.mp4" "$OUT/vid/conn$i.mp4"
done
ls -la "$OUT" "$OUT/vid"
