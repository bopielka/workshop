import {Component, inject, OnInit} from '@angular/core';
import Keycloak from 'keycloak-js';
import {noop} from "rxjs";

@Component({
    selector: 'app-login-component',
    template: ''
})
export class LoginComponent implements OnInit {

    constructor(private keycloak: Keycloak) {
    }

    ngOnInit(): void {
        this.keycloak.login({
            redirectUri: window.location.origin + '/manage-cars'
        })
            .then(noop);
    }

}
