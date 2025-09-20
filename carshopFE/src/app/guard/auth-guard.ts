import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthGuardData, createAuthGuard} from "keycloak-angular";
import {inject} from "@angular/core";

const isAccessAllowed = async (route: ActivatedRouteSnapshot, _: RouterStateSnapshot, auth: AuthGuardData) => {
    const { authenticated, grantedRoles } = auth;
    const requiredRole = route.data['role'];

    const hasRole = (role: string): boolean =>
        Object.values(grantedRoles.resourceRoles).some(roles => roles.includes(role)) ||
        grantedRoles.realmRoles.includes(role);

    const router = inject(Router);
    if (!requiredRole) {
        return authenticated ? true : router.parseUrl('/home');
    }

    return (authenticated && hasRole(requiredRole)) ? true : router.parseUrl('/home');
};

export const authGuard = createAuthGuard<CanActivateFn>(isAccessAllowed);