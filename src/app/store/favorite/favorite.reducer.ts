import {FavoriteOffersState} from '../../core/models/favorite-offers.state';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {createReducer} from '@ngrx/store';

export const favoriteOffersAdapter: EntityAdapter<OfferPreview> = createEntityAdapter<OfferPreview>()
const initialState: FavoriteOffersState = favoriteOffersAdapter.getInitialState({
  isLoading: false,
  error: null
});

export const favoriteReducer = createReducer(initialState);
