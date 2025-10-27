import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {OfferPreview} from '../../core/models/offers';
import {selectOffers} from '../../store/app/selectors/app.selectors';
import {Subject, takeUntil} from 'rxjs';
import {CardComponent} from '../../shared/card/card.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [
    CardComponent
  ]
})
export class MainComponent implements OnInit, OnDestroy {
  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject: Subject<void> = new Subject<void>();
  public offers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>([]);

  public ngOnInit(): void {
    this.store.select(selectOffers).pipe(takeUntil(this.destroySubject)).subscribe(offers => this.offers.set(offers));
  }

  public ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
