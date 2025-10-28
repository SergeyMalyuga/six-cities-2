import {Component, effect, inject, OnDestroy, signal, WritableSignal} from '@angular/core';
import {OfferService} from '../../core/services/offer.service';
import {ActivatedRoute} from '@angular/router';
import {Offer} from '../../core/models/offers';
import {Subject, takeUntil} from 'rxjs';
import {HeaderComponentComponent} from '../../shared/header/header.component.component';
import {CapitalizePipe} from '../../shared/pipes/capitalize.pipe';
import {Comment} from '../../core/models/comments';
import {CommentService} from '../../core/services/comment.service';
import {CommentComponent} from '../../features/review/comment.component';

@Component({
  selector: 'app-offer',
  templateUrl: 'offer.component.html',
  imports: [
    HeaderComponentComponent,
    CapitalizePipe,
    CommentComponent
  ]
})
export class OfferComponent implements OnDestroy {
  private offerService: OfferService = inject(OfferService);
  private commentService: CommentService = inject(CommentService);
  private router = inject(ActivatedRoute);
  private destroySubject: Subject<void> = new Subject<void>();

  public offerId: WritableSignal<string | null> = signal<string | null>(null);
  public offer: WritableSignal<Offer | null> = signal<Offer | null>(null)
  public comments: WritableSignal<Comment[]> = signal<Comment[]>([]);

  constructor() {
    this.router.paramMap.pipe(takeUntil(this.destroySubject)).subscribe(params => this.offerId.set(params.get('id')));
    effect(() => {
      const id = this.offerId();
      if (id) {
        this.offerService.getOffer(id).pipe(takeUntil(this.destroySubject)).subscribe(offer => this.offer.set(offer));
        this.commentService.getComments(id).pipe(takeUntil(this.destroySubject)).subscribe(comments => this.comments.set(comments));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  protected readonly Math = Math;
}
