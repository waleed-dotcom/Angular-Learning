import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter',
})
export class CurrencyConverterPipe implements PipeTransform {
  transform(value: number, ...args: number[]): unknown {
    let [data] = args
    return value*data;
  }
}
