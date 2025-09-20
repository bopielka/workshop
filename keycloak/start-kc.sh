#!/usr/bin/env sh
set -e

TPL=/tmp/realm-export.json.tpl
OUT=/opt/keycloak/data/import/realm-export.json
mkdir -p /opt/keycloak/data/import

# redirectUris -> ZAWSZE tablica JSON
if [ -n "${KC_REDIRECT_URIS_JSON:-}" ]; then
  RU="${KC_REDIRECT_URIS_JSON}"
else
  RU="[\"${KC_REDIRECT_URIS}\"]"
fi

# post.logout.redirect.uris -> ZAWSZE string
if [ -n "${KC_POST_LOGOUT_URIS_JSON:-}" ]; then
  # z ["a","b"] zrób "a b"
  PLU_STR=$(printf '%s' "${KC_POST_LOGOUT_URIS_JSON}" | sed -e 's/^\[//; s/\]$//' -e 's/"//g' -e 's/,/ /g')
else
  PLU_STR="${KC_POST_LOGOUT_URIS}"
fi

# ucieczka dla sed (/, &)
esc() { printf '%s' "$1" | sed -e 's/[\/&]/\\&/g'; }

sed -e "s|\${KC_REALM_ID}|$(esc "${KC_REALM_ID}")|g" \
    -e "s|\${KC_REALM_NAME}|$(esc "${KC_REALM_NAME}")|g" \
    -e "s|\${KC_ROLE_MANAGE_CARS}|$(esc "${KC_ROLE_MANAGE_CARS}")|g" \
    -e "s|\${KC_USERNAME}|$(esc "${KC_USERNAME}")|g" \
    -e "s|\${KC_USER_FIRST}|$(esc "${KC_USER_FIRST}")|g" \
    -e "s|\${KC_USER_LAST}|$(esc "${KC_USER_LAST}")|g" \
    -e "s|\${KC_USER_EMAIL}|$(esc "${KC_USER_EMAIL}")|g" \
    -e "s|\${KC_USER_PASSWORD}|$(esc "${KC_USER_PASSWORD}")|g" \
    -e "s|\${KC_CLIENT_ID}|$(esc "${KC_CLIENT_ID}")|g" \
    -e "s|__REDIRECT_URIS__|$(esc "${RU}")|g" \
    -e "s|\${POST_LOGOUT_URIS_STR}|$(esc "${PLU_STR}")|g" \
    "$TPL" > "$OUT"

exec /opt/keycloak/bin/kc.sh start-dev --http-port=8080 \
 --import-realm \
 --hostname-strict=false \
 --http-relative-path="${KC_HTTP_RELATIVE_PATH:-/auth}" \
 --proxy-headers="${KC_PROXY_HEADERS:-xforwarded}" \
 --hostname-strict="${KC_HOSTNAME_STRICT:-false}" \
 --hostname-url="${KC_HOSTNAME_URL:-http://localhost:4200/auth}"
