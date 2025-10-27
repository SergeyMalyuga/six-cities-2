import {Injectable} from '@angular/core';
import {Token} from '../models/token';
import {AUTH_TOKEN_KEY_NAME} from '../constants/const';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class AuthService {
  private auth = false;

  getToken(): Token | null {
    return localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  }

  setToken(token: Token) {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  }

  removeToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  }
}
