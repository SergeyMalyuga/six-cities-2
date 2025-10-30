import {Pipe, PipeTransform} from '@angular/core';
import {Comment} from '../../../core/models/comments';

@Pipe({
  name: 'sortCommentByDate'
})
export class SortCommentByDatePipe implements PipeTransform {

  public transform(value: Comment[]): Comment[] {
    return value.sort(this.sortByDateDesc);
  }

  private sortByDateDesc(commentFirst: Comment, commentSecond: Comment) {
    return new Date(commentSecond.date).getTime() - new Date(commentFirst.date).getTime();
  }
}
