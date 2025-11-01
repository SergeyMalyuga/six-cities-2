import {Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppState} from '../../core/models/app.state';
import {Store} from '@ngrx/store';
import {login} from '../../store/user/user-actions/user.actions';
import {selectAuthStatus} from '../../store/app/selectors/app.selectors';
import {filter, Subject, take, takeUntil, tap} from 'rxjs';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {loadOffers} from '../../store/offer/actions/offer.actions';
import {Router} from '@angular/router';
import {loadFavorites} from '../../store/favorite/actions/favorite.actions';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnDestroy {
  private fb: FormBuilder = inject(FormBuilder);
  private store: Store<AppState> = inject(Store<AppState>);
  private router: Router = inject(Router);
  private destroySubject: Subject<void> = new Subject<void>();

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$')]],
  })

  public onSubmit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.store.dispatch(login({email, password}));
      this.store.select(selectAuthStatus).pipe(filter((status) =>
        status === AuthorizationStatus.AUTH), take(1), takeUntil(this.destroySubject))
        .subscribe(() => {
          this.store.dispatch(loadOffers());
          this.store.dispatch(loadFavorites())
          this.loginForm.reset();
          this.router.navigate([AppRoute.MAIN])
        });
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
