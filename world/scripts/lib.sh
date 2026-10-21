#!/bin/bash
# Shared functions for the Manaseer scroll-world render chain (bash 3.2 safe, no jq).
# Source this file:  . world/scripts/lib.sh
# Paths use D:/ form so the Windows higgsfield binary can read media files directly.

WORK="${WORK:-D:/Manaseer/world}"
P="$WORK/prompts"; S="$WORK/stills"; V="$WORK/video/raw"; F="$WORK/video/frames"; L="$WORK/logs"
mkdir -p "$S" "$V" "$F" "$L"

# Chain model: kling3_0 (seedance_2_0_mini is "Not found" on this account; seedance_2_0
# costs 36-96 credits per clip here vs 7.5-17.5 for Kling). Kling: no --resolution param,
# sound defaults on, std = 720p native. Verified prices (generate cost, 2026-10-22):
# std 5s 7.5 / 8s 12 / 10s 15 credits; pro 10s 17.5 credits.
VMODEL="${VMODEL:-kling3_0}"
VOPTS="${VOPTS:---mode std --sound off}"   # pro/4k need a Pro plan ("Pro or Ultimate plan required")
DIVE_DUR="${DIVE_DUR:-10}"
CONN_DUR="${CONN_DUR:-5}"

# Print the result_url from a --wait --json job file (list or object shape).
json_url() {
  python -I -c '
import json, sys
try:
    d = json.load(open(sys.argv[1], encoding="utf-8"))
except Exception:
    print(""); sys.exit()
if isinstance(d, dict) and "results" in d: d = d["results"]
if isinstance(d, dict): d = [d]
for j in d:
    u = j.get("result_url") or (j.get("results") or [{}])[0].get("url") if isinstance(j, dict) else None
    if u: print(u); break
else:
    print("")
' "$1"
}

credits() { higgsfield workspace status 2>/dev/null | grep -oE '[0-9]+(\.[0-9]+)? credits' | grep -oE '^[0-9.]+'; }

stamp() { date +"%H:%M:%S"; }

gen_still() { # name
  local n="$1"
  echo "[$(stamp)] still $n start (credits: $(credits))"
  higgsfield generate create gpt_image_2 --prompt "$(cat "$P/still_$n.txt")" \
    --aspect_ratio 3:2 --resolution 2k --quality high \
    --wait --wait-timeout 15m --json > "$L/still_$n.json" 2> "$L/still_$n.err"
  local url; url=$(json_url "$L/still_$n.json")
  if [ -n "$url" ] && curl -fsSL "$url" -o "$S/still_$n.png"; then
    echo "[$(stamp)] still $n ok (credits: $(credits))"
  else
    echo "[$(stamp)] still $n FAIL: $(tr -d '\n' < "$L/still_$n.err" | tail -c 400) | $(head -c 300 "$L/still_$n.json")"
  fi
}

gen_dive() { # name  (start image = the scene still)
  local n="$1"
  echo "[$(stamp)] dive $n start (credits: $(credits))"
  # shellcheck disable=SC2086  # VOPTS is word-split on purpose
  higgsfield generate create "$VMODEL" --prompt "$(cat "$P/dive_$n.txt")" \
    --start-image "$S/still_$n.png" \
    $VOPTS --aspect_ratio 16:9 --duration "$DIVE_DUR" \
    --wait --wait-timeout 20m --json > "$L/dive_$n.json" 2> "$L/dive_$n.err"
  local url; url=$(json_url "$L/dive_$n.json")
  if [ -n "$url" ] && curl -fsSL "$url" -o "$V/dive_$n.mp4"; then
    echo "[$(stamp)] dive $n ok (credits: $(credits))"
  else
    echo "[$(stamp)] dive $n FAIL: $(tr -d '\n' < "$L/dive_$n.err" | tail -c 400) | $(head -c 300 "$L/dive_$n.json")"
  fi
}

gen_conn() { # i startPng endPng
  local i="$1"
  echo "[$(stamp)] conn $i start (credits: $(credits))"
  # shellcheck disable=SC2086
  higgsfield generate create "$VMODEL" --prompt "$(cat "$P/conn_$i.txt")" \
    --start-image "$2" --end-image "$3" \
    $VOPTS --aspect_ratio 16:9 --duration "$CONN_DUR" \
    --wait --wait-timeout 20m --json > "$L/conn_$i.json" 2> "$L/conn_$i.err"
  local url; url=$(json_url "$L/conn_$i.json")
  if [ -n "$url" ] && curl -fsSL "$url" -o "$V/conn_$i.mp4"; then
    echo "[$(stamp)] conn $i ok (credits: $(credits))"
  else
    echo "[$(stamp)] conn $i FAIL: $(tr -d '\n' < "$L/conn_$i.err" | tail -c 400) | $(head -c 300 "$L/conn_$i.json")"
  fi
}

# Seam frames from the RENDERED dives (never the stills).
extract_frames() { # name
  local n="$1"
  ffmpeg -v error -y -ss 0 -i "$V/dive_$n.mp4" -frames:v 1 -q:v 2 "$F/first_$n.png"
  ffmpeg -v error -y -sseof -0.15 -i "$V/dive_$n.mp4" -frames:v 1 -q:v 2 "$F/last_$n.png"
  echo "frames $n: $(ls "$F/first_$n.png" "$F/last_$n.png" 2>/dev/null | wc -l)/2"
}
