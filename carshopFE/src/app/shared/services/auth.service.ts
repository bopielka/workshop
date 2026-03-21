import {inject, Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';
import {Role} from '@/app/domain/enums/Role';

@Injectable({providedIn: 'root'})
export class AuthService {
    private keycloak = inject(Keycloak);

    get isLoggedIn(): boolean {
        return this.keycloak.authenticated === true;
    }

    hasRole(role: Role): boolean {
        if (!this.keycloak.authenticated) return false;
        const tp = this.keycloak.tokenParsed;
        if (!tp) return false;
        const realmRoles: string[] = tp.realm_access?.roles ?? [];
        const resourceRoles: string[] = Object.values(tp.resource_access ?? {})
            .flatMap((r: any) => r.roles ?? []);
        return realmRoles.includes(role) || resourceRoles.includes(role);
    }

    logout(): Promise<void> {
        return this.keycloak.logout({redirectUri: window.location.origin});
    }
}
