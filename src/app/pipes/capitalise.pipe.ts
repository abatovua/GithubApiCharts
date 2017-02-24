import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalise'
})
export class CapitalisePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value
      .split('')
      .map((l, i) => !i ? l.toUpperCase() : l)
      .join('');
  }

}
