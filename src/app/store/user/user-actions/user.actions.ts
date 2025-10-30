import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/models/user';

export const checkAuth = createAction('[App component] Check Auth');
export const checkAuthSuccess = createAction(
  '[App component] Check Auth Success',
  props<{ user: User }>(),
);
export const checkAuthFailure = createAction(
  '[App component] Check Auth Failure',
);
