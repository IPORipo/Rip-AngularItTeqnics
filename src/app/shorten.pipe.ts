import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value:string,charNum:number){
    if(value.length>charNum){
      return (value.substr(0,charNum)+"...");
    }
    return value;
  }
}