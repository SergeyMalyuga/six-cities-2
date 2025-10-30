import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../../core/services/user.service';
import * as actions from '../user-actions/user.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {User} from '../../../core/models/user';
import {AuthService} from '../../../core/services/auth-service';


@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(ofType(actions.login), switchMap(({
                                                           email,
                                                           password
                                                         }) => this.userService.postUser(email, password)
      .pipe(map((user: User) => {
        this.authService.setToken(user.token);
        return actions.loginSuccess({user})
      }), catchError(() => of(actions.loginFailure()))))))
}
