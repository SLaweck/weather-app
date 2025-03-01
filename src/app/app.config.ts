import { ApplicationConfig, provideZoneChangeDetection, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient()]
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes), provideHttpClient()]
};

/*

Removed zone.js from angular.json file:
            "polyfills": [
              "zone.js"
            ],
and
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],

*/
