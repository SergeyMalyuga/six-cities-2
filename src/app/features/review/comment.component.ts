import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Comment} from '../../core/models/comments';
import {MonthYearDatePipe} from './pipes/month-year-date.pipe';
import {IsoDatePipe} from './pipes/iso-date.pipe';

@Component({
  selector: 'app-comment',
  imports: [
    MonthYearDatePipe,
    IsoDatePipe
  ],
  templateUrl: './comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  @Input({required: true}) comment!: Comment
  protected readonly Math = Math;
}
