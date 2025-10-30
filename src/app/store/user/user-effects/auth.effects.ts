import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../../core/services/user.service';
import * as actions from '../user-actions/user.actions';
import {catchError, map, of, switchMap} from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private userService: UserService = inject(UserService);

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.checkAuth),
      switchMap(() =>
        this.userService.getUser().pipe(
          map((user) => actions.checkAuthSuccess({ user })),
          catchError(() => of(actions.checkAuthFailure())),
        ),
      ),
    ),
  );
}
