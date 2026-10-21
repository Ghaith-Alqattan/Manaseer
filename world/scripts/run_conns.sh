#!/bin/bash
# Generate connector clips between adjacent dives, in parallel.
# start = previous dive's ACTUAL last frame, end = next dive's ACTUAL first frame.
# Usage: bash world/scripts/run_conns.sh [indices...]   default: 1 2 3 4
. "$(dirname "$0")/lib.sh"
ORDER="rock mix field flow future"
IDX="${*:-1 2 3 4}"
set -- $ORDER
i=0; prev=""
for n in "$@"; do
  if [ -n "$prev" ]; then
    i=$((i+1))
    case " $IDX " in *" $i "*)
      [ -f "$F/last_$prev.png" ] && [ -f "$F/first_$n.png" ] || { echo "conn $i: missing frames for $prev -> $n"; continue; }
      gen_conn "$i" "$F/last_$prev.png" "$F/first_$n.png" & ;;
    esac
  fi
  prev="$n"
done
wait
echo "[$(stamp)] connectors done (credits: $(credits))"
ls -la "$V"
