{
  "id": "${KC_REALM_ID}",
  "realm": "${KC_REALM_NAME}",
  "enabled": true,

  "roles": {
    "realm": [
      { "name": "${KC_ROLE_MANAGE_CARS}" }
    ]
  },

  "users": [
    {
      "username": "${KC_USERNAME}",
      "enabled": true,
      "emailVerified": true,
      "firstName": "${KC_USER_FIRST}",
      "lastName": "${KC_USER_LAST}",
      "email": "${KC_USER_EMAIL}",
      "credentials": [
        { "type": "password", "value": "${KC_USER_PASSWORD}", "temporary": false }
      ],
      "realmRoles": ["${KC_ROLE_MANAGE_CARS}"]
    }
  ],

  "clients": [
      {
        "clientId": "${KC_CLIENT_ID}",
        "name": "${KC_CLIENT_ID}",
        "protocol": "openid-connect",
        "publicClient": true,
        "standardFlowEnabled": true,
        "implicitFlowEnabled": false,
        "directAccessGrantsEnabled": false,
        "serviceAccountsEnabled": false,

        "redirectUris": __REDIRECT_URIS__,
        "webOrigins": [ "${KC_WEB_ORIGINS}" ],

        "attributes": {
          "pkce.code.challenge.method": "S256",
          "post.logout.redirect.uris": "${POST_LOGOUT_URIS_STR}"
        }
      }
    ]
}
