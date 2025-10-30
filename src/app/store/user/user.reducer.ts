import {UserState} from '../../core/models/user.state';
import {AuthorizationStatus, DEFAULT_USER} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {
  checkAuth,
  checkAuthFailure,
  checkAuthSuccess,
  login,
  loginFailure,
  loginSuccess
} from './user-actions/user.actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UN_AUTH,
  user: DEFAULT_USER,
};

export const userReducer = createReducer(
  initialState,
  on(checkAuth, state => ({
    ...state, authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
  on(checkAuthSuccess, state => ({
    ...state, authorizationStatus: AuthorizationStatus.AUTH
  })),
  on(checkAuthFailure, state => ({
    ...state, authorizationStatus: AuthorizationStatus.UN_AUTH
  })),
  on(login, state => ({
    ...state,
  })),
  on(loginSuccess, (state, {user}) => ({
    ...state, user
  })),
  on(loginFailure, state => ({
    ...state,
  }))
);
