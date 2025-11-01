import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { appReducer } from './store/app/app.reducer';
import { OfferEffects } from './store/offer/effects/offer.effects';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import {AuthEffects} from './store/user/user-effects/auth.effects';
import {LoginEffects} from './store/user/user-effects/login.effects';
import {FavoriteStatusEffects} from './store/favorite/effects/favorite-status.effects';
import {FavoriteEffects} from './store/favorite/effects/favorite.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(appReducer),
    provideHttpClient(withInterceptorsFromDi()),
    provideEffects(OfferEffects, AuthEffects, LoginEffects, FavoriteStatusEffects, FavoriteEffects),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
