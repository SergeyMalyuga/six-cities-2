import {FavoriteOffersState} from '../../core/models/favorite-offers.state';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {createReducer, on} from '@ngrx/store';
import {loadFavorites, loadFavoritesFailure, loadFavoritesSuccess} from './actions/favorite.actions';

export const favoriteOffersAdapter: EntityAdapter<OfferPreview> = createEntityAdapter<OfferPreview>()
const initialState: FavoriteOffersState = favoriteOffersAdapter.getInitialState({
  isLoading: false,
  error: null
});

export const favoriteReducer = createReducer(
  initialState,
  on(loadFavorites, state => ({
    ...state, isLoading: true
  })),
  on(loadFavoritesSuccess, (state, {favorites}) =>
    favoriteOffersAdapter.setAll(favorites, {...state, isLoading: false})),
  on(loadFavoritesFailure, state => ({
    ...state, isLoading: false
  }))
);
