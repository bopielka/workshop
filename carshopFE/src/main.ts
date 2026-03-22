import { bootstrapApplication } from '@angular/platform-browser';
import { buildAppConfig } from '@/app/app.config';
import { App } from '@/app/app';

fetch('/assets/keycloak.json')
  .then((r) => r.json())
  .then(({ realm, clientId }) => bootstrapApplication(App, buildAppConfig(realm, clientId)))
  .catch((err) => console.error(err));
