import {Pipe, PipeTransform} from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'isoDate'
})
export class IsoDatePipe implements PipeTransform {
    transform(value: string) {
        return dayjs(value).format('YYYY-MM-DD');
    }
}
