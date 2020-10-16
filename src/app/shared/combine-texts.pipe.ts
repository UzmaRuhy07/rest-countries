import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'combineTexts'
})
export class CombineTextsPipe implements PipeTransform {

  transform(value: any[], textField?: string): string {
    if (!!value && value.length) {
      return textField ? value.map(item => { return item[textField]; }).join(', ') : value.join(', ') ;
    }
    return null;
  }
}
