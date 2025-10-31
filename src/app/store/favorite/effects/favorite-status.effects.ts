import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FavoriteService} from '../../../core/services/favorite.service';
import * as actions from '../actions/favorite.actions';
import {catchError, map, of, switchMap} from 'rxjs';

@Injectable()
export class FavoriteStatusEffects {
  private actions$ = inject(Actions);
  private favoriteService: FavoriteService = inject(FavoriteService);

  changeFavoriteStatus$ = createEffect(() =>
    this.actions$.pipe(ofType(actions.changeFavorite), switchMap(({offerId, status}) =>
      this.favoriteService.changeStatus(offerId, status).pipe(switchMap(offer => this.favoriteService.getFavorites()
        .pipe(map(offers => actions.changeFavoriteSuccess({
          favoriteOffer: offer,
          favoriteOffers: offers
        })), catchError(() => of(actions.changeFavoriteFailure()))))))))
}
