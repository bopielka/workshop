#!/usr/bin/env sh
set -e

cat > /usr/share/nginx/html/assets/keycloak.json <<EOF
{
  "realm": "${KC_REALM_ID}",
  "clientId": "${KC_CLIENT_ID}"
}
EOF

exec nginx -g "daemon off;"
