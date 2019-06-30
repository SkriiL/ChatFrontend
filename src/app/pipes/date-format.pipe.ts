import { Pipe, PipeTransform } from '@angular/core';
import {OwnDate, now} from '../models/own-date';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: OwnDate, args?: any): any {
    if (args === 'chat') {
      const td = now();
      if (td.day === value.day && td.month === value.month && td.year === value.year) {
        return (value.hour < 10 ? '0' + value.hour : value.hour) + ':' + (value.minute < 10 ? '0' + value.minute : value.minute);
      }
    } else if (args === 'time') {
      return (value.hour < 10 ? '0' + value.hour : value.hour) + ':' + (value.minute < 10 ? '0' + value.minute : value.minute);
    }
    return (value.day < 10 ? '0' + value.day : value.day) + '.' + (value.month < 10 ? '0' + value.month : value.month) + '.' + value.year;
  }

}
