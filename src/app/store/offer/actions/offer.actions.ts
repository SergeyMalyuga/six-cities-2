import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../../../core/models/offers';

export const loadOffers = createAction('[App component] Load offers data]');
export const loadOffersSuccess = createAction('[App component] Load offers data Success]', props<{offers: OfferPreview[]}>());
export const loadOffersFailure = createAction('[App component] Load offers data Failure]');
