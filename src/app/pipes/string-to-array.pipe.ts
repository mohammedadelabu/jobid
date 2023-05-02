import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToArray'
})
export class StringToArrayPipe implements PipeTransform {

  transform(value: string): any {
    const array = value?.split(",");
    return array;
  }

}
