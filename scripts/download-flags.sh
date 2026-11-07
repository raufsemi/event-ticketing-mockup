#!/usr/bin/env bash
# Downloads Malaysian state flags from Wikimedia Commons into public/flags/.
# Works with the old bash 3.2 that ships with macOS.
# Run from the project root:  bash scripts/download-flags.sh

mkdir -p public/flags

FLAGS="
johor|Flag_of_Johor.svg
kedah|Flag_of_Kedah.svg
kelantan|Flag_of_Kelantan.svg
kuala-lumpur|Flag_of_Kuala_Lumpur,_Malaysia.svg
labuan|Flag_of_Labuan.svg
melaka|Flag_of_Malacca.svg
negeri-sembilan|Flag_of_Negeri_Sembilan.svg
pahang|Flag_of_Pahang.svg
penang|Flag_of_Penang_(Malaysia).svg
perak|Flag_of_Perak.svg
perlis|Flag_of_Perlis.svg
putrajaya|Flag_of_Putrajaya.svg
sabah|Flag_of_Sabah.svg
sarawak|Flag_of_Sarawak.svg
selangor|Flag_of_Selangor.svg
terengganu|Flag_of_Terengganu.svg
"

failed=""
for line in $FLAGS; do
  slug="${line%%|*}"
  file="${line#*|}"
  out="public/flags/${slug}.svg"
  if curl -fsSL -A "flag-downloader/1.0" "https://commons.wikimedia.org/wiki/Special:FilePath/${file}" -o "$out" \
     && grep -q "<svg" "$out"; then
    echo "ok    $slug"
  else
    echo "FAIL  $slug  ($file)"
    rm -f "$out"
    failed="$failed $slug"
  fi
  sleep 0.3
done

if [ -n "$failed" ]; then
  echo
  echo "These failed. Find the flag on commons.wikimedia.org and save the SVG as public/flags/<slug>.svg:"
  for s in $failed; do echo "  $s"; done
fi