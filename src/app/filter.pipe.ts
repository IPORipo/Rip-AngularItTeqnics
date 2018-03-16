import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // pure allowes us to refresh all data dynamically
  pure:false
})
// To create pipe we should implement PipeTransform
// that asks to implement: transform(value: any, args?: any): any {return null;}
// function,that gets first parameter value and any other parameters
export class FilterPipe implements PipeTransform {

  //
  // transform(value: any, args?: any): any {
  //   return null;
  // }
  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      // item[prop] is a javascript form to get property of item(its like item.prop)
      if (((String)(item[propName])).indexOf(filterString)>=0) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}