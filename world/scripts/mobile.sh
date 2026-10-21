#!/bin/bash
# Native 9:16 mobile chain (pipeline §6b). Same seam laws as the desktop chain, but every
# frame handoff comes from the PORTRAIT renders, never the landscape ones.
#   bash world/scripts/mobile.sh dives [names...]      portrait dives from world/stills/canvas_<n>.png
#   bash world/scripts/mobile.sh conns [indices...]    portrait connectors from portrait seam frames
#   bash world/scripts/mobile.sh encode                720-wide, GOP 4, crf 23 -> public/world/vid/<n>-m.mp4
# Duration: DIVE_DUR env (default 10). Model/flags inherited from lib.sh (kling3_0 std).
. "$(dirname "$0")/lib.sh"
ORDER="rock mix field flow future"
OUT="D:/Manaseer/public/world"

gen_dive_m() { # name
  local n="$1"
  echo "[$(stamp)] dive_m $n start (credits: $(credits))"
  # shellcheck disable=SC2086
  higgsfield generate create "$VMODEL" --prompt "$(cat "$P/dive_m_$n.txt")" \
    --start-image "$S/canvas_$n.png" \
    $VOPTS --aspect_ratio 9:16 --duration "$DIVE_DUR" \
    --wait --wait-timeout 20m --json > "$L/dive_m_$n.json" 2> "$L/dive_m_$n.err"
  local url; url=$(json_url "$L/dive_m_$n.json")
  if [ -z "$url" ]; then
    echo "[$(stamp)] dive_m $n: client call failed, recovering job by prompt"
    recover_job "$P/dive_m_$n.txt" "$L/dive_m_$n.json" > /dev/null && url=$(json_url "$L/dive_m_$n.json")
  fi
  if [ -n "$url" ] && curl -fsSL "$url" -o "$V/dive_m_$n.mp4"; then
    echo "[$(stamp)] dive_m $n ok (credits: $(credits))"
  else
    echo "[$(stamp)] dive_m $n FAIL: $(tr -d '\n' < "$L/dive_m_$n.err" | tail -c 300)"
  fi
}

extract_frames_m() { # name
  local n="$1"
  ffmpeg -v error -y -ss 0 -i "$V/dive_m_$n.mp4" -frames:v 1 -q:v 2 "$F/first_m_$n.png"
  ffmpeg -v error -y -sseof -0.15 -i "$V/dive_m_$n.mp4" -frames:v 1 -q:v 2 "$F/last_m_$n.png"
  echo "frames_m $n: $(ls "$F/first_m_$n.png" "$F/last_m_$n.png" 2>/dev/null | wc -l)/2"
}

gen_conn_m() { # i startPng endPng
  local i="$1"
  echo "[$(stamp)] conn_m $i start (credits: $(credits))"
  # shellcheck disable=SC2086
  higgsfield generate create "$VMODEL" --prompt "$(cat "$P/conn_m_$i.txt")" \
    --start-image "$2" --end-image "$3" \
    $VOPTS --aspect_ratio 9:16 --duration "$CONN_DUR" \
    --wait --wait-timeout 20m --json > "$L/conn_m_$i.json" 2> "$L/conn_m_$i.err"
  local url; url=$(json_url "$L/conn_m_$i.json")
  if [ -z "$url" ]; then
    echo "[$(stamp)] conn_m $i: client call failed, recovering job by prompt"
    recover_job "$P/conn_m_$i.txt" "$L/conn_m_$i.json" > /dev/null && url=$(json_url "$L/conn_m_$i.json")
  fi
  if [ -n "$url" ] && curl -fsSL "$url" -o "$V/conn_m_$i.mp4"; then
    echo "[$(stamp)] conn_m $i ok (credits: $(credits))"
  else
    echo "[$(stamp)] conn_m $i FAIL: $(tr -d '\n' < "$L/conn_m_$i.err" | tail -c 300)"
  fi
}

encm() { # in out  (portrait: 720 wide, tight GOP for cheap phone seeks)
  ffmpeg -v error -y -i "$1" -an -vf "scale=720:-2,unsharp=5:5:0.6:5:5:0.0" \
    -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
    -g 3 -keyint_min 3 -bf 0 -tune fastdecode -sc_threshold 0 -movflags +faststart "$2"
  echo "encm $(basename "$2") $(du -h "$2" | cut -f1) $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$2")"
}

cmd="$1"; shift
case "$cmd" in
  dives)
    NAMES="${*:-$ORDER}"
    for n in $NAMES; do gen_dive_m "$n" & done; wait
    for n in $NAMES; do [ -f "$V/dive_m_$n.mp4" ] && extract_frames_m "$n"; done
    for n in $NAMES; do [ -f "$V/dive_m_$n.mp4" ] && echo "$n: $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,nb_frames -of csv=p=0 "$V/dive_m_$n.mp4")"; done
    echo "[$(stamp)] dives_m done (credits: $(credits))" ;;
  conns)
    IDX="${*:-1 2 3 4}"; set -- $ORDER; i=0; prev=""
    for n in "$@"; do
      if [ -n "$prev" ]; then i=$((i+1))
        case " $IDX " in *" $i "*)
          [ -f "$F/last_m_$prev.png" ] && [ -f "$F/first_m_$n.png" ] || { echo "conn_m $i: missing frames"; continue; }
          gen_conn_m "$i" "$F/last_m_$prev.png" "$F/first_m_$n.png" & ;;
        esac
      fi; prev="$n"
    done; wait
    echo "[$(stamp)] conns_m done (credits: $(credits))" ;;
  encode)
    mkdir -p "$OUT/vid"
    for n in $ORDER; do
      [ -f "$V/dive_m_$n.mp4" ] && encm "$V/dive_m_$n.mp4" "$OUT/vid/$n-m.mp4"
      [ -f "$F/first_m_$n.png" ] && python -I -c '
import sys
from PIL import Image
Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2], "WEBP", quality=84, method=6)
' "$F/first_m_$n.png" "$OUT/$n-m.webp" && echo "poster $n-m.webp"
    done
    i=0; for n in $ORDER; do i=$((i+1)); [ -f "$V/conn_m_$i.mp4" ] && encm "$V/conn_m_$i.mp4" "$OUT/vid/conn$i-m.mp4"; done ;;
  *) echo "usage: mobile.sh dives|conns|encode"; exit 1 ;;
esac
