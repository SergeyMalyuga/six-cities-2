import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FavoriteService} from '../../../core/services/favorite.service';
import * as actions from '../actions/favorite.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {OfferPreview} from '../../../core/models/offers';

@Injectable()
export class FavoriteEffects {
  private actions$ = inject(Actions);
  private favoriteService: FavoriteService = inject(FavoriteService);

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(ofType(actions.loadFavorites), switchMap(() => this.favoriteService.getFavorites()
      .pipe(map((favorites: OfferPreview[]) => actions.loadFavoritesSuccess({favorites})),
        catchError(() => of(actions.loadFavoritesFailure()))))))
}
