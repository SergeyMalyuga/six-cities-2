import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import {OfferService} from '../../core/services/offer.service';
import {ActivatedRoute} from '@angular/router';
import {Offer, OfferPreview} from '../../core/models/offers';
import {Subject, takeUntil} from 'rxjs';
import {HeaderComponent} from '../../shared/header/header.component';
import {CapitalizePipe} from '../../shared/pipes/capitalize.pipe';
import {Comment} from '../../core/models/comments';
import {CommentService} from '../../core/services/comment.service';
import {CommentComponent} from '../../features/review/comment.component';
import {CommentFormComponent} from '../../features/comment-form/comment-form.component';
import {SortCommentByDatePipe} from './pipes/sort-comment-by-date.pipe';
import {CardComponent} from '../../shared/card/card.component';
import {FirstOffersPipe} from './pipes/first-offers.pipe';

@Component({
  selector: 'app-offer',
  templateUrl: 'offer.component.html',
  imports: [
    HeaderComponent,
    CapitalizePipe,
    CommentComponent,
    CommentFormComponent,
    SortCommentByDatePipe,
    CardComponent,
    FirstOffersPipe,
  ],
})
export class OfferComponent implements OnDestroy {
  private offerService: OfferService = inject(OfferService);
  private commentService: CommentService = inject(CommentService);
  private router = inject(ActivatedRoute);
  private destroySubject: Subject<void> = new Subject<void>();

  public offerId: WritableSignal<string | null> = signal<string | null>(null);
  public offer: WritableSignal<Offer | null> = signal<Offer | null>(null);
  public nearbyOffers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>([]);
  public comments: WritableSignal<Comment[]> = signal<Comment[]>([]);
  public commentAmount = computed(() => this.comments().length);
  public readonly Math = Math;

  constructor() {
    this.router.paramMap
      .pipe(takeUntil(this.destroySubject))
      .subscribe((params) => this.offerId.set(params.get('id')));
    effect(() => {
      const id = this.offerId();
      if (id) {
        this.offerService
          .getOffer(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((offer) => this.offer.set(offer));
        this.commentService
          .getComments(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((comments) => this.comments.set(comments));
        this.offerService.getNearbyOffers(id).pipe(takeUntil(this.destroySubject)).subscribe((offers: OfferPreview[]) => {
          this.nearbyOffers.set(offers);
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  onCommentAdded(comment: Comment) {
    this.comments.update((comments: Comment[]) => {
      if (comment) {
        return [comment, ...comments];
      } else {
        return comments;
      }
    });
  }
}
