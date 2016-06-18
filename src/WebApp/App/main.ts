///<reference path="./../typings/browser/ambient/es6-shim/index.d.ts"/>
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide }    from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
        },
        deps: [Http]
    })
]);
