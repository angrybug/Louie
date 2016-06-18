import { Component } from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock;

@Component({
    selector: 'my-app',
    template: `<h1>Welcome to Angular2 with Auth0</h1>
    <button *ngIf="!loggedIn()" (click)="login()">Login</button>
    <button *ngIf="loggedIn()" (click)="logout()">Logout</button>
    <button *ngIf="loggedIn()" (click)="ping()">Ping</button>
    `
})
export class AppComponent {

    lock = new Auth0Lock('[auth0clientid]', '[auth0domain].auth0.com');

    constructor(public authHttp: AuthHttp) { }

    login() {
        var hash = this.lock.parseHash();
        if (hash) {
            if (hash.error)
                console.log('There was an error logging in', hash.error);
            else
                this.lock.getProfile(hash.id_token, function (err, profile) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    localStorage.setItem('profile', JSON.stringify(profile));
                    localStorage.setItem('id_token', hash.id_token);
                });
        }

        this.lock.show({
            authParams: {
                scope: 'openid name email'
            }
        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        window.location.href = "/index.html";
    }

    loggedIn() {
        return tokenNotExpired();
    }


    ping() {
        this.authHttp.get('api/values/secured/ping')
            .subscribe(
                data => console.log(data),
                err => console.log(err),
                () => console.log('Complete')
            );
    }
}
