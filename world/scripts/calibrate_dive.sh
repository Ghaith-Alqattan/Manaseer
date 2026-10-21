#!/bin/bash
. "$(dirname "$0")/lib.sh"
gen_dive rock
extract_frames rock
[ -f "$V/dive_rock.mp4" ] && ffprobe -v error -select_streams v:0 -show_entries stream=width,height,nb_frames,r_frame_rate,duration -of csv=p=0 "$V/dive_rock.mp4"
