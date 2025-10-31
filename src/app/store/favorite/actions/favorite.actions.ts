import {createAction, props} from '@ngrx/store';
import {Offer, OfferPreview} from '../../../core/models/offers';

export const changeFavorite = createAction('[Card component] change Favorite',
  props<{
    offerId: string,
    status: number
  }>());

export const changeFavoriteSuccess = createAction('[Card component] change FavoriteSuccess', props<{
  favoriteOffer: Offer,
  favoriteOffers: OfferPreview[]
}>());
export const changeFavoriteFailure = createAction('[Card component] change FavoriteFailure');
