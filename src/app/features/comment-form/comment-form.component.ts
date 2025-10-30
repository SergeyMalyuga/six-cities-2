import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {CommentService} from '../../core/services/comment.service';
import {Comment} from '../../core/models/comments';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-comment-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnDestroy {
  @Input({required: true}) offerId!: string | null;
  @Output() public commentAdded: EventEmitter<Comment> =
    new EventEmitter<Comment>();

  private fb: FormBuilder = inject(FormBuilder);
  private commentService: CommentService = inject(CommentService);
  private destroySubject: Subject<void> = new Subject<void>();

  public commentForm: FormGroup = this.fb.group({
    rating: ['', [Validators.required]],
    comment: ['', [Validators.required, Validators.minLength(56)]],
  });

  public onSubmit() {
    if (this.offerId) {
      const {rating, comment} = this.commentForm.value;
      this.commentService
        .postComment(this.offerId, comment, Number(rating))
        .pipe(takeUntil(this.destroySubject))
        .subscribe({
          next: (comment: Comment) => this.commentAdded.emit(comment),
          complete: () => this.commentForm.reset(),
        });
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
