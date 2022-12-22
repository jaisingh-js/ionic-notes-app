import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysofdate'
})
export class DaysofdatePipe implements PipeTransform {

  transform(value: Date | undefined, ...args: unknown[]): unknown {
    if (!value) {
      return;
    }
    const currenDate = new Date();
    const difference = value.getTime() - currenDate.getTime();

    if (difference < 0) {
      return;
    }

    const days = difference / (1000 * 60 * 60 * 24);

    return Math.floor(days);
  }

}
