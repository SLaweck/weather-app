import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes), provideHttpClient()]
};

/*

As this is some kind of a showcase, I decided to use the experimental zoneless change detection feature. 
I've undertaken this because that feature, along with signals and new syntax, represents the future of Angular. 
When zoneless functionality reaches a stable phase, it will open up pathways to a new level of productivity 
without messing up with on-push change detection and executing code outside Angular's zone library.
I've even managed to fix problems in unit tests that aren't fully compatible with zoneless functionality.
I hope that you'll enjoy my little project.

*/
