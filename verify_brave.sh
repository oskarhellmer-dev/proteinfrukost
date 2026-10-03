#!/bin/bash
# Verifierar domänlista: live-status, titel, e-post (hem + /kontakt + /om)
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
OUT=/tmp/brave_verified.csv
> "$OUT"
one() {
  d="$1"
  code=$(curl -sL -m 10 -A "$UA" "https://$d/" -o /tmp/vz_$$ -w '%{http_code}' 2>/dev/null)
  title=$(grep -oiE '<title>[^<]*' /tmp/vz_$$ 2>/dev/null | head -1 | sed 's/<title>//I' | tr -d '\r' | cut -c1-60)
  emails=$(grep -oiE '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}' /tmp/vz_$$ 2>/dev/null)
  if [ -z "$emails" ]; then
    for p in /kontakt /om /om-oss /contact; do
      curl -sL -m 8 -A "$UA" "https://$d$p" -o /tmp/vk_$$ 2>/dev/null
      emails="$emails $(grep -oiE '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}' /tmp/vk_$$ 2>/dev/null)"
    done
  fi
  emails=$(echo "$emails" | tr ' ' '\n' | grep -iE '@' | grep -viE '\.(png|jpg|jpeg|gif|webp|svg|css|js|woff|ttf)$|example|sentry|wix|@2x|placeholder|dittnamn|ditt\.namn|yourname|mail@mail|info@example|no-?reply|noreply' | sort -u | head -3 | paste -sd';' -)
  rm -f /tmp/vz_$$ /tmp/vk_$$
  printf '%s|%s|%s|%s\n' "$d" "$code" "$emails" "$title" >> "$OUT"
}
export -f one
export UA OUT
cat /tmp/brave_domains.txt | xargs -P 12 -I{} bash -c 'one "{}"'
echo "KLART: $(wc -l < $OUT) rader"
