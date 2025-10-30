import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({ name: 'monthYearDate' })
export class MonthYearDatePipe implements PipeTransform {
  transform(value: string) {
    return dayjs(value).format('MMMM YYYY');
  }
}
