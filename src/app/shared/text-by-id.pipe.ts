import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textById'
})
export class TextByIdPipe implements PipeTransform {

  transform(value: string, items: any[], valueField:string, idField?: string): string {
    console.log(value);
    let  selectedItem = !!idField ?  items.find((item) => item[idField] === value) : items.find((item) => item.id === value);

    if (!!selectedItem) {
      return selectedItem[valueField];
   }
    return value;
  }

}
