import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {offerAdapter} from '../../offer/offer.reducer';
import {UserState} from '../../../core/models/user.state';

const offerSelectorState = createFeatureSelector<AppState['offers']>('offers');
const userSelectorState = createFeatureSelector<AppState['user']>('user');

const offerSelectors = offerAdapter.getSelectors();

export const selectOffers = createSelector(
  offerSelectorState,
  offerSelectors.selectAll,
);

export const selectAuthStatus = createSelector(
  userSelectorState,
  (state: UserState) => state.authorizationStatus
);

export const selectUserEmail = createSelector(
  userSelectorState,
  (state: UserState) => state.user?.email
)
